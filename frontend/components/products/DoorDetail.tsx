import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  PhotoIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Door, getDoorDescription } from "@/lib/doors";

interface DoorDetailProps {
  backHref: string;
  backLabel: string;
  category: "Residential" | "Commercial";
  door: Door;
  brandName?: string;
}

export default function DoorDetail({
  backHref,
  backLabel,
  category,
  door,
  brandName = "Clopay",
}: DoorDetailProps) {
  const paragraphs = getDoorDescription(door.description);
  const quoteHref = `/request-quote?model=${encodeURIComponent(
    door.title,
  )}&brand=${encodeURIComponent(brandName)}&category=${category}`;

  return (
    <main className="bg-cream-bg pt-24">
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:px-8 lg:grid-cols-2 lg:px-10 lg:py-10">
        <div>
          <Link
            href={backHref}
            className="mb-5 inline-flex items-center gap-2 text-base font-bold text-red-main transition-colors hover:text-red-secondary md:text-lg"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            {backLabel}
          </Link>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <Image
              src={door.cover}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              alt={door.title}
              className="object-contain p-4"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
            {brandName} {category}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-bg md:text-5xl">
            {door.title}
          </h1>
          <p className="mt-5 text-base leading-7 text-gray-700 md:text-lg md:leading-8">
            {door.shortDesc}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link
              href={quoteHref}
              className="inline-flex items-center justify-center rounded-md bg-red-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-secondary"
            >
              Request Estimate
            </Link>
            <Link
              href="/ezdoor"
              className="inline-flex items-center justify-center rounded-md border border-red-main px-5 py-3 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
            >
              Customize Door
            </Link>
          </div>

          <dl className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                Category
              </dt>
              <dd className="mt-2 font-semibold text-gray-bg">{category}</dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                Brand
              </dt>
              <dd className="mt-2 font-semibold text-gray-bg">{brandName}</dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                Resources
              </dt>
              <dd className="mt-2 font-semibold text-gray-bg">
                Specs + Gallery
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-white px-4 py-10 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
              Product Details
            </p>
            <div className="mt-5 space-y-5 text-base leading-8 text-gray-700">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-lg border border-gray-200 bg-cream-secondary p-5">
            <h2 className="text-xl font-bold text-gray-bg">
              Specs & Resources
            </h2>
            <div className="mt-5 grid gap-3">
              {door.brochure ? (
                <Link
                  href={door.brochure}
                  target="_blank"
                  className="inline-flex items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-bg transition-colors hover:text-red-main"
                >
                  <ArrowDownTrayIcon className="h-5 w-5 text-red-main" />
                  Product Brochure
                </Link>
              ) : null}
              <Link
                href={door.gallery}
                target="_blank"
                className="inline-flex items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-bg transition-colors hover:text-red-main"
              >
                <PhotoIcon className="h-5 w-5 text-red-main" />
                Image Gallery
              </Link>
              <Link
                href={quoteHref}
                className="inline-flex items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-bg transition-colors hover:text-red-main"
              >
                <WrenchScrewdriverIcon className="h-5 w-5 text-red-main" />
                Confirm Fit & Pricing
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
