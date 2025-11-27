import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function StorySection() {
  const t = useTranslations("home.story");

  return (
    <Section className="bg-secondary/30">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image Side */}
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5">
            {/* Placeholder for image - using gradient and pattern */}
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <svg
                  viewBox="0 0 200 60"
                  className="mx-auto h-20 w-auto text-accent/50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <ellipse cx="50" cy="30" rx="40" ry="25" />
                  <ellipse cx="150" cy="30" rx="40" ry="25" />
                  <line x1="90" y1="30" x2="110" y2="30" />
                  <line x1="10" y1="20" x2="0" y2="15" />
                  <line x1="190" y1="20" x2="200" y2="15" />
                </svg>
                <p className="mt-4 text-sm text-muted-foreground">
                  Brand imagery here
                </p>
              </div>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-4 -end-4 -z-10 h-full w-full rounded-2xl border-2 border-accent/20" />
        </div>

        {/* Content Side */}
        <div className="lg:ps-8">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
          <div className="mt-8">
            <Button variant="outline" size="lg" asChild className="group">
              <Link href="/about">
                {t("cta")}
                <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

