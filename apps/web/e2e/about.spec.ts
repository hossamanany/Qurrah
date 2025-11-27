import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/about");
  });

  test("should display the about page", async ({ page }) => {
    await expect(page).toHaveTitle(/Qurrah/);
  });

  test("should display hero section with title", async ({ page }) => {
    const heroTitle = page.locator("h1");
    await expect(heroTitle).toContainText("About Qurrah");
  });

  test("should display our story section", async ({ page }) => {
    const storySection = page.locator("text=Our Story").first();
    await expect(storySection).toBeVisible();
  });

  test("should display mission section", async ({ page }) => {
    const missionSection = page.locator("text=Our Mission").first();
    await expect(missionSection).toBeVisible();
  });

  test("should display values section", async ({ page }) => {
    const valuesSection = page.locator("text=Our Values").first();
    await expect(valuesSection).toBeVisible();
  });

  test("should display value cards", async ({ page }) => {
    const qualityCard = page.locator("text=Uncompromising Quality").first();
    const accessibilityCard = page.locator("text=Accessibility").first();
    const sustainabilityCard = page.locator("text=Sustainability").first();
    const innovationCard = page.locator("text=Innovation").first();

    await expect(qualityCard).toBeVisible();
    await expect(accessibilityCard).toBeVisible();
    await expect(sustainabilityCard).toBeVisible();
    await expect(innovationCard).toBeVisible();
  });

  test("should have navigation back to home", async ({ page }) => {
    const homeLink = page.getByRole("link", { name: /home/i }).first();
    await homeLink.click();

    await expect(page).toHaveURL("/en");
  });
});

test.describe("About Page Navigation", () => {
  test("should navigate from home to about", async ({ page }) => {
    await page.goto("/en");

    const aboutLink = page.getByRole("link", { name: /about/i }).first();
    await aboutLink.click();

    await expect(page).toHaveURL("/en/about");
  });
});

