"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircleIcon, PhoneIcon } from "@heroicons/react/24/outline";

const inputClass =
  "rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-bg outline-none transition focus:border-red-main focus:ring-2 focus:ring-red-main/20";

// Spring specs offered as dropdowns (no pricing).
// Wire sizes follow the full Service Spring (SSC) spring wire chart.
const wireSizes = [
  ".125",
  ".135",
  ".142",
  ".1483",
  ".1562",
  ".162",
  ".170",
  ".177",
  ".1875",
  ".192",
  ".207",
  ".2187",
  ".2253",
  ".2343",
  ".2437",
  ".250",
  ".2625",
  ".273",
  ".283",
  ".289",
  ".295",
  ".3065",
  ".3125",
  ".3195",
  ".331",
  ".3437",
  ".3625",
  ".375",
  ".3938",
  ".4062",
  ".4218",
  ".4305",
  ".4375",
  ".4615",
  ".4687",
  ".490",
  ".500",
  ".5312",
  ".5625",
  ".625",
];
// Standard torsion spring inside diameters (residential through commercial).
const insideDiameters = ['1 3/4"', '2"', '2 1/4"', '2 5/8"', '3 3/4"', '6"'];
const windDirections = [
  "Right wound (RW)",
  "Left wound (LW)",
  "Pair — one of each",
  "Not sure",
];
// Extension spring weight ratings from 50 lb through 440 lb in 10 lb steps.
const extensionWeights = Array.from(
  { length: 40 },
  (_, i) => `${50 + i * 10} lb`,
);
const doorWidths = [
  "8'",
  "9'",
  "10'",
  "12'",
  "14'",
  "15'",
  "16'",
  "18'",
  "Other",
];
const doorHeights = ["7'", "8'", "9'", "10'", "12'", "14'", "Other"];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-gray-bg">{label}</span>
      {children}
    </label>
  );
}

export default function SpringRequest() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [location, setLocation] = useState("");
  const [springType, setSpringType] = useState<"Torsion" | "Extension">(
    "Torsion",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const fields: { label: string; value: string }[] = [
      { label: "Spring type", value: springType },
      { label: "Door width", value: (data.get("doorWidth") as string) || "" },
      { label: "Door height", value: (data.get("doorHeight") as string) || "" },
      { label: "Quantity", value: (data.get("quantity") as string) || "" },
    ];

    if (springType === "Torsion") {
      fields.push({ label: "Wire size", value: (data.get("wireSize") as string) || "" });
      fields.push({
        label: "Inside diameter",
        value: (data.get("insideDiameter") as string) || "",
      });
      fields.push({
        label: "Approx. length",
        value: (data.get("springLength") as string) || "",
      });
      fields.push({ label: "Wind direction", value: (data.get("wind") as string) || "" });
    } else {
      fields.push({
        label: "Weight rating",
        value: (data.get("weight") as string) || "",
      });
      fields.push({
        label: "Approx. length",
        value: (data.get("springLength") as string) || "",
      });
    }

    const payload = {
      requestType: "spring" as const,
      location,
      firstName: (data.get("firstName") as string) || "",
      lastName: (data.get("lastName") as string) || "",
      email: (data.get("email") as string) || "",
      phone: (data.get("phone") as string) || "",
      fields,
      details: (data.get("details") as string) || "",
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <main className="bg-cream-bg px-4 pt-28 pb-16 md:px-8 lg:px-10">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
            Spring Request
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-bg md:text-5xl">
            Need springs? Tell us the sizes and we&apos;ll match them.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-700 md:text-lg">
            Give us the spring specs, or just your door size if you&apos;re not
            sure — our team will confirm the right torsion or extension springs
            and get back to you with availability.
          </p>

          <div className="mt-8 rounded-lg bg-red-main p-6 text-white">
            <h2 className="text-xl font-bold">Not sure of your specs?</h2>
            <p className="mt-2 text-sm leading-6 text-white/80">
              No problem — send your door width, height, and weight if you have
              it, add photos of the label if you can, and we&apos;ll figure out
              the rest. Or call us directly.
            </p>
            <Link
              href="tel:8566626666"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-red-main transition-colors hover:bg-cream-secondary"
            >
              <PhoneIcon className="h-5 w-5" />
              Call Now
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8">
          {status === "sent" ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <CheckCircleIcon className="h-14 w-14 text-red-main" />
              <h2 className="mt-4 text-3xl font-bold text-gray-bg">
                Spring request received.
              </h2>
              <p className="mt-3 max-w-md text-base leading-7 text-gray-700">
                Thanks! We&apos;ll confirm the right springs and follow up with
                availability shortly.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center justify-center rounded-md border border-red-main bg-white px-5 py-3 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
              >
                Back Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <Field label="Which location? *">
                <select
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  name="location"
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select a location…
                  </option>
                  <option value="south">Doors Direct South</option>
                  <option value="union">Doors Direct Union</option>
                </select>
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="First name *">
                  <input required name="firstName" className={inputClass} />
                </Field>
                <Field label="Last name *">
                  <input required name="lastName" className={inputClass} />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Email *">
                  <input required type="email" name="email" className={inputClass} />
                </Field>
                <Field label="Phone *">
                  <input required type="tel" name="phone" className={inputClass} />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Spring type">
                  <select
                    value={springType}
                    onChange={(e) =>
                      setSpringType(e.target.value as "Torsion" | "Extension")
                    }
                    className={inputClass}
                  >
                    <option value="Torsion">Torsion</option>
                    <option value="Extension">Extension</option>
                  </select>
                </Field>
                <Field label="Quantity">
                  <select name="quantity" defaultValue="1" className={inputClass}>
                    {["1", "2", "3", "4"].map((q) => (
                      <option key={q}>{q}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Door width">
                  <select name="doorWidth" className={inputClass}>
                    {doorWidths.map((w) => (
                      <option key={w}>{w}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Door height">
                  <select name="doorHeight" className={inputClass}>
                    {doorHeights.map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {springType === "Torsion" ? (
                <>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Wire size">
                      <select name="wireSize" className={inputClass}>
                        <option value="">Not sure</option>
                        {wireSizes.map((w) => (
                          <option key={w}>{w}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Inside diameter">
                      <select name="insideDiameter" className={inputClass}>
                        <option value="">Not sure</option>
                        {insideDiameters.map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Approx. length (inches)">
                      <input
                        name="springLength"
                        placeholder='e.g. 32"'
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Wind direction">
                      <select name="wind" className={inputClass}>
                        {windDirections.map((w) => (
                          <option key={w}>{w}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Weight rating">
                    <select name="weight" className={inputClass}>
                      <option value="">Not sure</option>
                      {extensionWeights.map((w) => (
                        <option key={w}>{w}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Approx. length (inches)">
                    <input
                      name="springLength"
                      placeholder='e.g. 25"'
                      className={inputClass}
                    />
                  </Field>
                </div>
              )}

              <Field label="Additional details">
                <textarea
                  name="details"
                  rows={4}
                  placeholder="Cone type, color code, existing spring measurements, or anything else that helps us match your springs..."
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {status === "error" ? (
                <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-main">
                  {errorMsg || "Something went wrong. Please try again or call us."}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center rounded-md bg-red-main px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-red-secondary focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 md:w-fit"
              >
                {status === "sending" ? "Sending…" : "Submit Spring Request"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
