import clopayDoors from "@/Data/ResiDoors.json";
import chiDoors from "@/Data/CHIResiDoors.json";
import haasDoors from "@/Data/HaasDoorResiDoors.json";
import amarrDoors from "@/Data/AmarrResiDoors.json";
import { Door, slugifyDoorTitle } from "@/lib/doors";

export interface ResidentialBrand {
  slug: string;
  name: string;
  short: string;
  heading: string;
  blurb: string;
}

export interface ResidentialDoor extends Door {
  brandSlug: string;
  brandName: string;
  brandBadge: string;
  href: string;
}

// Order here controls the order brands appear on the "All Residential Doors" page.
export const residentialBrands: ResidentialBrand[] = [
  {
    slug: "clopay",
    name: "Clopay",
    short: "Clopay",
    heading: "Clopay Residential Doors",
    blurb:
      "Explore premium Clopay garage door collections, compare styles, and open each product page for details, brochures, galleries, and quote options.",
  },
  {
    slug: "chi",
    name: "C.H.I. Overhead Doors",
    short: "C.H.I.",
    heading: "C.H.I. Residential Doors",
    blurb:
      "Durable, made-in-USA steel and aluminum doors — from stamped carriage house and raised panel to modern planks and full-view glass.",
  },
  {
    slug: "haas",
    name: "Haas Door",
    short: "Haas",
    heading: "Haas Residential Doors",
    blurb:
      "American-made insulated steel and aluminum doors with full thermal breaks, strong U-factors, and a handcrafted carriage house flagship.",
  },
  {
    slug: "amarr",
    name: "Amarr",
    short: "Amarr",
    heading: "Amarr Residential Doors",
    blurb:
      "Popular carriage house, traditional, and contemporary collections — from the flagship Classica to value-driven steel and full-view designs.",
  },
];

const brandBySlug = new Map(residentialBrands.map((brand) => [brand.slug, brand]));

const sources: { slug: string; doors: Door[] }[] = [
  { slug: "clopay", doors: clopayDoors as Door[] },
  { slug: "chi", doors: chiDoors as Door[] },
  { slug: "haas", doors: haasDoors as Door[] },
  { slug: "amarr", doors: amarrDoors as Door[] },
];

export const allResidentialDoors: ResidentialDoor[] = sources.flatMap(
  ({ slug, doors }) => {
    const brand = brandBySlug.get(slug);
    const brandName = brand ? brand.name : slug;
    const brandBadge = brand ? brand.short : slug;
    return doors.map((door) => ({
      ...door,
      brandSlug: slug,
      brandName,
      brandBadge,
      href: `/residential-garage-doors/${slug}/${slugifyDoorTitle(door.title)}`,
    }));
  },
);

export function getResidentialBrand(slug: string) {
  return brandBySlug.get(slug);
}

export function getResidentialDoorsByBrand(slug: string) {
  return allResidentialDoors.filter((door) => door.brandSlug === slug);
}

export function getResidentialDoor(brandSlug: string, doorSlug: string) {
  return allResidentialDoors.find(
    (door) =>
      door.brandSlug === brandSlug && slugifyDoorTitle(door.title) === doorSlug,
  );
}
