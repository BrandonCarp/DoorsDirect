import Image from "next/image";
import Link from "next/link";
import { accessories, Accessory, operators } from "@/lib/liftmaster";
import OperatorsSection from "@/components/products/OperatorsSection";

export const metadata = {
  title: "LiftMaster Products",
  description:
    "LiftMaster garage door openers, remotes, keypads, and wall controls — Basic, Plus, and Premium series — sold and supported by Doors Direct.",
};

export default function LiftMasterProducts() {
  return (
    <main className="bg-cream-bg px-4 pt-28 pb-16 md:px-8 lg:px-12">
      <section className="mx-auto max-w-[88rem]">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
          LiftMaster
        </p>
        <div className="mt-3 flex flex-col gap-4 border-b border-gray-300 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-bg md:text-5xl">
              LiftMaster Products
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700 md:text-lg md:leading-8">
              LiftMaster&apos;s current residential lineup — chain drive, belt
              drive, and wall-mount openers across the Basic, Plus, and Premium
              series, plus remotes, keypads, and wall controls below. Every
              opener is Wi-Fi and myQ connected.
            </p>
          </div>
          <span className="text-base font-semibold text-gray-600">
            {operators.length} openers · {accessories.length} accessories
          </span>
        </div>

        <div id="openers" className="mt-10">
          <h2 className="text-2xl font-bold text-gray-bg md:text-3xl">
            Openers &amp; Operators
          </h2>
        </div>
      </section>

      <OperatorsSection />

      {/* Accessories — remotes & keypads on one row, control panels on the next */}
      <section id="accessories" className="mx-auto mt-16 max-w-[88rem]">
        <div className="flex flex-col gap-2 border-t border-gray-300 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-2xl font-bold text-gray-bg md:text-3xl">
            Remotes &amp; Accessories
          </h2>
          <Link
            href="/liftmaster-products/accessories"
            className="text-base font-semibold text-red-main hover:underline"
          >
            Open the full accessories page →
          </Link>
        </div>

        {(
          [
            {
              title: "Remotes & Keypads",
              filter: (a: Accessory) =>
                a.category === "Remotes" || a.category === "Keypads",
            },
            {
              title: "Control Panels",
              filter: (a: Accessory) => a.category === "Control Panels",
            },
          ] as const
        ).map((group) => (
          <div key={group.title} className="mt-8">
            <h3 className="text-xl font-bold text-gray-bg md:text-2xl">
              {group.title}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {accessories.filter(group.filter).map((item) => (
                <article
                  key={item.model}
                  className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full border-b border-gray-100 bg-cream-secondary">
                    <Image
                      src={item.image}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      alt={`LiftMaster ${item.model} ${item.name}`}
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h4 className="text-base font-bold leading-snug text-gray-bg md:text-lg">
                      {item.name}
                    </h4>
                    <p className="text-sm font-semibold text-red-main md:text-base">
                      {item.model}
                    </p>
                    <p className="mt-2 hidden text-base leading-7 text-gray-700 lg:block">
                      {item.desc}
                    </p>
                    <Link
                      href={`/request-quote?model=${encodeURIComponent(
                        `LiftMaster ${item.model} ${item.name}`,
                      )}`}
                      className="mt-3 inline-flex w-fit items-center justify-center rounded-md border border-red-main px-4 py-2 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white md:text-base"
                    >
                      Ask about it
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <p className="mx-auto mt-10 max-w-[88rem] text-sm text-gray-500">
        * Horsepower comparable (HPs). Product details and images courtesy of
        LiftMaster; contact us to confirm current availability and pricing.
      </p>
    </main>
  );
}
