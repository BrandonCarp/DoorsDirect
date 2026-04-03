"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo/logo1.png";
import { PhoneIcon } from "@heroicons/react/24/outline";
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
      { label: "Overhead", href: "/residential/AMAAR" },
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
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-20 top-0 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="hidden md:flex bg-cream-bg p-3  flex-row-reverse px-10">
        <span className="flex gap-3 hover:text-red-main cursor-pointer">
          <PhoneIcon className="h-5 w-5" />
          Call Us
        </span>
      </div>
      <div className="w-full flex items-center justify-between mx-auto p-3  border border-gray-200 bg-white">
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
          <ul className="flex items-center gap-10 lg:gap-20">
            {navItems.map((item) => (
              <NavItem key={item.label} label={item.label} links={item.links} />
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out flex items-center  justify-between ${
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
