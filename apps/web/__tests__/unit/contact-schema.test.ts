import { describe, it, expect } from "vitest";
import { z } from "zod";

// Contact form schema (same as in contact-form.tsx)
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

describe("Contact Form Schema", () => {
  describe("name field", () => {
    it("should accept valid names", () => {
      const result = contactSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        subject: "Test Subject",
        message: "This is a test message.",
      });
      expect(result.success).toBe(true);
    });

    it("should reject names shorter than 2 characters", () => {
      const result = contactSchema.safeParse({
        name: "J",
        email: "john@example.com",
        subject: "Test Subject",
        message: "This is a test message.",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Name must be at least 2 characters"
        );
      }
    });

    it("should reject empty names", () => {
      const result = contactSchema.safeParse({
        name: "",
        email: "john@example.com",
        subject: "Test Subject",
        message: "This is a test message.",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("email field", () => {
    it("should accept valid email addresses", () => {
      const validEmails = [
        "test@example.com",
        "user.name@domain.co",
        "user+tag@example.org",
      ];

      validEmails.forEach((email) => {
        const result = contactSchema.safeParse({
          name: "John Doe",
          email,
          subject: "Test Subject",
          message: "This is a test message.",
        });
        expect(result.success).toBe(true);
      });
    });

    it("should reject invalid email addresses", () => {
      const invalidEmails = ["notanemail", "missing@", "@nodomain.com", ""];

      invalidEmails.forEach((email) => {
        const result = contactSchema.safeParse({
          name: "John Doe",
          email,
          subject: "Test Subject",
          message: "This is a test message.",
        });
        expect(result.success).toBe(false);
      });
    });
  });

  describe("subject field", () => {
    it("should accept subjects with 3+ characters", () => {
      const result = contactSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        subject: "Hey",
        message: "This is a test message.",
      });
      expect(result.success).toBe(true);
    });

    it("should reject subjects shorter than 3 characters", () => {
      const result = contactSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        subject: "Hi",
        message: "This is a test message.",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Subject must be at least 3 characters"
        );
      }
    });
  });

  describe("message field", () => {
    it("should accept messages with 10+ characters", () => {
      const result = contactSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        subject: "Test Subject",
        message: "Hello there!",
      });
      expect(result.success).toBe(true);
    });

    it("should reject messages shorter than 10 characters", () => {
      const result = contactSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        subject: "Test Subject",
        message: "Hi",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Message must be at least 10 characters"
        );
      }
    });
  });

  describe("full form validation", () => {
    it("should pass with all valid fields", () => {
      const result = contactSchema.safeParse({
        name: "Ahmed Hassan",
        email: "ahmed@qurrah.com",
        subject: "Inquiry about products",
        message: "I would like to learn more about your eyewear collection.",
      });
      expect(result.success).toBe(true);
    });

    it("should collect all errors for invalid form", () => {
      const result = contactSchema.safeParse({
        name: "",
        email: "invalid",
        subject: "",
        message: "",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });
});

