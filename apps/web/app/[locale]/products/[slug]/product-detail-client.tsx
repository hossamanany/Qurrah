"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ProductGallery, ProductGrid } from "@/components/products";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  Heart,
  ShoppingBag,
  Home,
  Ruler,
  Layers,
  Palette,
} from "lucide-react";
import type { Product, ProductColor } from "@/lib/supabase/types";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const locale = useLocale();
  const t = useTranslations("products.detail");
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0]
  );

  const description =
    locale === "ar" ? product.description_ar : product.description_en;

  // Format price
  const formattedPrice = new Intl.NumberFormat(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  ).format(product.price);

  const formattedOriginalPrice = product.original_price
    ? new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
        style: "currency",
        currency: "USD",
      }).format(product.original_price)
    : null;

  // Get category name for breadcrumb
  const categoryName = product.category
    ? locale === "ar"
      ? product.category.name_ar
      : product.category.name_en
    : "";

  const categorySlug = product.category?.slug || "eyeglasses";

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border/50 bg-muted/30">
        <Container>
          <nav className="flex items-center gap-2 py-4 text-sm">
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("breadcrumb.home")}
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href={`/${categorySlug}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {categoryName}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{product.name}</span>
          </nav>
        </Container>
      </div>

      {/* Product Detail */}
      <Section className="py-8 lg:py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Gallery */}
            <ProductGallery
              images={product.images}
              productName={product.name}
            />

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Badges */}
              <div className="flex gap-2">
                {product.is_new && (
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    {t("badges.new")}
                  </span>
                )}
                {product.is_bestseller && (
                  <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                    {t("badges.bestseller")}
                  </span>
                )}
              </div>

              {/* Name */}
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              {/* Brand */}
              <p className="mt-2 text-muted-foreground">{product.brand}</p>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-semibold">{formattedPrice}</span>
                {formattedOriginalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              {description && (
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-medium">
                    {t("color")}: {selectedColor?.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "relative h-10 w-10 rounded-full border-2 transition-all",
                          selectedColor?.name === color.name
                            ? "border-accent scale-110"
                            : "border-transparent hover:scale-105"
                        )}
                        title={color.name}
                      >
                        <span
                          className="block h-full w-full rounded-full border border-border/30"
                          style={{ backgroundColor: color.hex }}
                        />
                        {selectedColor?.name === color.name && (
                          <span className="absolute -bottom-6 start-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
                            {color.name}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="flex-1 gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  {t("addToCart")}
                </Button>
                <Button size="lg" variant="outline" className="flex-1 gap-2">
                  <Home className="h-5 w-5" />
                  {t("tryAtHome")}
                </Button>
                <Button size="lg" variant="ghost" className="gap-2 sm:flex-initial">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">{t("addToWishlist")}</span>
                </Button>
              </div>

              {/* Specifications */}
              {(product.frame_width ||
                product.lens_width ||
                product.bridge_width) && (
                <div className="mt-10 rounded-xl border border-border/50 bg-muted/30 p-6">
                  <h3 className="font-display text-lg font-semibold">
                    {t("specifications")}
                  </h3>
                  <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {product.frame_width && (
                      <div className="flex items-start gap-3">
                        <Ruler className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <dt className="text-sm text-muted-foreground">
                            {t("specs.frameWidth")}
                          </dt>
                          <dd className="font-medium">{product.frame_width}mm</dd>
                        </div>
                      </div>
                    )}
                    {product.lens_width && (
                      <div className="flex items-start gap-3">
                        <Palette className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <dt className="text-sm text-muted-foreground">
                            {t("specs.lensWidth")}
                          </dt>
                          <dd className="font-medium">{product.lens_width}mm</dd>
                        </div>
                      </div>
                    )}
                    {product.bridge_width && (
                      <div className="flex items-start gap-3">
                        <Layers className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <dt className="text-sm text-muted-foreground">
                            {t("specs.bridgeWidth")}
                          </dt>
                          <dd className="font-medium">{product.bridge_width}mm</dd>
                        </div>
                      </div>
                    )}
                  </dl>

                  {/* Additional specs */}
                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/50 pt-4 sm:grid-cols-4">
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        {t("specs.material")}
                      </dt>
                      <dd className="mt-1 font-medium capitalize">
                        {product.material}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        {t("specs.shape")}
                      </dt>
                      <dd className="mt-1 font-medium capitalize">
                        {product.shape}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        {t("specs.width")}
                      </dt>
                      <dd className="mt-1 font-medium capitalize">
                        {product.width}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        {t("specs.gender")}
                      </dt>
                      <dd className="mt-1 font-medium capitalize">
                        {product.gender}
                      </dd>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Section className="border-t border-border/50 bg-muted/30">
          <Container>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {t("relatedProducts")}
            </h2>
            <div className="mt-8">
              <ProductGrid products={relatedProducts} />
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

