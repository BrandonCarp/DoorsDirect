import { Metadata } from "next";
import { notFound } from "next/navigation";
import doors from "@/Data/ComDoors.json";
import DoorDetail from "@/components/products/DoorDetail";
import { Door, getDoorBySlug, slugifyDoorTitle } from "@/lib/doors";

const commercialDoors = doors as Door[];

interface DoorPageProps {
  params: Promise<{
    door: string;
  }>;
}

export function generateStaticParams() {
  return commercialDoors.map((door) => ({
    door: slugifyDoorTitle(door.title),
  }));
}

export async function generateMetadata({
  params,
}: DoorPageProps): Promise<Metadata> {
  const { door: slug } = await params;
  const door = getDoorBySlug(commercialDoors, slug);

  if (!door) {
    return {
      title: "Commercial Door",
    };
  }

  return {
    title: door.title,
    description: door.shortDesc,
  };
}

export default async function CommercialDoorPage({ params }: DoorPageProps) {
  const { door: slug } = await params;
  const door = getDoorBySlug(commercialDoors, slug);

  if (!door) {
    notFound();
  }

  return (
    <DoorDetail
      backHref="/commercial-garage-doors"
      backLabel="Back to commercial doors"
      category="Commercial"
      door={door}
    />
  );
}
