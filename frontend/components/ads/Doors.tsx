import Image from "next/image";
import door from "@/public/images/door.png";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function Doors() {
  return (
    <div className="w-[320px] ">
      <div className="flex flex-col items-center  bg-red-main mx-5 py-5 rounded-lg gap-3 ">
        <HomeIcon className="h-8 w-8  text-white" />
        <span className="text-white font-semibold text-lg ">Our Doors</span>
        <p className="mx-5 text-sm text-center text-white text-[17px]">
          We carry a wide selection of residential and commercial garage doors,
          including durable sectional doors and custom commercial slabs built to
          your specifications. Designed for strength, reliability, and a clean
          professional finish.
        </p>
      </div>
    </div>
  );
}
