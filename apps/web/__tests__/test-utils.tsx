import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock translations for testing
const mockTranslations: Record<string, string> = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.contact": "Contact",
  "home.hero.title": "See the World Differently",
  "home.hero.subtitle": "Premium eyewear crafted for style and comfort",
  "home.hero.cta": "Explore Collection",
  "footer.description": "Premium eyewear crafted for style and comfort.",
  "footer.copyright": "© 2025 Qurrah. All rights reserved.",
};

// Mock useTranslations hook
export const mockUseTranslations = (namespace?: string) => {
  return (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return mockTranslations[fullKey] || key;
  };
};

// All providers wrapper
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Custom render function with all providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
};

// Re-export everything from testing library
export * from "@testing-library/react";
export { customRender as render, userEvent };

