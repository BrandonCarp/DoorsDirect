// Server-only email helper for quote and spring requests.
//
// Delivery uses Resend (https://resend.com) via its REST API so no extra npm
// dependency is required. Set these environment variables to enable sending:
//
//   RESEND_API_KEY   - your Resend API key (required to actually send)
//   QUOTE_FROM_EMAIL - verified From address, e.g.
//                      "Doors Direct <quotes@doorsdirectsouth.com>"
//
// Until RESEND_API_KEY is set, submissions are accepted and logged server-side
// but not emailed, so the site keeps working during setup. Swapping to SMTP
// later only means changing the send() implementation below.

export type RequestLocation = "south" | "union";

// Recipient routing requested by Doors Direct.
const SOUTH_TEAM = [
  "brandon@doorsdirectsouth.com",
  "cj@doorsdirectsouth.com",
  "tom@doorsdirectsouth.com",
];

const UNION_TEAM = [
  "jason@doorsdirectllc.com",
  "mike@doorsdirectllc.com",
  "aaponte@doorsdirectllc.com",
  "larry@doorsdirectllc.com",
];

export function resolveRecipients(location: RequestLocation): {
  to: string[];
  bcc: string[];
} {
  if (location === "union") {
    // Union leads go to the Union team; the South team is blind-copied.
    return { to: UNION_TEAM, bcc: SOUTH_TEAM };
  }
  // Default / South leads go to the South team.
  return { to: SOUTH_TEAM, bcc: [] };
}

export interface QuoteField {
  label: string;
  value: string;
}

export interface QuoteEmailInput {
  subject: string;
  location: RequestLocation;
  locationLabel: string;
  customerName: string;
  customerEmail: string;
  fields: QuoteField[];
  details?: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildBodies(input: QuoteEmailInput) {
  const rows = input.fields
    .filter((f) => f.value && f.value.trim().length > 0)
    .map(
      (f) =>
        `<tr><td style="padding:6px 12px;font-weight:bold;color:#333;vertical-align:top">${escapeHtml(
          f.label,
        )}</td><td style="padding:6px 12px;color:#111">${escapeHtml(
          f.value,
        )}</td></tr>`,
    )
    .join("");

  const detailsHtml = input.details
    ? `<h3 style="margin:18px 0 6px">Additional details</h3><p style="white-space:pre-wrap;color:#111">${escapeHtml(
        input.details,
      )}</p>`
    : "";

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px">
    <h2 style="color:#b3121b;margin-bottom:4px">${escapeHtml(input.subject)}</h2>
    <p style="color:#555;margin-top:0">Location: <strong>${escapeHtml(
      input.locationLabel,
    )}</strong></p>
    <table style="border-collapse:collapse;width:100%;border:1px solid #eee">${rows}</table>
    ${detailsHtml}
  </div>`;

  const text = [
    input.subject,
    `Location: ${input.locationLabel}`,
    "",
    ...input.fields
      .filter((f) => f.value && f.value.trim().length > 0)
      .map((f) => `${f.label}: ${f.value}`),
    input.details ? `\nAdditional details:\n${input.details}` : "",
  ].join("\n");

  return { html, text };
}

export interface SendResult {
  ok: boolean;
  delivered: boolean;
  error?: string;
}

export async function sendQuoteEmail(
  input: QuoteEmailInput,
): Promise<SendResult> {
  const { to, bcc } = resolveRecipients(input.location);
  const { html, text } = buildBodies(input);
  const from =
    process.env.QUOTE_FROM_EMAIL ??
    "Doors Direct Website <quotes@doorsdirectsouth.com>";
  const apiKey = process.env.RESEND_API_KEY;

  // No provider configured yet — accept the submission and log it so the form
  // works during setup, but don't claim it was delivered.
  if (!apiKey) {
    console.log(
      "[quote] RESEND_API_KEY not set; submission received but not emailed.",
      { to, bcc, subject: input.subject, from: input.customerEmail },
    );
    return { ok: true, delivered: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        bcc: bcc.length ? bcc : undefined,
        reply_to: input.customerEmail || undefined,
        subject: input.subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[quote] Resend error", res.status, body);
      return { ok: false, delivered: false, error: `Email provider error (${res.status})` };
    }

    return { ok: true, delivered: true };
  } catch (err) {
    console.error("[quote] Email send failed", err);
    return { ok: false, delivered: false, error: "Email send failed" };
  }
}
