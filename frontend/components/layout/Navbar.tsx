"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo/logo1.png";
import {
  SwatchIcon,
  ChevronDownIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/outline";
import BurgMenu from "@/components/layout/BurgMenu";
import ezimg from "@/public/images/ezmobilead.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white fixed w-full z-20 top-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-3 border-b border-gray-200">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            className="w-[90px] md:w-[115px] lg:w-[130px]"
            src={logo}
            width={787}
            height={241}
            alt="Doors Direct logo"
            quality={100}
            sizes="(max-width: 768px) 90px, (max-width: 1024px) 115px, 130px"
          />
        </Link>

        {/* Mobile burger menu button */}
        <BurgMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

        {/* Desktop menu */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-3">
            <li className="relative group">
              <Link
                href="/residential-garage-doors"
                className="inline-flex items-center whitespace-nowrap text-red-main lg:text-lg "
              >
                Residential
                {/* <ChevronDownIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" /> */}
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-main group-hover:w-full transition-all duration-300" />
            </li>

            <li className="relative group">
              <Link
                href="/commercial-garage-doors"
                className="inline-flex items-center whitespace-nowrap text-red-main lg:text-lg"
              >
                Commercial
                {/* <ChevronDownIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" /> */}
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-main group-hover:w-full transition-all duration-300" />
            </li>
            <li className="relative group">
              <Link
                href="/liftmaster-products"
                className="inline-flex items-center whitespace-nowrap text-red-main lg:text-lg "
              >
                Operators
                {/* <ChevronDownIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" /> */}
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-main group-hover:w-full transition-all duration-300" />
            </li>

            <li className="relative group mr-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center whitespace-nowrap text-red-main lg:text-lg"
              >
                Order Online
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-main group-hover:w-full transition-all duration-300" />
            </li>

            <li>
              <Link
                href="/ezdoor"
                className="flex items-center gap-1 bg-red-main text-white px-4 py-2 rounded hover:bg-red-secondary whitespace-nowrap"
              >
                <PaintBrushIcon className="w-6 h-6" />
                <span>Visualize Your Door</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-between ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4 bg-white ">
          <li className="border-b border-gray-300">
            <Link
              href="/residential"
              className="block text-red-main hover:text-red-main py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Residential Doors
            </Link>
          </li>
          <li className="border-b border-gray-300">
            <Link
              href="/commercial"
              className="block text-red-main hover:text-red-main py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Commercial Doors
            </Link>
          </li>
          <li className="border-b border-gray-300">
            <Link
              href="/operators"
              className="block text-red-main hover:text-red-main py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Operators
            </Link>
          </li>
          <li className="border-b border-gray-300">
            <Link
              href="/contact"
              className="block text-red-main hover:text-red-main py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Order Online
            </Link>
          </li>
        </ul>
        <div className="flex flex-col items-center gap-3 border-l border-gray-300 pl-5">
          <Image
            src={ezimg}
            alt="Clopay EzDoor Promotional Image"
            width={200}
            height={100}
            quality={75}
          />
          <Link
            href="/ezdoor"
            className="flex items-center gap-2 bg-red-main text-white px-4 py-2 rounded hover:bg-red-secondary w-[150px] whitespace-nowrap"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Design Your Door</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
