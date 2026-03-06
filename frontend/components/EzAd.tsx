import Link from "next/link";
import { SwatchIcon } from "@heroicons/react/24/outline";

export default function EzAd() {
  return (
    <div className=" w-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-semibold text-red-main text-xl">
          Bring Your Door To Life With
        </h1>
        <h2 className="font-semibold text-red-main text-2xl">EZDoor™</h2>
        <p className="w-[90%] text-red-main my-3">
          Clopay’s EZDoor™ Visualizer makes choosing the perfect garage door
          easy. Upload a photo of your home and instantly see your upgrade and
          feel confident in your choice before making a decision.
        </p>
        <Link
          href="/ezdoor"
          className="flex items-center gap-1 bg-red-main text-white px-4 py-2 rounded hover:bg-red-secondary whitespace-nowrap"
        >
          <SwatchIcon className="w-6 h-6" />
          <span>Try EZDoor™</span>
        </Link>
      </div>
    </div>
  );
}
