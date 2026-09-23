// Public catalogue metadata for the door builder. Collections come from the
// internal tool's catalog-meta.ts (COLLECTIONS only — margins and premium
// colour adders deliberately NOT vendored). Labels are display copy.

import { dataKey, modelSort } from "./model-groups";
import { designName } from "./inserts";
import { sizeLabel, stockedModels, torsionOnlyHeight } from "./stock-matrix";

export const COLLECTIONS: Record<string, string> = {
  "GD1LP-GD1SP": "Gallery Collection",
  T50S: "Value Steel Collection",
  T52S: "Value Steel Collection",
  "4050-4051-4053": "Premium Steel Collection",
  "9130-9133": "Premium Steel Collection",
  "4300": "Premium Steel Collection",
};

export const COLLECTION_ORDER = [
  "Value Steel Collection",
  "Premium Steel Collection",
  "Gallery Collection",
];

export function collectionOf(model: string): string {
  return COLLECTIONS[dataKey(model)] ?? "Other";
}

/** Short display line for each stocked model. */
export const MODEL_LABELS: Record<string, string> = {
  T50S: "Hollow Short Panel",
  T52S: "Vinyl Back Short Panel",
  "4050": "3-Layer Steel Short Panel",
  "4051": "3-Layer Steel Flush Panel",
  "4053": "3-Layer Steel Long Panel",
  "9130": "Premium Steel Short Panel",
  "9133": "Premium Steel Long Panel",
  GD1SP: "Gallery Short Panel",
  GD1LP: "Gallery Long Panel",
};

/** Stocked models grouped by collection, in catalogue order. */
export function modelsByCollection(): { collection: string; models: string[] }[] {
  const models = stockedModels().sort(modelSort);
  return COLLECTION_ORDER.map((collection) => ({
    collection,
    models: models.filter((m) => collectionOf(m) === collection),
  })).filter((g) => g.models.length > 0);
}

export interface BuilderConfig {
  model: string;
  widthCode: string;
  heightCode: string;
  color: string;
  style: "solid" | "plain" | "inserts";
  windowDesign: string; // design id, "" for none
  spring: "torsion" | "extension";
  track: string; // track code, e.g. "15R"
}

/**
 * Door description in the same shape the counter's quotes use, so a request
 * arriving by email reads like one built in-house.
 */
export function doorDescription(cfg: BuilderConfig, trackLabelText: string): string {
  let winTxt = "solid, no windows";
  if (cfg.style !== "solid") {
    const dn = cfg.windowDesign ? designName(cfg.windowDesign) : null;
    winTxt = `windows in the top section${dn ? ", " + dn + " inserts" : ", no inserts"}`;
  }
  const springTxt =
    torsionOnlyHeight(cfg.heightCode) || cfg.spring === "torsion"
      ? "torsion springs"
      : "extension springs";
  const coll = collectionOf(cfg.model);
  const collTxt = coll === "Gallery Collection" ? `${coll}, ` : "";
  return (
    `${cfg.model} ${sizeLabel(cfg.widthCode)} x ${sizeLabel(cfg.heightCode)} ` +
    `${cfg.color}, ${collTxt}${winTxt}, ${springTxt}, ${trackLabelText}`
  );
}
