"use client";
import { useState } from "react";

export default function BurgMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="inline md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] hover:shadow-[0_1px_0_theme(colors.slate.950/.04),0_4px_8px_theme(colors.slate.950/.12),inset_0_-2px_0_theme(colors.slate.950/.04)] transition rounded-md p-1"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {/* Top bar */}
        <span
          className={`block w-5 h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out origin-center ${
            isOpen ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        {/* Middle bar */}
        <span
          className={`block w-5 h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0 scale-x-0" : ""
          }`}
        />
        {/* Bottom bar */}
        <span
          className={`block w-5 h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out origin-center ${
            isOpen ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>
    </li>
  );
}
