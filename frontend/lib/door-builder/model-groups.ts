// Vendored from DDS-Web-Tool src/lib/pricing/model-groups.ts (data only, no
// pricing). Some catalog entries cover several door models that share one data
// key (e.g. 4050/4051/4053, GD1LP/GD1SP). The UI shows them as independent
// selections while lookups resolve back to the shared key.

/** Grouped catalog key -> the individual models it should appear as in the selector. */
export const MODEL_SPLIT: Record<string, string[]> = {
  "4050-4051-4053": ["4050", "4051", "4053"],
  "4300": ["4300", "4301", "4310"],
  "9130-9133": ["9130", "9133"],
  "GD1LP-GD1SP": ["GD1LP", "GD1SP"],
};

/** Individual model -> the catalog key that holds its data. */
export const MODEL_DATA_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(MODEL_SPLIT).flatMap(([group, members]) =>
    members.map((m) => [m, group]),
  ),
);

/** Resolve a (possibly split) model to the catalog key that stores its data. */
export function dataKey(model: string): string {
  return MODEL_DATA_KEY[model] ?? model;
}

/** Display order for the model selector within each collection. */
export const MODEL_ORDER = [
  "T50S",
  "T52S",
  "4050",
  "4051",
  "4053",
  "9130",
  "9133",
  "GD1LP",
  "GD1SP",
];

export function modelSort(a: string, b: string): number {
  const ia = MODEL_ORDER.indexOf(a),
    ib = MODEL_ORDER.indexOf(b);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
}
