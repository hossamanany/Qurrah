import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../../test-utils";

// We need to mock the hooks before importing the component
const mockReplace = vi.fn();

vi.mock("next-intl", () => ({
  useLocale: vi.fn(() => "en"),
}));

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

vi.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["en", "ar"],
  },
}));

// Import after mocking
import { LanguageSwitcher, LanguageSwitcherCompact } from "@/components/layout/language-switcher";
import { useLocale } from "next-intl";

describe("LanguageSwitcher Component", () => {
  beforeEach(() => {
    mockReplace.mockClear();
    vi.mocked(useLocale).mockReturnValue("en");
  });

  describe("rendering", () => {
    it("should render language switcher", () => {
      render(<LanguageSwitcher />);
      expect(screen.getByRole("button", { name: /english/i })).toBeInTheDocument();
    });

    it("should render both language options", () => {
      render(<LanguageSwitcher />);
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBe(2);
    });

    it("should show EN text on desktop", () => {
      render(<LanguageSwitcher />);
      expect(screen.getByText("EN")).toBeInTheDocument();
    });

    it("should show Arabic text on desktop", () => {
      render(<LanguageSwitcher />);
      expect(screen.getByText("عربي")).toBeInTheDocument();
    });
  });

  describe("active state", () => {
    it("should highlight English when locale is en", () => {
      vi.mocked(useLocale).mockReturnValue("en");
      render(<LanguageSwitcher />);
      const enButton = screen.getByRole("button", { name: /english/i });
      expect(enButton).toHaveClass("bg-primary");
    });

    it("should highlight Arabic when locale is ar", () => {
      vi.mocked(useLocale).mockReturnValue("ar");
      render(<LanguageSwitcher />);
      const arButton = screen.getByRole("button", { name: /arabic/i });
      expect(arButton).toHaveClass("bg-primary");
    });
  });

  describe("interaction", () => {
    it("should call router.replace when switching to Arabic", async () => {
      const { user } = render(<LanguageSwitcher />);
      const arButton = screen.getByRole("button", { name: /arabic/i });

      await user.click(arButton);
      expect(mockReplace).toHaveBeenCalledWith("/", { locale: "ar" });
    });

    it("should call router.replace when switching to English", async () => {
      vi.mocked(useLocale).mockReturnValue("ar");
      const { user } = render(<LanguageSwitcher />);
      const enButton = screen.getByRole("button", { name: /english/i });

      await user.click(enButton);
      expect(mockReplace).toHaveBeenCalledWith("/", { locale: "en" });
    });
  });

  describe("accessibility", () => {
    it("should have aria-labels on buttons", () => {
      render(<LanguageSwitcher />);
      expect(screen.getByLabelText(/switch to english/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/switch to arabic/i)).toBeInTheDocument();
    });
  });
});

describe("LanguageSwitcherCompact Component", () => {
  beforeEach(() => {
    mockReplace.mockClear();
    vi.mocked(useLocale).mockReturnValue("en");
  });

  describe("rendering", () => {
    it("should render compact switcher", () => {
      render(<LanguageSwitcherCompact />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should show opposite language when en", () => {
      vi.mocked(useLocale).mockReturnValue("en");
      render(<LanguageSwitcherCompact />);
      expect(screen.getByText("عربي")).toBeInTheDocument();
    });

    it("should show opposite language when ar", () => {
      vi.mocked(useLocale).mockReturnValue("ar");
      render(<LanguageSwitcherCompact />);
      expect(screen.getByText("EN")).toBeInTheDocument();
    });
  });

  describe("interaction", () => {
    it("should toggle to Arabic when currently English", async () => {
      vi.mocked(useLocale).mockReturnValue("en");
      const { user } = render(<LanguageSwitcherCompact />);

      await user.click(screen.getByRole("button"));
      expect(mockReplace).toHaveBeenCalledWith("/", { locale: "ar" });
    });

    it("should toggle to English when currently Arabic", async () => {
      vi.mocked(useLocale).mockReturnValue("ar");
      const { user } = render(<LanguageSwitcherCompact />);

      await user.click(screen.getByRole("button"));
      expect(mockReplace).toHaveBeenCalledWith("/", { locale: "en" });
    });
  });

  describe("accessibility", () => {
    it("should have aria-label indicating target language", () => {
      vi.mocked(useLocale).mockReturnValue("en");
      render(<LanguageSwitcherCompact />);
      expect(screen.getByLabelText(/switch to arabic/i)).toBeInTheDocument();
    });
  });
});

