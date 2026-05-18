import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const companyPhotos = [
  {
    alt: "Commercial door sections in stock",
    image: "/company/2.jpg",
    label: "Commercial Inventory",
  },
  {
    alt: "Residential door sections in stock",
    image: "/company/4.jpg",
    label: "Residential Inventory",
  },
  {
    alt: "Stocked springs",
    image: "/company/5.jpg",
    label: "Stocked Springs",
  },
  {
    alt: "Door hardware and parts in stock",
    image: "/company/6.jpg",
    label: "Parts Support",
  },
];

export default function HeroHeader() {
  return (
    <section className="bg-white">
      <div className="relative overflow-hidden bg-cream-secondary px-4 pt-24 pb-12 md:px-8 md:pt-28 lg:px-10 lg:pb-16">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gray-200" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xl font-bold uppercase tracking-[0.18em] text-red-main md:text-2xl">
              Wholesale Door Supply
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-gray-bg md:text-6xl">
              Garage doors, parts, and quotes without the runaround.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-700 md:text-lg">
              Browse residential and commercial collections, compare product
              resources, and get help from a team that keeps jobs moving.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-red-main px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-red-secondary focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2"
              >
                Receive an Estimate
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="/residential-garage-doors"
                className="inline-flex items-center justify-center rounded-md border border-red-main bg-white px-6 py-3 text-base font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2"
              >
                Shop Doors
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <ClipboardDocumentCheckIcon className="h-7 w-7 shrink-0 text-red-main" />
              <div>
                <p className="font-bold text-gray-bg">Clear Specs</p>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Brochures and galleries ready to review.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <TruckIcon className="h-7 w-7 shrink-0 text-red-main" />
              <div>
                <p className="font-bold text-gray-bg">Fast Supply</p>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Built for installers and active jobs.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <BuildingStorefrontIcon className="h-7 w-7 shrink-0 text-red-main" />
              <div>
                <p className="font-bold text-gray-bg">Trade Support</p>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Residential and commercial help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-10 md:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="rounded-lg bg-red-main p-6 text-white md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/70">
                About Doors Direct
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                Stocked for the installers, dealers, and businesses that need
                answers fast.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/80">
                More dealers are choosing Doors Direct for garage doors,
                commercial overhead systems, openers, springs, and everyday
                parts. With deep product knowledge and a stocked local
                warehouse, our goal is simple: help you find the right product
                and keep your jobs moving.
              </p>
            </div>

            <div className="relative min-h-[260px] overflow-hidden rounded-lg bg-cream-secondary lg:min-h-full">
              <Image
                src="/company/Storefront.png"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                alt="Doors Direct storefront"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-main">
                In Stock & Local
              </p>
              <h2 className="mt-1 text-2xl font-bold text-gray-bg md:text-3xl">
                Built around the work behind the door.
              </h2>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {companyPhotos.map((photo) => (
              <div
                key={photo.image}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-white lg:aspect-[5/4]">
                  <Image
                    src={photo.image}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    alt={photo.alt}
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="px-5 py-4 text-base font-bold text-gray-bg">
                  {photo.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
