import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../../test-utils";
import { Header } from "@/components/layout/header";

// Mock the child components
vi.mock("@/components/layout/language-switcher", () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Language Switcher</div>,
}));

vi.mock("@/components/layout/mobile-nav", () => ({
  MobileNav: () => <div data-testid="mobile-nav">Mobile Nav</div>,
}));

describe("Header Component", () => {
  beforeEach(() => {
    // Reset scroll position
    window.scrollY = 0;
  });

  describe("rendering", () => {
    it("should render the header element", () => {
      render(<Header />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("should render the logo with link to home", () => {
      render(<Header />);
      const logo = screen.getByRole("link", { name: /qurrah/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("href", "/");
    });

    it("should render navigation links", () => {
      render(<Header />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("should render language switcher", () => {
      render(<Header />);
      expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
    });

    it("should render mobile navigation", () => {
      render(<Header />);
      expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();
    });
  });

  describe("navigation links", () => {
    it("should render home link", () => {
      render(<Header />);
      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("should render about link", () => {
      render(<Header />);
      const aboutLink = screen.getByRole("link", { name: /about/i });
      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveAttribute("href", "/about");
    });

    it("should render contact link", () => {
      render(<Header />);
      const contactLink = screen.getByRole("link", { name: /contact/i });
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute("href", "/contact");
    });
  });

  describe("sticky behavior", () => {
    it("should have sticky positioning", () => {
      render(<Header />);
      const header = screen.getByRole("banner");
      expect(header).toHaveClass("sticky", "top-0");
    });

    it("should have high z-index", () => {
      render(<Header />);
      const header = screen.getByRole("banner");
      expect(header).toHaveClass("z-50");
    });
  });

  describe("scroll behavior", () => {
    it("should start with transparent background", () => {
      render(<Header />);
      const header = screen.getByRole("banner");
      expect(header).toHaveClass("bg-transparent");
    });

    it("should add background when scrolled", () => {
      render(<Header />);
      const header = screen.getByRole("banner");

      // Simulate scroll
      Object.defineProperty(window, "scrollY", { value: 50, writable: true });
      fireEvent.scroll(window);

      // Wait for state update
      expect(header).toHaveClass("bg-background/95");
    });
  });

  describe("responsive design", () => {
    it("should hide desktop nav on mobile", () => {
      render(<Header />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("hidden", "lg:flex");
    });

    it("should hide language switcher on mobile", () => {
      render(<Header />);
      const langSwitcherContainer = screen.getByTestId("language-switcher").parentElement;
      expect(langSwitcherContainer).toHaveClass("hidden", "lg:block");
    });
  });

  describe("accessibility", () => {
    it("should have proper header landmark", () => {
      render(<Header />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("should have navigation landmark", () => {
      render(<Header />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });
});

