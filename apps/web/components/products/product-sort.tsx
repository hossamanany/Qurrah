"use client";

import { useTranslations } from "next-intl";
import { Select } from "@/components/ui/select";
import type { SortOption } from "@/lib/supabase/types";

interface ProductSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  const t = useTranslations("products.sort");

  const options = [
    { value: "newest", label: t("newest") },
    { value: "price-asc", label: t("priceAsc") },
    { value: "price-desc", label: t("priceDesc") },
    { value: "bestseller", label: t("bestseller") },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {t("label")}
      </span>
      <Select
        value={value}
        onChange={(v) => onChange(v as SortOption)}
        options={options}
        className="w-[180px]"
      />
    </div>
  );
}

