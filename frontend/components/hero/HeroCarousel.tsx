"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo/logo1.png";

export default function HeroCarousel() {
  const images = [
    "/company/1.jpg",
    "/company/2.jpg",
    "/company/3.jpg",
    "/company/4.jpg",
    "/company/5.jpg",
    "/company/6.jpg",
    "/company/7.jpg",
    "/company/8.jpg",
    "/company/9.jpg",
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(scrollNext, 4000);
    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);

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
    <div className="relative h-[100vh] w-[100vw] overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full touch-pan-y touch-pinch-zoom">
          {images.map((src, i) => (
            <div key={i} className="relative h-full w-full flex-[0_0_100%]">
              <Image
                src={src}
                fill
                alt="Doors Direct South Shop Photos"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35 " />

      {/* Hero content */}
      <div className="absolute inset-0 z-10 flex items-center sm:inset-[10%] ">
        <div className="text-left px-4 leading-none">
          <h1 className="text-white font-semibold text-2xl md:text-4xl lg:text-5xl">
            Your Favorite Door Brands
          </h1>
          <h2 className="text-white text-3xl font-bold md:text-5xl">
            All in One Place
          </h2>
          <div className="bg-white w-[150px] md:w-[200px]  rounded-lg px-2 py-2 mt-2 border border-red-main">
            <Image
              className=""
              src={logo}
              width={400}
              height={400}
              alt="Doors Direct logo"
              quality={100}
              sizes="(max-width: 640px) 120px, 150px"
            />
          </div>
          <Link
            href="/door-link"
            className="inline-block px-4 py-3 rounded mt-5 bg-white text-red-main border border-red-main hover:text-white hover:bg-red-main"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Dot indicators */}
      {/* <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === selectedIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}
