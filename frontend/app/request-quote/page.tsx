"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircleIcon, PhoneIcon } from "@heroicons/react/24/outline";
import {
  commercialConfigOptions,
  commercialStock,
  lockOptions,
  panelHeights,
  panelQuantities,
  residentialStock,
  springOptions,
  trackLabel,
} from "@/lib/stock";

const inputClass =
  "rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-bg outline-none transition focus:border-red-main focus:ring-2 focus:ring-red-main/20";

const productTypes = [
  "Residential Door",
  "Commercial Door",
  "Springs",
  "Parts / Hardware",
  "Openers / Accessories",
];

const timelines = [
  "As soon as possible",
  "This week",
  "This month",
  "Planning ahead",
];

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

function RequestQuoteForm() {
  const searchParams = useSearchParams();
  const prefillModel = searchParams.get("model") ?? "";
  const prefillBrand = searchParams.get("brand") ?? "";
  const prefillCategory = searchParams.get("category") ?? "";

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const [location, setLocation] = useState("");
  const [productType, setProductType] = useState(
    prefillCategory === "Commercial" ? "Commercial Door" : "Residential Door",
  );

  // In-stock selector
  const [useStock, setUseStock] = useState(false);
  const [stockNeed, setStockNeed] = useState<
    "Full door" | "Replacement panel(s)"
  >("Full door");
  const [stockType, setStockType] = useState<"residential" | "commercial">(
    "residential",
  );
  const stock = stockType === "residential" ? residentialStock : commercialStock;
  const [stockIndex, setStockIndex] = useState(0);
  const stockDoor = stock[Math.min(stockIndex, stock.length - 1)];
  const [width, setWidth] = useState(stockDoor.widths[0]);
  const [height, setHeight] = useState(stockDoor.heights[0]);
  const [track, setTrack] = useState(stockDoor.tracks[0]);
  const [spring, setSpring] = useState<string>(springOptions[0]);
  const [lock, setLock] = useState<string>(lockOptions[0].value);
  const [commercialConfig, setCommercialConfig] = useState<string>(
    commercialConfigOptions[0].value,
  );
  // Replacement panel (section) selections
  const [panelHeight, setPanelHeight] = useState<string>(panelHeights[0]);
  const [panelWidth, setPanelWidth] = useState("");
  const [panelQty, setPanelQty] = useState<string>(panelQuantities[0]);

  const stockLabel = useMemo(() => {
    const color = stockDoor.color ? `${stockDoor.color} ` : "";
    return `${color}${stockDoor.model} — ${stockDoor.description}`;
  }, [stockDoor]);

  function selectStockType(next: "residential" | "commercial") {
    const nextDoor =
      next === "residential" ? residentialStock[0] : commercialStock[0];
    setStockType(next);
    setStockIndex(0);
    setWidth(nextDoor.widths[0]);
    setHeight(nextDoor.heights[0]);
    setTrack(nextDoor.tracks[0]);
  }

  function selectStockDoor(index: number) {
    const nextDoor = stock[index];
    setStockIndex(index);
    setWidth(nextDoor.widths[0]);
    setHeight(nextDoor.heights[0]);
    setTrack(nextDoor.tracks[0]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const fields: { label: string; value: string }[] = [];
    fields.push({ label: "Product type", value: productType });
    const interest = (data.get("model") as string) || prefillModel;
    if (interest) fields.push({ label: "Model / product of interest", value: interest });
    if (prefillBrand) fields.push({ label: "Brand", value: prefillBrand });

    if (useStock) {
      fields.push({ label: "Requesting", value: stockNeed });
      fields.push({
        label: "In-stock model",
        value: `${stockLabel} (${stockType})`,
      });
      if (stockNeed === "Replacement panel(s)") {
        fields.push({ label: "Panel height", value: panelHeight });
        fields.push({ label: "Panel width", value: panelWidth });
        fields.push({ label: "Panel quantity", value: panelQty });
      } else {
        fields.push({ label: "Size", value: `${width} x ${height}` });
        fields.push({ label: "Track", value: trackLabel(track) });
        if (stockType === "residential") {
          fields.push({ label: "Spring", value: spring });
          const lockChoice = lockOptions.find((l) => l.value === lock);
          fields.push({ label: "Lock", value: lockChoice?.label ?? lock });
        } else {
          const cfg = commercialConfigOptions.find(
            (o) => o.value === commercialConfig,
          );
          fields.push({
            label: "Configuration",
            value: cfg?.label ?? commercialConfig,
          });
        }
      }
    }

    fields.push({ label: "Timeline", value: (data.get("timeline") as string) || "" });

    const payload = {
      requestType: "quote" as const,
      location,
      firstName: (data.get("firstName") as string) || "",
      lastName: (data.get("lastName") as string) || "",
      email: (data.get("email") as string) || "",
      phone: (data.get("phone") as string) || "",
      company: (data.get("company") as string) || "",
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
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <CheckCircleIcon className="h-14 w-14 text-red-main" />
        <h2 className="mt-4 text-3xl font-bold text-gray-bg">
          Quote request received.
        </h2>
        <p className="mt-3 max-w-md text-base leading-7 text-gray-700">
          Thanks! Your request has been sent to our team and we&apos;ll follow up
          shortly with options, availability, and next steps.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-md border border-red-main bg-white px-5 py-3 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
        >
          Back Home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {prefillModel ? (
        <div className="rounded-md border border-red-main/30 bg-cream-secondary px-4 py-3 text-sm text-gray-bg">
          Requesting a quote for{" "}
          <span className="font-bold text-red-main">
            {prefillBrand ? `${prefillBrand} ` : ""}
            {prefillModel}
          </span>
          . Add your details below and we&apos;ll price it out.
        </div>
      ) : null}

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

      <Field label="Company (optional)">
        <input name="company" className={inputClass} />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Product type">
          <select
            name="productType"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className={inputClass}
          >
            {productTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Model / product of interest">
          <input
            name="model"
            defaultValue={prefillModel}
            placeholder="e.g. Bridgeport Steel, or leave blank"
            className={inputClass}
          />
        </Field>
      </div>

      {/* In-stock selector */}
      <div className="rounded-lg border border-red-main/30 bg-cream-secondary p-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={useStock}
            onChange={(e) => setUseStock(e.target.checked)}
            className="mt-1 h-4 w-4 accent-red-main"
          />
          <span>
            <span className="block text-base font-bold text-gray-bg">
              Looking for a door we stock?
            </span>
            <span className="mt-0.5 block text-sm text-gray-600">
              Pick the exact model, size, track, and options from our current
              stock list and we&apos;ll quote it directly.
            </span>
          </span>
        </label>

        {useStock ? (
          <div className="mt-4 grid gap-4">
            <div className="flex flex-wrap gap-2">
              {(["residential", "commercial"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => selectStockType(t)}
                  className={`rounded-md px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                    stockType === t
                      ? "bg-red-main text-white"
                      : "border border-red-main bg-white text-red-main"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <Field label="What do you need?">
              <div className="flex flex-wrap gap-2">
                {(["Full door", "Replacement panel(s)"] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setStockNeed(n)}
                    className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                      stockNeed === n
                        ? "bg-red-main text-white"
                        : "border border-red-main bg-white text-red-main"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="In-stock model">
              <select
                value={stockIndex}
                onChange={(e) => selectStockDoor(Number(e.target.value))}
                className={inputClass}
              >
                {stock.map((d, i) => (
                  <option key={`${d.model}-${d.color}-${i}`} value={i}>
                    {d.color ? `${d.color} ` : ""}
                    {d.model} — {d.description}
                  </option>
                ))}
              </select>
            </Field>

            {stockNeed === "Replacement panel(s)" ? (
              /* Replacement sections: stocked heights, width typed in */
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Panel height">
                  <select
                    value={panelHeight}
                    onChange={(e) => setPanelHeight(e.target.value)}
                    className={inputClass}
                  >
                    {panelHeights.map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Panel width">
                  <input
                    required
                    value={panelWidth}
                    onChange={(e) => setPanelWidth(e.target.value)}
                    placeholder={`e.g. 9'2" or 16'`}
                    className={inputClass}
                  />
                </Field>
                <Field label="How many panels?">
                  <select
                    value={panelQty}
                    onChange={(e) => setPanelQty(e.target.value)}
                    className={inputClass}
                  >
                    {panelQuantities.map((q) => (
                      <option key={q}>{q}</option>
                    ))}
                  </select>
                </Field>
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Width">
                    <select
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className={inputClass}
                    >
                      {stockDoor.widths.map((w) => (
                        <option key={w}>{w}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Height">
                    <select
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className={inputClass}
                    >
                      {stockDoor.heights.map((h) => (
                        <option key={h}>{h}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Track">
                    <select
                      value={track}
                      onChange={(e) => setTrack(e.target.value)}
                      className={inputClass}
                    >
                      {stockDoor.tracks.map((t) => (
                        <option key={t} value={t}>
                          {trackLabel(t)}
                        </option>
                      ))}
                    </select>
                  </Field>
                  {stockType === "residential" ? (
                    <Field label="Spring">
                      <select
                        value={spring}
                        onChange={(e) => setSpring(e.target.value)}
                        className={inputClass}
                      >
                        {springOptions.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </Field>
                  ) : (
                    <Field label="Configuration">
                      <select
                        value={commercialConfig}
                        onChange={(e) => setCommercialConfig(e.target.value)}
                        className={inputClass}
                      >
                        {commercialConfigOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  )}
                </div>

                {stockType === "residential" ? (
                  <Field label="Lock">
                    <select
                      value={lock}
                      onChange={(e) => setLock(e.target.value)}
                      className={`${inputClass} md:w-1/2`}
                    >
                      {lockOptions.map((l) => (
                        <option key={l.value} value={l.value}>
                          {l.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                ) : null}
              </>
            )}
          </div>
        ) : null}
      </div>

      <Field label="Timeline">
        <select name="timeline" className={inputClass}>
          {timelines.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label="Project details">
        <textarea
          name="details"
          rows={5}
          placeholder="Door size, collection, color, insulation, pickup location, or any job details..."
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
        {status === "sending" ? "Sending…" : "Submit Quote Request"}
      </button>
    </form>
  );
}

export default function RequestQuote() {
  return (
    <main className="bg-cream-bg px-4 pt-28 pb-16 md:px-8 lg:px-10">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
            Request A Quote
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-bg md:text-5xl">
            Tell us what you need and we will help price it out.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-700 md:text-lg">
            Send over the door type, project details, and contact information. A
            Doors Direct team member will follow up with product options,
            availability, and next steps.
          </p>

          <div className="mt-8 rounded-lg bg-red-main p-6 text-white">
            <h2 className="text-xl font-bold">Need help faster?</h2>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Call the team directly during business hours for urgent stock,
              parts, or pickup questions.
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
          <Suspense
            fallback={<div className="min-h-[420px]" aria-hidden="true" />}
          >
            <RequestQuoteForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
