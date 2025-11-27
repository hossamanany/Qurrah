// Database types for Supabase tables

export interface Category {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  image_url: string | null;
  created_at: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  brand: string;
  description_en: string | null;
  description_ar: string | null;
  price: number;
  original_price: number | null;
  images: string[];
  colors: ProductColor[];
  width: 'narrow' | 'medium' | 'wide' | 'extra-wide';
  shape: 'round' | 'square' | 'rectangle' | 'aviator' | 'cat-eye' | 'geometric' | 'oval';
  material: 'acetate' | 'metal' | 'titanium' | 'mixed';
  gender: 'men' | 'women' | 'unisex';
  frame_width: number | null;
  lens_width: number | null;
  bridge_width: number | null;
  is_new: boolean;
  is_bestseller: boolean;
  in_stock: boolean;
  created_at: string;
  // Joined fields
  category?: Category;
}

// Filter options
export type WidthFilter = Product['width'];
export type ShapeFilter = Product['shape'];
export type MaterialFilter = Product['material'];
export type GenderFilter = Product['gender'];

export interface ProductFilters {
  gender?: GenderFilter | null;
  width?: WidthFilter[];
  shape?: ShapeFilter[];
  material?: MaterialFilter[];
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'bestseller';

export interface ProductQueryParams {
  categorySlug?: string;
  filters?: ProductFilters;
  sort?: SortOption;
  limit?: number;
  offset?: number;
}

