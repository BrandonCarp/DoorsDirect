import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { accessories, Accessory } from "@/lib/liftmaster";

export const metadata = {
  title: "LiftMaster Remotes & Accessories",
  description:
    "LiftMaster remotes, wireless keypads, and wall control panels — the latest Security+ 3.0 and myQ accessories from Doors Direct.",
};

// Compact layout: two rows of four so the whole page fits in one screen —
// remotes + keypads share the first row, control panels fill the second.
const groups: { title: string; filter: (a: Accessory) => boolean }[] = [
  {
    title: "Remotes & Keypads",
    filter: (a) => a.category === "Remotes" || a.category === "Keypads",
  },
  {
    title: "Control Panels",
    filter: (a) => a.category === "Control Panels",
  },
];

function AccessoryCard({ item }: { item: Accessory }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full border-b border-gray-100 bg-cream-secondary">
        <Image
          src={item.image}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          alt={`LiftMaster ${item.model} ${item.name}`}
          className="object-contain p-3"
        />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-base font-bold leading-snug text-gray-bg md:text-lg">
          {item.name}
        </h3>
        <p className="text-sm font-semibold text-red-main md:text-base">{item.model}</p>
        <Link
          href={`/request-quote?model=${encodeURIComponent(
            `LiftMaster ${item.model} ${item.name}`,
          )}`}
          className="mt-2 inline-flex w-fit items-center justify-center rounded-md border border-red-main px-4 py-1.5 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
        >
          Ask about it
        </Link>
      </div>
    </article>
  );
}

export default function LiftMasterAccessories() {
  return (
    <main className="bg-cream-bg px-4 pt-24 pb-10 md:px-8 lg:px-12">
      <section className="mx-auto max-w-[88rem]">
        <div className="flex flex-col gap-2 border-b border-gray-300 pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/liftmaster-products"
              className="inline-flex items-center gap-2 text-base font-bold text-red-main transition-colors hover:text-red-secondary"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              LiftMaster openers &amp; operators
            </Link>
            <h1 className="mt-2 text-3xl font-bold text-gray-bg md:text-4xl">
              Remotes &amp; Accessories
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-gray-700">
            The latest Security+ 3.0 and myQ remotes, keypads, and wall
            controls. We&apos;ll confirm compatibility with your opener.
          </p>
        </div>
      </section>

      {groups.map((group) => {
        const items = accessories.filter(group.filter);
        if (items.length === 0) return null;
        return (
          <section key={group.title} className="mx-auto mt-5 max-w-[88rem]">
            <h2 className="text-xl font-bold text-gray-bg md:text-2xl">
              {group.title}
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {items.map((item) => (
                <AccessoryCard key={item.model} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
