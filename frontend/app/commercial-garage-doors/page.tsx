import Link from "next/link";
import DoorBox from "@/components/products/DoorBox";
import { allCommercialDoors, commercialBrands } from "@/lib/commercial";

export const metadata = {
  title: "Commercial Garage Doors",
  description:
    "Browse commercial garage doors from Clopay, C.H.I., Haas, and Amarr — all in one place.",
};

export default function Commercial() {
  return (
    <main className="bg-cream-bg px-4 pt-28 pb-16 md:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
          Commercial Catalog
        </p>
        <div className="mt-3 flex flex-col gap-4 border-b border-gray-300 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-bg md:text-5xl">
              All Commercial Doors
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700">
              Every commercial door line we carry — Clopay, C.H.I., Haas, and
              Amarr — in one place. Filter by brand, compare sectional,
              full-view, insulated, and rolling options, and open each product
              page for details and quotes.
            </p>
          </div>
          <span className="text-sm font-semibold text-gray-600">
            {allCommercialDoors.length} doors
          </span>
        </div>

        {/* Brand quick links */}
        <div className="mt-5 flex flex-wrap gap-3">
          {commercialBrands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/commercial-garage-doors/${brand.slug}`}
              className="rounded-md border border-red-main bg-white px-4 py-2 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {allCommercialDoors.map((door) => (
          <DoorBox
            key={door.href}
            basePath="/commercial-garage-doors"
            doors={door}
            href={door.href}
            badge={door.brandBadge}
          />
        ))}
      </section>
    </main>
  );
}
