import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  resolveRecipients,
  sendQuoteEmail,
  type QuoteEmailInput,
} from "./email";

// Covers the two things that must never silently regress: WHO a lead goes to,
// and what happens when Resend is missing, slow, or unhappy. The network is
// always mocked — these tests never send real email.

const SOUTH = [
  "brandon@doorsdirectsouth.com",
  "cj@doorsdirectsouth.com",
  "tom@doorsdirectsouth.com",
];

const UNION = [
  "jason@doorsdirectllc.com",
  "mike@doorsdirectllc.com",
  "aaponte@doorsdirectllc.com",
  "larry@doorsdirectllc.com",
];

const input = (o: Partial<QuoteEmailInput> = {}): QuoteEmailInput => ({
  subject: "Quote request — Jane Doe",
  location: "south",
  locationLabel: "Doors Direct South",
  customerName: "Jane Doe",
  customerEmail: "jane@example.com",
  fields: [
    { label: "Name", value: "Jane Doe" },
    { label: "Model", value: "4050" },
  ],
  ...o,
});

// sendQuoteEmail reads the env at call time, so each test starts from a clean
// slate and puts whatever the user had back afterwards.
const ENV_KEYS = ["RESEND_API_KEY", "QUOTE_FROM_EMAIL"] as const;
let savedEnv: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>>;

beforeEach(() => {
  savedEnv = {};
  for (const key of ENV_KEYS) {
    savedEnv[key] = process.env[key];
    delete process.env[key];
  }
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    const value = savedEnv[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("resolveRecipients — lead routing", () => {
  it("sends South leads to the South trio, nobody blind-copied", () => {
    expect(resolveRecipients("south")).toEqual({ to: SOUTH, bcc: [] });
  });

  it("sends Union leads to the Union team with South BCC'd", () => {
    expect(resolveRecipients("union")).toEqual({ to: UNION, bcc: SOUTH });
  });
});

describe("sendQuoteEmail without a provider key", () => {
  it("accepts the lead, logs it, and sends nothing", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    // ok:true / delivered:false is the contract the form AND the honeypot
    // rely on — the visitor sees success, ops knows nothing went out.
    await expect(sendQuoteEmail(input())).resolves.toEqual({
      ok: true,
      delivered: false,
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledTimes(1);
  });
});

describe("sendQuoteEmail with a key", () => {
  const stubFetch = (response: Response | Error) => {
    const fetchMock =
      response instanceof Error
        ? vi.fn().mockRejectedValue(response)
        : vi.fn().mockResolvedValue(response);
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  };

  const sentBody = (fetchMock: ReturnType<typeof vi.fn>) =>
    JSON.parse(fetchMock.mock.calls[0][1].body as string);

  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test_123";
  });

  it("POSTs to Resend with the key and the South recipients", async () => {
    const fetchMock = stubFetch(new Response("{}", { status: 200 }));

    await expect(sendQuoteEmail(input())).resolves.toEqual({
      ok: true,
      delivered: true,
    });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.method).toBe("POST");
    expect(init.headers.Authorization).toBe("Bearer re_test_123");

    const body = sentBody(fetchMock);
    expect(body.to).toEqual(SOUTH);
    // South has no BCC list — the field must be absent, not [].
    expect("bcc" in body).toBe(false);
    expect(body.reply_to).toBe("jane@example.com");
    expect(body.subject).toBe("Quote request — Jane Doe");
    expect(body.from).toBe(
      "Doors Direct Website <quotes@doorsdirectsouth.com>",
    );
  });

  it("carries the Union-with-South-BCC routing into the payload", async () => {
    const fetchMock = stubFetch(new Response("{}", { status: 200 }));
    await sendQuoteEmail(input({ location: "union" }));

    const body = sentBody(fetchMock);
    expect(body.to).toEqual(UNION);
    expect(body.bcc).toEqual(SOUTH);
  });

  it("honours QUOTE_FROM_EMAIL and omits reply_to when there is no email", async () => {
    process.env.QUOTE_FROM_EMAIL = "Doors Direct <hello@doorsdirectllc.com>";
    const fetchMock = stubFetch(new Response("{}", { status: 200 }));
    await sendQuoteEmail(input({ customerEmail: "" }));

    const body = sentBody(fetchMock);
    expect(body.from).toBe("Doors Direct <hello@doorsdirectllc.com>");
    expect("reply_to" in body).toBe(false);
  });

  it("escapes customer-controlled values in the HTML body", async () => {
    const fetchMock = stubFetch(new Response("{}", { status: 200 }));
    await sendQuoteEmail(
      input({
        fields: [{ label: "Name", value: '<script>alert("x")</script> & Co' }],
        details: "Call me <after> 5pm",
      }),
    );

    const body = sentBody(fetchMock);
    expect(body.html).not.toContain("<script>");
    expect(body.html).toContain("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; Co");
    expect(body.html).toContain("Call me &lt;after&gt; 5pm");
    // The plain-text body stays verbatim.
    expect(body.text).toContain("Call me <after> 5pm");
  });

  it("drops blank selection fields from both bodies", async () => {
    const fetchMock = stubFetch(new Response("{}", { status: 200 }));
    await sendQuoteEmail(
      input({
        fields: [
          { label: "Model", value: "4050" },
          { label: "Windows", value: "   " },
        ],
      }),
    );

    const body = sentBody(fetchMock);
    expect(body.html).not.toContain("Windows");
    expect(body.text).not.toContain("Windows");
    expect(body.text).toContain("Model: 4050");
  });

  it("reports a provider error with the status code, delivered:false", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    stubFetch(new Response("nope", { status: 500 }));

    await expect(sendQuoteEmail(input())).resolves.toEqual({
      ok: false,
      delivered: false,
      error: "Email provider error (500)",
    });
  });

  it("turns a network failure into a result, never a throw", async () => {
    // The API route turns ok:false into a 502 — an unhandled rejection here
    // would surface as a blank 500 to the visitor instead.
    vi.spyOn(console, "error").mockImplementation(() => {});
    stubFetch(new Error("ECONNRESET"));

    await expect(sendQuoteEmail(input())).resolves.toEqual({
      ok: false,
      delivered: false,
      error: "Email send failed",
    });
  });
});
