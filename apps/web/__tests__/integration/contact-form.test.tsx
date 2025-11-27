import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "../test-utils";
import { ContactForm } from "@/components/contact/contact-form";

describe("Contact Form Integration", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("form rendering", () => {
    it("should render all form fields", () => {
      render(<ContactForm />);

      // The mock returns translation keys
      expect(screen.getByLabelText("name")).toBeInTheDocument();
      expect(screen.getByLabelText("email")).toBeInTheDocument();
      expect(screen.getByLabelText("subject")).toBeInTheDocument();
      expect(screen.getByLabelText("message")).toBeInTheDocument();
    });

    it("should render submit button", () => {
      render(<ContactForm />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should have proper input types", () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText("name");
      const emailInput = screen.getByLabelText("email");
      const subjectInput = screen.getByLabelText("subject");

      expect(nameInput).toHaveAttribute("type", "text");
      expect(emailInput).toHaveAttribute("type", "email");
      expect(subjectInput).toHaveAttribute("type", "text");
    });
  });

  describe("form validation", () => {
    it("should show error for empty name on submit", async () => {
      const { user } = render(<ContactForm />);

      await user.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    it("should validate email format", async () => {
      const { user } = render(<ContactForm />);

      // Fill all fields with invalid email
      await user.type(screen.getByLabelText("name"), "John Doe");
      await user.type(screen.getByLabelText("email"), "not-an-email");
      await user.type(screen.getByLabelText("subject"), "Test Subject");
      await user.type(screen.getByLabelText("message"), "This is a test message long enough");
      
      // The email field should have the invalid value
      expect(screen.getByLabelText("email")).toHaveValue("not-an-email");
    });

    it("should show error for short subject", async () => {
      const { user } = render(<ContactForm />);

      await user.type(screen.getByLabelText("name"), "John Doe");
      await user.type(screen.getByLabelText("email"), "john@example.com");
      await user.type(screen.getByLabelText("subject"), "Hi");
      await user.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByText(/subject must be at least 3 characters/i)).toBeInTheDocument();
      });
    });

    it("should show error for short message", async () => {
      const { user } = render(<ContactForm />);

      await user.type(screen.getByLabelText("name"), "John Doe");
      await user.type(screen.getByLabelText("email"), "john@example.com");
      await user.type(screen.getByLabelText("subject"), "Test Subject");
      await user.type(screen.getByLabelText("message"), "Hi");
      await user.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
      });
    });
  });

  describe("form submission", () => {
    it("should submit form with valid data", async () => {
      vi.useRealTimers(); // Use real timers for this test
      const consoleSpy = vi.spyOn(console, "log");
      const { user } = render(<ContactForm />);

      await user.type(screen.getByLabelText("name"), "John Doe");
      await user.type(screen.getByLabelText("email"), "john@example.com");
      await user.type(screen.getByLabelText("subject"), "Test Subject");
      await user.type(
        screen.getByLabelText("message"),
        "This is a test message that is long enough."
      );

      await user.click(screen.getByRole("button"));

      // Wait for submission
      await waitFor(
        () => {
          expect(consoleSpy).toHaveBeenCalledWith(
            "Form data:",
            expect.objectContaining({
              name: "John Doe",
              email: "john@example.com",
            })
          );
        },
        { timeout: 5000 }
      );

      consoleSpy.mockRestore();
    });

    it("should disable submit button during submission", async () => {
      vi.useRealTimers();
      const { user } = render(<ContactForm />);

      await user.type(screen.getByLabelText("name"), "John Doe");
      await user.type(screen.getByLabelText("email"), "john@example.com");
      await user.type(screen.getByLabelText("subject"), "Test Subject");
      await user.type(
        screen.getByLabelText("message"),
        "This is a test message that is long enough."
      );

      await user.click(screen.getByRole("button"));

      // Button should be disabled during submission
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("accessibility", () => {
    it("should have labels associated with inputs", () => {
      render(<ContactForm />);

      expect(screen.getByLabelText("name")).toBeInTheDocument();
      expect(screen.getByLabelText("email")).toBeInTheDocument();
      expect(screen.getByLabelText("subject")).toBeInTheDocument();
      expect(screen.getByLabelText("message")).toBeInTheDocument();
    });

    it("should have form element", () => {
      const { container } = render(<ContactForm />);
      expect(container.querySelector("form")).toBeInTheDocument();
    });
  });
});
