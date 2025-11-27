"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/supabase/types";
import { ProductCard } from "./product-card";
import { ProductGridSkeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  className?: string;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  isLoading = false,
  className,
  emptyMessage,
}: ProductGridProps) {
  const t = useTranslations("products");

  if (isLoading) {
    return <ProductGridSkeleton count={8} />;
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <div className="mx-auto max-w-md">
          <h3 className="font-display text-xl font-semibold">
            {t("empty.title")}
          </h3>
          <p className="mt-2 text-muted-foreground">
            {emptyMessage || t("empty.description")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

