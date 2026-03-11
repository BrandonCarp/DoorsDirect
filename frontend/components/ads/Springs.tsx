import Image from "next/image";
import spring from "@/public/images/spring.png";
import Link from "next/link";

export default function Springs() {
  return (
    <div className="w-[320px]  ">
      <div className="flex flex-col items-center  bg-white mx-5 py-5 rounded-lg gap-3 ">
        <Image
          src={spring}
          alt="Torsion Spring Icon"
          width={75}
          height={75}
          className=""
          quality={100}
        />
        <span className="text-red-main font-semibold text-lg ">
          Same Day Springs
        </span>
        <p className="mx-5 text-sm text-center text-red-main text-[17px]">
          We stock a large selection of high-quality garage door springs,
          including extension springs and same-day custom torsion springs made
          to fit your door. Built for durability and the right balance, they
          keep your garage door running safely and smoothly.
        </p>
      </div>
    </div>
  );
}
