import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Award, Heart, Leaf, Lightbulb } from "lucide-react";

const values = [
  {
    key: "quality",
    icon: Award,
    color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",
  },
  {
    key: "accessibility",
    icon: Heart,
    color: "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30",
  },
  {
    key: "sustainability",
    icon: Leaf,
    color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30",
  },
  {
    key: "innovation",
    icon: Lightbulb,
    color: "text-sky-600 bg-sky-100 dark:text-sky-400 dark:bg-sky-900/30",
  },
] as const;

export function ValuesSection() {
  const t = useTranslations("about.values");

  return (
    <Section className="bg-secondary/30">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
        {values.map((value) => (
          <div
            key={value.key}
            className="rounded-2xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-md lg:p-8"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`rounded-xl p-3 ${value.color}`}>
                <value.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold">
                  {t(`${value.key}.title`)}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {t(`${value.key}.description`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

