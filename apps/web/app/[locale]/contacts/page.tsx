import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProducts } from "@/lib/supabase/queries";
import { CategoryPageClient } from "@/components/products";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("products.contacts");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ContactsPage() {
  const category = await getCategoryBySlug("contacts");

  if (!category) {
    notFound();
  }

  const products = await getProducts({
    categorySlug: "contacts",
    sort: "newest",
  });

  return <CategoryPageClient category={category} initialProducts={products} />;
}

