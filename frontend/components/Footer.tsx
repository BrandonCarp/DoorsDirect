"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo/footerlogo.png";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Footer() {
  const ddSouth = "https://maps.app.goo.gl/aZaeDJccZBG1TKo17";
  const ddUnion = "https://maps.app.goo.gl/L9JSJL7M7jBc7sUr6";

  const [value, setValue] = useState("");

  return (
    <>
      <div className="flex flex-col items-center justify-center py-1 space-y-1">
        <div className=" border-gray-400 border  w-[80%] mt-3"></div>
        <h1 className="text-[10px] text-red-main">YOUR TRUSTED DOOR EXPERTS</h1>
        <form></form>

        <section className="flex flex-col relative space-y-2">
          <Link
            className="flex"
            href={ddSouth}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPinIcon className="w-5 h-5 mr-1 mt-[1px]  text-red-main" />{" "}
            <span className="flex  text-red-main text-sm">
              Doors Direct South
            </span>
          </Link>
          <Link
            className="flex"
            href={ddSouth}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPinIcon className="w-5 h-5 mr-1 mt-[1px]  text-red-main" />{" "}
            <span className="flex  text-red-main text-sm">
              Doors Direct Union
            </span>
          </Link>
        </section>
        <h1 className="text-[10px] text-gray-500">© 2026 Doors Direct</h1>
      </div>
    </>
  );
}
