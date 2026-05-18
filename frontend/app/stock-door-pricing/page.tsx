"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalculatorIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

type StockDoor = {
  color: string;
  model: string;
  category?: string;
  description: string;
  widths: string[];
  heights: string[];
  tracks: string[];
};

type PriceRow = {
  width: number;
  height: number;
  solid: number;
  plain?: number;
  insert?: number;
};

type CommercialPriceRow = {
  width: string;
  height: string;
  solid15R: number;
  glass15R: number;
  solidFV: number;
  glassFV: number;
  solidLHR: number;
  glassLHR: number;
};

const trackAddOns: Record<string, number> = {
  "10R": 0,
  "12R": 0,
  "15R": 0,
  "20R": 225,
  "32R": 225,
  LHR: 45,
};

const springAddOns: Record<string, number> = {
  Torsion: 30,
  Extension: 0,
};

const lockAddOns: Record<string, number> = {
  NL: 0,
  SL: 5,
  LB: 45,
  LBI: 70,
};

const residentialStock: StockDoor[] = [
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

const commercialStock: StockDoor[] = ["524", "524V", "524S", "3200"].map(
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

const residentialPriceRows: Record<string, PriceRow[]> = {
  T50S: [
    [7.5, 7, 625.37, 761.8, 852.75],
    [8, 7, 560.37, 696.8, 787.75],
    [9, 7, 595.58, 732.0, 822.95],
    [10, 7, 695.33, 865.49, 979.92],
    [12, 7, 792.15, 997.52, 1133.94],
    [14, 7, 840.56, 1079.67, 1239.56],
    [15, 7, 912.44, 1151.55, 1311.44],
    [16, 7, 982.85, 1255.7, 1437.6],
    [18, 7, 1223.43, 1496.28, 1678.18],
    [8, 8, 665.99, 802.42, 893.37],
    [9, 8, 698.26, 834.69, 925.64],
    [10, 8, 748.14, 918.3, 1032.73],
    [12, 8, 962.31, 1167.68, 1304.11],
    [14, 8, 1035.66, 1274.77, 1434.67],
    [15, 8, 1106.07, 1345.18, 1505.08],
    [16, 8, 1144.21, 1417.06, 1598.96],
    [18, 8, 1282.11, 1554.96, 1736.86],
    [8, 9, 978.84, 1121.53, 1216.65],
    [9, 9, 1017.18, 1159.87, 1255],
    [10, 9, 1087.78, 1266.15, 1385.05],
    [12, 9, 1408.44, 1622.47, 1765.16],
    [14, 9, 1515.84, 1765.53, 1932],
    [15, 9, 1618.62, 1868.31, 2034.78],
    [16, 9, 1690.73, 1976.11, 2166.35],
    [18, 9, 2095.76, 2381.15, 2571.38],
  ].map(toPriceRow),
  T52S: [
    [8, 7, 662.42, 790.23, 875.43],
    [9, 7, 698.15, 825.96, 911.17],
    [10, 7, 821.84, 981.26, 1088.45],
    [12, 7, 1067.84, 1260.24, 1388.05],
    [14, 7, 1099.45, 1323.46, 1473.26],
    [15, 7, 1125.56, 1349.57, 1499.37],
    [16, 7, 1131.05, 1386.68, 1557.09],
    [18, 7, 1275.36, 1530.98, 1701.39],
    [8, 8, 786.1, 913.91, 999.12],
    [9, 8, 835.58, 963.39, 1048.6],
    [10, 8, 970.26, 1129.68, 1236.88],
    [12, 8, 1225.88, 1418.28, 1546.1],
    [14, 8, 1261.61, 1485.63, 1635.43],
    [15, 8, 1355.07, 1579.08, 1728.88],
    [16, 8, 1363.31, 1618.93, 1789.35],
    [18, 8, 1580.45, 1836.07, 2006.49],
    [8, 9, 1107.69, 1242.34, 1332.1],
    [9, 9, 1164.16, 1298.81, 1388.57],
    [10, 9, 1223.52, 1391.84, 1504.07],
    [12, 9, 1591.29, 1793.28, 1927.93],
    [14, 9, 1702.81, 1938.47, 2095.55],
    [15, 9, 1822.97, 2058.62, 2215.71],
    [16, 9, 1980.81, 2250.12, 2429.67],
    [18, 9, 2245.79, 2515.1, 2694.66],
  ].map(toPriceRow),
  "4050": [
    [7.6, 7, 775.65, 937.72, 1015.02],
    [8, 7, 710.65, 872.72, 950.02],
    [9, 7, 765.5, 927.58, 1004.88],
    [10, 7, 864, 1065.97, 1163.22],
    [12, 7, 1051.01, 1294.12, 1410.07],
    [14, 7, 1184.41, 1468.67, 1604.56],
    [15, 7, 1240.51, 1524.77, 1660.67],
    [16, 7, 1261.71, 1585.86, 1740.46],
    [18, 7, 1514.8, 1838.95, 1993.55],
    [8, 8, 852.78, 1014.85, 1092.15],
    [9, 8, 926.33, 1088.41, 1165.71],
    [10, 8, 1059.74, 1261.71, 1358.95],
    [12, 8, 1243.01, 1486.12, 1602.07],
    [14, 8, 1420.04, 1704.3, 1840.2],
    [15, 8, 1513.55, 1797.81, 1933.7],
    [16, 8, 1572.15, 1896.3, 2050.9],
    [18, 8, 1837.71, 2161.86, 2316.46],
    [8, 9, 1167.07, 1337.36, 1418.56],
    [9, 9, 1264, 1434.29, 1515.49],
    [10, 9, 1464.4, 1677.24, 1778.73],
    [12, 9, 1756.51, 2011.93, 2133.73],
    [14, 9, 1967.4, 2265.38, 2407.49],
    [15, 9, 2065.64, 2363.62, 2505.73],
    [16, 9, 2179.58, 2520.13, 2682.55],
    [18, 9, 2631.49, 2972.04, 3134.45],
  ].map(toPriceRow),
  "4051": [],
  "4053": [],
  "4300": [
    [8, 7, 823.71, 976.9, 1049.96],
    [9, 7, 889.7, 1042.89, 1115.96],
    [10, 7, 996.94, 1187.84, 1279.75],
    [12, 7, 1209.05, 1438.84, 1548.43],
    [14, 7, 1364.6, 1633.28, 1761.73],
    [15, 7, 1434.13, 1702.8, 1831.25],
    [16, 7, 1471.84, 1778.22, 1924.35],
    [18, 7, 1748.76, 2055.15, 2201.27],
    [8, 8, 982.8, 1135.99, 1209.05],
    [9, 8, 1065.28, 1218.48, 1291.54],
    [10, 8, 1223.19, 1414.09, 1506.01],
    [12, 8, 1435.31, 1665.1, 1774.69],
    [14, 8, 1640.35, 1909.03, 2037.47],
    [15, 8, 1747.58, 2016.26, 2144.71],
    [16, 8, 1813.58, 2119.96, 2266.09],
    [18, 8, 2123.5, 2429.88, 2576.01],
    [8, 9, 1311.74, 1472.61, 1549.33],
    [9, 9, 1398.37, 1559.25, 1635.96],
    [10, 9, 1561.72, 1762.82, 1858.74],
    [12, 9, 1873.54, 2114.84, 2229.93],
    [14, 9, 2098.77, 2380.3, 2514.58],
    [15, 9, 2203.95, 2485.47, 2619.75],
    [16, 9, 2398.25, 2719.98, 2873.44],
    [18, 9, 2869.74, 3191.47, 3344.93],
  ].map(toPriceRow),
};
residentialPriceRows["4051"] = residentialPriceRows["4050"];
residentialPriceRows["4053"] = residentialPriceRows["4050"];

const commercialPriceRows: Record<string, CommercialPriceRow[]> = {
  "3200": [
    ["8'2\"", "8'0\"", 1230.37, 1432.95, 1428.89, 1631.47, 1370.12, 1572.7],
    ["8'2\"", "9'0\"", 1418.46, 1621.04, 1641.81, 1844.39, 1558.21, 1760.79],
    ["8'2\"", "10'0\"", 1505.96, 1708.54, 1754.12, 1956.7, 1645.72, 1848.3],
    ["8'2\"", "12'0\"", 1840.35, 2042.93, 2138.16, 2340.74, 1980.11, 2182.68],
    ["8'2\"", "14'0\"", 2127.68, 2330.26, 2475.12, 2677.7, 2267.44, 2470.02],
    ["9'2\"", "8'0\"", 1321.81, 1524.39, 1520.33, 1722.91, 1461.56, 1664.14],
    ["9'2\"", "9'0\"", 1542.54, 1745.12, 1765.89, 1968.47, 1682.3, 1884.88],
    ["9'2\"", "10'0\"", 1622.21, 1824.79, 1870.37, 2072.95, 1761.96, 1964.54],
    ["9'2\"", "12'0\"", 1986.61, 2189.19, 2284.42, 2487, 2126.37, 2328.95],
    ["9'2\"", "14'0\"", 2300.09, 2502.67, 2647.53, 2850.11, 2439.84, 2642.42],
    ["10'2\"", "8'0\"", 1449.81, 1753.68, 1630.79, 1952.21, 1589.56, 1893.44],
    ["10'2\"", "9'0\"", 1674.46, 1978.33, 1897.81, 2201.68, 1814.21, 2118.09],
    ["10'2\"", "10'0\"", 1771.12, 2075, 2019.28, 2323.16, 1910.88, 2214.75],
    ["10'2\"", "12'0\"", 2232.19, 2536.07, 2530, 2833.88, 2371.95, 2675.82],
    ["10'2\"", "14'0\"", 2506.47, 2810.35, 2853.91, 3157.79, 2646.23, 2950.11],
    ["12'2\"", "8'0\"", 1665.32, 1969.19, 1863.84, 2167.72, 1805.07, 2108.95],
    ["12'2\"", "9'0\"", 1908.26, 2212.14, 2131.61, 2435.49, 2048.02, 2351.89],
    ["12'2\"", "10'0\"", 2032.33, 2336.21, 2280.49, 2584.37, 2172.09, 2475.96],
    ["12'2\"", "12'0\"", 2471.19, 2775.07, 2769, 3072.88, 2610.95, 2914.82],
    ["12'2\"", "14'0\"", 2867.91, 3170.84, 3214.4, 3518.28, 3006.72, 3310.6],
  ].map(toCommercialRow),
  "524": [
    ["8'2\"", "8'0\"", 867.98, 1053.56, 1051.84, 1230.91, 988.4, 1167.47],
    ["8'2\"", "9'0\"", 977.58, 1163.16, 1184.39, 1363.46, 1094.16, 1273.23],
    ["8'2\"", "10'0\"", 1055.04, 1197.09, 1285.91, 1464.98, 1168.89, 1347.96],
    ["8'2\"", "12'0\"", 1297.62, 1431.16, 1573.56, 1752.63, 1402.96, 1582.04],
    ["8'2\"", "14'0\"", 1505.11, 1631.37, 1827.37, 2006.44, 1603.18, 1782.25],
    ["9'2\"", "8'0\"", 910.36, 1057.49, 1092.74, 1271.81, 1029.3, 1207.32],
    ["9'2\"", "9'0\"", 1028.73, 1171.7, 1233.74, 1412.81, 1143.51, 1322.58],
    ["9'2\"", "10'0\"", 1103.24, 1243.6, 1332.42, 1511.49, 1215.4, 1394.77],
    ["9'2\"", "12'0\"", 1372.13, 1503.05, 1645.46, 1824.53, 1474.86, 1653.93],
    ["9'2\"", "14'0\"", 1589.87, 1713.16, 1909.16, 2088.23, 1684.96, 1864.04],
    ["10'2\"", "8'0\"", 971.73, 1206.23, 1151.95, 1420.54, 1088.51, 1357.11],
    ["10'2\"", "9'0\"", 1101.78, 1331.72, 1304.23, 1572.82, 1214, 1482.6],
    ["10'2\"", "10'0\"", 1190.91, 1417.72, 1417.02, 1685.61, 1300, 1568.6],
    ["10'2\"", "12'0\"", 1464.18, 1681.4, 1734.28, 2002.88, 1563.68, 1832.28],
    ["10'2\"", "14'0\"", 1671.69, 1881.63, 1988.11, 2256.7, 1763.91, 2032.51],
    ["12'2\"", "8'0\"", 1120.8, 1350.07, 1278.53, 1564.39, 1232.35, 1500.95],
    ["12'2\"", "9'0\"", 1263.98, 1488.23, 1460.74, 1729.33, 1370.51, 1639.11],
    ["12'2\"", "10'0\"", 1358.98, 1579.89, 1579.19, 1847.79, 1462.18, 1730.77],
    ["12'2\"", "12'0\"", 1652.69, 1863.3, 1916.18, 2184.77, 1745.58, 2014.18],
    ["12'2\"", "14'0\"", 1943.49, 2143.89, 2250.37, 2518.96, 2026.18, 2294.77],
  ].map(toCommercialRow),
};

const finishOptions = [
  { value: "solid", label: "Solid" },
  { value: "plain", label: "Plain glass" },
  { value: "insert", label: "Glass with insert" },
] as const;

const commercialConfigOptions = [
  { value: "solid15R", label: "Solid, 15R" },
  { value: "glass15R", label: "Glass, 15R" },
  { value: "solidFV", label: "Solid, FV" },
  { value: "glassFV", label: "Glass, FV" },
  { value: "solidLHR", label: "Solid, LHR" },
  { value: "glassLHR", label: "Glass, LHR" },
] as const;

function toPriceRow([width, height, solid, plain, insert]: number[]): PriceRow {
  return { width, height, solid, plain, insert };
}

function toCommercialRow(row: (string | number)[]): CommercialPriceRow {
  return {
    width: String(row[0]),
    height: String(row[1]),
    solid15R: Number(row[2]),
    glass15R: Number(row[3]),
    solidFV: Number(row[4]),
    glassFV: Number(row[5]),
    solidLHR: Number(row[6]),
    glassLHR: Number(row[7]),
  };
}

function parseFeet(value: string) {
  const feet = Number(value.match(/(\d+)'/)?.[1] ?? 0);
  const inches = Number(value.match(/'(\d+)"/)?.[1] ?? 0);
  return feet + inches / 12;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function findResidentialPrice(model: string, width: string, height: string) {
  const rows = residentialPriceRows[model] ?? [];
  const widthFeet = parseFeet(width);
  const heightFeet = parseFeet(height);
  return rows
    .filter((row) => row.width >= widthFeet && row.height >= heightFeet)
    .sort((a, b) => a.height - b.height || a.width - b.width)[0];
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-gray-bg">{label}</span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-12 rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-bg outline-none transition focus:border-red-main focus:ring-2 focus:ring-red-main/20"
    >
      {children}
    </select>
  );
}

export default function StockDoorPricingPage() {
  const [doorType, setDoorType] = useState<"residential" | "commercial">(
    "residential",
  );
  const stock = doorType === "residential" ? residentialStock : commercialStock;
  const [doorIndex, setDoorIndex] = useState(0);
  const door = stock[Math.min(doorIndex, stock.length - 1)];
  const [width, setWidth] = useState(door.widths[0]);
  const [height, setHeight] = useState(door.heights[0]);
  const [track, setTrack] = useState(door.tracks[0]);
  const [spring, setSpring] = useState("Extension");
  const [lock, setLock] = useState("NL");
  const [finish, setFinish] =
    useState<(typeof finishOptions)[number]["value"]>("solid");
  const [commercialConfig, setCommercialConfig] =
    useState<(typeof commercialConfigOptions)[number]["value"]>("solid15R");
  const [quantity, setQuantity] = useState(1);

  function selectType(nextType: "residential" | "commercial") {
    const nextDoor =
      nextType === "residential" ? residentialStock[0] : commercialStock[0];
    setDoorType(nextType);
    setDoorIndex(0);
    setWidth(nextDoor.widths[0]);
    setHeight(nextDoor.heights[0]);
    setTrack(nextDoor.tracks[0]);
  }

  function selectDoor(index: number) {
    const nextDoor = stock[index];
    setDoorIndex(index);
    setWidth(nextDoor.widths[0]);
    setHeight(nextDoor.heights[0]);
    setTrack(nextDoor.tracks[0]);
  }

  const result = useMemo(() => {
    if (doorType === "residential") {
      const row = findResidentialPrice(door.model, width, height);
      if (!row) return null;
      const base = row[finish] ?? row.solid;
      const lineItems = [
        { label: `${door.model} ${width} x ${height}`, value: base },
        { label: `${track} track`, value: trackAddOns[track] ?? 0 },
        { label: `${spring} springs`, value: springAddOns[spring] ?? 0 },
        { label: `${lock} lock`, value: lockAddOns[lock] ?? 0 },
      ];
      const subtotal = lineItems.reduce((sum, item) => sum + item.value, 0);
      return {
        row,
        lineItems,
        subtotal,
        total: subtotal * quantity,
        basis: `${row.width}'0" x ${row.height}'0" chart price`,
      };
    }

    const row = commercialPriceRows[door.model]?.find(
      (item) => item.width === width && item.height === height,
    );
    if (!row) return null;
    const base = row[commercialConfig];
    return {
      row,
      lineItems: [
        { label: `${door.model} ${width} x ${height}`, value: base },
        { label: "Included configuration", value: 0 },
      ],
      subtotal: base,
      total: base * quantity,
      basis: commercialConfigOptions.find(
        (option) => option.value === commercialConfig,
      )?.label,
    };
  }, [
    commercialConfig,
    door.model,
    doorType,
    finish,
    height,
    lock,
    quantity,
    spring,
    track,
    width,
  ]);

  return (
    <main className="bg-cream-bg px-4 pt-24 pb-16 md:px-8 lg:px-10">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <div className="flex items-center gap-3 text-red-main">
            <CalculatorIcon className="h-8 w-8" />
            <p className="text-sm font-bold uppercase tracking-[0.2em]">
              Stock Pricing
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-gray-bg md:text-5xl">
            Price doors from the current stock chart.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-700 md:text-lg">
            Choose the door, size, track, and options. The calculator uses the
            workbook pricing tables and calls out the chart size used for the
            estimate.
          </p>

          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-7">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Door Type">
                <Select
                  value={doorType}
                  onChange={(value) =>
                    selectType(value as "residential" | "commercial")
                  }
                >
                  <option value="residential">Residential Stock Door</option>
                  <option value="commercial">Commercial Stock Door</option>
                </Select>
              </Field>

              <Field label="Door">
                <Select
                  value={String(doorIndex)}
                  onChange={(value) => selectDoor(Number(value))}
                >
                  {stock.map((item, index) => (
                    <option
                      key={`${item.model}-${item.color}-${index}`}
                      value={index}
                    >
                      {item.color} {item.model} - {item.description}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <Field label="Width">
                <Select value={width} onChange={setWidth}>
                  {door.widths.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </Field>

              <Field label="Height">
                <Select value={height} onChange={setHeight}>
                  {door.heights.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </Field>

              <Field label="Quantity">
                <input
                  min={1}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(Math.max(1, Number(event.target.value) || 1))
                  }
                  type="number"
                  className="min-h-12 rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-bg outline-none transition focus:border-red-main focus:ring-2 focus:ring-red-main/20"
                />
              </Field>
            </div>

            {doorType === "residential" ? (
              <>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field label="Panel / Glass">
                    <Select
                      value={finish}
                      onChange={(value) => setFinish(value as typeof finish)}
                    >
                      {finishOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label="Track">
                    <Select value={track} onChange={setTrack}>
                      {door.tracks.map((item) => (
                        <option key={item} value={item}>
                          {item}{" "}
                          {trackAddOns[item]
                            ? `+${formatCurrency(trackAddOns[item])}`
                            : ""}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field label="Springs">
                    <Select value={spring} onChange={setSpring}>
                      {Object.entries(springAddOns).map(([label, addon]) => (
                        <option key={label} value={label}>
                          {label} {addon ? `+${formatCurrency(addon)}` : ""}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label="Lock">
                    <Select value={lock} onChange={setLock}>
                      {Object.entries(lockAddOns).map(([label, addon]) => (
                        <option key={label} value={label}>
                          {label} {addon ? `+${formatCurrency(addon)}` : ""}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </div>
              </>
            ) : (
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <Field label="Configuration">
                  <Select
                    value={commercialConfig}
                    onChange={(value) =>
                      setCommercialConfig(value as typeof commercialConfig)
                    }
                  >
                    {commercialConfigOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
            Estimate
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-bg">
            {result ? formatCurrency(result.total) : "Price unavailable"}
          </h2>

          {result ? (
            <>
              <div className="mt-5 flex items-start gap-3 rounded-md bg-cream-secondary p-4 text-sm leading-6 text-gray-700">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-none text-red-main" />
                <p>
                  Pricing basis: {result.basis}. Total reflects quantity of{" "}
                  {quantity}.
                </p>
              </div>

              <dl className="mt-6 grid gap-3">
                {result.lineItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 text-sm"
                  >
                    <dt className="text-gray-700">{item.label}</dt>
                    <dd className="font-semibold text-gray-bg">
                      {formatCurrency(item.value)}
                    </dd>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <dt className="font-semibold text-gray-bg">Each</dt>
                  <dd className="font-bold text-gray-bg">
                    {formatCurrency(result.subtotal)}
                  </dd>
                </div>
              </dl>
            </>
          ) : (
            <div className="mt-5 flex items-start gap-3 rounded-md bg-cream-secondary p-4 text-sm leading-6 text-gray-700">
              <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 flex-none text-red-main" />
              <p>
                This stock item is listed in the workbook, but a matching price
                table was not available in the chart.
              </p>
            </div>
          )}

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center rounded-md bg-red-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-secondary focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2"
            >
              Request Quote
            </Link>
            <Link
              href="tel:8566626666"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-red-main bg-white px-5 py-3 text-sm font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white focus:outline-none focus:ring-2 focus:ring-red-secondary focus:ring-offset-2"
            >
              <PhoneIcon className="h-5 w-5" />
              Call Now
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
