import { supabase } from '../supabaseClient';
import type { Category, Product, ProductQueryParams } from './types';

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

// Fetch a single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  return data;
}

// Fetch products with optional filters and sorting
export async function getProducts(params: ProductQueryParams = {}): Promise<Product[]> {
  const { categorySlug, filters, sort = 'newest', limit, offset } = params;

  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `);

  // Filter by category
  if (categorySlug) {
    const category = await getCategoryBySlug(categorySlug);
    if (category) {
      query = query.eq('category_id', category.id);
    }
  }

  // Apply filters
  if (filters) {
    if (filters.gender) {
      query = query.or(`gender.eq.${filters.gender},gender.eq.unisex`);
    }

    if (filters.width && filters.width.length > 0) {
      query = query.in('width', filters.width);
    }

    if (filters.shape && filters.shape.length > 0) {
      query = query.in('shape', filters.shape);
    }

    if (filters.material && filters.material.length > 0) {
      query = query.in('material', filters.material);
    }

    if (filters.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }
  }

  // Apply sorting
  switch (sort) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'bestseller':
      query = query.order('is_bestseller', { ascending: false }).order('created_at', { ascending: false });
      break;
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false });
      break;
  }

  // Apply pagination
  if (limit) {
    query = query.limit(limit);
  }

  if (offset) {
    query = query.range(offset, offset + (limit || 20) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

// Fetch a single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

// Fetch related products (same category, excluding current product)
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('category_id', product.category_id)
    .neq('id', product.id)
    .limit(limit);

  if (error) {
    console.error('Error fetching related products:', error);
    return [];
  }

  return data || [];
}

// Fetch featured products (bestsellers or new)
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .or('is_bestseller.eq.true,is_new.eq.true')
    .limit(limit);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data || [];
}

// Get unique filter values from products
export async function getFilterOptions(categorySlug?: string): Promise<{
  shapes: string[];
  materials: string[];
  widths: string[];
  colors: string[];
  priceRange: { min: number; max: number };
}> {
  let query = supabase
    .from('products')
    .select('shape, material, width, colors, price, category:categories!inner(slug)');

  if (categorySlug) {
    query = query.eq('category.slug', categorySlug);
  }

  const { data, error } = await query;

  if (error || !data) {
    return {
      shapes: [],
      materials: [],
      widths: [],
      colors: [],
      priceRange: { min: 0, max: 1000 },
    };
  }

  const shapes = [...new Set(data.map((p) => p.shape))];
  const materials = [...new Set(data.map((p) => p.material))];
  const widths = [...new Set(data.map((p) => p.width))];
  
  // Extract unique colors from all products
  const allColors = data.flatMap((p) => 
    (p.colors as { name: string; hex: string }[]).map((c) => c.name)
  );
  const colors = [...new Set(allColors)];

  const prices = data.map((p) => p.price);
  const priceRange = {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };

  return { shapes, materials, widths, colors, priceRange };
}


