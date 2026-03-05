"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo/logo.png";
import { SwatchIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import BurgMenu from "./BurgMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            className="w-[90px] "
            src={logo}
            width={787}
            height={241}
            alt="Doors Direct logo"
            quality={100}
            sizes="100px"
            priority
          />
        </Link>

        {/* Mobile burger menu button */}

        <BurgMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

        {/* Desktop menu */}
        <div className="hidden md:block ">
          <ul className="flex items-center gap-3 ">
            <li className="hover:border-b-2 border-red list-none">
              <Link
                href="/residential"
                className="group inline-flex items-center  whitespace-nowrap text-red-main text-lg "
              >
                Residential Doors
                <ChevronDownIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
              </Link>
            </li>
            <li className="hover:border-b-2 border-red">
              <Link
                href="/commercial"
                className="group inline-flex items-center  whitespace-nowrap text-red-main text-lg"
              >
                Commercial Doors
                <ChevronDownIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
              </Link>
            </li>
            <li className="hover:border-b-2 border-red">
              <Link
                href="/contact"
                className="group inline-flex items-center  whitespace-nowrap text-red-main text-lg"
              >
                Contact
                <ChevronDownIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
              </Link>
            </li>
            <li>
              <Link
                href="/ezdoor"
                className="flex items-center gap-1 bg-red-main text-white px-4 py-2 rounded hover:bg-red-secondary whitespace-nowrap"
              >
                <SwatchIcon className="w-6 h-6" />
                <span>Design Your Door</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4 bg-white border-t border-gray-200">
          <li>
            <Link
              href="/residential"
              className="block text-red-main hover:text-red-main py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Residential Doors
            </Link>
          </li>
          <li>
            <Link
              href="/commercial"
              className="block text-red-main hover:text-red-main py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Commercial Doors
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block text-red-main hover:text-red-main py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/ezdoor"
              className="flex items-center gap-2 bg-red-main text-white px-4 py-2 rounded hover:bg-red-secondary w-fit"
              onClick={() => setIsMenuOpen(false)}
            >
              <SwatchIcon className="w-6 h-6" />
              <span>Design Your Door</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
