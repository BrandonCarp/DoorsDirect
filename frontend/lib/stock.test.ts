import { describe, it, expect } from "vitest";
import {
  commercialStock,
  lockOptions,
  panelHeights,
  residentialStock,
  springOptions,
  trackLabel,
} from "./stock";

// Invariants for the quote form's in-stock dropdowns — kept in lockstep with
// the DDS floor list (see also lib/door-builder/stock-matrix.test.ts, which
// specs the same floor for the public builder).

const models = (list: { model: string }[]) => [...new Set(list.map((d) => d.model))];

describe("residential floor", () => {
  it("carries the nine floored models and never the 4300", () => {
    const got = models(residentialStock);
    expect(got.sort()).toEqual(
      ["4050", "4051", "4053", "9130", "9133", "GD1LP", "GD1SP", "T50S", "T52S"].sort(),
    );
  });

  it("runs heights 6'0\"-8'0\" everywhere, 9'0\" on White only, 10'0\" nowhere", () => {
    for (const door of residentialStock) {
      expect(door.heights, `${door.color} ${door.model}`).toContain("6'0\"");
      expect(door.heights, `${door.color} ${door.model}`).not.toContain("10'0\"");
      if (door.color === "White") {
        expect(door.heights, `White ${door.model}`).toContain("9'0\"");
      } else {
        expect(door.heights, `${door.color} ${door.model}`).not.toContain("9'0\"");
      }
    }
  });

  it("floors the T52S at 8/9/10/16 wide — the 12' came off the sheet", () => {
    const t52s = residentialStock.find((d) => d.model === "T52S");
    expect(t52s?.widths).toEqual(["8'", "9'", "10'", "16'"]);
  });

  it("labels the brown 4050 'Chocolate Brown', matching the catalogue", () => {
    const colors = residentialStock
      .filter((d) => d.model === "4050")
      .map((d) => d.color);
    expect(colors).toContain("Chocolate Brown");
    expect(colors).not.toContain("Chocolate");
  });

  it("gives every residential entry the full track list", () => {
    for (const door of residentialStock) {
      expect(door.tracks).toEqual(["LHR", "10R", "12R", "15R", "20R", "32R"]);
    }
  });
});

describe("commercial floor", () => {
  it("stocks the 524 family and the 3200", () => {
    expect(models(commercialStock).sort()).toEqual(["3200", "524", "524S", "524V"]);
  });

  it("keeps commercial widths and heights in the stocked range", () => {
    for (const door of commercialStock) {
      expect(door.widths, door.model).toContain("8'2\"");
      expect(door.heights, door.model).toContain("14'0\"");
    }
  });
});

describe("customer-facing option labels", () => {
  it("spells out every track code", () => {
    expect(trackLabel("LHR")).toBe("LHR — Low Head Room");
    expect(trackLabel("FV")).toBe("FV — Full Vertical");
    expect(trackLabel("15R")).toBe('15R — 15" Radius');
    // Unknown codes pass through rather than crashing a dropdown.
    expect(trackLabel("??")).toBe("??");
  });

  it("spells out the locks", () => {
    expect(lockOptions.map((l) => l.label)).toEqual([
      "No Lock",
      "Slide Lock",
      "Lock Bar",
      "Lock Bar Installed",
    ]);
  });

  it("offers both spring types and the stocked panel heights", () => {
    expect([...springOptions]).toEqual(["Extension", "Torsion"]);
    expect([...panelHeights]).toEqual(['18"', '21"', '24"']);
  });
});
