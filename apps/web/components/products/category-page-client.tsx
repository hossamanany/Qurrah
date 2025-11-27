"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ProductGrid,
  ProductFiltersPanel,
  GenderTabs,
  MobileFilterTrigger,
  ProductSort,
  CategoryHero,
} from "@/components/products";
import { getProducts } from "@/lib/supabase/queries";
import type {
  Category,
  Product,
  ProductFilters,
  SortOption,
  ProductColor,
} from "@/lib/supabase/types";

interface CategoryPageClientProps {
  category: Category;
  initialProducts: Product[];
}

export function CategoryPageClient({
  category,
  initialProducts,
}: CategoryPageClientProps) {
  const t = useTranslations("products");
  
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sort, setSort] = useState<SortOption>("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract unique colors from all products
  const availableColors = initialProducts.reduce<ProductColor[]>(
    (acc, product) => {
      product.colors.forEach((color) => {
        if (!acc.find((c) => c.name === color.name)) {
          acc.push(color);
        }
      });
      return acc;
    },
    []
  );

  // Fetch products when filters or sort changes
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getProducts({
        categorySlug: category.slug,
        filters,
        sort,
      });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [category.slug, filters, sort]);

  useEffect(() => {
    // Only fetch if filters or sort have changed from initial state
    const hasFilters =
      filters.gender ||
      (filters.width && filters.width.length > 0) ||
      (filters.shape && filters.shape.length > 0) ||
      (filters.material && filters.material.length > 0) ||
      (filters.colors && filters.colors.length > 0);

    if (hasFilters || sort !== "newest") {
      fetchProducts();
    } else {
      setProducts(initialProducts);
    }
  }, [filters, sort, fetchProducts, initialProducts]);

  const activeFiltersCount =
    (filters.width?.length || 0) +
    (filters.shape?.length || 0) +
    (filters.material?.length || 0) +
    (filters.colors?.length || 0);

  return (
    <>
      <CategoryHero category={category} />

      <section className="py-8 lg:py-12">
        <Container>
          {/* Top bar: Gender tabs, count, sort */}
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Gender tabs */}
            <div className="w-full max-w-sm">
              <GenderTabs
                value={filters.gender || null}
                onChange={(gender) =>
                  setFilters((f) => ({ ...f, gender: gender ?? undefined }))
                }
              />
            </div>

            {/* Product count and sort */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                {t("productCount", { count: products.length })}
              </span>
              
              {/* Mobile filter trigger */}
              <MobileFilterTrigger
                activeCount={activeFiltersCount}
                onClick={() => setMobileFiltersOpen(true)}
              />

              {/* Sort dropdown - hidden on mobile, shown on desktop */}
              <div className="hidden lg:block">
                <ProductSort value={sort} onChange={setSort} />
              </div>
            </div>
          </div>

          {/* Main content with sidebar */}
          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden w-64 flex-shrink-0 lg:block">
              <div className="sticky top-24">
                <h2 className="mb-4 font-display text-lg font-semibold">
                  {t("filters.title")}
                </h2>
                <ProductFiltersPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                  availableColors={availableColors}
                />
              </div>
            </aside>

            {/* Product grid */}
            <div className="flex-1">
              {/* Mobile sort - shown above grid on mobile */}
              <div className="mb-4 lg:hidden">
                <ProductSort value={sort} onChange={setSort} />
              </div>

              <ProductGrid products={products} isLoading={isLoading} />
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute inset-y-0 end-0 w-full max-w-sm bg-background shadow-xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="font-display text-lg font-semibold">
                  {t("filters.title")}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Filters */}
              <div className="flex-1 overflow-y-auto p-4">
                <ProductFiltersPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                  availableColors={availableColors}
                />
              </div>

              {/* Footer */}
              <div className="border-t border-border p-4">
                <Button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full"
                >
                  {t("filters.showResults", { count: products.length })}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

