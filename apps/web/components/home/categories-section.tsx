import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { Glasses, Sun, Eye, ArrowRight } from "lucide-react";

const categories = [
  {
    key: "eyeglasses",
    icon: Glasses,
    gradient: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    key: "sunglasses",
    icon: Sun,
    gradient: "from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  {
    key: "contacts",
    icon: Eye,
    gradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
] as const;

export function CategoriesSection() {
  const t = useTranslations("home.categories");

  return (
    <Section className="bg-background">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {categories.map((category) => (
          <Link
            key={category.key}
            href={`/${category.key}`}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-border hover:shadow-lg lg:p-10"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50 transition-opacity group-hover:opacity-100`}
            />

            {/* Content */}
            <div className="relative">
              {/* Icon */}
              <div
                className={`inline-flex rounded-xl bg-background/80 p-4 shadow-sm ${category.iconColor}`}
              >
                <category.icon className="h-8 w-8" />
              </div>

              {/* Text */}
              <h3 className="mt-6 font-display text-xl font-semibold sm:text-2xl">
                {t(`${category.key}.title`)}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {t(`${category.key}.description`)}
              </p>

              {/* Arrow */}
              <div className="mt-6 flex items-center text-sm font-medium text-accent">
                <span className="border-b border-transparent transition-colors group-hover:border-accent">
                  {t(`${category.key}.title`)}
                </span>
                <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

