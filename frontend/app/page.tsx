import Image from "next/image";
import Link from "next/link";
import extira from "@/public/DoorImages/ResiDoors/extira.png";
import Hero from "@/components/HeroSection";
import CarouselBox from "@/components/CarouselBox";
import ResiDoors from "@/Data/ResiDoors.json";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="flex flex-col items-center justify-center">
        <CarouselBox />
      </section>
    </>
  );
}
