import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DoorBox from "@/components/products/DoorBox";
import {
  commercialBrands,
  getCommercialBrand,
  getCommercialDoorsByBrand,
} from "@/lib/commercial";

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export function generateStaticParams() {
  return commercialBrands.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getCommercialBrand(slug);
  if (!brand) {
    return { title: "Commercial Doors" };
  }
  return { title: brand.heading, description: brand.blurb };
}

export default async function BrandCommercialPage({ params }: BrandPageProps) {
  const { brand: slug } = await params;
  const brand = getCommercialBrand(slug);

  if (!brand) {
    notFound();
  }

  const doors = getCommercialDoorsByBrand(slug);

  return (
    <main className="bg-cream-bg px-4 pt-28 pb-16 md:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <Link
          href="/commercial-garage-doors"
          className="text-sm font-semibold text-red-main hover:text-red-secondary"
        >
          ← All commercial doors
        </Link>
        <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-red-main">
          Commercial Catalog
        </p>
        <div className="mt-3 flex flex-col gap-4 border-b border-gray-300 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-bg md:text-5xl">
              {brand.heading}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700">
              {brand.blurb}
            </p>
          </div>
          <span className="text-sm font-semibold text-gray-600">
            {doors.length} lines
          </span>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {doors.map((door) => (
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
