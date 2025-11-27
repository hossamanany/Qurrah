import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test-utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Mock the child components for Header
vi.mock("@/components/layout/language-switcher", () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Language Switcher</div>,
}));

vi.mock("@/components/layout/mobile-nav", () => ({
  MobileNav: () => <div data-testid="mobile-nav">Mobile Nav</div>,
}));

describe("Navigation Integration", () => {
  describe("Header Navigation", () => {
    it("should render all main navigation links", () => {
      render(<Header />);

      expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
    });

    it("should have correct href attributes", () => {
      render(<Header />);

      expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
      expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
      expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
    });

    it("should include logo link to home", () => {
      render(<Header />);

      const logoLink = screen.getByRole("link", { name: /qurrah/i });
      expect(logoLink).toHaveAttribute("href", "/");
    });
  });

  describe("Footer Navigation", () => {
    it("should render shop section links", () => {
      render(<Footer />);

      expect(screen.getByText("shop.eyeglasses")).toBeInTheDocument();
      expect(screen.getByText("shop.sunglasses")).toBeInTheDocument();
      expect(screen.getByText("shop.contacts")).toBeInTheDocument();
    });

    it("should render company section with navigation links", () => {
      render(<Footer />);

      const aboutLink = screen.getByText("company.about").closest("a");
      expect(aboutLink).toHaveAttribute("href", "/about");
    });

    it("should render support section links", () => {
      render(<Footer />);

      expect(screen.getByText("support.faq")).toBeInTheDocument();
      expect(screen.getByText("support.shipping")).toBeInTheDocument();
      expect(screen.getByText("support.returns")).toBeInTheDocument();
    });
  });

  describe("Consistent Navigation", () => {
    it("should have about link in both header and footer", () => {
      const { rerender } = render(<Header />);
      const headerAboutLink = screen.getByRole("link", { name: /about/i });
      expect(headerAboutLink).toHaveAttribute("href", "/about");

      rerender(<Footer />);
      const footerAboutLink = screen.getByText("company.about").closest("a");
      expect(footerAboutLink).toHaveAttribute("href", "/about");
    });

    it("should have contact link in both header and footer", () => {
      const { rerender } = render(<Header />);
      const headerContactLink = screen.getByRole("link", { name: /contact/i });
      expect(headerContactLink).toHaveAttribute("href", "/contact");

      rerender(<Footer />);
      const footerContactLink = screen.getByText("company.contact").closest("a");
      expect(footerContactLink).toHaveAttribute("href", "/contact");
    });
  });

  describe("External Links", () => {
    it("should render social links with external attributes", () => {
      render(<Footer />);

      const socialLinks = ["Instagram", "Facebook", "Twitter", "YouTube"];

      socialLinks.forEach((label) => {
        const link = screen.getByLabelText(label);
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });
});
