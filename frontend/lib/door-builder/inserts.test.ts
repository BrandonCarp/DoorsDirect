import { describe, it, expect } from "vitest";
import {
  ARCHITECTURAL,
  DECORATIVE,
  designName,
  excludedDesignsFor,
  windowDesigns,
} from "./inserts";

const ids = (model: string, style: string, width: string | null) =>
  windowDesigns(model, style, width).map((d) => d.id);

describe("designs are inserts, not glass", () => {
  it("offers no designs on a solid door", () => {
    expect(windowDesigns("4050", "solid", "8")).toEqual([]);
  });

  it("offers no designs with plain glass — Gallery included", () => {
    // Otherwise an insert could ride along at the plain-glass selection.
    expect(windowDesigns("4050", "plain", "8")).toEqual([]);
    expect(windowDesigns("GD1SP", "plain", "8")).toEqual([]);
  });
});

describe("per-model rules", () => {
  it("gives short-rule models the 500-series only", () => {
    // T50S is 'short': plain short windows and sunsets, no 600-series.
    for (const id of ids("T50S", "inserts", "8")) {
      expect(id.startsWith("5"), id).toBe(true);
    }
  });

  it("adds long-panel designs for the 4051 (shortlong)", () => {
    const got = ids("4051", "inserts", "8");
    expect(got).toContain("509"); // short stays
    expect(got).toContain("608"); // long joins
  });

  it("gives the 4053 and 9133 everything the width allows", () => {
    for (const model of ["4053", "9133"]) {
      const got = ids(model, "inserts", "8");
      expect(got, model).toContain("509");
      expect(got, model).toContain("608");
    }
  });

  it("never offers Sunset 507 on the 4050 or T52S", () => {
    expect(excludedDesignsFor("4050")).toContain("507");
    expect(ids("4050", "inserts", "8")).not.toContain("507");
    expect(ids("T52S", "inserts", "8")).not.toContain("507");
    // ...but other models with the same rule class still get it.
    expect(ids("T50S", "inserts", "8")).toContain("507");
  });
});

describe("width restrictions", () => {
  it("hides width-limited sunsets at widths they are not built for", () => {
    // Sunset 502 exists at 7', 7'6" and 12' only.
    expect(ids("T50S", "inserts", "12")).toContain("502");
    expect(ids("T50S", "inserts", "8")).not.toContain("502");
  });

  it("drops width-limited designs entirely when no width is chosen yet", () => {
    expect(ids("T50S", "inserts", null)).not.toContain("502");
    // Unrestricted designs still show.
    expect(ids("T50S", "inserts", null)).toContain("509");
  });
});

describe("Gallery architectural inserts", () => {
  it("offers architectural designs only — never the decorative list", () => {
    const got = ids("GD1SP", "inserts", "8");
    const archIds = ARCHITECTURAL.map((d) => d.id);
    const decIds = DECORATIVE.map((d) => d.id);
    for (const id of got) expect(archIds, id).toContain(id);
    for (const id of got) expect(decIds, id).not.toContain(id);
  });

  it("builds Arch 2 at 8' and 9' only, Arch 3 at 16' only", () => {
    expect(ids("GD1LP", "inserts", "8")).toContain("ARCH2PLAIN");
    expect(ids("GD1LP", "inserts", "8")).not.toContain("ARCH3PLAIN");
    expect(ids("GD1LP", "inserts", "16")).toContain("ARCH3PLAIN");
    expect(ids("GD1LP", "inserts", "16")).not.toContain("ARCH2PLAIN");
  });
});

describe("designName", () => {
  it("resolves ids from both lists and null for unknowns", () => {
    expect(designName("509")).toBe("Colonial 509");
    expect(designName("ARCH1GRILLE")).toBe("Arch 1 Grille");
    expect(designName("nope")).toBeNull();
    expect(designName(null)).toBeNull();
  });
});
