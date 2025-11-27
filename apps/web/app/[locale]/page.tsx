import { setRequestLocale } from "next-intl/server";
import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  CategoriesSection,
  StorySection,
  FeaturesSection,
  TestimonialsSection,
  NewsletterSection,
} from "@/components/home";

export default async function HomePage({
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
        <HeroSection />
        <CategoriesSection />
        <StorySection />
        <FeaturesSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}

