"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo/logo1.png";
import { PhoneIcon } from "@heroicons/react/24/solid";
import BurgMenu from "@/components/layout/BurgMenu";
import ezimg from "@/public/images/ezmobilead.png";
import NavItem from "./NavItem";

// Residential and commercial brand pages live under
// /<category>-garage-doors/<brand>. Operators link to the LiftMaster page and
// its accessories sub-page; springs link to the spring-request form.
const navItems = [
  {
    label: "Residential",
    links: [
      { label: "All Residential Doors", href: "/residential-garage-doors" },
      { label: "Clopay", href: "/residential-garage-doors/clopay" },
      { label: "CHI", href: "/residential-garage-doors/chi" },
      { label: "Haas", href: "/residential-garage-doors/haas" },
      { label: "Amarr", href: "/residential-garage-doors/amarr" },
    ],
  },
  {
    label: "Commercial",
    links: [
      { label: "All Commercial Doors", href: "/commercial-garage-doors" },
      { label: "Clopay", href: "/commercial-garage-doors/clopay" },
      { label: "CHI", href: "/commercial-garage-doors/chi" },
      { label: "Haas", href: "/commercial-garage-doors/haas" },
      { label: "Amarr", href: "/commercial-garage-doors/amarr" },
    ],
  },
  {
    label: "LiftMaster",
    links: [
      { label: "All LiftMaster Products", href: "/liftmaster-products" },
      { label: "Openers", href: "/liftmaster-products/openers" },
      { label: "Remotes & Accessories", href: "/liftmaster-products/accessories" },
    ],
  },
  {
    label: "Springs",
    links: [{ label: "Request Springs", href: "/spring-request" }],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 w-full bg-white border-b border-gray-200">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 px-6 py-5 md:px-10 lg:px-14">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
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

        {/* Desktop menu — spread across the available width */}
        <div className="hidden flex-1 lg:flex lg:justify-center">
          <ul className="flex w-full max-w-3xl items-center justify-between gap-6 xl:max-w-4xl">
            {navItems.map((item) => (
              <NavItem key={item.label} label={item.label} links={item.links} />
            ))}
          </ul>
        </div>
        <div className="flex gap-5">
          <Link
            href="/request-quote"
            className="hidden items-center justify-center rounded-md bg-red-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-secondary focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2 lg:inline-flex"
          >
            Request a Quote
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
              LiftMaster
            </Link>
          </li>
          <li className="border-b border-gray-300">
            <Link
              href="/request-quote"
              className="block text-red-main hover:text-red-main py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Request a Quote
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
