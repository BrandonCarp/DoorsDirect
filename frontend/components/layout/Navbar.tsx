"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo/logo1.png";
import { PhoneIcon } from "@heroicons/react/24/solid";
import BurgMenu from "@/components/layout/BurgMenu";
import ezimg from "@/public/images/ezmobilead.png";
import NavItem from "./NavItem";

// NOTE: Brand-specific pages (CHI, Haas, Amarr, Overhead) and dedicated
// springs pages don't exist yet. Until they're built, these links point to
// the closest existing catalog/quote page so nothing 404s. Repoint them once
// the dedicated pages are created.
const navItems = [
  {
    label: "Residential",
    links: [
      { label: "All Residential Doors", href: "/residential-garage-doors" },
      { label: "Clopay", href: "/residential-garage-doors" },
      { label: "CHI", href: "/residential-garage-doors" },
      { label: "Haas", href: "/residential-garage-doors" },
      { label: "Amarr", href: "/residential-garage-doors" },
    ],
  },
  {
    label: "Commercial",
    links: [
      { label: "All Commercial Doors", href: "/commercial-garage-doors" },
      { label: "Clopay", href: "/commercial-garage-doors" },
      { label: "CHI", href: "/commercial-garage-doors" },
      { label: "Haas", href: "/commercial-garage-doors" },
      { label: "Amarr", href: "/commercial-garage-doors" },
      { label: "Overhead", href: "/commercial-garage-doors" },
    ],
  },
  {
    label: "Operators",
    links: [
      { label: "All LiftMaster Products", href: "/liftmaster-products" },
      { label: "Operators", href: "/liftmaster-products" },
      { label: "Accessories", href: "/liftmaster-products" },
    ],
  },
  {
    label: "Springs",
    links: [
      { label: "Torsion Springs", href: "/request-quote" },
      { label: "Extension Springs", href: "/request-quote" },
    ],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 w-full bg-white border-b border-gray-200">
      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 py-5 md:px-10 lg:px-14">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            className="w-[115px] lg:w-[160px]"
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
            href="/request-quote"
            className="hidden items-center justify-center rounded-md bg-red-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-secondary focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2 lg:inline-flex"
          >
            Request a Quote
          </Link>
          <Link
            href="/stock-door-pricing"
            className="hidden items-center justify-center rounded-md border border-red-main bg-white px-5 py-3 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2 lg:inline-flex"
          >
            Price Stock
          </Link>
          <Link
            href="tel:8566626666"
            className="hidden items-center justify-center gap-2 rounded-md border border-red-main bg-white px-5 py-3 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2 lg:inline-flex"
          >
            <PhoneIcon className="h-5 w-5" /> Call Now
          </Link>
        </div>
        <BurgMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>
      {/* Mobile menu dropdown */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-between ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4 bg-white ">
          <li className="border-b border-gray-300">
            <Link
              href="/residential-garage-doors"
              className="block text-red-main hover:text-red-main py-2 "
              onClick={() => setIsMenuOpen(false)}
            >
              Residential Doors
            </Link>
          </li>
          <li className="border-b border-gray-300">
            <Link
              href="/commercial-garage-doors"
              className="block text-red-main hover:text-red-main py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Commercial Doors
            </Link>
          </li>
          <li className="border-b border-gray-300">
            <Link
              href="/liftmaster-products"
              className="block text-red-main hover:text-red-main py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Operators
            </Link>
          </li>
          <li className="border-b border-gray-300">
            <Link
              href="/stock-door-pricing"
              className="block text-red-main hover:text-red-main py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Price Stock
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
