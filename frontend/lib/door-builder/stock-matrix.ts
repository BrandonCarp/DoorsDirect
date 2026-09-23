// Vendored from DDS-Web-Tool src/lib/pricing/data/stock-colors.ts — the stock
// matrix and its helpers ONLY. No prices, margins, or surcharges exist in this
// file or anywhere under lib/door-builder/; the public builder is a catalogue.
//
// A door is only IN STOCK when the model, the colour, the exact WIDTH and the
// exact HEIGHT all appear together. The 4050 is floored in five colours, but
// only White runs the full width range and only White goes above 8'0" tall.
//
// Sizes are stored as catalog codes — whole feet as "8", inches as "7.6" for
// 7'6".
//
// NOTE: when the floor changes in the internal tool's stock-colors.ts, this
// file must be updated to match (see PUBLIC-DOOR-BUILDER-HANDOFF).

import { dataKey } from "./model-groups";

export interface StockRange {
  /** Exact widths floored in this colour. */
  widths: string[];
  /** Exact heights floored in this colour. */
  heights: string[];
}

/** Heights every floored colour carries, on every model. */
const SHORT_HEIGHTS = ["6", "6.3", "6.6", "6.9", "7", "7.6", "7.9", "8"];
/** White runs tall, to 9'0". */
const WHITE_HEIGHTS = [...SHORT_HEIGHTS, "9"];

/** Heights floored ONLY as solid doors — no glazed 6'0" exists to sell. */
export const SOLID_ONLY_HEIGHTS = ["6"];

/**
 * True when a height's door comes with torsion springs included — everything
 * over 8'0" tall. Extension springs are not an option there.
 */
export function torsionOnlyHeight(heightCode: string): boolean {
  const { ft, in: inches } = sizeParts(heightCode);
  return ft * 12 + inches > 96;
}

/** True when a height is floored in solid only, so windows must not be offered. */
export function solidOnlyHeight(heightCode: string): boolean {
  return SOLID_ONLY_HEIGHTS.includes(heightCode);
}

/**
 * model -> colour -> the sizes floored in it.
 *
 * Keyed by individual model, not by catalog group: the 4050 stocks five colours
 * across ten widths while the 4051 and 4053 stock two colours across three.
 */
export const STOCK_MATRIX: Record<string, Record<string, StockRange>> = {
  T50S: {
    White: {
      widths: ["7.6", "8", "9", "10", "12", "15", "16"],
      heights: WHITE_HEIGHTS,
    },
  },
  T52S: {
    White: { widths: ["8", "9", "10", "16"], heights: WHITE_HEIGHTS },
  },
  "4050": {
    White: {
      widths: ["7", "7.6", "8", "9", "10", "12", "14", "15", "16", "18"],
      heights: WHITE_HEIGHTS,
    },
    Almond: { widths: ["7.6", "8", "9", "16"], heights: SHORT_HEIGHTS },
    "Chocolate Brown": { widths: ["7.6", "8", "9", "16"], heights: SHORT_HEIGHTS },
    Sandtone: { widths: ["7.6", "8", "9", "16"], heights: SHORT_HEIGHTS },
    Black: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
  },
  "4051": {
    White: { widths: ["8", "9", "16"], heights: WHITE_HEIGHTS },
    Black: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
  },
  "4053": {
    White: { widths: ["8", "9", "16"], heights: WHITE_HEIGHTS },
    Black: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
  },
  "9130": {
    White: { widths: ["8", "9", "16"], heights: WHITE_HEIGHTS },
  },
  "9133": {
    White: { widths: ["8", "9", "16"], heights: WHITE_HEIGHTS },
  },
  GD1LP: {
    White: { widths: ["8", "9", "16"], heights: WHITE_HEIGHTS },
  },
  GD1SP: {
    White: { widths: ["8", "9", "16"], heights: WHITE_HEIGHTS },
  },
  // The 4300 family is not floored as a complete door.
};

/** Feet + inches -> catalog size code ("7.6" for 7'6"). */
export function sizeCode(ft: number, inch = 0): string {
  return inch ? `${ft}.${inch}` : String(ft);
}

/**
 * Is this exact door on the floor? When width/height are given, BOTH must
 * match a floored size — a stocked colour in an unstocked size is not stock.
 */
export function colorInStock(
  model: string,
  color: string,
  widthCode?: string,
  heightCode?: string,
  style?: string,
): boolean {
  const byColor = STOCK_MATRIX[model] ?? STOCK_MATRIX[dataKey(model)];
  if (!byColor) return false;
  const want = String(color || "")
    .trim()
    .toLowerCase();
  const entry = Object.entries(byColor).find(
    ([c]) => c.toLowerCase() === want,
  )?.[1];
  if (!entry) return false;
  if (widthCode != null && !entry.widths.includes(widthCode)) return false;
  if (heightCode != null && !entry.heights.includes(heightCode)) return false;
  if (
    heightCode != null &&
    style != null &&
    style !== "solid" &&
    solidOnlyHeight(heightCode)
  ) {
    return false;
  }
  return true;
}

/**
 * Colours floored for a model, narrowed to a size when one is given. The
 * colour dropdown must call this with the chosen size — availability is per
 * colour AND per size, not per model.
 */
export function stockedColors(
  model: string,
  widthCode?: string,
  heightCode?: string,
): string[] {
  const byColor = STOCK_MATRIX[model] ?? STOCK_MATRIX[dataKey(model)];
  if (!byColor) return [];
  return Object.keys(byColor).filter((c) =>
    colorInStock(model, c, widthCode, heightCode),
  );
}

/** Order two size codes: "7.6" is 7 feet 6 inches, not 7.6 feet. */
export function compareSizeCodes(a: string, b: string): number {
  const parse = (c: string) => {
    const [ft, inch] = c.split(".");
    return [Number(ft), Number(inch ?? 0)] as const;
  };
  const [af, ai] = parse(a);
  const [bf, bi] = parse(b);
  return af - bf || ai - bi;
}

/** A size code back into feet and inches. */
export function sizeParts(code: string): { ft: number; in: number } {
  const [ft, inch] = code.split(".");
  return { ft: Number(ft), in: Number(inch ?? 0) };
}

/** `7.6` -> `7'6"`, for a dropdown label. */
export function sizeLabel(code: string): string {
  const { ft, in: inches } = sizeParts(code);
  return `${ft}'${inches}"`;
}

/** Every width DDS floors for a model, across all of its colours. */
export function stockedWidths(model: string): string[] {
  const entry = STOCK_MATRIX[model] ?? STOCK_MATRIX[dataKey(model)];
  if (!entry) return [];
  return [...new Set(Object.values(entry).flatMap((v) => v.widths))].sort(
    compareSizeCodes,
  );
}

/** Every height DDS floors for a model, across all of its colours. */
export function stockedHeights(model: string): string[] {
  const entry = STOCK_MATRIX[model] ?? STOCK_MATRIX[dataKey(model)];
  if (!entry) return [];
  return [...new Set(Object.values(entry).flatMap((v) => v.heights))].sort(
    compareSizeCodes,
  );
}

/** Every model with at least one complete door on the floor. */
export function stockedModels(): string[] {
  return Object.keys(STOCK_MATRIX);
}
