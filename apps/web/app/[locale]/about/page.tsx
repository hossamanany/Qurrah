import { setRequestLocale } from "next-intl/server";
import { Header, Footer } from "@/components/layout";
import {
  AboutHeroSection,
  AboutStorySection,
  MissionSection,
  ValuesSection,
} from "@/components/about";

export default async function AboutPage({
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
        <AboutHeroSection />
        <AboutStorySection />
        <MissionSection />
        <ValuesSection />
      </main>
      <Footer />
    </>
  );
}

