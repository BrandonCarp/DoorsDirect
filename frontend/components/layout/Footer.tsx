"use client";

import Link from "next/link";

import { MapPinIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  const ddSouth = "https://maps.app.goo.gl/aZaeDJccZBG1TKo17";
  const ddUnion = "https://maps.app.goo.gl/L9JSJL7M7jBc7sUr6";

  return (
    <>
      <footer className="bg-neutral-primary-soft ">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <hr className="my-6 border-[1%] border-gray-300 sm:mx-auto lg:my-8" />
          <div className="md:flex md:justify-between">
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase text-red-main">
                  Resources
                </h2>
                <ul className="text-body  text-red-main">
                  <li className="mb-4">
                    <Link
                      href="/residential-garage-doors"
                      className="hover:underline"
                    >
                      Residential Doors
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Commercial-garage-doors"
                      className="hover:underline"
                    >
                      Commercial Doors
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase text-red-main">
                  Contact
                </h2>
                <ul className="text-body  text-red-main ">
                  <li className="mb-4">
                    <a href="tel:8566626666" className="hover:underline ">
                      Give Us A Call
                    </a>
                  </li>
                  <li>
                    <a href="/contact-us" className="hover:underline">
                      Request A Quote
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase text-red-main">
                  Legal
                </h2>
                <ul className="text-body  text-red-main">
                  <li>
                    <Link href="/" className="hover:underline ">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-[1%] border-gray-300 sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between text-red-main">
            <div className="flex flex-col  space-y-2 my-5 sm:justify-center sm:mt-0 justify-between">
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
            <span className="text-[13px] text-body  ">
              © 2026 <span className="">Doors Direct™</span>. All Rights
              Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
