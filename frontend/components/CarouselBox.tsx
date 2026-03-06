"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import {
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/20/solid";
import doors from "@/Data/ResiDoors.json";

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
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="embla w-full">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {displayDoors.map((door) => (
            <div key={door.id} className="flex-[0_0_100%] min-w-0 px-5">
              {/* Image container */}
              <div className="relative w-full aspect-[5/3]">
                <Image
                  src={door.cover}
                  fill
                  alt={door.title}
                  className="object-contain"
                />
              </div>

              {/* Title + Short Desc + Learn More Button */}
              <div className="mt-4 ">
                <h1 className="font-semibold text-red-main text-lg">
                  {door.title}
                </h1>
                <p className="text-red-main">{door.shortDesc}</p>
                <button className="rounded mt-2 bg-red-main text-white px-4 py-3 text-sm hover:bg-red-secondary">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex md:hidden gap-2 items-center justify-center mt-4">
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
      <div className="hidden md:flex gap-5 items-center justify-center mt-4">
        <button className="rounded transition" onClick={scrollPrev}>
          <ArrowLongLeftIcon className="h-8 w-8 text-red-main" />
        </button>
        <button className="rounded transition" onClick={scrollNext}>
          <ArrowLongRightIcon className="h-8 w-8 text-red-main" />
        </button>
      </div>
    </div>
  );
}
