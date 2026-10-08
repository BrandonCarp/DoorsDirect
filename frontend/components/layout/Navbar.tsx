"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo/logo1.png";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
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

// The hamburger menu's flat link list — every desktop section, one tap deep.
const mobileLinks = [
  { label: "Residential Doors", href: "/residential-garage-doors" },
  { label: "Commercial Doors", href: "/commercial-garage-doors" },
  { label: "LiftMaster", href: "/liftmaster-products" },
  { label: "Springs", href: "/spring-request" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 w-full bg-white border-b border-gray-200">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 px-6 py-3 md:px-10 lg:px-14">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            className="w-[100px] lg:w-[130px]"
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
            className="hidden items-center justify-center rounded-md bg-red-main px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-secondary focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2 lg:inline-flex"
          >
            Request a Quote
          </Link>
          <Link
            href="tel:8566626666"
            className="hidden items-center justify-center gap-2 rounded-md border border-red-main bg-white px-4 py-2.5 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2 lg:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" /> Call Now
          </Link>
        </div>
        <BurgMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>
      {/* Mobile menu dropdown */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden border-t border-gray-100 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[44rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4 bg-white px-5 pb-5 pt-1">
          <ul className="divide-y divide-gray-100">
            {mobileLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between py-3 text-base font-semibold text-gray-bg transition-colors hover:text-red-main"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                  <ChevronRightIcon className="h-4 w-4 text-gray-300" />
                </Link>
              </li>
            ))}
          </ul>

          {/* EzDoor promo card */}
          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-cream-secondary p-3">
            <Image
              src={ezimg}
              alt="Clopay EzDoor door designer"
              width={132}
              height={66}
              quality={75}
              className="w-28 shrink-0"
            />
            <div>
              <p className="text-sm font-bold leading-snug text-gray-bg">
                Design your Clopay door online
              </p>
              <Link
                href="/ezdoor"
                className="mt-2 inline-flex items-center rounded-md bg-red-main px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                Design Your Door
              </Link>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center rounded-md bg-red-main px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              Request a Quote
            </Link>
            <Link
              href="tel:8566626666"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-red-main bg-white px-4 py-2.5 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <PhoneIcon className="h-4 w-4" /> Call Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
