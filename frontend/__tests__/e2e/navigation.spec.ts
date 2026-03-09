import { test, expect } from "@playwright/test";

test("homepage displays hero section", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /residential/i }).click();
  await expect(page).toHaveURL("/residential");

  await page.getByRole("link", { name: /commercial/i }).click();
  await expect(page).toHaveURL("/commercial");
});
