export interface Door {
  id: number;
  title: string;
  shortDesc: string;
  description: string | string[];
  cover: string;
  gallery: string;
  brochure?: string;
  link?: string;
}

export function slugifyDoorTitle(title: string) {
  return title
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getDoorLink(door: Pick<Door, "title" | "link">, basePath: string) {
  return door.link ?? `${basePath}/${slugifyDoorTitle(door.title)}`;
}

export function getDoorBySlug(doors: Door[], slug: string) {
  return doors.find((door) => slugifyDoorTitle(door.title) === slug);
}

export function getDoorDescription(description: Door["description"]) {
  return Array.isArray(description)
    ? description
    : description
        .split("\n")
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
}
