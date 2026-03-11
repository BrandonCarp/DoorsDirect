import Image from "next/image";
import lm from "@/public/images/lm.png";
import Link from "next/link";

export default function LmAd() {
  return (
    <div className="w-full lg:w-[90%]">
      <div className="flex-[0_0_100%] min-w-0 px-5">
        <div className="lg:flex  lg:flex-row-reverse    lg:items-stretch sm:gap-6">
          <div className="relative aspect-[4/3]  lg:w-[60%] lg:h-[500px] lg:shrink-0 lg:aspect-auto">
            <Image
              src={lm}
              fill
              sizes="1000px"
              alt="Lift Master Promotional"
              className="object-contain "
            />
          </div>
          <div className="lg:mt-0 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
            <h1 className="font-semibold text-red-main text-lg lg:text-4xl">
              Lift Master Operators & Accessories
            </h1>
            <p className="text-red-main md:text-xl">
              Power your doors with trusted LiftMaster operators and
              accessories. Designed for durability and precision control, they
              deliver smooth, dependable performance for residential and
              commercial applications.
            </p>
            <Link
              href="/commercial"
              className="flex justify-center rounded mt-2 bg-red-main text-white px-4 py-3 text-sm hover:bg-red-secondary w-[150px] "
            >
              Browse Doors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
