import { test, expect } from "@playwright/test";

test("homepage renders the hero heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: /garage doors, parts, and quotes/i,
    }),
  ).toBeVisible();
});

test("hero 'Shop Doors' link opens the residential catalog", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: /shop doors/i }).click();
  await expect(page).toHaveURL(/\/residential-garage-doors$/);
  await expect(
    page.getByRole("heading", { name: /clopay residential doors/i }),
  ).toBeVisible();
});

test("commercial catalog page loads directly", async ({ page }) => {
  await page.goto("/commercial-garage-doors");
  await expect(
    page.getByRole("heading", { name: /clopay commercial doors/i }),
  ).toBeVisible();
});

test("request a quote page loads and shows the form", async ({ page }) => {
  await page.goto("/request-quote");
  await expect(
    page.getByRole("button", { name: /submit quote request/i }),
  ).toBeVisible();
});
