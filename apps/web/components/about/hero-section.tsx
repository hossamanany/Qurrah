import { useTranslations } from "next-intl";

export function AboutHeroSection() {
  const t = useTranslations("about.hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 sm:py-28 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}

