import Image from "next/image";
import Energy from "@/public/DoorImages/CommDoors/energy.png";
import Link from "next/link";

export default function ComAd() {
  return (
    <div className="w-full lg:w-[90%] ">
      <div className="flex flex-col min-w-0 px-5 lg:flex-row lg:gap-6">
        {/* Image */}
        <div className="relative w-full aspect-[5/3] lg:w-[60%] lg:h-[500px] lg:shrink-0 lg:aspect-auto">
          <Image
            src={Energy}
            fill
            sizes=""
            alt="Clopay Energy Series"
            className="object-contain"
          />
        </div>

        {/* Text */}
        <div className="mt-4 lg:mt-0 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
          <h1 className="font-semibold text-red-main text-lg lg:text-4xl">
            Commercial Doors
          </h1>
          <p className="text-red-main md:text-xl">
            Your business deserves a door that works as hard as you do. Our
            commercial garage doors deliver durable, dependable performance that
            keeps your operation moving.
          </p>
          <Link
            href="/commercial"
            className="flex justify-center rounded mt-2 bg-red-main text-white px-4 py-3 text-sm hover:bg-red-secondary w-[150px] font-semibold"
          >
            Browse Doors
          </Link>
        </div>
      </div>
    </div>
  );
}
