import { test, expect } from "@playwright/test";

test("homepage renders the hero heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /ready to go/i }),
  ).toBeVisible();
});

test("hero 'Residential' link opens the residential catalog", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: /^residential$/i }).click();
  await expect(page).toHaveURL(/\/residential-garage-doors$/);
  await expect(
    page.getByRole("heading", { name: /all residential doors/i }),
  ).toBeVisible();
});

test("commercial catalog page loads directly", async ({ page }) => {
  await page.goto("/commercial-garage-doors");
  await expect(
    page.getByRole("heading", { name: /all commercial doors/i }),
  ).toBeVisible();
});

test("quote hub shows its three sections and defaults to the builder", async ({
  page,
}) => {
  await page.goto("/request-quote");
  await expect(
    page.getByRole("heading", { name: /what can we quote for you/i }),
  ).toBeVisible();
  // Target the hub's own section cards by href — the navbar dropdown also
  // contains LiftMaster links, which would trip strict mode.
  await expect(page.locator('a[href*="tab=builder"]').first()).toBeVisible();
  await expect(page.locator('a[href*="tab=liftmaster"]').first()).toBeVisible();
  await expect(page.locator('a[href*="tab=other"]').first()).toBeVisible();
  // Builder is the default section.
  await expect(
    page.getByRole("heading", { name: /pick your model/i }),
  ).toBeVisible();
});

test("general quote form renders on the 'other' tab", async ({ page }) => {
  await page.goto("/request-quote?tab=other");
  await expect(
    page.getByRole("button", { name: /submit quote request/i }),
  ).toBeVisible();
});

test("LiftMaster tab lists openers and accessories", async ({ page }) => {
  await page.goto("/request-quote?tab=liftmaster");
  await expect(
    page.getByRole("heading", { name: /pick an opener/i }),
  ).toBeVisible();
  await expect(page.getByText("98032")).toBeVisible();
});

test("quote API silently drops honeypot submissions", async ({ request }) => {
  const res = await request.post("/api/quote", {
    data: {
      requestType: "quote",
      location: "south",
      firstName: "Bot",
      lastName: "Test",
      email: "bot@example.com",
      phone: "0000000000",
      website: "http://spam.example", // honeypot filled -> dropped
      fields: [],
    },
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.ok).toBe(true);
  expect(body.delivered).toBe(false);
});
