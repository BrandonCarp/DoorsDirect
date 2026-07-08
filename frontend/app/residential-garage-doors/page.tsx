import Link from "next/link";
import DoorBox from "@/components/products/DoorBox";
import { allResidentialDoors, residentialBrands } from "@/lib/residential";

export const metadata = {
  title: "Residential Garage Doors",
  description:
    "Browse residential garage doors from Clopay, C.H.I., Haas, and Amarr — all in one place.",
};

export default function Residential() {
  return (
    <main className="bg-cream-bg px-4 pt-28 pb-16 md:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
          Residential Catalog
        </p>
        <div className="mt-3 flex flex-col gap-4 border-b border-gray-300 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-bg md:text-5xl">
              All Residential Doors
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700">
              Every residential collection we carry — Clopay, C.H.I., Haas, and
              Amarr — in one place. Filter by brand, compare styles, and open
              each product page for details, galleries, and quote options.
            </p>
          </div>
          <span className="text-sm font-semibold text-gray-600">
            {allResidentialDoors.length} doors
          </span>
        </div>

        {/* Brand quick links */}
        <div className="mt-5 flex flex-wrap gap-3">
          {residentialBrands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/residential-garage-doors/${brand.slug}`}
              className="rounded-md border border-red-main bg-white px-4 py-2 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {allResidentialDoors.map((door) => (
          <DoorBox
            key={door.href}
            basePath="/residential-garage-doors"
            doors={door}
            href={door.href}
            badge={door.brandBadge}
          />
        ))}
      </section>
    </main>
  );
}
