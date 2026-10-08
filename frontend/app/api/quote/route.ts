import { NextResponse } from "next/server";
import {
  QuoteField,
  RequestLocation,
  sendQuoteEmail,
} from "@/lib/email";

interface QuotePayload {
  requestType?: "quote" | "spring" | "inquiry";
  location?: string;
  locationLabel?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  fields?: QuoteField[];
  details?: string;
  /** Honeypot — a hidden field real visitors never fill. */
  website?: string;
}

const LOCATION_LABELS: Record<RequestLocation, string> = {
  south: "Doors Direct South",
  union: "Doors Direct Union",
};

// ---------------------------------------------------------------------------
// Abuse protection. These emails fan out to several inboxes and spend the
// Resend quota, so the endpoint caps sizes, drops honeypot submissions, and
// rate-limits per IP.
//
// The rate limiter is in-memory: on serverless hosting each warm instance
// keeps its own counters, so it is best-effort rather than exact — still
// enough to stop a dumb bot from sending thousands of emails. For a hard
// guarantee later, back it with Upstash/Redis or the host's WAF rules.

const SHORT_MAX = 200; // names, email, phone, company
const VALUE_MAX = 600; // one selection field's value
const LABEL_MAX = 80;
const DETAILS_MAX = 5000;
const MAX_FIELDS = 40;

// Tunable so test runs can relax it (see playwright.config webServer env).
const RATE_LIMIT = Number(process.env.QUOTE_RATE_LIMIT ?? 8); // submissions...
const RATE_WINDOW_MS = 10 * 60 * 1000; // ...per 10 minutes per IP

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing forever.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => t <= windowStart)) hits.delete(key);
    }
  }
  return false;
}

function clip(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests — please try again in a few minutes or call us." },
      { status: 429 },
    );
  }

  let payload: QuotePayload;
  try {
    payload = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled -> almost certainly a bot. Answer as if it worked so the
  // bot moves on, but send nothing.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const location: RequestLocation = payload.location === "union" ? "union" : "south";
  const firstName = clip(payload.firstName, SHORT_MAX);
  const lastName = clip(payload.lastName, SHORT_MAX);
  const email = clip(payload.email, SHORT_MAX);
  const phone = clip(payload.phone, SHORT_MAX);
  const customerName = `${firstName} ${lastName}`.trim();

  // Minimal validation — need a name, a plausible email, and a phone.
  if (!customerName || !email || !phone) {
    return NextResponse.json(
      { ok: false, error: "Please include your name, email, and phone." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const subject =
    payload.requestType === "spring"
      ? `Spring request — ${customerName}`
      : payload.requestType === "inquiry"
        ? `Website message — ${customerName}`
        : `Quote request — ${customerName}`;

  // Contact fields always lead the email; selection fields follow.
  const contactFields: QuoteField[] = [
    { label: "Name", value: customerName },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
  ];
  const company = clip(payload.company, SHORT_MAX);
  if (company) {
    contactFields.push({ label: "Company", value: company });
  }

  const selectionFields = (Array.isArray(payload.fields) ? payload.fields : [])
    .slice(0, MAX_FIELDS)
    .map((f) => ({
      label: clip(f?.label, LABEL_MAX),
      value: clip(f?.value, VALUE_MAX),
    }))
    .filter((f) => f.label !== "");

  const result = await sendQuoteEmail({
    subject,
    location,
    locationLabel: LOCATION_LABELS[location],
    customerName,
    customerEmail: email,
    fields: [...contactFields, ...selectionFields],
    details: clip(payload.details, DETAILS_MAX) || undefined,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error ?? "Something went wrong sending your request." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: result.delivered });
}
