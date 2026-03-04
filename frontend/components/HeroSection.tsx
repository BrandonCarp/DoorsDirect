import Image from "next/image";
import Link from "next/link";
import extira from "@/public/DoorImages/ResiDoors/extira.png";

export default function Hero() {
  return (
    <>
      <div className="relative h-[80vh] w--[100vw]  ">
        {" "}
        <Image
          src={extira}
          fill
          alt="Clopay Coachman"
          className="object-cover scale-x-[-1]"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="absolute z-10  h-full flex items-center text-center">
          <div className="text-left px-4 leading-none">
            <h1 className="text-white font-semibold text-3xl">Order Today:</h1>
            <h2 className="text-white text-3xl font-bold ">Coachman®</h2>
            <Link
              href="/door-link"
              className="inline-block mt-8 bg-white text-lg  text-black px-4 py-2 rounded hover:bg-gray-100 border border-1 border-gray-400 text-gray-800 "
            >
              Shop Models
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
