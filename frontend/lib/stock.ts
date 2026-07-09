// Shared in-stock door catalog. Single source of truth used by both the
// stock pricing tool and the quote-request form (the form uses it without
// any pricing). Keep pricing data out of this file.

export type StockDoor = {
  color: string;
  model: string;
  category?: string;
  description: string;
  widths: string[];
  heights: string[];
  tracks: string[];
};

export const residentialStock: StockDoor[] = [
  {
    color: "White",
    model: "T50S",
    category: "Value Steel",
    description: "Hollow, Short Panel",
    widths: ["7'6\"", "8'", "9'", "10'", "12'", "15'", "16'"],
    heights: [
      "6'3\"",
      "6'6\"",
      "6'9\"",
      "7'0\"",
      "7'6\"",
      "7'9\"",
      "8'0\"",
      "9'0\"",
      "10'0\"",
    ],
    tracks: ["LHR", "10R", "12R", "15R", "20R", "32R"],
  },
  {
    color: "White",
    model: "T52S",
    category: "Value Steel",
    description: "Vinyl Back, Short Panel",
    widths: ["8'", "9'", "10'", "12'", "16'"],
    heights: [
      "6'3\"",
      "6'6\"",
      "6'9\"",
      "7'0\"",
      "7'6\"",
      "7'9\"",
      "8'0\"",
      "9'0\"",
      "10'0\"",
    ],
    tracks: ["LHR", "10R", "12R", "15R", "20R", "32R"],
  },
  ...["White", "Almond", "Chocolate", "Sandtone"].map((color) => ({
    color,
    model: "4050",
    category: "Premium Steel",
    description: "3 Layer Steel Short Panel",
    widths:
      color === "White"
        ? [
            "7'0\"",
            "7'6\"",
            "8'",
            "9'",
            "10'",
            "12'",
            "14'",
            "15'",
            "16'",
            "18'",
          ]
        : ["7'6\"", "8'", "9'", "16'"],
    heights:
      color === "White"
        ? [
            "6'3\"",
            "6'6\"",
            "6'9\"",
            "7'0\"",
            "7'6\"",
            "7'9\"",
            "8'0\"",
            "9'0\"",
            "10'0\"",
          ]
        : ["6'3\"", "6'6\"", "6'9\"", "7'0\"", "7'6\"", "7'9\"", "8'0\""],
    tracks: ["LHR", "10R", "12R", "15R", "20R", "32R"],
  })),
  {
    color: "Black",
    model: "4050",
    category: "Premium Steel",
    description: "3 Layer Steel Short Panel",
    widths: ["8'", "9'", "16'"],
    heights: ["6'3\"", "6'6\"", "6'9\"", "7'0\"", "7'6\"", "7'9\"", "8'0\""],
    tracks: ["LHR", "10R", "12R", "15R", "20R", "32R"],
  },
  ...[
    ["White", "4051", "3 Layer Steel Flush Panel"],
    ["Black", "4051", "3 Layer Steel Flush Panel"],
    ["White", "4053", "3 Layer Steel Long Panel"],
    ["Black", "4053", "3 Layer Steel Long Panel"],
    ["White", "4300", "3 Layer Steel Short Panel"],
    ["Black", "4300", "3 Layer Steel Short Panel"],
    ["White", "GD1SP", "3 Layer Gallery Short Panel"],
    ["White", "GD1LP", "3 Layer Gallery Long Panel"],
  ].map(([color, model, description]) => ({
    color,
    model,
    category: model.startsWith("GD") ? "Gallery Steel" : "Premium Steel",
    description,
    widths: ["8'", "9'", "16'"],
    heights: ["6'3\"", "6'6\"", "6'9\"", "7'0\"", "7'6\"", "7'9\"", "8'0\""],
    tracks: ["LHR", "10R", "12R", "15R", "20R", "32R"],
  })),
];

export const commercialStock: StockDoor[] = ["524", "524V", "524S", "3200"].map(
  (model) => ({
    color: "White",
    model,
    description:
      model === "3200"
        ? "Steel Insulated Flush Door"
        : model === "524"
          ? "Steel Ribbed Hollow Pan Door"
          : model === "524V"
            ? "Steel Ribbed Vinyl Back Pan Door"
            : "Steel Ribbed Steel Back Pan Door",
    widths: ["8'2\"", "9'2\"", "10'2\"", "12'2\""],
    heights: ["8'0\"", "9'0\"", "10'0\"", "12'0\"", "14'0\""],
    tracks: ["15R", "FV", "LHR"],
  }),
);

export const finishOptions = [
  { value: "solid", label: "Solid" },
  { value: "plain", label: "Plain glass" },
  { value: "insert", label: "Glass with insert" },
] as const;

export const commercialConfigOptions = [
  { value: "solid15R", label: "Solid, 15R" },
  { value: "glass15R", label: "Glass, 15R" },
  { value: "solidFV", label: "Solid, FV" },
  { value: "glassFV", label: "Glass, FV" },
  { value: "solidLHR", label: "Solid, LHR" },
  { value: "glassLHR", label: "Glass, LHR" },
] as const;

// Option name lists (no pricing) for the quote form.
export const springOptions = ["Extension", "Torsion"] as const;

// Locks spelled out for customers (codes match the pricing sheet).
export const lockOptions = [
  { value: "NL", label: "No Lock" },
  { value: "SL", label: "Slide Lock" },
  { value: "LB", label: "Lock Bar" },
  { value: "LBI", label: "Lock Bar Installed" },
] as const;

// Track codes spelled out for customers.
const trackLabels: Record<string, string> = {
  LHR: "LHR — Low Head Room",
  FV: "FV — Full Vertical",
  "10R": '10R — 10" Radius',
  "12R": '12R — 12" Radius',
  "15R": '15R — 15" Radius',
  "20R": '20R — 20" Radius',
  "32R": '32R — 32" Radius',
};

export function trackLabel(code: string) {
  return trackLabels[code] ?? code;
}

// Replacement sections (panels) — stocked heights; width varies per job.
export const panelHeights = ['18"', '21"', '24"'] as const;
export const panelQuantities = ["1", "2", "3", "4", "5", "6+"] as const;
