// "use client";
// import React, { useCallback, useEffect } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import Image from "next/image";
// import { useState } from "react";
// import { ArrowRightIcon } from "@heroicons/react/20/solid";
// import { ArrowLeftIcon } from "@heroicons/react/20/solid";
// import doors from "@/Data/ResiDoors.json";

// // {
// //     "id": 1,
// //     "title": "Bridgeport™ Steel",
// //     "description": "There's a reason so many homeowners choose the Bridgeport™ Steel door: it captures that classic, handcrafted look and offers durable steel you can count on. Inspired by traditional stile and rail designs, the Bridgeport™ brings clean, recessed panels and precise symmetry to your garage without any of the fuss.\n\nChoose from wide or narrow panel styles, a huge range of colors (including wood-look finishes so real you'll do a double-take), and plenty of window and hardware options to make it yours. Underneath, Clopay's Intellicore® insulation means your garage stays quieter, warmer, and just plain tougher. It's a door built to stand up to every season, with low-maintenance finishes and smooth, reliable operation day in and day out. Bridgeport™ Steel is proof that you really can have curb appeal, durability, and minimal upkeep, all in one smart upgrade.",
// //     "cover": "",
// //     "gallery": "https://www.clopaydoor.com/image-gallery/bridgeport-steel",
// //     "brochure": "https://literature.clopay.com/pdf_files/RSDR-BRIDGEPORT3LAYERSS-20.pdf"
// //   },

// interface ResDoorProps {
//   id: number;
//   title: string;
//   description: string | string[];
//   cover: string;
//   gallery: string;
//   brochure: string;
// }

// export default function CarouselBox() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
//   const displayDoors = doors.slice(0, 5);

//   const scrollPrev = useCallback(() => {
//     if (emblaApi) emblaApi.scrollPrev();
//   }, [emblaApi]);

//   const scrollNext = useCallback(() => {
//     if (emblaApi) emblaApi.scrollNext();
//   }, [emblaApi]);

//   return (
//     <>
//       <div className="embla my-5">
//         <div className="overflow-hidden" ref={emblaRef}>
//           <div className="flex  touch-pan-y touch-pinch-zoom">
//             {displayDoors.map((door) => (
//               <div key={door.id} className="flex-[0_0_100%] min-w-0">
//                 {" "}
//                 <Image
//                   src={door.cover}
//                   className=""
//                   width={1000}
//                   height={1000}
//                   alt={door.title}
//                 />
//                 <div className="flex flex-col">
//                   <h1>{door.title}</h1>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="gap-5 flex items-center justify-center mt-2">
//           <button className="embla__prev" onClick={scrollPrev}>
//             <ArrowLeftIcon className="h-8 w-8 text-red-main" />
//           </button>
//           <button className="embla__next" onClick={scrollNext}>
//             <ArrowRightIcon className="h-8 w-8 text-red-main" />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import doors from "@/Data/ResiDoors.json";

export default function CarouselBox() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const displayDoors = doors.slice(0, 5);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla my-5 w-full">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {displayDoors.map((door) => (
            <div key={door.id} className="flex-[0_0_100%] min-w-0 px-2">
              <div className="relative w-full h-[200px]">
                {" "}
                {/* ✅ Fixed height */}
                <Image
                  src={door.cover}
                  fill
                  alt={door.title}
                  className="object-contain rounded-lg"
                />
              </div>
              <div className="text-center">
                <h1 className=" font-bold">{door.title}</h1>
                <button className="rounded bg-red-main text-white px-2 py-1 mt-1 text-sm">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-5 items-center justify-center">
        <button
          className="p-2 hover:bg-gray-100 rounded transition"
          onClick={scrollPrev}
        >
          <ArrowLeftIcon className="h-8 w-8 text-red-main" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded transition"
          onClick={scrollNext}
        >
          <ArrowRightIcon className="h-8 w-8 text-red-main" />
        </button>
      </div>
    </div>
  );
}
