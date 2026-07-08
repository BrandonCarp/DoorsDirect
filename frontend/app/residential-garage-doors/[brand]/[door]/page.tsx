import { Metadata } from "next";
import { notFound } from "next/navigation";
import DoorDetail from "@/components/products/DoorDetail";
import {
  allResidentialDoors,
  getResidentialBrand,
  getResidentialDoor,
} from "@/lib/residential";
import { slugifyDoorTitle } from "@/lib/doors";

interface DoorPageProps {
  params: Promise<{ brand: string; door: string }>;
}

export function generateStaticParams() {
  return allResidentialDoors.map((door) => ({
    brand: door.brandSlug,
    door: slugifyDoorTitle(door.title),
  }));
}

export async function generateMetadata({
  params,
}: DoorPageProps): Promise<Metadata> {
  const { brand: brandSlug, door: doorSlug } = await params;
  const door = getResidentialDoor(brandSlug, doorSlug);

  if (!door) {
    return { title: "Residential Door" };
  }

  return { title: door.title, description: door.shortDesc };
}

export default async function ResidentialDoorPage({ params }: DoorPageProps) {
  const { brand: brandSlug, door: doorSlug } = await params;
  const door = getResidentialDoor(brandSlug, doorSlug);
  const brand = getResidentialBrand(brandSlug);

  if (!door || !brand) {
    notFound();
  }

  return (
    <DoorDetail
      backHref={`/residential-garage-doors/${brand.slug}`}
      backLabel={`Back to ${brand.name} doors`}
      category="Residential"
      brandName={brand.name}
      door={door}
    />
  );
}
