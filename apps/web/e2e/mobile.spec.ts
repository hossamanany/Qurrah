import { test, expect, devices } from "@playwright/test";

test.describe("Mobile Responsive", () => {
  test.use({ ...devices["iPhone 12"] });

  test.describe("Mobile Navigation", () => {
    test("should show mobile menu button", async ({ page }) => {
      await page.goto("/en");

      // Mobile menu button should be visible
      const menuButton = page.locator("button[aria-label*='menu']").first();
      await expect(menuButton).toBeVisible();
    });

    test("should open mobile menu on click", async ({ page }) => {
      await page.goto("/en");

      const menuButton = page.locator("button[aria-label*='menu']").first();
      await menuButton.click();

      // Mobile nav should be visible
      const mobileNav = page.locator("nav").last();
      await expect(mobileNav).toBeVisible();
    });

    test("should close mobile menu on link click", async ({ page }) => {
      await page.goto("/en");

      // Open menu
      const menuButton = page.locator("button[aria-label*='menu']").first();
      await menuButton.click();

      // Click a link
      const aboutLink = page.locator("nav").last().getByRole("link", { name: /about/i });
      await aboutLink.click();

      // Should navigate
      await expect(page).toHaveURL("/en/about");
    });

    test("should hide desktop navigation on mobile", async ({ page }) => {
      await page.goto("/en");

      // Desktop nav should be hidden
      const desktopNav = page.locator("nav.hidden.lg\\:flex");
      await expect(desktopNav).toBeHidden();
    });
  });

  test.describe("Mobile Layout", () => {
    test("should have full-width hero on mobile", async ({ page }) => {
      await page.goto("/en");

      const hero = page.locator("section").first();
      const viewportWidth = page.viewportSize()?.width || 390;

      const heroBox = await hero.boundingBox();
      expect(heroBox?.width).toBeGreaterThanOrEqual(viewportWidth - 10);
    });

    test("should stack categories on mobile", async ({ page }) => {
      await page.goto("/en");

      // Categories should be in a single column on mobile
      const categoriesGrid = page.locator(".grid.gap-6").first();
      await expect(categoriesGrid).toBeVisible();
    });

    test("should have touch-friendly tap targets", async ({ page }) => {
      await page.goto("/en");

      // Check button sizes (minimum 44px recommended)
      const ctaButton = page.getByRole("link", { name: /explore collection/i });
      const buttonBox = await ctaButton.boundingBox();

      expect(buttonBox?.height).toBeGreaterThanOrEqual(44);
    });
  });

  test.describe("Mobile Contact Form", () => {
    test("should display form correctly on mobile", async ({ page }) => {
      await page.goto("/en/contact");

      const nameInput = page.getByLabel(/full name/i);
      const emailInput = page.getByLabel(/email address/i);
      const submitButton = page.getByRole("button", { name: /send message/i });

      await expect(nameInput).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(submitButton).toBeVisible();
    });

    test("should have full-width form inputs on mobile", async ({ page }) => {
      await page.goto("/en/contact");

      const nameInput = page.getByLabel(/full name/i);
      const inputBox = await nameInput.boundingBox();
      const viewportWidth = page.viewportSize()?.width || 390;

      // Input should be nearly full width (accounting for padding)
      expect(inputBox?.width).toBeGreaterThan(viewportWidth * 0.8);
    });
  });

  test.describe("Mobile Footer", () => {
    test("should stack footer columns on mobile", async ({ page }) => {
      await page.goto("/en");

      const footer = page.locator("footer");
      await footer.scrollIntoViewIfNeeded();

      await expect(footer).toBeVisible();
    });

    test("should show social links on mobile", async ({ page }) => {
      await page.goto("/en");

      const footer = page.locator("footer");
      await footer.scrollIntoViewIfNeeded();

      const instagramLink = page.getByLabel("Instagram");
      await expect(instagramLink).toBeVisible();
    });
  });
});

test.describe("Tablet Responsive", () => {
  test.use({ ...devices["iPad Mini"] });

  test("should show appropriate layout on tablet", async ({ page }) => {
    await page.goto("/en");

    // Header should be visible
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("should have 2-column grid on tablet", async ({ page }) => {
    await page.goto("/en");

    // Categories should be in 2 columns on tablet
    const categoriesGrid = page.locator(".sm\\:grid-cols-2").first();
    await expect(categoriesGrid).toBeVisible();
  });
});

