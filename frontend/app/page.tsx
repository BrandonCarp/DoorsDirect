import HeroCarousel from "@/components/hero/HeroCarousel";
import CarouselBox from "@/components/products/CarouselBox";
import ComAd from "@/components/ads/ComAd";
import EzAd from "@/components/ads/EzAd";

import Map from "@/components/shared/map";
import Services from "@/components/ads/Services";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <section className=" flex flex-col items-center justify-center mt-10 md:mt-20 gap-20">
        <Services />
        <CarouselBox />
        <EzAd />
        <ComAd />

        <Map />
      </section>
    </>
  );
}
