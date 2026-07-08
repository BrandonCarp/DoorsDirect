import clopayDoors from "@/Data/ComDoors.json";
import chiDoors from "@/Data/CHICommDoors.json";
import haasDoors from "@/Data/HaasCommDoors.json";
import amarrDoors from "@/Data/AmarrCommDoors.json";
import { Door, slugifyDoorTitle } from "@/lib/doors";

export interface CommercialBrand {
  slug: string;
  name: string;
  short: string;
  heading: string;
  blurb: string;
}

export interface CommercialDoor extends Door {
  brandSlug: string;
  brandName: string;
  brandBadge: string;
  href: string;
}

export const commercialBrands: CommercialBrand[] = [
  {
    slug: "clopay",
    name: "Clopay",
    short: "Clopay",
    heading: "Clopay Commercial Doors",
    blurb:
      "Sectional, full-view, high-speed, insulated, and industrial doors built for demanding business applications.",
  },
  {
    slug: "chi",
    name: "C.H.I. Overhead Doors",
    short: "C.H.I.",
    heading: "C.H.I. Commercial Doors",
    blurb:
      "Ribbed and insulated steel sectionals, aluminum full-view storefronts, and heavy-duty rolling service doors.",
  },
  {
    slug: "haas",
    name: "Haas Door",
    short: "Haas",
    heading: "Haas Commercial Doors",
    blurb:
      "American-made insulated steel and aluminum commercial doors with strong U-factors and wind-load options.",
  },
  {
    slug: "amarr",
    name: "Amarr",
    short: "Amarr",
    heading: "Amarr Commercial Doors",
    blurb:
      "Heavy-duty steel and aluminum sectionals plus rolling slat, grille, and sheet doors for any commercial site.",
  },
];

const brandBySlug = new Map(commercialBrands.map((brand) => [brand.slug, brand]));

const sources: { slug: string; doors: Door[] }[] = [
  { slug: "clopay", doors: clopayDoors as Door[] },
  { slug: "chi", doors: chiDoors as Door[] },
  { slug: "haas", doors: haasDoors as Door[] },
  { slug: "amarr", doors: amarrDoors as Door[] },
];

export const allCommercialDoors: CommercialDoor[] = sources.flatMap(
  ({ slug, doors }) => {
    const brand = brandBySlug.get(slug);
    const brandName = brand ? brand.name : slug;
    const brandBadge = brand ? brand.short : slug;
    return doors.map((door) => ({
      ...door,
      brandSlug: slug,
      brandName,
      brandBadge,
      href: `/commercial-garage-doors/${slug}/${slugifyDoorTitle(door.title)}`,
    }));
  },
);

export function getCommercialBrand(slug: string) {
  return brandBySlug.get(slug);
}

export function getCommercialDoorsByBrand(slug: string) {
  return allCommercialDoors.filter((door) => door.brandSlug === slug);
}

export function getCommercialDoor(brandSlug: string, doorSlug: string) {
  return allCommercialDoors.find(
    (door) =>
      door.brandSlug === brandSlug && slugifyDoorTitle(door.title) === doorSlug,
  );
}
