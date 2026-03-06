import Image from "next/image";
import spring from "@/public/DoorImages/GeneralPhotos/spring.png";
import Link from "next/link";

export default function Springs() {
  return (
    <div className="w-full ">
      <div className="flex flex-col items-center bg-white mx-10 pt-5 pb-20 rounded-t-lg">
        <Image
          src={spring}
          alt="Torsion Spring Icon"
          width={75}
          height={75}
          className=""
          quality={100}
        />
        <span className="text-red-main font-semibold text-lg mb-5">
          Same Day Springs
        </span>
        <p className="max-w-[75%] text-sm text-center text-red-main text-[17px]">
          We stock a large selection of high-quality garage door springs,
          including extension springs and same-day custom torsion springs made
          to fit your door. Built for durability and the right balance, they
          keep your garage door running safely and smoothly.
        </p>
      </div>
      <div className="flex flex-col items-center bg-red-main mx-10 pt-10 pb-10  rounded-b-lg space-y-10">
        <p className="max-w-[75%] text-sm text-center text-white text-[17px]">
          Trust our experienced team to take care of all your door needs.
        </p>
        <Link
          href="/commercial"
          className="rounded mt-2 bg-white text-red-main px-4 py-3 text-sm hover:bg-red-secondary font-semibold "
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
