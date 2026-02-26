import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo/LogoBk.png";
import { SwatchIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 shadow-[0_1px_6px_-1px_rgba(0,0,0,0.1)] ">
      <ul className="flex items-center space-x-5">
        <li>
          <Link href="/">
            <Image
              src={logo}
              height={150}
              width={150}
              alt="Doors Direct logo"
            />
          </Link>
        </li>
        <li>
          <Link
            href="/residential"
            className="group inline-flex items-center text-lg"
          >
            <span className=" text-gray-900">Residential Doors</span>
            <ChevronDownIcon
              className="
      w-6 h-6
      transition-transform duration-300 ease-out
      origin-center [perspective:800px]
      motion-safe:group-hover:[transform:rotateX(180deg)]"
            />
          </Link>
        </li>
        <li>
          <Link
            href="/commercial"
            className="group inline-flex items-center text-lg"
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
        <li>
          <Link
            href="/contact"
            className="group inline-flex items-center text-lg"
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
      <ul>
        <li className="">
          <Link
            href="/ezdoor"
            className="flex text-lg text-white bg-slate-700 p-3 rounded  hover:bg-slate-500"
          >
            <SwatchIcon className="w-7 h-7 mr-1" />
            Design Your Door
          </Link>
        </li>
      </ul>
    </nav>
  );
}
