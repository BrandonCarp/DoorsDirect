import { Metadata } from "next";
import { notFound } from "next/navigation";
import DoorDetail from "@/components/products/DoorDetail";
import {
  allCommercialDoors,
  getCommercialBrand,
  getCommercialDoor,
} from "@/lib/commercial";
import { slugifyDoorTitle } from "@/lib/doors";

interface DoorPageProps {
  params: Promise<{ brand: string; door: string }>;
}

export function generateStaticParams() {
  return allCommercialDoors.map((door) => ({
    brand: door.brandSlug,
    door: slugifyDoorTitle(door.title),
  }));
}

export async function generateMetadata({
  params,
}: DoorPageProps): Promise<Metadata> {
  const { brand: brandSlug, door: doorSlug } = await params;
  const door = getCommercialDoor(brandSlug, doorSlug);

  if (!door) {
    return { title: "Commercial Door" };
  }

  return { title: door.title, description: door.shortDesc };
}

export default async function CommercialDoorPage({ params }: DoorPageProps) {
  const { brand: brandSlug, door: doorSlug } = await params;
  const door = getCommercialDoor(brandSlug, doorSlug);
  const brand = getCommercialBrand(brandSlug);

  if (!door || !brand) {
    notFound();
  }

  return (
    <DoorDetail
      backHref={`/commercial-garage-doors/${brand.slug}`}
      backLabel={`Back to ${brand.name} doors`}
      category="Commercial"
      brandName={brand.name}
      door={door}
    />
  );
}
