"use client";

// Public stock door builder — a section of the Request a Quote hub. Same flow
// as the internal stock tool, stock items only, NO prices: a visitor builds a
// door and the result is a quote request, not a number. Data lives in
// lib/door-builder/ (vendored from the internal tool's data files; pricing
// modules are deliberately not imported).

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import {
  colorInStock,
  sizeLabel,
  solidOnlyHeight,
  stockedColors,
  stockedHeights,
  stockedWidths,
  torsionOnlyHeight,
} from "@/lib/door-builder/stock-matrix";
import { windowDesigns } from "@/lib/door-builder/inserts";
import {
  BuilderConfig,
  MODEL_LABELS,
  doorDescription,
  modelsByCollection,
} from "@/lib/door-builder/catalog";
import { trackLabel } from "@/lib/stock";
import { Field, Panel, inputClass } from "@/components/builder/ui";

// Residential tracks DDS stocks (labels via trackLabel).
const TRACKS = ["LHR", "10R", "12R", "15R", "20R", "32R"];

const STYLE_OPTIONS = [
  { value: "solid", label: "Solid — no windows" },
  { value: "plain", label: "Plain glass windows" },
  { value: "inserts", label: "Windows with insert designs" },
] as const;

export default function StockDoorBuilder() {
  const groups = useMemo(() => modelsByCollection(), []);

  const [model, setModel] = useState<string | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [color, setColor] = useState("");
  const [style, setStyle] = useState<BuilderConfig["style"]>("solid");
  const [design, setDesign] = useState("");
  const [spring, setSpring] = useState<BuilderConfig["spring"]>("extension");
  const [track, setTrack] = useState("15R");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [location, setLocation] = useState("");

  // Derived option lists — colour must narrow with size, not the other way
  // round, and heights with no colour at the chosen width are not offered.
  const widths = model ? stockedWidths(model) : [];
  const heights = model
    ? stockedHeights(model).filter(
        (h) => stockedColors(model, width || undefined, h).length > 0,
      )
    : [];
  const colors = model
    ? stockedColors(model, width || undefined, height || undefined)
    : [];
  const solidOnly = height ? solidOnlyHeight(height) : false;
  const torsionOnly = height ? torsionOnlyHeight(height) : false;
  const effectiveStyle = solidOnly ? "solid" : style;
  const designs = model ? windowDesigns(model, effectiveStyle, width || null) : [];
  const effectiveSpring = torsionOnly ? "torsion" : spring;
  const effectiveDesign =
    effectiveStyle === "inserts" && designs.some((d) => d.id === design)
      ? design
      : "";

  const complete =
    model !== null &&
    width !== "" &&
    height !== "" &&
    color !== "" &&
    colorInStock(model, color, width, height, effectiveStyle);

  const description = complete
    ? doorDescription(
        {
          model: model!,
          widthCode: width,
          heightCode: height,
          color,
          style: effectiveStyle,
          windowDesign: effectiveDesign,
          spring: effectiveSpring,
          track,
        },
        trackLabel(track),
      )
    : "";

  function pickModel(m: string) {
    const w = stockedWidths(m)[0] ?? "";
    const hs = stockedHeights(m).filter(
      (h) => stockedColors(m, w, h).length > 0,
    );
    const h = hs.includes("7") ? "7" : (hs[0] ?? "");
    setModel(m);
    setWidth(w);
    setHeight(h);
    setColor(stockedColors(m, w, h)[0] ?? "");
    setStyle("solid");
    setDesign("");
    setSpring("extension");
    setTrack("15R");
    setStatus("idle");
  }

  /** Re-validate colour + height after a size change. */
  function changeSize(nextWidth: string, nextHeight: string) {
    if (!model) return;
    let h = nextHeight;
    const validHeights = stockedHeights(model).filter(
      (hh) => stockedColors(model, nextWidth, hh).length > 0,
    );
    if (!validHeights.includes(h)) h = validHeights[0] ?? "";
    setWidth(nextWidth);
    setHeight(h);
    const validColors = stockedColors(model, nextWidth, h);
    if (!validColors.includes(color)) setColor(validColors[0] ?? "");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!complete) return;
    const data = new FormData(event.currentTarget);

    const fields: { label: string; value: string }[] = [
      { label: "Product type", value: "Residential Door (stock)" },
      { label: "Configured door", value: description },
      { label: "Model", value: model! },
      { label: "Size", value: `${sizeLabel(width)} x ${sizeLabel(height)}` },
      { label: "Color", value: color },
      {
        label: "Windows",
        value:
          STYLE_OPTIONS.find((s) => s.value === effectiveStyle)?.label ??
          effectiveStyle,
      },
    ];
    if (effectiveDesign) {
      const d = designs.find((x) => x.id === effectiveDesign);
      fields.push({ label: "Insert design", value: d?.name ?? effectiveDesign });
    }
    fields.push({
      label: "Spring",
      value: effectiveSpring === "torsion" ? "Torsion" : "Extension",
    });
    fields.push({ label: "Track", value: trackLabel(track) });
    const zip = (data.get("zip") as string)?.trim();
    if (zip) fields.push({ label: "ZIP code", value: zip });
    fields.push({
      label: "Availability",
      value: "In stock — usually available for pickup",
    });

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "quote",
          location,
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          fields,
          details: (data.get("details") as string) || "",
        }),
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
    <div className="mx-auto max-w-7xl">
      <p className="max-w-3xl text-base leading-7 text-gray-700">
        Every option below is a door we actually stock — model, color, and
        exact size together. Configure it, then send it to us as a quote
        request. Looking for something outside this range?{" "}
        <Link
          href="/request-quote?tab=other"
          className="font-semibold text-red-main hover:underline"
        >
          Use the general quote form
        </Link>
        .
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {/* Left: configuration panels */}
        <div className="grid gap-6">
          <Panel step="1" title="Pick your model">
            {groups.map((group) => (
              <div key={group.collection}>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                  {group.collection}
                </p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {group.models.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => pickModel(m)}
                      className={`rounded-md border px-4 py-3 text-left transition-colors ${
                        model === m
                          ? "border-red-main bg-red-main text-white"
                          : "border-gray-300 bg-white text-gray-bg hover:border-red-main hover:text-red-main"
                      }`}
                    >
                      <span className="block text-base font-bold">{m}</span>
                      <span
                        className={`block text-sm ${model === m ? "text-white/75" : "text-gray-600"}`}
                      >
                        {MODEL_LABELS[m] ?? ""}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </Panel>

          {model ? (
            <>
              <Panel step="2" title="Layout — size & color">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Width">
                    <select
                      value={width}
                      onChange={(e) => changeSize(e.target.value, height)}
                      className={inputClass}
                    >
                      {widths.map((w) => (
                        <option key={w} value={w}>
                          {sizeLabel(w)}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Height">
                    <select
                      value={height}
                      onChange={(e) => changeSize(width, e.target.value)}
                      className={inputClass}
                    >
                      {heights.map((h) => (
                        <option key={h} value={h}>
                          {sizeLabel(h)}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Color">
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className={inputClass}
                  >
                    {colors.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                {colors.length === 1 ? (
                  <p className="text-sm text-gray-600">
                    This size is stocked in {colors[0]} only — other colors at
                    other sizes.
                  </p>
                ) : null}
              </Panel>

              <Panel step="3" title="Windows">
                <Field label="Glass">
                  <select
                    value={effectiveStyle}
                    onChange={(e) => {
                      const v = e.target.value as BuilderConfig["style"];
                      setStyle(v);
                      if (v !== "inserts") setDesign("");
                    }}
                    disabled={solidOnly}
                    className={`${inputClass} disabled:cursor-not-allowed disabled:bg-gray-100`}
                  >
                    {STYLE_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </Field>
                {solidOnly ? (
                  <p className="text-sm font-semibold text-red-main">
                    6&apos;0&quot; doors are stocked solid only — windows start
                    at 6&apos;3&quot;.
                  </p>
                ) : null}
                {effectiveStyle === "inserts" ? (
                  <Field label="Insert design">
                    <select
                      value={effectiveDesign}
                      onChange={(e) => setDesign(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">No insert design</option>
                      {designs.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                ) : null}
              </Panel>

              <Panel step="4" title="Track & spring">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Spring">
                    <select
                      value={effectiveSpring}
                      onChange={(e) =>
                        setSpring(e.target.value as BuilderConfig["spring"])
                      }
                      disabled={torsionOnly}
                      className={`${inputClass} disabled:cursor-not-allowed disabled:bg-gray-100`}
                    >
                      <option value="extension">Extension</option>
                      <option value="torsion">Torsion</option>
                    </select>
                  </Field>
                  <Field label="Track">
                    <select
                      value={track}
                      onChange={(e) => setTrack(e.target.value)}
                      className={inputClass}
                    >
                      {TRACKS.map((t) => (
                        <option key={t} value={t}>
                          {trackLabel(t)}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                {torsionOnly ? (
                  <p className="text-sm text-gray-600">
                    Doors over 8&apos;0&quot; tall come with torsion springs
                    included.
                  </p>
                ) : null}
              </Panel>
            </>
          ) : null}
        </div>

        {/* Right: summary + quote request */}
        <aside className="rounded-lg border border-gray-200 bg-white shadow-sm lg:sticky lg:top-28">
          <header className="rounded-t-lg bg-red-main px-5 py-4 text-white">
            <h2 className="text-lg font-bold">Your door</h2>
            <p className="text-sm text-white/70">
              No pricing here — send it over and we&apos;ll quote it.
            </p>
          </header>
          <div className="grid gap-4 p-5">
            {complete ? (
              <>
                <p className="rounded-md bg-cream-secondary px-4 py-3 text-sm leading-6 text-gray-bg">
                  {description}
                </p>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-green-700">
                  <CheckIcon className="h-5 w-5" />
                  In stock — usually available for pickup
                </p>
              </>
            ) : (
              <p className="text-sm leading-6 text-gray-600">
                Pick a model to start building. Your configuration will appear
                here.
              </p>
            )}

            {status === "sent" ? (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircleIcon className="h-12 w-12 text-red-main" />
                <h3 className="mt-3 text-xl font-bold text-gray-bg">
                  Request received.
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  Your configured door is on its way to the team — we&apos;ll
                  follow up with pricing and pickup details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-3">
                <Field label="Which location? *">
                  <select
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select a location…
                    </option>
                    <option value="south">Doors Direct South</option>
                    <option value="union">Doors Direct Union</option>
                  </select>
                </Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required name="firstName" placeholder="First name *" className={inputClass} />
                  <input required name="lastName" placeholder="Last name *" className={inputClass} />
                </div>
                <input required type="email" name="email" placeholder="Email *" className={inputClass} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required type="tel" name="phone" placeholder="Phone *" className={inputClass} />
                  <input name="zip" placeholder="ZIP code" className={inputClass} />
                </div>
                <textarea
                  name="details"
                  rows={2}
                  placeholder="Anything else we should know?"
                  className={`${inputClass} resize-none`}
                />
                {status === "error" ? (
                  <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-main">
                    {errorMsg || "Something went wrong. Please try again or call us."}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={!complete || status === "sending"}
                  className="inline-flex items-center justify-center rounded-md bg-red-main px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-red-secondary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "sending"
                    ? "Sending…"
                    : complete
                      ? "Request a Quote"
                      : "Finish building to request"}
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
