import Image from "next/image";
import lm from "@/public/images/lm.png";
import Link from "next/link";

export default function LmAd() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Image: ~90vw on mobile, ~70vw on lg+ */}
      <div className="relative w-[90vw] h-[90vw] lg:w-[70vw] lg:h-[70vh]">
        <Image
          src={lm}
          fill
          sizes="(max-width: 1024px) 90vw, 70vw"
          alt="Lift Master Promotional"
          className="object-contain"
        />
      </div>

      {/* Text content aligned to match image width */}
      <div className="flex flex-col mt-4 w-[90vw] lg:w-[70vw]">
        <h1 className="font-semibold text-red-main text-lg lg:text-4xl">
          Lift Master Operators & Accessories
        </h1>
        <p className="text-red-main md:text-xl mt-2">
          Power your doors with trusted LiftMaster operators and accessories.
          Designed for durability and precision control, they deliver smooth,
          dependable performance for residential and commercial applications.
        </p>
        <Link
          href="/commercial"
          className="flex justify-center rounded mt-4 bg-red-main text-white px-4 py-3 text-sm hover:bg-red-secondary w-[150px]"
        >
          Browse Doors
        </Link>
      </div>
    </div>
  );
}
