import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactItems = [
  {
    key: "address",
    icon: MapPin,
  },
  {
    key: "phone",
    icon: Phone,
  },
  {
    key: "email",
    icon: Mail,
  },
  {
    key: "hours",
    icon: Clock,
  },
] as const;

export function ContactInfo() {
  const t = useTranslations("contact.info");

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 lg:p-8">
      <h2 className="font-display text-2xl font-bold">{t("title")}</h2>

      <div className="mt-8 space-y-6">
        {contactItems.map((item) => (
          <div key={item.key} className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t(`${item.key}.label`)}
              </p>
              <p className="mt-1 text-foreground">
                {t(`${item.key}.value`)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Map Placeholder */}
      <div className="mt-8 aspect-video overflow-hidden rounded-xl bg-secondary">
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Interactive map here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

