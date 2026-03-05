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
      <footer className="bg-neutral-primary-soft">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            {/* <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
                <Image
                  className="w-[90px] h-auto"
                  src={logo}
                  width={787}
                  height={241}
                  alt="Doors Direct logo"
                  quality={100}
                  sizes="100px"
                  priority
                />
              </a>
            </div> */}
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase text-red-main">
                  Resources
                </h2>
                <ul className="text-body font-medium text-red-secondary">
                  <li className="mb-4">
                    <Link href="/residential" className="hover:underline">
                      Residential Doors
                    </Link>
                  </li>
                  <li>
                    <Link href="/Commercial" className="hover:underline">
                      Commercial Doors
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase text-red-main">
                  Contact
                </h2>
                <ul className="text-body font-medium text-red-secondary">
                  <li className="mb-4">
                    <a href="tel:8566626666" className="hover:underline ">
                      Give Us A Call
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:underline">
                      Request A Quote
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase text-red-main">
                  Legal
                </h2>
                <ul className="text-body font-medium text-red-secondary">
                  <li>
                    <Link href="/terms" className="hover:underline">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-default sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between text-red-main">
            <span className="text-[13px] text-body ">
              © 2023 <span className="">Doors Direct™</span>. All Rights
              Reserved.
            </span>
            <div className="flex flex-col  space-y-2 mt-4 sm:justify-center sm:mt-0 justify-between">
              <Link
                href={ddSouth}
                className="text-body hover:text-heading flex"
              >
                <MapPinIcon className="h-5 w-5" />
                <span className="">Doors Direct South</span>
              </Link>
              <Link
                href={ddUnion}
                className="text-body hover:text-heading flex"
              >
                <MapPinIcon className="h-5 w-5" />
                <span className="">Doors Direct Union</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
