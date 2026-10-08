import { describe, it, expect } from "vitest";
import {
  collectionOf,
  doorDescription,
  MODEL_LABELS,
  modelsByCollection,
  type BuilderConfig,
} from "./catalog";
import { stockedModels } from "./stock-matrix";

const cfg = (o: Partial<BuilderConfig> = {}): BuilderConfig => ({
  model: "4050",
  widthCode: "9",
  heightCode: "7",
  color: "White",
  style: "solid",
  windowDesign: "",
  spring: "extension",
  track: "15R",
  ...o,
});

describe("collections", () => {
  it("groups the floored models into the three collections, in order", () => {
    expect(modelsByCollection()).toEqual([
      { collection: "Value Steel Collection", models: ["T50S", "T52S"] },
      {
        collection: "Premium Steel Collection",
        models: ["4050", "4051", "4053", "9130", "9133"],
      },
      { collection: "Gallery Collection", models: ["GD1LP", "GD1SP"] },
    ]);
  });

  it("resolves split models through their shared data key", () => {
    expect(collectionOf("4051")).toBe("Premium Steel Collection");
    expect(collectionOf("9133")).toBe("Premium Steel Collection");
    expect(collectionOf("GD1LP")).toBe("Gallery Collection");
  });

  it("has a display label for every floored model", () => {
    for (const model of stockedModels()) {
      expect(MODEL_LABELS[model], model).toBeTruthy();
    }
  });
});

describe("doorDescription — counter-style wording", () => {
  it("describes a solid door", () => {
    expect(doorDescription(cfg(), "15R — 15\" Radius")).toBe(
      "4050 9'0\" x 7'0\" White, solid, no windows, extension springs, 15R — 15\" Radius",
    );
  });

  it("says NO INSERTS outright on a glazed door without a design", () => {
    // Trailing off would leave the counter unable to tell a plain glazed
    // door from one whose insert nobody filled in.
    expect(doorDescription(cfg({ style: "plain" }), "15R — 15\" Radius")).toContain(
      "windows in the top section, no inserts",
    );
  });

  it("names the chosen insert design", () => {
    expect(
      doorDescription(cfg({ style: "inserts", windowDesign: "509" }), "x"),
    ).toContain("Colonial 509 inserts");
  });

  it("writes torsion springs above 8'0\" whatever was selected", () => {
    expect(
      doorDescription(cfg({ heightCode: "9", spring: "extension" }), "x"),
    ).toContain("torsion springs");
  });

  it("respects a torsion selection on a short door", () => {
    expect(doorDescription(cfg({ spring: "torsion" }), "x")).toContain(
      "torsion springs",
    );
  });

  it("mentions the Gallery Collection by name, and only Gallery", () => {
    expect(doorDescription(cfg({ model: "GD1SP" }), "x")).toContain(
      "Gallery Collection",
    );
    expect(doorDescription(cfg(), "x")).not.toContain("Collection");
  });
});
