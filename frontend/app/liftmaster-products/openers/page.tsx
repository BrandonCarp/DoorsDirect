import Link from "next/link";
import { operators } from "@/lib/liftmaster";
import OperatorsSection from "@/components/products/OperatorsSection";

export const metadata = {
  title: "LiftMaster Openers",
  description:
    "LiftMaster residential garage door openers — chain drive, belt drive, and wall-mount across the Basic, Plus, and Premium series.",
};

export default function LiftMasterOpeners() {
  return (
    <main className="bg-cream-bg px-4 pt-28 pb-16 md:px-8 lg:px-12">
      <section className="mx-auto max-w-[88rem]">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
          LiftMaster
        </p>
        <div className="mt-3 flex flex-col gap-4 border-b border-gray-300 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-bg md:text-5xl">
              Openers
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700 md:text-lg md:leading-8">
              Chain drive, belt drive, and wall-mount openers across the Basic,
              Plus, and Premium series — every model Wi-Fi and myQ connected.
              Looking for remotes, keypads, or wall controls?{" "}
              <Link
                href="/liftmaster-products/accessories"
                className="font-semibold text-red-main hover:underline"
              >
                See accessories →
              </Link>
            </p>
          </div>
          <span className="text-base font-semibold text-gray-600">
            {operators.length} models
          </span>
        </div>
      </section>

      <OperatorsSection />

      <p className="mx-auto mt-10 max-w-[88rem] text-sm text-gray-500">
        * Horsepower comparable (HPs). Product details and images courtesy of
        LiftMaster; contact us to confirm current availability and pricing.
      </p>
    </main>
  );
}
