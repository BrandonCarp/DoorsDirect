import Image from "next/image";
import Link from "next/link";
import VideoBox from "@/components/VideoBox";
import extira from "@/public/DoorImages/ResiDoors/extira.png";

export default function Home() {
  return (
    <>
      <div className="relative h-[70vh] w--[100vw]">
        {" "}
        {/* ✅ 70% of viewport height */}
        <Image
          src={extira}
          fill
          alt="Clopay Coachman"
          className="object-cover scale-x-[-1]"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="absolute z-10  h-full flex items-center justify-center">
          <div className="text-center px-4 leading-none">
            <h1 className="text-white font-semibold text-xl">Order Today:</h1>
            <h2 className="text-white text-3xl font-bold ">Coachman®</h2>
            <Link
              href="/door-link"
              className="inline-block mt-3 bg-white text-lg text-black px-4 py-2 rounded hover:bg-gray-100 border border-1 border-gray-400 text-gray-800 "
            >
              Shop Today
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">Features</h2>
          <p>scrollable stuff here</p>
          {/* Content here */}
        </div>
      </div>
    </>
  );
}
