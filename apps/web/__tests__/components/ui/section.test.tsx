import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "@/components/ui/section";

describe("Section Component", () => {
  it("should render children", () => {
    render(<Section>Section content</Section>);
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("should render as section element", () => {
    const { container } = render(<Section>Content</Section>);
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe("SECTION");
  });

  it("should apply padding styles", () => {
    const { container } = render(<Section>Content</Section>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("py-16");
    expect(element).toHaveClass("sm:py-20");
    expect(element).toHaveClass("lg:py-24");
  });

  it("should wrap content in Container by default", () => {
    render(
      <Section>
        <div data-testid="child">Content</div>
      </Section>
    );
    const child = screen.getByTestId("child");
    // Check that parent has Container's max-w-7xl class
    expect(child.parentElement).toHaveClass("max-w-7xl");
  });

  it("should not wrap in Container when fullWidth is true", () => {
    render(
      <Section fullWidth>
        <div data-testid="child">Content</div>
      </Section>
    );
    const child = screen.getByTestId("child");
    expect(child.parentElement).not.toHaveClass("max-w-7xl");
  });

  it("should apply custom className to section", () => {
    const { container } = render(<Section className="bg-primary">Content</Section>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("bg-primary");
  });

  it("should apply containerClassName to Container", () => {
    render(
      <Section containerClassName="custom-container">
        <div data-testid="child">Content</div>
      </Section>
    );
    const child = screen.getByTestId("child");
    expect(child.parentElement).toHaveClass("custom-container");
  });

  it("should support id prop for anchor links", () => {
    const { container } = render(<Section id="features">Content</Section>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute("id", "features");
  });
});
