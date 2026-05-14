"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo/logo1.png";
import { PhoneIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import BurgMenu from "@/components/layout/BurgMenu";
import ezimg from "@/public/images/ezmobilead.png";
import NavItem from "./NavItem";

const navItems = [
  {
    label: "Residential",
    links: [
      { label: "All Residential Doors", href: "/residential-garage-doors" },
      { label: "Clopay", href: "/residential/insulated" },
      { label: "CHI", href: "/residential/CHI" },
      { label: "Haas", href: "/residential/HAAS" },
      { label: "Amaar", href: "/residential/AMAAR" },
    ],
  },
  {
    label: "Commercial",
    links: [
      { label: "All Commercial Doors", href: "/commercial-garage-doors" },
      { label: "Clopay", href: "/residential/insulated" },
      { label: "CHI", href: "/residential/CHI" },
      { label: "Haas", href: "/residential/HAAS" },
      { label: "Amaar", href: "/residential/AMAAR" },
      { label: "Overhead", href: "/residential/OVERHEAD" },
    ],
  },
  {
    label: "Operators",
    links: [
      { label: "All LiftMaster Products", href: "/Liftmaster" },
      { label: "Operators", href: "/Liftmaster/Operators" },
      { label: "Accessories", href: "/Liftmaster/accessories" },
    ],
  },
  {
    label: "Springs",
    links: [
      { label: "Torsion Springs", href: "/springs/torsion" },
      { label: "Extension Springs", href: "/springs/extension" },
    ],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResiMenu, setIsResiMenu] = useState(false);
  const [isCommMenu, setIsCommMenu] = useState(false);

  return (
    <nav className="bg-white sticky w-[100vw] z-20 top-0 ">
      <div className="w-full flex items-center justify-between mx-auto  py-5 px-10 border border-gray-200">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            className="w-[115px] lg:w-[145px] lg:w-[160px]"
            src={logo}
            width={787}
            height={241}
            alt="Doors Direct logo"
            quality={100}
            sizes="(max-width: 768px) 90px, (max-width: 1024px) 115px, 130px"
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex  ">
          <ul className="flex items-center  lg:gap-5 ">
            {navItems.map((item) => (
              <NavItem key={item.label} label={item.label} links={item.links} />
            ))}
          </ul>

          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-main group-hover:w-full transition-all duration-300" />
        </div>
        <div className="flex gap-5">
          <Link
            href="/contact-us"
            className="hidden lg:flex items-center whitespace-nowrap text-white bg-red-main px-3 py-1 rounded  hover:bg-red-secondary lg:text-2xl"
          >
            Request a Quote
          </Link>
          <Link
            href="/contact-us"
            className="hidden lg:flex items-center whitespace-nowrap text-white bg-red-main px-3 py-1 rounded  hover:bg-red-secondary lg:text-2xl"
          >
            <PhoneIcon className="h-6 w-6 mr-2" /> Call Now
          </Link>
        </div>
        <BurgMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>
      {/* DROP DOWN MENUS */}

      {/* Residential Drop Down */}
      <div
        className={`  overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-between ${
          isResiMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4 bg-white ">
          <li className="border-b border-gray-300">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center whitespace-nowrap text-red-main lg:text-xl "
            >
              Residential Doors
            </button>
          </li>
          <li className="border-b border-gray-300">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center whitespace-nowrap text-red-main lg:text-lg "
            >
              Commercial Doors
            </button>
          </li>
          <li className="border-b border-gray-300">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center whitespace-nowrap text-red-main lg:text-lg "
            >
              Operators
            </button>
          </li>
          <li className="border-b border-gray-300">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center whitespace-nowrap text-red-main lg:text-lg "
            >
              Order Online
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-between ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4 bg-white ">
          <li className="border-b border-gray-300">
            <Link
              href="/residential"
              className="block text-red-main hover:text-red-main py-2 "
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
