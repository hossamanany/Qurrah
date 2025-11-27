import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
  });

  test("should display the home page", async ({ page }) => {
    await expect(page).toHaveTitle(/Qurrah/);
  });

  test("should display the hero section", async ({ page }) => {
    const heroTitle = page.locator("h1");
    await expect(heroTitle).toBeVisible();
  });

  test("should display the navigation header", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();

    const logo = page.getByRole("link", { name: /qurrah/i }).first();
    await expect(logo).toBeVisible();
  });

  test("should display navigation links", async ({ page }) => {
    const homeLink = page.getByRole("link", { name: /home/i }).first();
    const aboutLink = page.getByRole("link", { name: /about/i }).first();
    const contactLink = page.getByRole("link", { name: /contact/i }).first();

    await expect(homeLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
    await expect(contactLink).toBeVisible();
  });

  test("should display categories section", async ({ page }) => {
    const categoriesSection = page.locator("text=Our Collections").first();
    await expect(categoriesSection).toBeVisible();
  });

  test("should display features section", async ({ page }) => {
    const featuresSection = page.locator("text=Why Choose Qurrah").first();
    await expect(featuresSection).toBeVisible();
  });

  test("should display testimonials section", async ({ page }) => {
    const testimonialsSection = page.locator("text=What Our Customers Say").first();
    await expect(testimonialsSection).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should have working CTA button in hero", async ({ page }) => {
    const ctaButton = page.getByRole("link", { name: /explore collection/i });
    await expect(ctaButton).toBeVisible();
  });
});

test.describe("Home Page - Scroll Behavior", () => {
  test("should change header style on scroll", async ({ page }) => {
    await page.goto("/en");

    const header = page.locator("header");
    
    // Initially transparent
    await expect(header).toHaveClass(/bg-transparent/);

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(300);

    // Should have background after scroll
    await expect(header).toHaveClass(/bg-background/);
  });
});

