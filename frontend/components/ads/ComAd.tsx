import Image from "next/image";
import Link from "next/link";
import Energy from "@/public/DoorImages/CommDoors/energy.png";

export default function ComAd() {
  return (
    <section className="w-full bg-white px-4 py-10 md:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-gray-200 bg-cream-secondary p-5 md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-main">
            Commercial Doors
          </p>
          <h2 className="mt-2 text-3xl font-bold leading-tight text-gray-bg md:text-4xl">
            Built for busy facilities, shops, and service bays.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-700 md:text-lg">
            Durable sectional, insulated, full-view, and industrial options for
            businesses that need dependable performance and clear product
            support.
          </p>
          <Link
            href="/commercial-garage-doors"
            className="mt-6 inline-flex justify-center rounded-md bg-red-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-secondary"
          >
            Browse Commercial Doors
          </Link>
        </div>

        <div className="relative aspect-[4/3] rounded-lg bg-cream-secondary">
          <Image
            src={Energy}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            alt="Clopay Energy Series commercial door"
            className="object-contain p-5"
          />
        </div>
      </div>
    </section>
  );
}
