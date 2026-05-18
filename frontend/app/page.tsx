import HeroHeader from "@/components/hero/HeroHeader";
import BrandCarousel from "@/components/hero/BrandCarousel";
import CarouselBox from "@/components/products/CarouselBox";
import ComAd from "@/components/ads/ComAd";
import EzAd from "@/components/ads/EzAd";
import Map from "@/components/shared/map";

export default function Home() {
  return (
    <>
      <HeroHeader />
      <BrandCarousel />
      <section className="flex flex-col items-center justify-center">
        <CarouselBox />
        <EzAd />
        <ComAd />
        <Map />
      </section>
    </>
  );
}
