import { describe, it, expect } from "vitest";
import { render, screen } from "../../test-utils";
import { Footer } from "@/components/layout/footer";

describe("Footer Component", () => {
  describe("rendering", () => {
    it("should render the footer element", () => {
      render(<Footer />);
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("should render the logo", () => {
      render(<Footer />);
      const logo = screen.getByRole("link", { name: /qurrah/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("href", "/");
    });

    it("should render footer description translation key", () => {
      render(<Footer />);
      // Mock returns the key, so we check for 'description' text
      expect(screen.getByText("description")).toBeInTheDocument();
    });

    it("should render copyright translation key", () => {
      render(<Footer />);
      expect(screen.getByText("copyright")).toBeInTheDocument();
    });
  });

  describe("navigation sections", () => {
    it("should render Shop section title", () => {
      render(<Footer />);
      expect(screen.getByText("shop.title")).toBeInTheDocument();
    });

    it("should render Company section title", () => {
      render(<Footer />);
      expect(screen.getByText("company.title")).toBeInTheDocument();
    });

    it("should render Support section title", () => {
      render(<Footer />);
      expect(screen.getByText("support.title")).toBeInTheDocument();
    });
  });

  describe("shop links", () => {
    it("should render shop links", () => {
      render(<Footer />);
      expect(screen.getByText("shop.eyeglasses")).toBeInTheDocument();
      expect(screen.getByText("shop.sunglasses")).toBeInTheDocument();
      expect(screen.getByText("shop.contacts")).toBeInTheDocument();
    });
  });

  describe("company links", () => {
    it("should render company links", () => {
      render(<Footer />);
      expect(screen.getByText("company.about")).toBeInTheDocument();
      expect(screen.getByText("company.contact")).toBeInTheDocument();
      expect(screen.getByText("company.careers")).toBeInTheDocument();
    });

    it("should have correct hrefs for about and contact", () => {
      render(<Footer />);
      const aboutLink = screen.getByText("company.about").closest("a");
      const contactLink = screen.getByText("company.contact").closest("a");
      
      expect(aboutLink).toHaveAttribute("href", "/about");
      expect(contactLink).toHaveAttribute("href", "/contact");
    });
  });

  describe("support links", () => {
    it("should render support links", () => {
      render(<Footer />);
      expect(screen.getByText("support.faq")).toBeInTheDocument();
      expect(screen.getByText("support.shipping")).toBeInTheDocument();
      expect(screen.getByText("support.returns")).toBeInTheDocument();
    });
  });

  describe("social links", () => {
    it("should render social section title", () => {
      render(<Footer />);
      expect(screen.getByText("social.title")).toBeInTheDocument();
    });

    it("should render Instagram link", () => {
      render(<Footer />);
      const instagramLink = screen.getByLabelText("Instagram");
      expect(instagramLink).toBeInTheDocument();
      expect(instagramLink).toHaveAttribute("href", "https://instagram.com");
      expect(instagramLink).toHaveAttribute("target", "_blank");
    });

    it("should render Facebook link", () => {
      render(<Footer />);
      const facebookLink = screen.getByLabelText("Facebook");
      expect(facebookLink).toBeInTheDocument();
      expect(facebookLink).toHaveAttribute("href", "https://facebook.com");
    });

    it("should render Twitter link", () => {
      render(<Footer />);
      const twitterLink = screen.getByLabelText("Twitter");
      expect(twitterLink).toBeInTheDocument();
      expect(twitterLink).toHaveAttribute("href", "https://twitter.com");
    });

    it("should render YouTube link", () => {
      render(<Footer />);
      const youtubeLink = screen.getByLabelText("YouTube");
      expect(youtubeLink).toBeInTheDocument();
      expect(youtubeLink).toHaveAttribute("href", "https://youtube.com");
    });

    it("should have rel noopener noreferrer on social links", () => {
      render(<Footer />);
      const instagramLink = screen.getByLabelText("Instagram");
      expect(instagramLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("styling", () => {
    it("should have border-t class", () => {
      render(<Footer />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveClass("border-t");
    });

    it("should have muted background", () => {
      render(<Footer />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveClass("bg-muted/30");
    });
  });

  describe("accessibility", () => {
    it("should have proper footer landmark", () => {
      render(<Footer />);
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("should have aria-labels on social links", () => {
      render(<Footer />);
      expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
      expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
      expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
      expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
    });
  });

  describe("responsive design", () => {
    it("should have grid layout for larger screens", () => {
      render(<Footer />);
      const gridContainer = screen.getByRole("contentinfo").querySelector(".grid");
      expect(gridContainer).toHaveClass("sm:grid-cols-2", "lg:grid-cols-4");
    });
  });
});
