// components/layout/NavItem.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type NavLink = { label: string; href: string };

type Props = {
  label: string;
  links: NavLink[];
};

export default function NavItem({ label, links }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li ref={ref} className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center whitespace-nowrap text-red-main lg:text-3xl"
      >
        {label}
        <ChevronDownIcon
          className={`w-4 h-4 ml-2 transition-transform duration-300  ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-main group-hover:w-full transition-all duration-300" />

      {/* Dropdown */}
      <div
        className={`absolute top-full left-0 bg-white shadow-lg border border-gray-100 rounded z-50 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col py-2 min-w-[180px] ">
          {links.map((link) => (
            <li key={`${link.label}-${link.href}`}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-red-main hover:bg-gray-50 whitespace-nowrap "
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
