import { useTranslations } from "next-intl";

export function ContactHeroSection() {
  const t = useTranslations("contact.hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-16 sm:py-20 lg:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}

