"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import {
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/20/solid";
import doors from "@/Data/ResiDoors.json";
import { slugifyDoorTitle } from "@/lib/doors";

export default function CarouselBox() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const displayDoors = doors.slice(0, 5);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="embla w-full bg-white px-4 py-10 md:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-main">
              Residential Collections
            </p>
            <h2 className="mt-1 text-3xl font-bold text-gray-bg md:text-4xl">
              Popular doors ready to compare.
            </h2>
          </div>
          <Link
            href="/residential-garage-doors"
            className="inline-flex w-fit items-center justify-center rounded-md border border-red-main px-5 py-3 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
          >
            View All Doors
          </Link>
        </div>

        {/* Carousel viewport */}
        <div
          className="overflow-hidden rounded-lg border border-gray-200 bg-cream-secondary"
          ref={emblaRef}
        >
          <div className="flex touch-pan-y touch-pinch-zoom">
            {displayDoors.map((door) => (
              <div
                key={door.id}
                className="min-w-0 flex-[0_0_100%] p-4 md:p-6"
              >
                <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                  <div className="relative aspect-[4/3] w-full rounded-lg bg-cream-secondary">
                    <Image
                      src={door.cover}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      alt={door.title}
                      className="object-contain p-5"
                    />
                  </div>

                  <div className="lg:flex lg:flex-col lg:justify-center">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-main">
                      Featured Residential
                    </p>
                    <h3 className="mt-2 text-2xl font-bold leading-tight text-gray-bg md:text-4xl">
                      {door.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-7 text-gray-700 md:text-lg">
                      {door.shortDesc}
                    </p>
                    <Link
                      href={`/residential-garage-doors/${slugifyDoorTitle(
                        door.title,
                      )}`}
                      className="mt-6 inline-flex w-fit justify-center rounded-md bg-red-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-secondary"
                    >
                      View Specs
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="mt-5 flex items-center justify-center gap-2 md:hidden">
          {displayDoors.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "bg-red-main w-8"
                  : "bg-gray-300 hover:bg-gray-400 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Nav buttons*/}
        <div className="mt-5 hidden items-center justify-center gap-4 md:flex">
          <button
            className="rounded-md border border-gray-200 bg-white p-2 transition hover:border-red-main"
            onClick={scrollPrev}
          >
            <ArrowLongLeftIcon className="h-8 w-8 text-red-main" />
          </button>
          <button
            className="rounded-md border border-gray-200 bg-white p-2 transition hover:border-red-main"
            onClick={scrollNext}
          >
            <ArrowLongRightIcon className="h-8 w-8 text-red-main" />
          </button>
        </div>
      </div>
    </section>
  );
}
