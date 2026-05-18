import Image from "next/image";

const brands = [
  { alt: "Amarr", image: "/ManufLogos/amarr.png" },
  { alt: "C.H.I. Overhead Doors", image: "/ManufLogos/chi.png" },
  { alt: "Clopay", image: "/ManufLogos/clopay.png" },
  { alt: "Haas Door", image: "/ManufLogos/haas.png" },
  { alt: "LiftMaster", image: "/ManufLogos/liftmaster.png" },
  { alt: "Overhead Door", image: "/ManufLogos/overhead.png" },
  { alt: "Wayne Dalton", image: "/ManufLogos/waynedalton.png" },
];

export default function BrandCarousel() {
  const logoTrack = [...brands, ...brands];

  return (
    <section className="w-full overflow-hidden border-y border-gray-200 bg-white px-4 py-8 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-main">
              Brands We Supply
            </p>
            <h2 className="text-2xl font-bold text-gray-bg">
              Trusted names, stocked locally.
            </h2>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex w-max animate-[brand-scroll_28s_linear_infinite] gap-4 hover:[animation-play-state:paused]">
            {logoTrack.map((brand, index) => (
              <div
                key={`${brand.alt}-${index}`}
                className="flex h-28 w-56 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:h-32 md:w-64"
              >
                <Image
                  src={brand.image}
                  width={230}
                  height={110}
                  alt={`${brand.alt} logo`}
                  className="max-h-20 w-auto object-contain md:max-h-24"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
