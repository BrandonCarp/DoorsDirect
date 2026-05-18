import Image from "next/image";
import Link from "next/link";
import { Door, getDoorLink } from "@/lib/doors";

export default function DoorBox({
  basePath,
  doors,
}: {
  basePath: string;
  doors: Door;
}) {
  const doorLink = getDoorLink(doors, basePath);

  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={doorLink}
        className="relative block aspect-[4/3] w-full border-b border-gray-100 bg-cream-secondary"
      >
        <Image
          src={doors.cover}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          alt={doors.title}
          className="object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 rounded bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-red-main">
          Clopay
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-semibold leading-snug text-gray-bg">
          {doors.title}
        </h2>
        <p className="mt-3 mb-5 text-sm leading-6 text-gray-700">
          {doors.shortDesc}
        </p>
        <Link
          href={doorLink}
          className="mt-auto inline-flex w-fit items-center justify-center rounded-md bg-red-main px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-secondary"
        >
          View Specs
        </Link>
      </div>
    </article>
  );
}
