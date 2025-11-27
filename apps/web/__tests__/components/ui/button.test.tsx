import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../test-utils";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  describe("rendering", () => {
    it("should render with default props", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
    });

    it("should render children correctly", () => {
      render(<Button>Test Button</Button>);
      expect(screen.getByText("Test Button")).toBeInTheDocument();
    });
  });

  describe("variants", () => {
    it("should apply default variant styles", () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-primary");
    });

    it("should apply destructive variant styles", () => {
      render(<Button variant="destructive">Delete</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-destructive");
    });

    it("should apply outline variant styles", () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border");
    });

    it("should apply secondary variant styles", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-secondary");
    });

    it("should apply ghost variant styles", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:bg-accent");
    });

    it("should apply link variant styles", () => {
      render(<Button variant="link">Link</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("underline-offset-4");
    });
  });

  describe("sizes", () => {
    it("should apply default size", () => {
      render(<Button>Default Size</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-10");
    });

    it("should apply small size", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-9");
    });

    it("should apply large size", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-12");
    });

    it("should apply extra large size", () => {
      render(<Button size="xl">Extra Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-14");
    });

    it("should apply icon size", () => {
      render(<Button size="icon">Icon</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-10", "w-10");
    });
  });

  describe("interactions", () => {
    it("should call onClick handler when clicked", async () => {
      const handleClick = vi.fn();
      const { user } = render(<Button onClick={handleClick}>Click</Button>);

      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when disabled", async () => {
      const handleClick = vi.fn();
      const { user } = render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should apply disabled styles when disabled", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("disabled:opacity-50");
    });
  });

  describe("asChild prop", () => {
    it("should render as a child element when asChild is true", () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = screen.getByRole("link", { name: /link button/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
    });
  });

  describe("custom className", () => {
    it("should merge custom className with default styles", () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
      expect(button).toHaveClass("inline-flex"); // default class
    });
  });

  describe("accessibility", () => {
    it("should be focusable", () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });

    it("should have proper button role", () => {
      render(<Button>Role Test</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should support aria-label", () => {
      render(<Button aria-label="Custom label">Icon</Button>);
      expect(screen.getByLabelText("Custom label")).toBeInTheDocument();
    });
  });
});

