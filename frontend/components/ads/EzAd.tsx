import Link from "next/link";
import Image from "next/image";
import { SwatchIcon } from "@heroicons/react/24/outline";
import ezdoorphone from "@/public/images/ezdoorphone.png";

export default function EzAd() {
  return (
    <div className="w-full flex flex-col items-center text-center px-5 py-10">
      <p className="font-semibold text-red-main text-xl md:text-2xl lg:text-3xl">
        Bring Your Door To Life With
      </p>
      <h2 className="font-semibold text-red-main text-2xl md:text-3xl lg:text-4xl">
        EZDoor™
      </h2>
      <p className="text-red-main my-3 md:text-lg lg:text-xl w-[90%] md:w-[70%] lg:w-[50%]">
        Clopay's EZDoor™ Visualizer makes choosing the perfect garage door easy.
        Upload a photo of your home and instantly see your upgrade and feel
        confident in your choice before making a decision.
      </p>
      <Link
        href="/ezdoor"
        className="flex items-center gap-2 justify-center rounded bg-red-main text-white px-4 py-3 text-sm hover:bg-red-secondary w-[150px]"
      >
        <SwatchIcon className="w-6 h-6" />
        <span className="font-semibold">Try EZDoor™</span>
      </Link>

      {/* Hidden at md and above */}
      {/* <div className="relative w-[90%] aspect-[4/3] mt-8 md:hidden">
        <Image
          src={ezdoorphone}
          fill
          sizes="90vw"
          alt="Clopay Ez Door Promotional Image Couple"
          className="object-contain"
        />
      </div> */}
    </div>
  );
}
