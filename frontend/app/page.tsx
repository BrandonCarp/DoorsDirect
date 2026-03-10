import Image from "next/image";
import Hero from "@/components/HeroSection";
import CarouselBox from "@/components/CarouselBox";
import ComAd from "@/components/ComAd";
import EzAd from "@/components/EzAd";
import Springs from "@/components/Springs";
import HeroCarousel from "@/components/HeroCarousel";
import Map from "@/components/map";

export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      <HeroCarousel />
      <section className=" flex flex-col items-center justify-center mt-10 md:mt-20 gap-20 md:gap-30">
        <CarouselBox />
        <EzAd />
        <ComAd />

        <Springs />
        <Map />
      </section>
    </>
  );
}
