import HeroCarousel from "@/components/hero/HeroCarousel";
import CarouselBox from "@/components/products/CarouselBox";
import ComAd from "@/components/ads/ComAd";
import EzAd from "@/components/ads/EzAd";
// import Advice from "@/components/ads/Advice";
// import Doors from "@/components/ads/Doors";
// import Springs from "@/components/ads/Springs";
// import LmAd from "@/components/ads/LmAd";
import Map from "@/components/shared/map";
import Services from "@/components/ads/Services";

export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      <HeroCarousel />
      <section className=" flex flex-col items-center justify-center mt-10 md:mt-20 gap-20">
        <Services />
        <CarouselBox />
        <EzAd />
        <ComAd />

        {/* <section className="space-y-10 lg:flex lg:gap-5">
          <Springs />
          <Doors />
          <Advice />
        </section> */}

        <Map />
      </section>
    </>
  );
}
