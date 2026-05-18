import { Metadata } from "next";
import { notFound } from "next/navigation";
import doors from "@/Data/ResiDoors.json";
import DoorDetail from "@/components/products/DoorDetail";
import { Door, getDoorBySlug, slugifyDoorTitle } from "@/lib/doors";

const residentialDoors = doors as Door[];

interface DoorPageProps {
  params: Promise<{
    door: string;
  }>;
}

export function generateStaticParams() {
  return residentialDoors.map((door) => ({
    door: slugifyDoorTitle(door.title),
  }));
}

export async function generateMetadata({
  params,
}: DoorPageProps): Promise<Metadata> {
  const { door: slug } = await params;
  const door = getDoorBySlug(residentialDoors, slug);

  if (!door) {
    return {
      title: "Residential Door",
    };
  }

  return {
    title: door.title,
    description: door.shortDesc,
  };
}

export default async function ResidentialDoorPage({ params }: DoorPageProps) {
  const { door: slug } = await params;
  const door = getDoorBySlug(residentialDoors, slug);

  if (!door) {
    notFound();
  }

  return (
    <DoorDetail
      backHref="/residential-garage-doors"
      backLabel="Back to residential doors"
      category="Residential"
      door={door}
    />
  );
}
