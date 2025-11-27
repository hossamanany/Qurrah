"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/supabase/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations("products");

  const description =
    locale === "ar" ? product.description_ar : product.description_en;

  // Format price
  const formattedPrice = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const formattedOriginalPrice = product.original_price
    ? new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
        style: "currency",
        currency: "USD",
      }).format(product.original_price)
    : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300",
        "hover:border-border hover:shadow-lg",
        className
      )}
    >
      {/* Badges */}
      <div className="absolute start-3 top-3 z-10 flex flex-col gap-2">
        {product.is_new && (
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
            {t("badges.new")}
          </span>
        )}
        {product.is_bestseller && (
          <span className="rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
            {t("badges.bestseller")}
          </span>
        )}
        {product.original_price && product.original_price > product.price && (
          <span className="rounded-full bg-destructive px-2.5 py-1 text-xs font-medium text-white">
            {t("badges.sale")}
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No image
          </div>
        )}

        {/* Hover overlay with second image */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} - alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-medium">{formattedPrice}</span>
          {formattedOriginalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5">
            {product.colors.slice(0, 5).map((color, index) => (
              <div
                key={index}
                className="h-4 w-4 rounded-full border border-border/50 shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Description preview */}
        {description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}

