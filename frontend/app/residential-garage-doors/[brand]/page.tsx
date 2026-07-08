import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import DoorBox from "@/components/products/DoorBox";
import {
  getResidentialBrand,
  getResidentialDoorsByBrand,
  residentialBrands,
} from "@/lib/residential";

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export function generateStaticParams() {
  return residentialBrands.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getResidentialBrand(slug);
  if (!brand) {
    return { title: "Residential Doors" };
  }
  return { title: brand.heading, description: brand.blurb };
}

export default async function BrandResidentialPage({ params }: BrandPageProps) {
  const { brand: slug } = await params;
  const brand = getResidentialBrand(slug);

  if (!brand) {
    notFound();
  }

  const doors = getResidentialDoorsByBrand(slug);

  return (
    <main className="bg-cream-bg px-4 pt-28 pb-16 md:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <Link
          href="/residential-garage-doors"
          className="inline-flex items-center gap-2 text-base font-bold text-red-main transition-colors hover:text-red-secondary md:text-lg"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          All residential doors
        </Link>
        <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-red-main">
          Residential Catalog
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
            {doors.length} collections
          </span>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {doors.map((door) => (
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
