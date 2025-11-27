import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Target } from "lucide-react";

export function MissionSection() {
  const t = useTranslations("about.mission");

  return (
    <Section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10">
          <Target className="h-8 w-8" />
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-6 text-xl leading-relaxed text-primary-foreground/80">
          {t("description")}
        </p>
      </div>
    </Section>
  );
}

