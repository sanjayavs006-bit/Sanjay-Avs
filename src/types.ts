export type MainCategory = 'ALL' | 'WOMEN' | 'MEN' | 'KIDS' | 'NEW ARRIVALS' | 'DENIM' | 'SALE';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'WOMEN' | 'MEN' | 'KIDS' | 'NEW ARRIVALS' | 'DENIM';
  subCategory: string;
  price: number;
  originalPrice?: number;
  badge?: 'NEW' | 'PREMIUM SELECTION' | 'SALE' | 'ESSENTIAL';
  image: string;
  hoverImage: string;
  gallery: string[];
  colors: ProductColor[];
  sizes: string[];
  fit: string;
  composition: string;
  description: string;
  editorialNote?: string;
  isNew?: boolean;
  isSale?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  sku: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface EditorialCategory {
  id: string;
  name: string;
  label: string;
  tagline: string;
  image: string;
  hrefCategory: MainCategory;
}

export type ActivePage = 
  | 'home' 
  | 'shop' 
  | 'women' 
  | 'men' 
  | 'kids' 
  | 'new-arrivals'
  | 'denim'
  | 'sale'
  | 'wishlist'
  | 'about';

export interface FilterState {
  category: MainCategory;
  subCategory: string;
  sort: 'recommended' | 'newest' | 'price-asc' | 'price-desc';
  searchQuery: string;
  selectedSize?: string;
  selectedColor?: string;
}
