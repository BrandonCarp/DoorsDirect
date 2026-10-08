import type { Metadata } from "next";
import Link from "next/link";
import {
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach Doors Direct — two New Jersey locations in Pennsauken and Union. Call, get directions, or send a quote request.",
};

const LOCATIONS = [
  {
    name: "Doors Direct South",
    locality: "Pennsauken, NJ",
    maps: "https://maps.app.goo.gl/aZaeDJccZBG1TKo17",
  },
  {
    name: "Doors Direct Union",
    locality: "Union, NJ",
    maps: "https://maps.app.goo.gl/L9JSJL7M7jBc7sUr6",
  },
];

export default function ContactUs() {
  return (
    <main className="bg-cream-bg px-4 pt-8 pb-16 md:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
          Contact Us
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-bg md:text-5xl">
          Two NJ locations, one phone call away.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-700 md:text-lg">
          Call during business hours for stock, parts, or pickup questions —
          or send a quote request and the right team will follow up.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.name}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-bg">{loc.name}</h2>
              <p className="mt-1 text-base text-gray-600">{loc.locality}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={loc.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-red-main bg-white px-4 py-2.5 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
                >
                  <MapPinIcon className="h-5 w-5" />
                  Directions
                </a>
                <a
                  href="tel:8566626666"
                  className="inline-flex items-center gap-2 rounded-md bg-red-main px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-secondary"
                >
                  <PhoneIcon className="h-5 w-5" />
                  (856) 662-6666
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-red-main p-6 text-white md:p-8">
          <h2 className="text-2xl font-bold">Need pricing?</h2>
          <p className="mt-2 max-w-2xl text-base leading-7 text-white/80">
            The fastest way to a number is a quote request — build a stock
            door, pick LiftMaster equipment, or describe anything else, and it
            lands straight in the right location&apos;s inbox.
          </p>
          <Link
            href="/request-quote"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-red-main transition-colors hover:bg-cream-secondary"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            Request a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
