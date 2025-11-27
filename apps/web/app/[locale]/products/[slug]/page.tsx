import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProductBySlug, getRelatedProducts } from "@/lib/supabase/queries";
import { ProductDetailClient } from "./product-detail-client";

interface ProductPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const description =
    locale === "ar" ? product.description_ar : product.description_en;

  return {
    title: `${product.name} | Qurrah`,
    description: description || `Shop ${product.name} at Qurrah`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product, 4);

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}

