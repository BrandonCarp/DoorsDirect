"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircleIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function RequestQuote() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="bg-cream-bg px-4 pt-28 pb-16 md:px-8 lg:px-10">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
            Request A Quote
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-bg md:text-5xl">
            Tell us what you need and we will help price it out.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-700 md:text-lg">
            Send over the door type, project details, and contact information.
            A Doors Direct team member can follow up with product options,
            availability, and next steps.
          </p>

          <div className="mt-8 rounded-lg bg-red-main p-6 text-white">
            <h2 className="text-xl font-bold">Need help faster?</h2>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Call the team directly during business hours for urgent stock,
              parts, or pickup questions.
            </p>
            <Link
              href="tel:8566626666"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-red-main transition-colors hover:bg-cream-secondary"
            >
              <PhoneIcon className="h-5 w-5" />
              Call Now
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8">
          {submitted ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <CheckCircleIcon className="h-14 w-14 text-red-main" />
              <h2 className="mt-4 text-3xl font-bold text-gray-bg">
                Quote request received.
              </h2>
              <p className="mt-3 max-w-md text-base leading-7 text-gray-700">
                Thanks. Your request is ready for review. For production use,
                this form can be connected to email, a CRM, or an API endpoint.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center justify-center rounded-md border border-red-main bg-white px-5 py-3 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
              >
                Back Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-gray-bg">
                    Name
                  </span>
                  <input
                    required
                    name="name"
                    className="rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-bg outline-none transition focus:border-red-main focus:ring-2 focus:ring-red-main/20"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-gray-bg">
                    Company
                  </span>
                  <input
                    name="company"
                    className="rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-bg outline-none transition focus:border-red-main focus:ring-2 focus:ring-red-main/20"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-gray-bg">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-bg outline-none transition focus:border-red-main focus:ring-2 focus:ring-red-main/20"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-gray-bg">
                    Phone
                  </span>
                  <input
                    required
                    type="tel"
                    name="phone"
                    className="rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-bg outline-none transition focus:border-red-main focus:ring-2 focus:ring-red-main/20"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-gray-bg">
                    Product Type
                  </span>
                  <select
                    name="productType"
                    className="rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-bg outline-none transition focus:border-red-main focus:ring-2 focus:ring-red-main/20"
                  >
                    <option>Residential Door</option>
                    <option>Commercial Door</option>
                    <option>Springs</option>
                    <option>Parts / Hardware</option>
                    <option>Openers / Operators</option>
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-gray-bg">
                    Timeline
                  </span>
                  <select
                    name="timeline"
                    className="rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-bg outline-none transition focus:border-red-main focus:ring-2 focus:ring-red-main/20"
                  >
                    <option>As soon as possible</option>
                    <option>This week</option>
                    <option>This month</option>
                    <option>Planning ahead</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-gray-bg">
                  Project Details
                </span>
                <textarea
                  required
                  name="details"
                  rows={6}
                  placeholder="Door size, collection, color, insulation, pickup location, or any job details..."
                  className="resize-none rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-bg outline-none transition focus:border-red-main focus:ring-2 focus:ring-red-main/20"
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-red-main px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-red-secondary focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2 md:w-fit"
              >
                Submit Quote Request
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
