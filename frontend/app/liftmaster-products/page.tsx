import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";
import { operators, OperatorSeries } from "@/lib/liftmaster";

export const metadata = {
  title: "LiftMaster Openers & Operators",
  description:
    "LiftMaster residential garage door openers and operators — Basic, Plus, and Premium series — sold and supported by Doors Direct.",
};

const seriesBlurb: Record<OperatorSeries, string> = {
  Basic: "Reliable, connected essentials with Wi-Fi and a built-in camera.",
  Plus: "Quiet belt drive, battery backup, brighter LED, and a keypad included.",
  Premium: "Space-saving wall-mount power for tall, heavy, and premium doors.",
};

const seriesBadge: Record<OperatorSeries, string> = {
  Basic: "bg-gray-700",
  Plus: "bg-red-secondary",
  Premium: "bg-red-main",
};

export default function LiftMasterOperators() {
  return (
    <main className="bg-cream-bg px-4 pt-28 pb-16 md:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
          LiftMaster
        </p>
        <div className="mt-3 flex flex-col gap-4 border-b border-gray-300 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-bg md:text-5xl">
              Openers &amp; Operators
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700">
              LiftMaster&apos;s current residential lineup — chain drive, belt
              drive, and wall-mount — across the Basic, Plus, and Premium
              series. Every model is Wi-Fi and myQ connected. Looking for
              remotes, keypads, or wall controls?{" "}
              <Link
                href="/liftmaster-products/accessories"
                className="font-semibold text-red-main hover:underline"
              >
                See accessories →
              </Link>
            </p>
          </div>
          <span className="text-sm font-semibold text-gray-600">
            {operators.length} models
          </span>
        </div>

        {/* Series legend */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {(Object.keys(seriesBlurb) as OperatorSeries[]).map((s) => (
            <div
              key={s}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <span
                className={`inline-block rounded px-2 py-1 text-xs font-bold uppercase tracking-wide text-white ${seriesBadge[s]}`}
              >
                {s} Series
              </span>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {seriesBlurb[s]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {operators.map((op) => (
          <article
            key={op.model}
            className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] w-full border-b border-gray-100 bg-cream-secondary">
              <Image
                src={op.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                alt={`LiftMaster ${op.model}`}
                className="object-contain p-4"
              />
              <span
                className={`absolute left-4 top-4 rounded px-2 py-1 text-xs font-bold uppercase tracking-wide text-white ${seriesBadge[op.series]}`}
              >
                {op.series}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-xl font-bold text-gray-bg">
                LiftMaster {op.model}
              </h2>
              <p className="mt-1 text-sm font-semibold text-red-main">
                {op.drive} · {op.motor}
              </p>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                {op.shortDesc}
              </p>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                Included
              </p>
              <ul className="mt-2 grid gap-1.5">
                {op.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-main" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex gap-3">
                <Link
                  href={`/request-quote?model=${encodeURIComponent(
                    `LiftMaster ${op.model}`,
                  )}`}
                  className="inline-flex w-fit items-center justify-center rounded-md bg-red-main px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-secondary"
                >
                  Request a Quote
                </Link>
                <a
                  href={op.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center justify-center rounded-md border border-red-main px-4 py-2.5 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
                >
                  Specs
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <p className="mx-auto mt-8 max-w-7xl text-xs text-gray-500">
        * Horsepower comparable (HPs). Product details and images courtesy of
        LiftMaster; contact us to confirm current availability and pricing.
      </p>
    </main>
  );
}
