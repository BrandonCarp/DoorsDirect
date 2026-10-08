import { describe, it, expect, vi, beforeEach } from "vitest";
import type { QuoteEmailInput, SendResult } from "@/lib/email";

// Tests the abuse armour around /api/quote: honeypot, validation, clipping,
// and the per-IP rate limit. sendQuoteEmail is mocked — nothing here touches
// Resend — and the module is re-imported per test so each one gets a fresh
// rate-limit counter.

const { sendMock } = vi.hoisted(() => ({
  sendMock: vi.fn<(input: QuoteEmailInput) => Promise<SendResult>>(),
}));

vi.mock("@/lib/email", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/email")>()),
  sendQuoteEmail: sendMock,
}));

type PostHandler = (request: Request) => Promise<Response>;

async function loadRoute(rateLimit = 1000): Promise<PostHandler> {
  vi.resetModules();
  process.env.QUOTE_RATE_LIMIT = String(rateLimit);
  const mod = await import("./route");
  return mod.POST;
}

const CONTACT = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  phone: "555-0100",
};

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/quote", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "198.51.100.7",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  sendMock.mockReset();
  sendMock.mockResolvedValue({ ok: true, delivered: true });
});

describe("honeypot", () => {
  it("answers success to a bot and sends nothing", async () => {
    const POST = await loadRoute();
    const res = await POST(post({ ...CONTACT, website: "http://spam.example" }));

    // The bot must not be able to tell it was caught.
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, delivered: false });
    expect(sendMock).not.toHaveBeenCalled();
  });
});

describe("validation", () => {
  it("rejects a submission missing name, email, or phone", async () => {
    const POST = await loadRoute();
    const res = await POST(post({ ...CONTACT, phone: "" }));

    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects an implausible email address", async () => {
    const POST = await loadRoute();
    const res = await POST(post({ ...CONTACT, email: "not-an-email" }));

    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a body that is not JSON", async () => {
    const POST = await loadRoute();
    const res = await POST(post("{nope"));

    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });
});

describe("subjects and routing", () => {
  it("builds a quote email to South by default", async () => {
    const POST = await loadRoute();
    const res = await POST(
      post({ ...CONTACT, fields: [{ label: "Model", value: "4050" }] }),
    );

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, delivered: true });

    const sent = sendMock.mock.calls[0][0];
    expect(sent.subject).toBe("Quote request — Jane Doe");
    expect(sent.location).toBe("south");
    expect(sent.locationLabel).toBe("Doors Direct South");
    expect(sent.customerEmail).toBe("jane@example.com");
    // Contact details always lead, selections follow.
    expect(sent.fields.slice(0, 3)).toEqual([
      { label: "Name", value: "Jane Doe" },
      { label: "Email", value: "jane@example.com" },
      { label: "Phone", value: "555-0100" },
    ]);
    expect(sent.fields).toContainEqual({ label: "Model", value: "4050" });
  });

  it("labels spring and inquiry requests and passes Union through", async () => {
    const POST = await loadRoute();

    await POST(post({ ...CONTACT, requestType: "spring", location: "union" }));
    expect(sendMock.mock.calls[0][0].subject).toBe("Spring request — Jane Doe");
    expect(sendMock.mock.calls[0][0].location).toBe("union");
    expect(sendMock.mock.calls[0][0].locationLabel).toBe("Doors Direct Union");

    await POST(post({ ...CONTACT, requestType: "inquiry" }));
    expect(sendMock.mock.calls[1][0].subject).toBe("Website message — Jane Doe");
  });

  it("treats an unknown location as South, never a crash", async () => {
    const POST = await loadRoute();
    await POST(post({ ...CONTACT, location: "mars" }));
    expect(sendMock.mock.calls[0][0].location).toBe("south");
  });

  it("includes the company only when one was given", async () => {
    const POST = await loadRoute();
    await POST(post({ ...CONTACT, company: "Acme Overhead" }));
    expect(sendMock.mock.calls[0][0].fields).toContainEqual({
      label: "Company",
      value: "Acme Overhead",
    });

    await POST(post(CONTACT));
    const labels = sendMock.mock.calls[1][0].fields.map((f) => f.label);
    expect(labels).not.toContain("Company");
  });
});

describe("clipping — a hostile payload cannot inflate the email", () => {
  it("clips names, labels, values, and details to their caps", async () => {
    const POST = await loadRoute();
    await POST(
      post({
        ...CONTACT,
        firstName: "J".repeat(500),
        fields: [{ label: "L".repeat(300), value: "v".repeat(2000) }],
        details: "d".repeat(9000),
      }),
    );

    const sent = sendMock.mock.calls[0][0];
    expect(sent.fields[0].value).toHaveLength(200 + " Doe".length); // name field
    const custom = sent.fields[sent.fields.length - 1];
    expect(custom.label).toHaveLength(80);
    expect(custom.value).toHaveLength(600);
    expect(sent.details).toHaveLength(5000);
  });

  it("caps the field list at 40 and drops label-less entries", async () => {
    const POST = await loadRoute();
    const fields = Array.from({ length: 60 }, (_, i) => ({
      label: i === 5 ? "" : `Field ${i}`,
      value: `v${i}`,
    }));
    await POST(post({ ...CONTACT, fields }));

    const sent = sendMock.mock.calls[0][0];
    // 3 contact fields + first 40 submitted, minus the blank-label one.
    expect(sent.fields).toHaveLength(3 + 39);
    expect(sent.fields.map((f) => f.label)).not.toContain("Field 41");
  });

  it("omits details entirely when blank", async () => {
    const POST = await loadRoute();
    await POST(post({ ...CONTACT, details: "   " }));
    expect(sendMock.mock.calls[0][0].details).toBeUndefined();
  });
});

describe("provider failures surface as a 502", () => {
  it("relays the error message from sendQuoteEmail", async () => {
    sendMock.mockResolvedValue({
      ok: false,
      delivered: false,
      error: "Email provider error (500)",
    });
    const POST = await loadRoute();
    const res = await POST(post(CONTACT));

    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({
      ok: false,
      error: "Email provider error (500)",
    });
  });
});

describe("rate limiting", () => {
  it("allows N submissions per IP then returns 429", async () => {
    const POST = await loadRoute(3);

    for (let i = 0; i < 3; i++) {
      const res = await POST(post(CONTACT));
      expect(res.status, `request ${i + 1}`).toBe(200);
    }

    const blocked = await POST(post(CONTACT));
    expect(blocked.status).toBe(429);
    expect(sendMock).toHaveBeenCalledTimes(3);
  });

  it("keys on the first hop of x-forwarded-for, so proxies don't pool visitors", async () => {
    const POST = await loadRoute(1);

    // "client, proxy" and "client" are the same visitor...
    await POST(post(CONTACT, { "x-forwarded-for": " 203.0.113.9 , 10.0.0.1" }));
    const same = await POST(post(CONTACT, { "x-forwarded-for": "203.0.113.9" }));
    expect(same.status).toBe(429);

    // ...while a different client is unaffected.
    const other = await POST(post(CONTACT, { "x-forwarded-for": "203.0.113.10" }));
    expect(other.status).toBe(200);
  });

  it("counts honeypot hits against the limit too", async () => {
    // A bot hammering the honeypot still runs out of requests.
    const POST = await loadRoute(2);
    await POST(post({ ...CONTACT, website: "spam" }));
    await POST(post({ ...CONTACT, website: "spam" }));
    const res = await POST(post({ ...CONTACT, website: "spam" }));
    expect(res.status).toBe(429);
  });
});
