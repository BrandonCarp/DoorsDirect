import { defineConfig } from "vitest/config";
import path from "node:path";

// Unit tests only — the Playwright e2e suite lives in __tests__/e2e and runs
// through `npx playwright test`, never through Vitest. Mirrors the
// DDS-Web-Tool setup: node environment, globals on, co-located *.test.ts.
export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["lib/**/*.{test,spec}.ts", "app/**/*.{test,spec}.ts"],
    exclude: ["__tests__/**", "node_modules/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
