import Link from "next/link";
import Image from "next/image";
import { SwatchIcon } from "@heroicons/react/24/outline";
import ezcouple from "@/public/images/ezcouple.png";

export default function EzAd() {
  return (
    <div className="w-full lg:w-[90%]">
      <div className="flex-[0_0_100%] min-w-0 px-5">
        <div className="lg:flex   lg:items-stretch sm:gap-6">
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-semibold text-red-main text-xl md:text-2xl">
              Bring Your Door To Life With
            </h1>
            <h2 className="font-semibold text-red-main text-2xl md:text-3xl">
              EZDoor™
            </h2>
            <p className="w-[90%] md:w-[60%] lg:w-[85%] text-red-main my-3 md:text-lg">
              Clopay’s EZDoor™ Visualizer makes choosing the perfect garage door
              easy. Upload a photo of your home and instantly see your upgrade
              and feel confident in your choice before making a decision.
            </p>
            <Link
              href="/ezdoor"
              className="flex justify-center rounded mt-2 bg-red-main text-white px-4 py-3 text-sm hover:bg-red-secondary w-[150px] "
            >
              <SwatchIcon className="w-6 h-6" />
              <span className="font-semibold">Try EZDoor™</span>
            </Link>
          </div>
          <div className="relative w-full aspect-[5/3] lg:w-[60%] lg:h-[500px] lg:shrink-0 lg:aspect-auto mt-10 lg:mt-5">
            <Image
              src={ezcouple}
              fill
              sizes="1000px"
              alt="Clopay Ez Door Promotional Image Couple"
              className="object-contain "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
