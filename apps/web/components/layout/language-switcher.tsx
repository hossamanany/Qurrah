"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
            locale === loc
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={`Switch to ${loc === "en" ? "English" : "Arabic"}`}
        >
          {loc === "en" ? (
            <>
              <span className="hidden sm:inline">EN</span>
              <span className="sm:hidden">🇬🇧</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">عربي</span>
              <span className="sm:hidden">🇸🇦</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}

export function LanguageSwitcherCompact() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-muted"
      aria-label={`Switch to ${locale === "en" ? "Arabic" : "English"}`}
    >
      <Globe className="h-4 w-4" />
      <span>{locale === "en" ? "عربي" : "EN"}</span>
    </button>
  );
}

