import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import type { Category } from "@/lib/supabase/types";

interface CategoryHeroProps {
  category: Category;
}

export function CategoryHero({ category }: CategoryHeroProps) {
  const locale = useLocale();

  const name = locale === "ar" ? category.name_ar : category.name_en;
  const description =
    locale === "ar" ? category.description_ar : category.description_en;

  return (
    <section className="border-b border-border/50 bg-gradient-to-b from-muted/50 to-background py-12 lg:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {name}
          </h1>
          {description && (
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

