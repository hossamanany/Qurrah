import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";

export function AboutStorySection() {
  const t = useTranslations("about.story");

  return (
    <Section className="bg-background">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image Side */}
        <div className="relative order-2 lg:order-1">
          <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-secondary/50">
            {/* Placeholder for story image */}
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center p-8">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-accent/10">
                  <svg
                    viewBox="0 0 200 60"
                    className="h-12 w-auto text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <ellipse cx="50" cy="30" rx="40" ry="25" />
                    <ellipse cx="150" cy="30" rx="40" ry="25" />
                    <line x1="90" y1="30" x2="110" y2="30" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">
                  Story imagery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="order-1 lg:order-2">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <div className="mt-6 space-y-4 text-lg text-muted-foreground">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

