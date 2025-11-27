import { setRequestLocale } from "next-intl/server";
import { Header, Footer } from "@/components/layout";
import { ContactHeroSection, ContactForm, ContactInfo } from "@/components/contact";
import { Section } from "@/components/ui/section";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <ContactHeroSection />
        <Section className="bg-background">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

