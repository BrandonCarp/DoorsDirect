import Image from "next/image";
import Link from "next/link";
import extira from "@/public/DoorImages/ResiDoors/extira.png";
import logo from "@/public/logo/logo2.png";

export default function Hero() {
  return (
    <>
      <div className="relative h-[90vh] w-[100vw]">
        <Image
          src={extira}
          fill
          alt="Clopay Coachman"
          className="object-cover scale-x-[-1]"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="absolute z-10  h-full flex items-center text-center">
          <div className="text-left px-4 leading-none">
            <h1 className="text-white font-semibold text-2xl">
              Your Favorite Door Brands
            </h1>
            <h2 className="text-white text-3xl font-bold ">All in One Place</h2>
            <div className="bg-white w-[200px] rounded-lg px-2 py-2 mt-2 border border-red-main">
              <Image
                className="w-[500px] "
                src={logo}
                width={787}
                height={241}
                alt="Doors Direct logo"
                quality={100}
                sizes="100px"
              />
            </div>
            <Link
              href="/door-link"
              className="inline-block px-4 py-3 rounded mt-5 bg-white text-red-main  border border-1 border-red-main  hover:text-white  hover:bg-red-main  "
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
