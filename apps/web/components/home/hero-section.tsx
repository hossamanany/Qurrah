import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">{t("title")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" asChild className="group">
              <Link href="/">
                {t("cta")}
                <ArrowRight className="ms-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        
        {/* Floating Glasses Illustration Placeholder */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-20">
          <svg
            viewBox="0 0 200 60"
            className="h-16 w-auto text-foreground sm:h-20 lg:h-24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Simplified glasses shape */}
            <ellipse cx="50" cy="30" rx="40" ry="25" />
            <ellipse cx="150" cy="30" rx="40" ry="25" />
            <line x1="90" y1="30" x2="110" y2="30" />
            <line x1="10" y1="20" x2="0" y2="15" />
            <line x1="190" y1="20" x2="200" y2="15" />
          </svg>
        </div>
      </div>
    </section>
  );
}

