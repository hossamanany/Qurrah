import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container } from "@/components/ui/container";

describe("Container Component", () => {
  it("should render children", () => {
    render(<Container>Test content</Container>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("should apply max-width and padding styles", () => {
    const { container } = render(<Container>Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("max-w-7xl");
    expect(element).toHaveClass("mx-auto");
    expect(element).toHaveClass("px-4");
  });

  it("should render as div by default", () => {
    const { container } = render(<Container>Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe("DIV");
  });

  it("should render as section when specified", () => {
    const { container } = render(<Container as="section">Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe("SECTION");
  });

  it("should render as article when specified", () => {
    const { container } = render(<Container as="article">Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe("ARTICLE");
  });

  it("should render as main when specified", () => {
    const { container } = render(<Container as="main">Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe("MAIN");
  });

  it("should merge custom className", () => {
    const { container } = render(
      <Container className="custom-class">Content</Container>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("custom-class");
    expect(element).toHaveClass("max-w-7xl"); // still has default
  });

  it("should apply responsive padding classes", () => {
    const { container } = render(<Container>Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("sm:px-6");
    expect(element).toHaveClass("lg:px-8");
  });
});
