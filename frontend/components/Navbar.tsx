import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo/logo.png";
import { SwatchIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { InboxIcon } from "@heroicons/react/24/outline";
import BurgMenu from "./BurgMenu";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-between md:px-10 px-3 shadow-[0_1px_6px_-1px_rgba(0,0,0,0.1)] ">
      <ul className="flex items-center space-x-5 ">
        <li className="py-2 md:py-3">
          <Link href="/">
            <Image
              className="w-[90px] h-auto"
              src={logo}
              width={787}
              height={241}
              alt="Doors Direct logo"
              quality={100}
              sizes="100px"
              priority
            />
          </Link>
        </li>

        <li className="hover:border-b-2 border-red hidden md:inline">
          <Link
            href="/residential"
            className="group inline-flex items-center md:text-lg"
          >
            <span className=" text-gray-900 ">Residential Doors</span>
            <ChevronDownIcon
              className="
      w-6 h-6
      transition-transform duration-300 ease-out
      origin-center [perspective:800px]
      motion-safe:group-hover:[transform:rotateX(180deg)]"
            />
          </Link>
        </li>
        <li className="hidden md:inline">
          <Link
            href="/commercial"
            className="group inline-flex items-center md:text-lg"
          >
            Commercial Doors
            <ChevronDownIcon
              className="w-6 h-6
      transition-transform duration-300 ease-out
      origin-center [perspective:800px]
      motion-safe:group-hover:[transform:rotateX(180deg)]"
            />
          </Link>
        </li>
        <li className="hidden md:inline">
          <Link
            href="/contact"
            className="group inline-flex items-center md:text-lg"
          >
            Contact
            <ChevronDownIcon
              className="w-6 h-6
      transition-transform duration-300 ease-out
      origin-center [perspective:800px]
      motion-safe:group-hover:[transform:rotateX(180deg)]"
            />
          </Link>
        </li>
        {/* Second Half of nav */}
      </ul>
      <ul className="flex items-center space-x-4 ">
        <li className="">
          <Link href="/contact" className="  inline md:hidden ">
            <InboxIcon className="w-6 h-6 text-red-main hover:text-red-secondary" />
          </Link>
        </li>
        <li className="">
          <Link
            href="/ezdoor"
            className="flex  md:text-white md:bg-red-main md:p-2 rounded  md:hover:bg-red-secondary "
          >
            <SwatchIcon className="w-6 h-6 md:w-7 md:h-7 md:mr-1 text-red-main hover:text-red-secondary md:hover:text-white md:text-white" />
            <span className="hidden md:inline">Design Your Door</span>
          </Link>
        </li>

        <BurgMenu />
      </ul>
    </nav>
  );
}
