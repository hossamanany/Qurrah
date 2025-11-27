import { describe, it, expect } from "vitest";
import { render, screen } from "../../test-utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

describe("Card Component", () => {
  describe("Card", () => {
    it("should render card element", () => {
      render(<Card data-testid="card">Card content</Card>);
      expect(screen.getByTestId("card")).toBeInTheDocument();
    });

    it("should apply default styles", () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("rounded-xl", "border", "bg-card");
    });

    it("should merge custom className", () => {
      render(
        <Card data-testid="card" className="custom-class">
          Content
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("custom-class");
    });
  });

  describe("CardHeader", () => {
    it("should render header element", () => {
      render(<CardHeader data-testid="header">Header</CardHeader>);
      expect(screen.getByTestId("header")).toBeInTheDocument();
    });

    it("should apply padding styles", () => {
      render(<CardHeader data-testid="header">Header</CardHeader>);
      const header = screen.getByTestId("header");
      expect(header).toHaveClass("p-6");
    });
  });

  describe("CardTitle", () => {
    it("should render as h3 element", () => {
      render(<CardTitle>Test Title</CardTitle>);
      expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    });

    it("should display title text", () => {
      render(<CardTitle>My Card Title</CardTitle>);
      expect(screen.getByText("My Card Title")).toBeInTheDocument();
    });

    it("should apply typography styles", () => {
      render(<CardTitle data-testid="title">Title</CardTitle>);
      const title = screen.getByTestId("title");
      expect(title).toHaveClass("font-semibold");
    });
  });

  describe("CardDescription", () => {
    it("should render description text", () => {
      render(<CardDescription>This is a description</CardDescription>);
      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("should apply muted text styles", () => {
      render(
        <CardDescription data-testid="description">
          Description
        </CardDescription>
      );
      const description = screen.getByTestId("description");
      expect(description).toHaveClass("text-muted-foreground");
    });
  });

  describe("CardContent", () => {
    it("should render content", () => {
      render(<CardContent>Main content here</CardContent>);
      expect(screen.getByText("Main content here")).toBeInTheDocument();
    });

    it("should apply padding styles", () => {
      render(<CardContent data-testid="content">Content</CardContent>);
      const content = screen.getByTestId("content");
      expect(content).toHaveClass("p-6");
    });
  });

  describe("CardFooter", () => {
    it("should render footer content", () => {
      render(<CardFooter>Footer content</CardFooter>);
      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("should apply flex styles", () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      const footer = screen.getByTestId("footer");
      expect(footer).toHaveClass("flex", "items-center");
    });
  });

  describe("Composed Card", () => {
    it("should render a complete card with all parts", () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Product Name</CardTitle>
            <CardDescription>Product description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Price: $99.99</p>
          </CardContent>
          <CardFooter>
            <button>Add to Cart</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByTestId("complete-card")).toBeInTheDocument();
      expect(screen.getByText("Product Name")).toBeInTheDocument();
      expect(screen.getByText("Product description goes here")).toBeInTheDocument();
      expect(screen.getByText("Price: $99.99")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
    });
  });
});

