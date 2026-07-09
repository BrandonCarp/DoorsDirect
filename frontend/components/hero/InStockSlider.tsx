"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { commercialStock, residentialStock } from "@/lib/stock";

interface Chip {
  model: string;
  description: string;
  category: "Residential" | "Commercial";
}

function useSlides(): { commercial: Chip[]; residential: Chip[] } {
  return useMemo(() => {
    const commercial: Chip[] = commercialStock.map((d) => ({
      model: d.model,
      description: d.description,
      category: "Commercial",
    }));
    // Residential stock repeats models per color — show each model once.
    const seen = new Set<string>();
    const residential: Chip[] = [];
    for (const d of residentialStock) {
      if (seen.has(d.model)) continue;
      seen.add(d.model);
      residential.push({
        model: d.model,
        description: d.description,
        category: "Residential",
      });
    }
    return { commercial, residential };
  }, []);
}

function ChipLink({ chip }: { chip: Chip }) {
  return (
    <Link
      href={`/request-quote?model=${encodeURIComponent(chip.model)}&category=${chip.category}`}
      className="group rounded-lg bg-white/10 px-4 py-3 transition-colors hover:bg-white/20"
    >
      <span className="block text-base font-bold md:text-lg">
        {chip.model}
        <ArrowRightIcon className="ml-2 inline h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
      <span className="mt-0.5 block text-xs leading-5 text-white/70 md:text-sm">
        {chip.description}
      </span>
    </Link>
  );
}

export default function InStockSlider() {
  const { commercial, residential } = useSlides();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % 2), 7000);
    return () => clearInterval(id);
  }, [paused]);

  const slides = [
    {
      key: "commercial",
      eyebrow: "Ready for pickup",
      title: "Commercial doors in stock now",
      blurb:
        "Standard sizes from 8'2\" to 12'2\" wide, up to 14' tall. Request a quote to hold one.",
      chips: commercial,
      mirrored: false,
      chipCols: "grid-cols-2",
    },
    {
      key: "residential",
      eyebrow: "Ready for pickup",
      title: "Residential doors in stock now",
      blurb:
        "Value, premium, and gallery steel doors in stocked sizes — full doors or replacement panels.",
      chips: residential,
      mirrored: true,
      chipCols: "grid-cols-2 sm:grid-cols-4",
    },
  ];

  return (
    <div
      className="relative mx-auto mt-10 max-w-7xl overflow-hidden rounded-2xl bg-red-main text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.key} className="w-full shrink-0 p-6 md:p-8">
            <div
              className={`flex flex-col gap-6 lg:items-center lg:justify-between ${
                slide.mirrored ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <div className="max-w-sm">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">
                  {slide.eyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-bold leading-snug md:text-3xl">
                  {slide.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/70 md:text-base">
                  {slide.blurb}
                </p>
              </div>
              <div
                className={`grid flex-1 gap-3 lg:max-w-2xl ${slide.chipCols}`}
              >
                {slide.chips.map((chip) => (
                  <ChipLink key={chip.model} chip={chip} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            aria-label={`Show ${slide.key} stock`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              active === i ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
