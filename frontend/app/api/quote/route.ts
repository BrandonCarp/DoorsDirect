import { NextResponse } from "next/server";
import {
  QuoteField,
  RequestLocation,
  sendQuoteEmail,
} from "@/lib/email";

interface QuotePayload {
  requestType?: "quote" | "spring";
  location?: string;
  locationLabel?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  fields?: QuoteField[];
  details?: string;
}

const LOCATION_LABELS: Record<RequestLocation, string> = {
  south: "Doors Direct South",
  union: "Doors Direct Union",
};

export async function POST(request: Request) {
  let payload: QuotePayload;
  try {
    payload = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const location: RequestLocation = payload.location === "union" ? "union" : "south";
  const firstName = (payload.firstName ?? "").trim();
  const lastName = (payload.lastName ?? "").trim();
  const email = (payload.email ?? "").trim();
  const phone = (payload.phone ?? "").trim();
  const customerName = `${firstName} ${lastName}`.trim();

  // Minimal validation — need a name, an email, and a phone to follow up.
  if (!customerName || !email || !phone) {
    return NextResponse.json(
      { ok: false, error: "Please include your name, email, and phone." },
      { status: 400 },
    );
  }

  const isSpring = payload.requestType === "spring";
  const subject = isSpring
    ? `Spring request — ${customerName}`
    : `Quote request — ${customerName}`;

  // Contact fields always lead the email; selection fields follow.
  const contactFields: QuoteField[] = [
    { label: "Name", value: customerName },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
  ];
  if (payload.company && payload.company.trim()) {
    contactFields.push({ label: "Company", value: payload.company.trim() });
  }

  const selectionFields = Array.isArray(payload.fields) ? payload.fields : [];

  const result = await sendQuoteEmail({
    subject,
    location,
    locationLabel: LOCATION_LABELS[location],
    customerName,
    customerEmail: email,
    fields: [...contactFields, ...selectionFields],
    details: payload.details?.trim() || undefined,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error ?? "Something went wrong sending your request." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: result.delivered });
}
