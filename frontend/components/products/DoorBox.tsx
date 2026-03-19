import Image from "next/image";
import Link from "next/link";

interface Door {
  id: number;
  title: string;
  shortDesc: string;
  cover: string;
  gallery: string;
  brochure: string;
  link: string;
}

export default function DoorBox({ doors }: { doors: Door }) {
  return (
    <div className="w-full my-5 md:my-10 px-5">
      <div className="relative w-full aspect-[5/3]">
        <Image
          src={doors.cover}
          fill
          sizes="(max-width: 768px) 100vw, 90vw"
          alt={doors.title}
          className="object-cover"
        />
      </div>

      <div className="mt-4">
        <p className="font-semibold text-red-main text-lg lg:text-3xl">
          {doors.title}
        </p>
        <p className="text-red-main md:text-lg">{doors.shortDesc}</p>
        <Link
          href={doors.link}
          className="inline-flex justify-center rounded mt-2 bg-red-main text-white px-4 py-3 text-sm hover:bg-red-secondary w-[150px] font-semibold"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
