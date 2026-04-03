"use client";
import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export default function ImageCarousel() {
  const images = [
    { id: 1, title: "Doors Direct South Logo Sign", image: "/company/1.png" },
    { id: 2, title: "Stock Commercial Sections", image: "/company/2.jpg" },
    { id: 3, title: "Stock Tracks", image: "/company/3.jpg" },
    { id: 4, title: "Stock Residential Sections", image: "/company/4.jpg" },
    { id: 5, title: "Stock Springs", image: "/company/5.jpg" },
    { id: 6, title: "Stock Hardware", image: "/company/6.jpg" },
    { id: 7, title: "Stock Fasteners", image: "/company/7.jpg" },
    { id: 8, title: "Stock Shafts and Struts", image: "/company/8.jpg" },
    { id: 9, title: "Stock Raw Torsion Wire", image: "/company/9.jpg" },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(scrollNext, 3000);
    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);

  return (
    <section className="py-12 px-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 px-2"
            >
              <div className="relative h-[250px] md:h-[400px] w-full rounded-lg overflow-hidden">
                <Image
                  src={image.image}
                  fill
                  alt={image.title}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
