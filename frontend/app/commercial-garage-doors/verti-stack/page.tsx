import Image from "next/image";
import Link from "next/link";
import doors from "@/Data/ComDoors.json";

const verti = doors[0];

export default function Vertistack() {
  return (
    <div className="w-full lg:w-[90%] pt-24">
      <div className="flex flex-col min-w-0 px-5 lg:flex-row lg:gap-6">
        <div className="relative w-full aspect-[5/3] lg:w-[60%] lg:h-[500px] lg:shrink-0 lg:aspect-auto">
          <Image
            src={verti.cover}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            alt="Clopay Energy Series"
            className="object-contain"
          />
        </div>

        <div className="mt-4 lg:mt-0 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
          <p className="font-semibold text-red-main text-lg lg:text-4xl ">
            {verti.title}
          </p>
          <p className="text-red-main py-5">{verti.description}</p>
          <div className="flex gap-5">
            <Link
              href=""
              className="flex justify-center items-center rounded mt-2 bg-red-main text-white px-5 py-3 text-sm hover:bg-red-secondary w-[150px] font-semibold"
            >
              Request A Quote
            </Link>
            <Link
              href="/ezdoor"
              className="flex justify-center items-center whitespace-nowrap  rounded mt-2 bg-red-main text-white px-5 py-3 text-sm hover:bg-red-secondary w-[150px] font-semibold"
            >
              Customize Your Door
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
