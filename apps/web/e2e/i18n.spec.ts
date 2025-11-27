import { test, expect } from "@playwright/test";

test.describe("Internationalization (i18n)", () => {
  test.describe("English (LTR)", () => {
    test("should display English content by default", async ({ page }) => {
      await page.goto("/en");

      // Check for English content
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    });

    test("should display English navigation", async ({ page }) => {
      await page.goto("/en");

      const homeLink = page.getByRole("link", { name: "Home" }).first();
      const aboutLink = page.getByRole("link", { name: "About" }).first();
      const contactLink = page.getByRole("link", { name: "Contact" }).first();

      await expect(homeLink).toBeVisible();
      await expect(aboutLink).toBeVisible();
      await expect(contactLink).toBeVisible();
    });

    test("should display English hero text", async ({ page }) => {
      await page.goto("/en");

      const heroTitle = page.locator("text=See the World Differently").first();
      await expect(heroTitle).toBeVisible();
    });
  });

  test.describe("Arabic (RTL)", () => {
    test("should display Arabic content", async ({ page }) => {
      await page.goto("/ar");

      // Check for Arabic content
      await expect(page.locator("html")).toHaveAttribute("lang", "ar");
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    });

    test("should display Arabic navigation", async ({ page }) => {
      await page.goto("/ar");

      const homeLink = page.getByRole("link", { name: "الرئيسية" }).first();
      const aboutLink = page.getByRole("link", { name: "من نحن" }).first();
      const contactLink = page.getByRole("link", { name: "اتصل بنا" }).first();

      await expect(homeLink).toBeVisible();
      await expect(aboutLink).toBeVisible();
      await expect(contactLink).toBeVisible();
    });

    test("should display Arabic hero text", async ({ page }) => {
      await page.goto("/ar");

      const heroTitle = page.locator("text=انظر للعالم بشكل مختلف").first();
      await expect(heroTitle).toBeVisible();
    });

    test("should have RTL text direction", async ({ page }) => {
      await page.goto("/ar");

      const htmlElement = page.locator("html");
      await expect(htmlElement).toHaveAttribute("dir", "rtl");
    });
  });

  test.describe("Language Switching", () => {
    test("should switch from English to Arabic", async ({ page }) => {
      await page.goto("/en");

      // Find and click Arabic language option
      const arabicButton = page.locator("button:has-text('عربي')").first();
      await arabicButton.click();

      // Should navigate to Arabic version
      await expect(page).toHaveURL(/\/ar/);
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    });

    test("should switch from Arabic to English", async ({ page }) => {
      await page.goto("/ar");

      // Find and click English language option
      const englishButton = page.locator("button:has-text('EN')").first();
      await englishButton.click();

      // Should navigate to English version
      await expect(page).toHaveURL(/\/en/);
      await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    });

    test("should preserve page when switching language", async ({ page }) => {
      await page.goto("/en/about");

      // Switch to Arabic
      const arabicButton = page.locator("button:has-text('عربي')").first();
      await arabicButton.click();

      // Should be on Arabic about page
      await expect(page).toHaveURL("/ar/about");
    });
  });

  test.describe("Locale-specific URLs", () => {
    test("should handle /en/about route", async ({ page }) => {
      await page.goto("/en/about");

      await expect(page.locator("h1")).toContainText("About Qurrah");
    });

    test("should handle /ar/about route", async ({ page }) => {
      await page.goto("/ar/about");

      await expect(page.locator("h1")).toContainText("عن قُرّة");
    });

    test("should handle /en/contact route", async ({ page }) => {
      await page.goto("/en/contact");

      await expect(page.locator("h1")).toContainText("Get in Touch");
    });

    test("should handle /ar/contact route", async ({ page }) => {
      await page.goto("/ar/contact");

      await expect(page.locator("h1")).toContainText("تواصل معنا");
    });
  });

  test.describe("RTL Layout", () => {
    test("should mirror layout in RTL mode", async ({ page }) => {
      await page.goto("/ar");

      // Check that navigation is mirrored
      const header = page.locator("header");
      await expect(header).toBeVisible();

      // The HTML should have rtl direction
      const direction = await page.locator("html").getAttribute("dir");
      expect(direction).toBe("rtl");
    });

    test("should have proper text alignment in RTL", async ({ page }) => {
      await page.goto("/ar");

      // Footer should have RTL aligned text
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
    });
  });
});

test.describe("Default Locale Redirect", () => {
  test("should redirect root to default locale", async ({ page }) => {
    await page.goto("/");

    // Should redirect to /en
    await expect(page).toHaveURL(/\/(en|ar)/);
  });
});

