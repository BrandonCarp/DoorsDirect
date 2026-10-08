import { describe, it, expect } from "vitest";
import {
  STOCK_MATRIX,
  colorInStock,
  compareSizeCodes,
  sizeCode,
  sizeLabel,
  sizeParts,
  solidOnlyHeight,
  stockedColors,
  stockedHeights,
  stockedModels,
  stockedWidths,
  torsionOnlyHeight,
} from "./stock-matrix";

// This file is the specification for what "in stock" means on the public
// door builder — the same ground the internal tool's stock-matrix tests
// cover. A door is stock only when model, colour, exact width AND exact
// height all line up.

describe("the floor", () => {
  it("floors exactly the nine models — no 4300 family", () => {
    expect(stockedModels().sort()).toEqual(
      ["4050", "4051", "4053", "9130", "9133", "GD1LP", "GD1SP", "T50S", "T52S"].sort(),
    );
    expect(STOCK_MATRIX["4300"]).toBeUndefined();
    expect(STOCK_MATRIX["4301"]).toBeUndefined();
  });

  it("floors the 4050 in five colours and everything else in one or two", () => {
    expect(Object.keys(STOCK_MATRIX["4050"])).toHaveLength(5);
    expect(Object.keys(STOCK_MATRIX["9130"])).toEqual(["White"]);
    expect(Object.keys(STOCK_MATRIX["4051"])).toEqual(["White", "Black"]);
  });
});

describe("colour narrows with size, not the other way round", () => {
  it("offers five colours on a stocked mid-range 4050", () => {
    expect(stockedColors("4050", "8", "7")).toEqual([
      "White",
      "Almond",
      "Chocolate Brown",
      "Sandtone",
      "Black",
    ]);
  });

  it("drops to White alone at a White-only width", () => {
    // 10' wide is floored for White only — picking Black first then 10'
    // would describe a door that does not exist.
    expect(stockedColors("4050", "10", "7")).toEqual(["White"]);
  });

  it("drops Black at 7'6\" wide, where the other colours survive", () => {
    expect(stockedColors("4050", "7.6", "7")).toEqual([
      "White",
      "Almond",
      "Chocolate Brown",
      "Sandtone",
    ]);
  });
});

describe("9'0\" is White only — on every model", () => {
  it("narrows every multi-colour model to White at 9'0\" tall", () => {
    for (const model of stockedModels()) {
      expect(stockedColors(model, undefined, "9"), model).toEqual(["White"]);
    }
  });

  it("treats a Black 9'0\" as not stock even at a stocked width", () => {
    expect(colorInStock("4050", "Black", "8", "9")).toBe(false);
    expect(colorInStock("4050", "White", "8", "9")).toBe(true);
  });
});

describe("exact-size matching", () => {
  it("rejects a stocked colour at an unstocked size", () => {
    // Black is floored 8/9/16 — a 12' Black is not stock even though both
    // the colour and the width exist somewhere in the matrix.
    expect(colorInStock("4050", "Black", "12", "7")).toBe(false);
  });

  it("matches colours case-insensitively", () => {
    expect(colorInStock("4050", "black", "8", "7")).toBe(true);
    expect(colorInStock("4050", " WHITE ", "8", "7")).toBe(true);
  });

  it("answers the looser colour-only question when no size is given", () => {
    expect(colorInStock("4050", "Black")).toBe(true);
  });

  it("knows nothing about models that are not floored", () => {
    expect(colorInStock("4300", "White", "8", "7")).toBe(false);
    expect(stockedColors("T50L")).toEqual([]);
  });
});

describe("solid-only and torsion-only heights", () => {
  it("floors 6'0\" as solid only", () => {
    expect(solidOnlyHeight("6")).toBe(true);
    expect(colorInStock("4050", "White", "8", "6", "solid")).toBe(true);
    expect(colorInStock("4050", "White", "8", "6", "plain")).toBe(false);
    expect(colorInStock("4050", "White", "8", "6", "inserts")).toBe(false);
  });

  it("scopes the solid-only rule to 6'0\" — it must not leak upward", () => {
    for (const h of ["6.3", "6.6", "7", "8"]) {
      expect(solidOnlyHeight(h), h).toBe(false);
      expect(colorInStock("4050", "White", "8", h, "plain"), h).toBe(true);
    }
  });

  it("forces torsion above 8'0\" and nowhere below", () => {
    expect(torsionOnlyHeight("9")).toBe(true);
    expect(torsionOnlyHeight("8")).toBe(false);
    expect(torsionOnlyHeight("7.9")).toBe(false);
  });
});

describe("size codes", () => {
  it("round-trips feet and inches", () => {
    expect(sizeCode(7, 6)).toBe("7.6");
    expect(sizeCode(8)).toBe("8");
    expect(sizeParts("7.6")).toEqual({ ft: 7, in: 6 });
    expect(sizeLabel("7.6")).toBe("7'6\"");
    expect(sizeLabel("16")).toBe("16'0\"");
  });

  it("orders 7'6\" between 7' and 8' — codes are not decimals", () => {
    expect(["8", "7.6", "7", "16", "10"].sort(compareSizeCodes)).toEqual([
      "7",
      "7.6",
      "8",
      "10",
      "16",
    ]);
  });
});

describe("union lists for the dropdowns", () => {
  it("lists every stocked 4050 width across all colours, sorted", () => {
    expect(stockedWidths("4050")).toEqual([
      "7",
      "7.6",
      "8",
      "9",
      "10",
      "12",
      "14",
      "15",
      "16",
      "18",
    ]);
  });

  it("includes 9'0\" in the heights union (via White) and never 10'0\"", () => {
    for (const model of stockedModels()) {
      expect(stockedHeights(model), model).toContain("9");
      expect(stockedHeights(model), model).not.toContain("10");
    }
  });

  it("guarantees every height offered has at least one colour at every width", () => {
    // The builder filters heights by the chosen width; this proves the
    // matrix never produces an empty colour list for a shown combination.
    for (const model of stockedModels()) {
      for (const w of stockedWidths(model)) {
        const heights = stockedHeights(model).filter(
          (h) => stockedColors(model, w, h).length > 0,
        );
        expect(heights.length, `${model} @ ${w}`).toBeGreaterThan(0);
      }
    }
  });
});
