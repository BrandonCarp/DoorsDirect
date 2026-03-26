"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroCarousel() {
  const images = [
    {
      id: 1,
      title: "Doors Direct South Logo Sign",
      image: "/company/1.4.jpg",
    },
    {
      id: 2,
      title: "Stock Commercial Sections",
      image: "/company/2.jpg",
    },
    {
      id: 3,
      title: "Stock Tracks",
      image: "/company/3.jpg",
    },
    {
      id: 4,
      title: "Stock Residential Sections",
      image: "/company/4.jpg",
    },
    {
      id: 5,
      title: "Stock Springs",
      image: "/company/5.jpg",
    },
    {
      id: 6,
      title: "Stock Hardware",
      image: "/company/6.jpg",
    },
    {
      id: 7,
      title: "Stock Fasteners",
      image: "/company/7.jpg",
    },
    {
      id: 8,
      title: "Stock Shafts and Struts",
      image: "/company/8.jpg",
    },
    {
      id: 9,
      title: "Stock Raw Torsion Wire",
      image: "/company/9.jpg",
    },
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
    <div className="">
      <div className="relative h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] w-[100vw] overflow-hidden">
        <div className="absolute inset-0" ref={emblaRef}>
          <div className="flex h-full touch-pan-y touch-pinch-zoom">
            {images.map((image, i) => (
              <div
                key={image.id}
                className="relative h-full w-full flex-[0_0_100%]"
              >
                <Image
                  src={image.image}
                  fill
                  alt={image.title}
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />

        <div className="absolute inset-0 mb-80  z-10 flex items-center inset-10 ">
          <div className="text-left px-4 leading-none">
            <h1 className="text-white font-bold text-2xl md:text-4xl lg:text-5xl">
              Your Favorite Door Brands
            </h1>
            <h2 className="text-white text-3xl font-bold md:text-5xl">
              All in One Place
            </h2>

            <Link
              href="/door-link"
              className="inline-block px-4 py-3 text-xl rounded mt-10 bg-white text-red-main border border-red-main hover:text-white hover:bg-red-main"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
