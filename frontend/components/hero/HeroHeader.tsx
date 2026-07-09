import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
  PhoneIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import InStockSlider from "@/components/hero/InStockSlider";

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

/** Hand-drawn style red underline, similar to the reference headline. */
function Underline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 12"
        preserveAspectRatio="none"
        className="absolute -bottom-1.5 left-0 h-3 w-full md:-bottom-2.5"
      >
        <path
          d="M4 9 C 80 3, 220 3, 296 7"
          fill="none"
          stroke="#750000"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function HeroHeader() {
  return (
    <section className="bg-white">
      <div className="relative overflow-hidden bg-cream-secondary px-4 pt-24 pb-12 md:px-8 md:pt-28 lg:px-10 lg:pb-16">
        {/* Dotted accent pattern, top right (like the reference) */}
        <div
          aria-hidden="true"
          className="dot-grid absolute -top-6 right-0 hidden h-64 w-80 md:block"
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gray-200" />

        <div className="relative mx-auto max-w-7xl">
          {/* Hero text */}
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-main md:text-sm">
              Wholesale Door Supply — Pennsauken &amp; Union, NJ
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-[1.12] tracking-tight text-gray-bg md:text-6xl xl:text-7xl">
              Garage doors, openers &amp; parts.{" "}
              <Underline>In stock</Underline> and ready to go.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
              Residential and commercial doors from Clopay, C.H.I., Haas, and
              Amarr, plus LiftMaster openers, springs, and everyday parts —
              backed by a team that keeps jobs moving.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-red-main px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-red-secondary focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2"
              >
                Request a Quote
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="/residential-garage-doors"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-7 py-3.5 text-base font-semibold text-gray-bg transition-colors hover:border-red-main hover:text-red-main focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2"
              >
                Residential
              </Link>
              <Link
                href="/commercial-garage-doors"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-7 py-3.5 text-base font-semibold text-gray-bg transition-colors hover:border-red-main hover:text-red-main focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2"
              >
                Commercial
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="inline-flex items-center gap-2 text-base font-semibold text-gray-700">
                <BuildingStorefrontIcon className="h-5 w-5 text-red-main" />
                In stock &amp; local
              </span>
              <span className="inline-flex items-center gap-2 text-base font-semibold text-gray-700">
                <TruckIcon className="h-5 w-5 text-red-main" />
                Fast supply
              </span>
              <span className="inline-flex items-center gap-2 text-base font-semibold text-gray-700">
                <ClipboardDocumentCheckIcon className="h-5 w-5 text-red-main" />
                Clear specs
              </span>
              <a
                href="tel:8566626666"
                className="inline-flex items-center gap-2 text-base font-semibold text-gray-700 transition-colors hover:text-red-main"
              >
                <PhoneIcon className="h-5 w-5 text-red-main" />
                (856) 662-6666
              </a>
            </div>
          </div>

          {/* About Doors Direct — part of the header, right below the CTAs */}
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="rounded-2xl bg-red-main p-6 text-white md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/70">
                About Doors Direct
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                Stocked for the installers, dealers, and businesses that need
                answers fast.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/80 md:text-lg md:leading-8">
                More dealers are choosing Doors Direct for garage doors,
                commercial overhead systems, openers, springs, and everyday
                parts. With deep product knowledge and a stocked local
                warehouse, our goal is simple: help you find the right product
                and keep your jobs moving.
              </p>
            </div>

            <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-cream-secondary shadow-sm lg:min-h-full">
              <Image
                src="/company/Storefront.png"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                alt="Doors Direct storefront"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* In-stock doors — maroon auto-sliding strip (commercial ⇄ residential) */}
        <InStockSlider />
      </div>

      <div className="px-4 py-10 md:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-main">
              In Stock &amp; Local
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-bg md:text-3xl">
              Stocked deep. Picked up fast.
            </h2>
          </div>

          {/* Offset photo cards, CHI-style stagger on large screens */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {companyPhotos.map((photo, index) => (
              <div
                key={photo.image}
                className={`group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm ${
                  index % 2 === 1 ? "lg:translate-y-6" : ""
                }`}
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
