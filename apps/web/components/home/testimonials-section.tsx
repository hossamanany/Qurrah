"use client";

import { useTranslations, useLocale } from "next-intl";
import { Section } from "@/components/ui/section";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    nameAr: "سارة م.",
    role: "Designer",
    roleAr: "مصممة",
    content:
      "The quality of these frames exceeded my expectations. I've received so many compliments!",
    contentAr:
      "جودة هذه الإطارات فاقت توقعاتي. تلقيت الكثير من الإطراء!",
  },
  {
    name: "Ahmed K.",
    nameAr: "أحمد ك.",
    role: "Engineer",
    roleAr: "مهندس",
    content:
      "Finally found eyewear that combines style with comfort. The virtual try-on feature is amazing.",
    contentAr:
      "أخيراً وجدت نظارات تجمع بين الأناقة والراحة. ميزة التجربة الافتراضية رائعة.",
  },
  {
    name: "Fatima A.",
    nameAr: "فاطمة أ.",
    role: "Teacher",
    roleAr: "معلمة",
    content:
      "Best customer service I've experienced. They helped me find the perfect frames for my face shape.",
    contentAr:
      "أفضل خدمة عملاء جربتها. ساعدوني في إيجاد الإطارات المثالية لشكل وجهي.",
  },
];

export function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <Section className="bg-secondary/30">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-shadow hover:shadow-md lg:p-8"
          >
            {/* Quote Icon */}
            <Quote className="h-8 w-8 text-accent/30" />

            {/* Content */}
            <p className="mt-4 text-muted-foreground">
              &ldquo;{isArabic ? testimonial.contentAr : testimonial.content}&rdquo;
            </p>

            {/* Author */}
            <div className="mt-6 flex items-center gap-3">
              {/* Avatar Placeholder */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/10">
                <span className="font-display text-lg font-semibold text-accent">
                  {(isArabic ? testimonial.nameAr : testimonial.name).charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium">
                  {isArabic ? testimonial.nameAr : testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? testimonial.roleAr : testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

