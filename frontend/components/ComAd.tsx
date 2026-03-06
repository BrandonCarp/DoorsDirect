import Image from "next/image";
import Energy from "@/public/DoorImages/CommDoors/energy.png";
import Link from "next/link";

export default function ComAd() {
  return (
    <div className="w-full ">
      <div className="relative w-full aspect-[5/3] px-5">
        <Image src={Energy} alt="" className="object-contain " />
        <div className="mt-4">
          <h1 className="font-semibold text-red-main text-lg">
            Commercial Doors
          </h1>
          <p className="text-red-main">
            Your business deserves a door that works as hard as you do. Our
            commercial garage doors deliver durable, dependable performance that
            keeps your operation moving.
          </p>
          <li className="mt-5 list-none">
            <Link
              href="/commercial"
              className="rounded  bg-red-main text-white px-4 py-3 text-sm hover:bg-red-secondary"
            >
              <span className="">Browse Doors</span>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}
