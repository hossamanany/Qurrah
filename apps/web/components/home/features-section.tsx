import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Award, Scan, Truck, RotateCcw } from "lucide-react";

const features = [
  {
    key: "quality",
    icon: Award,
  },
  {
    key: "tryOn",
    icon: Scan,
  },
  {
    key: "shipping",
    icon: Truck,
  },
  {
    key: "returns",
    icon: RotateCcw,
  },
] as const;

export function FeaturesSection() {
  const t = useTranslations("home.features");

  return (
    <Section className="bg-background">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.key}
            className="group text-center"
          >
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary transition-colors group-hover:bg-accent/10">
              <feature.icon className="h-8 w-8 text-accent" />
            </div>

            {/* Content */}
            <h3 className="mt-6 font-display text-lg font-semibold">
              {t(`${feature.key}.title`)}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(`${feature.key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

