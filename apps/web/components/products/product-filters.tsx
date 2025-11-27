"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductFilters, GenderFilter } from "@/lib/supabase/types";

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterGroup({ title, children, defaultOpen = true }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/50 py-4 first:pt-0 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm font-medium"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  count?: number;
}

function FilterCheckbox({ label, checked, onChange, count }: FilterCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1">
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded border-2 transition-colors",
          checked
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border hover:border-accent/50"
        )}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span className="flex-1 text-sm">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </label>
  );
}

interface ColorSwatchProps {
  name: string;
  hex: string;
  selected: boolean;
  onChange: (selected: boolean) => void;
}

function ColorSwatch({ name, hex, selected, onChange }: ColorSwatchProps) {
  return (
    <button
      onClick={() => onChange(!selected)}
      className={cn(
        "group relative h-8 w-8 rounded-full border-2 transition-all",
        selected ? "border-accent scale-110" : "border-transparent hover:scale-105"
      )}
      title={name}
    >
      <span
        className="block h-full w-full rounded-full border border-border/30"
        style={{ backgroundColor: hex }}
      />
      {selected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className={cn(
              "h-4 w-4",
              hex === "#FFFFFF" || hex === "#E8E8E8" || hex === "#F7E7CE"
                ? "text-foreground"
                : "text-white"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      )}
    </button>
  );
}

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  availableColors?: Array<{ name: string; hex: string }>;
  className?: string;
}

export function ProductFiltersPanel({
  filters,
  onFiltersChange,
  availableColors = [],
  className,
}: ProductFiltersProps) {
  const t = useTranslations("products.filters");

  const widthOptions = [
    { value: "narrow", label: t("width.narrow") },
    { value: "medium", label: t("width.medium") },
    { value: "wide", label: t("width.wide") },
    { value: "extra-wide", label: t("width.extraWide") },
  ] as const;

  const shapeOptions = [
    { value: "round", label: t("shape.round") },
    { value: "square", label: t("shape.square") },
    { value: "rectangle", label: t("shape.rectangle") },
    { value: "aviator", label: t("shape.aviator") },
    { value: "cat-eye", label: t("shape.catEye") },
    { value: "geometric", label: t("shape.geometric") },
    { value: "oval", label: t("shape.oval") },
  ] as const;

  const materialOptions = [
    { value: "acetate", label: t("material.acetate") },
    { value: "metal", label: t("material.metal") },
    { value: "titanium", label: t("material.titanium") },
    { value: "mixed", label: t("material.mixed") },
  ] as const;

  const toggleArrayFilter = <T extends string>(
    key: keyof ProductFilters,
    value: T
  ) => {
    const current = (filters[key] as T[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated.length > 0 ? updated : undefined });
  };

  const activeFiltersCount =
    (filters.width?.length || 0) +
    (filters.shape?.length || 0) +
    (filters.material?.length || 0) +
    (filters.colors?.length || 0);

  const clearAllFilters = () => {
    onFiltersChange({
      gender: filters.gender, // Keep gender selection
    });
  };

  return (
    <div className={cn("space-y-0", className)}>
      {/* Active filters count and clear */}
      {activeFiltersCount > 0 && (
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {t("activeCount", { count: activeFiltersCount })}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-auto p-0 text-sm text-accent hover:text-accent/80"
          >
            {t("clearAll")}
          </Button>
        </div>
      )}

      {/* Width Filter */}
      <FilterGroup title={t("width.title")}>
        {widthOptions.map((option) => (
          <FilterCheckbox
            key={option.value}
            label={option.label}
            checked={filters.width?.includes(option.value) || false}
            onChange={() => toggleArrayFilter("width", option.value)}
          />
        ))}
      </FilterGroup>

      {/* Shape Filter */}
      <FilterGroup title={t("shape.title")}>
        {shapeOptions.map((option) => (
          <FilterCheckbox
            key={option.value}
            label={option.label}
            checked={filters.shape?.includes(option.value) || false}
            onChange={() => toggleArrayFilter("shape", option.value)}
          />
        ))}
      </FilterGroup>

      {/* Material Filter */}
      <FilterGroup title={t("material.title")}>
        {materialOptions.map((option) => (
          <FilterCheckbox
            key={option.value}
            label={option.label}
            checked={filters.material?.includes(option.value) || false}
            onChange={() => toggleArrayFilter("material", option.value)}
          />
        ))}
      </FilterGroup>

      {/* Color Filter */}
      {availableColors.length > 0 && (
        <FilterGroup title={t("color.title")}>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => (
              <ColorSwatch
                key={color.name}
                name={color.name}
                hex={color.hex}
                selected={filters.colors?.includes(color.name) || false}
                onChange={() => toggleArrayFilter("colors", color.name)}
              />
            ))}
          </div>
        </FilterGroup>
      )}
    </div>
  );
}

// Gender tabs component
interface GenderTabsProps {
  value: GenderFilter | null;
  onChange: (value: GenderFilter | null) => void;
}

export function GenderTabs({ value, onChange }: GenderTabsProps) {
  const t = useTranslations("products.filters.gender");

  const options = [
    { value: null, label: t("all") },
    { value: "women" as const, label: t("women") },
    { value: "men" as const, label: t("men") },
  ];

  return (
    <div className="flex gap-1 rounded-lg bg-muted p-1">
      {options.map((option) => (
        <button
          key={option.value ?? "all"}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all",
            value === option.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Mobile filter drawer trigger
interface MobileFilterTriggerProps {
  activeCount: number;
  onClick: () => void;
}

export function MobileFilterTrigger({ activeCount, onClick }: MobileFilterTriggerProps) {
  const t = useTranslations("products.filters");

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="flex items-center gap-2 lg:hidden"
    >
      <SlidersHorizontal className="h-4 w-4" />
      {t("title")}
      {activeCount > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
          {activeCount}
        </span>
      )}
    </Button>
  );
}

