import Image from "next/image";
import Link from "next/link";
import { accessories, AccessoryCategory } from "@/lib/liftmaster";

export const metadata = {
  title: "LiftMaster Remotes & Accessories",
  description:
    "LiftMaster remotes, wireless keypads, and wall control panels — the latest Security+ 3.0 and myQ accessories from Doors Direct.",
};

const categoryOrder: AccessoryCategory[] = [
  "Remotes",
  "Keypads",
  "Control Panels",
];

const categoryBlurb: Record<AccessoryCategory, string> = {
  Remotes: "Visor and pocket remotes with Security+ encryption and myQ setup.",
  Keypads: "Keyless entry — open and close with a personal PIN, no remote needed.",
  "Control Panels": "Wall controls with lighting, motion sensing, and smart displays.",
};

export default function LiftMasterAccessories() {
  return (
    <main className="bg-cream-bg px-4 pt-28 pb-16 md:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <Link
          href="/liftmaster-products"
          className="text-sm font-semibold text-red-main hover:text-red-secondary"
        >
          ← LiftMaster openers &amp; operators
        </Link>
        <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-red-main">
          LiftMaster
        </p>
        <div className="mt-3 border-b border-gray-300 pb-6">
          <h1 className="text-3xl font-bold text-gray-bg md:text-5xl">
            Remotes &amp; Accessories
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700">
            The latest LiftMaster remotes, wireless keypads, and wall control
            panels — including the new Security+ 3.0 and myQ lineup. Need one to
            match your opener? We can confirm compatibility.
          </p>
        </div>
      </section>

      {categoryOrder.map((category) => {
        const items = accessories.filter((a) => a.category === category);
        if (items.length === 0) return null;
        return (
          <section key={category} className="mx-auto mt-10 max-w-7xl">
            <h2 className="text-2xl font-bold text-gray-bg">{category}</h2>
            <p className="mt-1 text-sm text-gray-600">
              {categoryBlurb[category]}
            </p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item) => (
                <article
                  key={item.model}
                  className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-square w-full border-b border-gray-100 bg-cream-secondary">
                    <Image
                      src={item.image}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      alt={`LiftMaster ${item.model} ${item.name}`}
                      className="object-contain p-5"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-bold text-gray-bg">
                      {item.name}
                    </h3>
                    <p className="text-sm font-semibold text-red-main">
                      {item.model}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      {item.desc}
                    </p>
                    <Link
                      href={`/request-quote?model=${encodeURIComponent(
                        `LiftMaster ${item.model} ${item.name}`,
                      )}`}
                      className="mt-4 inline-flex w-fit items-center justify-center rounded-md border border-red-main px-4 py-2 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
                    >
                      Ask about it
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <p className="mx-auto mt-10 max-w-7xl text-xs text-gray-500">
        Product details and images courtesy of LiftMaster. Contact us to confirm
        compatibility with your opener.
      </p>
    </main>
  );
}
