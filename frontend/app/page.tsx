import Image from "next/image";
import Hero from "@/components/HeroSection";
import CarouselBox from "@/components/CarouselBox";
import ComAd from "@/components/ComAd";
import EzAd from "@/components/EzAd";
import Springs from "@/components/Springs";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      <HeroCarousel />
      <section className=" flex flex-col items-center justify-center mt-10 space-y-20">
        <CarouselBox />
        <EzAd />
        <ComAd />
        <Springs />
      </section>
    </>
  );
}
