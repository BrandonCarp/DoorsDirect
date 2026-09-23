"use client";

// LiftMaster section of the Request a Quote hub: pick an opener and/or any
// accessories (remotes, keypads, wall controls) and send it as a quote
// request. No pricing shown — same routing as every other request.

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { accessories, Accessory, operators } from "@/lib/liftmaster";
import { Field, Panel, inputClass } from "@/components/builder/ui";

const ACCESSORY_GROUPS: { title: string; filter: (a: Accessory) => boolean }[] = [
  {
    title: "Remotes & Keypads",
    filter: (a) => a.category === "Remotes" || a.category === "Keypads",
  },
  { title: "Control Panels", filter: (a) => a.category === "Control Panels" },
];

export default function LiftMasterQuote() {
  const [opener, setOpener] = useState<string>("");
  const [picked, setPicked] = useState<string[]>([]);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [location, setLocation] = useState("");

  const chosenOpener = operators.find((o) => o.model === opener) ?? null;
  const chosenAccessories = accessories.filter((a) => picked.includes(a.model));
  const hasSelection = chosenOpener !== null || chosenAccessories.length > 0;

  function toggleAccessory(model: string) {
    setPicked((p) =>
      p.includes(model) ? p.filter((m) => m !== model) : [...p, model],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasSelection) return;
    const data = new FormData(event.currentTarget);

    const fields: { label: string; value: string }[] = [
      { label: "Product type", value: "LiftMaster equipment" },
    ];
    if (chosenOpener) {
      fields.push({
        label: "Opener",
        value: `${chosenOpener.model} — ${chosenOpener.series} Series, ${chosenOpener.drive}`,
      });
    }
    if (chosenAccessories.length > 0) {
      fields.push({
        label: "Accessories",
        value: chosenAccessories
          .map((a) => `${a.model} ${a.name}`)
          .join("; "),
      });
    }

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
        Pick an opener, any accessories, or both — we&apos;ll follow up with
        pricing and availability. Want the full details first?{" "}
        <Link
          href="/liftmaster-products"
          className="font-semibold text-red-main hover:underline"
        >
          Browse all LiftMaster products
        </Link>
        .
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {/* Left: opener + accessories */}
        <div className="grid gap-6">
          <Panel step="1" title="Pick an opener (optional)">
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setOpener("")}
                className={`rounded-md border px-4 py-3 text-left transition-colors ${
                  opener === ""
                    ? "border-red-main bg-red-main text-white"
                    : "border-gray-300 bg-white text-gray-bg hover:border-red-main hover:text-red-main"
                }`}
              >
                <span className="block text-base font-bold">No opener</span>
                <span
                  className={`block text-sm ${opener === "" ? "text-white/75" : "text-gray-600"}`}
                >
                  Accessories only
                </span>
              </button>
              {operators.map((op) => (
                <button
                  key={op.model}
                  type="button"
                  onClick={() => setOpener(op.model)}
                  className={`rounded-md border px-4 py-3 text-left transition-colors ${
                    opener === op.model
                      ? "border-red-main bg-red-main text-white"
                      : "border-gray-300 bg-white text-gray-bg hover:border-red-main hover:text-red-main"
                  }`}
                >
                  <span className="block text-base font-bold">{op.model}</span>
                  <span
                    className={`block text-sm ${
                      opener === op.model ? "text-white/75" : "text-gray-600"
                    }`}
                  >
                    {op.series} Series · {op.drive}
                  </span>
                </button>
              ))}
            </div>
          </Panel>

          <Panel step="2" title="Add accessories (optional)">
            {ACCESSORY_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                  {group.title}
                </p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {accessories.filter(group.filter).map((a) => {
                    const on = picked.includes(a.model);
                    return (
                      <label
                        key={a.model}
                        className={`flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3 transition-colors ${
                          on
                            ? "border-red-main bg-cream-secondary"
                            : "border-gray-300 bg-white hover:border-red-main"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggleAccessory(a.model)}
                          className="mt-1 h-4 w-4 accent-red-main"
                        />
                        <span>
                          <span className="block text-sm font-bold text-gray-bg">
                            {a.name}
                          </span>
                          <span className="block text-sm text-red-main">
                            {a.model}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </Panel>
        </div>

        {/* Right: summary + request */}
        <aside className="rounded-lg border border-gray-200 bg-white shadow-sm lg:sticky lg:top-28">
          <header className="rounded-t-lg bg-red-main px-5 py-4 text-white">
            <h2 className="text-lg font-bold">Your LiftMaster list</h2>
            <p className="text-sm text-white/70">
              No pricing here — send it over and we&apos;ll quote it.
            </p>
          </header>
          <div className="grid gap-4 p-5">
            {hasSelection ? (
              <ul className="grid gap-1.5 rounded-md bg-cream-secondary px-4 py-3 text-sm leading-6 text-gray-bg">
                {chosenOpener ? (
                  <li>
                    <span className="font-bold">{chosenOpener.model}</span> —{" "}
                    {chosenOpener.series} Series, {chosenOpener.drive}
                  </li>
                ) : null}
                {chosenAccessories.map((a) => (
                  <li key={a.model}>
                    <span className="font-bold">{a.model}</span> — {a.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-gray-600">
                Pick an opener or check some accessories — your list will
                appear here.
              </p>
            )}

            {status === "sent" ? (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircleIcon className="h-12 w-12 text-red-main" />
                <h3 className="mt-3 text-xl font-bold text-gray-bg">
                  Request received.
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  Your LiftMaster list is on its way to the team — we&apos;ll
                  follow up with pricing and availability.
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
                <input required type="tel" name="phone" placeholder="Phone *" className={inputClass} />
                <textarea
                  name="details"
                  rows={2}
                  placeholder="Door size, existing opener, or anything else that helps..."
                  className={`${inputClass} resize-none`}
                />
                {status === "error" ? (
                  <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-main">
                    {errorMsg || "Something went wrong. Please try again or call us."}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={!hasSelection || status === "sending"}
                  className="inline-flex items-center justify-center rounded-md bg-red-main px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-red-secondary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "sending"
                    ? "Sending…"
                    : hasSelection
                      ? "Request a Quote"
                      : "Pick something to request"}
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
