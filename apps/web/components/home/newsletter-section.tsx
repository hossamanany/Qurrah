"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const t = useTranslations("home.newsletter");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <Section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-primary-foreground/80">
          {t("description")}
        </p>

        {isSubmitted ? (
          <div className="mt-8 flex items-center justify-center gap-2 text-lg">
            <CheckCircle className="h-6 w-6" />
            <span>Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                required
                className="flex-1 rounded-lg border-0 bg-primary-foreground/10 px-5 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 sm:rounded-e-none rtl:sm:rounded-e-lg rtl:sm:rounded-s-none"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 sm:rounded-s-none rtl:sm:rounded-e-none rtl:sm:rounded-s-lg"
              >
                <Send className="me-2 h-4 w-4" />
                {t("cta")}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}

