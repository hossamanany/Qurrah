import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/contact");
  });

  test("should display the contact page", async ({ page }) => {
    await expect(page).toHaveTitle(/Qurrah/);
  });

  test("should display hero section with title", async ({ page }) => {
    const heroTitle = page.locator("h1");
    await expect(heroTitle).toContainText("Get in Touch");
  });

  test("should display contact form", async ({ page }) => {
    const nameInput = page.getByLabel(/full name/i);
    const emailInput = page.getByLabel(/email address/i);
    const subjectInput = page.getByLabel(/subject/i);
    const messageInput = page.getByLabel(/message/i);

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(subjectInput).toBeVisible();
    await expect(messageInput).toBeVisible();
  });

  test("should display submit button", async ({ page }) => {
    const submitButton = page.getByRole("button", { name: /send message/i });
    await expect(submitButton).toBeVisible();
  });

  test("should display contact information", async ({ page }) => {
    const contactInfo = page.locator("text=Contact Information").first();
    await expect(contactInfo).toBeVisible();
  });
});

test.describe("Contact Form Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/contact");
  });

  test("should show validation error for empty form submission", async ({ page }) => {
    const submitButton = page.getByRole("button", { name: /send message/i });
    await submitButton.click();

    // Should show at least one error
    const errorMessage = page.locator("text=/must be at least/i").first();
    await expect(errorMessage).toBeVisible();
  });

  test("should show error for invalid email", async ({ page }) => {
    await page.getByLabel(/full name/i).fill("John Doe");
    await page.getByLabel(/email address/i).fill("invalid-email");
    await page.getByLabel(/subject/i).fill("Test Subject");
    await page.getByLabel(/message/i).fill("This is a test message that is long enough.");

    await page.getByRole("button", { name: /send message/i }).click();

    const errorMessage = page.locator("text=/invalid email/i").first();
    await expect(errorMessage).toBeVisible();
  });

  test("should submit form with valid data", async ({ page }) => {
    await page.getByLabel(/full name/i).fill("John Doe");
    await page.getByLabel(/email address/i).fill("john@example.com");
    await page.getByLabel(/subject/i).fill("Test Subject");
    await page.getByLabel(/message/i).fill("This is a test message that is long enough for validation.");

    await page.getByRole("button", { name: /send message/i }).click();

    // Wait for success message
    const successMessage = page.locator("text=/thank you/i").first();
    await expect(successMessage).toBeVisible({ timeout: 5000 });
  });

  test("should clear form after successful submission", async ({ page }) => {
    const nameInput = page.getByLabel(/full name/i);
    const emailInput = page.getByLabel(/email address/i);

    await nameInput.fill("John Doe");
    await emailInput.fill("john@example.com");
    await page.getByLabel(/subject/i).fill("Test Subject");
    await page.getByLabel(/message/i).fill("This is a test message that is long enough for validation.");

    await page.getByRole("button", { name: /send message/i }).click();

    // Wait for form to clear
    await expect(nameInput).toHaveValue("", { timeout: 5000 });
    await expect(emailInput).toHaveValue("", { timeout: 5000 });
  });
});

test.describe("Contact Page Navigation", () => {
  test("should navigate from home to contact", async ({ page }) => {
    await page.goto("/en");

    const contactLink = page.getByRole("link", { name: /contact/i }).first();
    await contactLink.click();

    await expect(page).toHaveURL("/en/contact");
  });
});

