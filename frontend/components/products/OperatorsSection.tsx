import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";
import { operators, OperatorSeries } from "@/lib/liftmaster";

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

export default function OperatorsSection() {
  return (
    <>
      {/* Series legend */}
      <div className="mx-auto mt-6 grid max-w-[88rem] gap-4 sm:grid-cols-3">
        {(Object.keys(seriesBlurb) as OperatorSeries[]).map((s) => (
          <div key={s} className="rounded-lg border border-gray-200 bg-white p-5">
            <span
              className={`inline-block rounded px-2.5 py-1 text-sm font-bold uppercase tracking-wide text-white ${seriesBadge[s]}`}
            >
              {s} Series
            </span>
            <p className="mt-2 text-base leading-7 text-gray-600">
              {seriesBlurb[s]}
            </p>
          </div>
        ))}
      </div>

      <section className="mx-auto mt-8 grid max-w-[88rem] gap-7 md:grid-cols-2 xl:grid-cols-3">
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
                className="object-contain p-5"
              />
              <span
                className={`absolute left-4 top-4 rounded px-2.5 py-1 text-sm font-bold uppercase tracking-wide text-white ${seriesBadge[op.series]}`}
              >
                {op.series}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-2xl font-bold text-gray-bg">
                LiftMaster {op.model}
              </h3>
              <p className="mt-1 text-base font-semibold text-red-main">
                {op.drive} · {op.motor}
              </p>
              <p className="mt-3 text-base leading-7 text-gray-700">
                {op.shortDesc}
              </p>

              <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-gray-500">
                Included
              </p>
              <ul className="mt-2 grid gap-2">
                {op.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-base text-gray-700"
                  >
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-red-main" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-3">
                <Link
                  href={`/request-quote?model=${encodeURIComponent(
                    `LiftMaster ${op.model}`,
                  )}`}
                  className="inline-flex w-fit items-center justify-center rounded-md bg-red-main px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-red-secondary"
                >
                  Request a Quote
                </Link>
                <a
                  href={op.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center justify-center rounded-md border border-red-main px-5 py-3 text-base font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
                >
                  Specs
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
