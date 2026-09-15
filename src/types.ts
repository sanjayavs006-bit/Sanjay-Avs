export type MoodCategory = 
  | 'ALL' 
  | 'ROMANTIC & PLAYFUL' 
  | 'COZY & INDULGENT' 
  | 'FRESH & DREAMY' 
  | 'BESTSELLERS'
  | 'SETS & GIFTS';

export type MoodVibe = 
  | 'ROMANTIC' 
  | 'COZY' 
  | 'DREAMY' 
  | 'SWEET' 
  | 'HAPPY' 
  | 'FRESH' 
  | 'CALM' 
  | 'PLAYFUL' 
  | 'FUN' 
  | 'INDULGENT' 
  | 'MYSTERIOUS';

export type IconSymbol = 
  | 'heart' 
  | 'teddy' 
  | 'cloud' 
  | 'peach' 
  | 'sun' 
  | 'green-heart' 
  | 'moon' 
  | 'daisy' 
  | 'coffee' 
  | 'cherry' 
  | 'chocolate' 
  | 'cat';

export interface Product {
  id: string;
  number: string; // e.g. '#01'
  name: string; // e.g. 'HEART'
  personality: string; // e.g. 'Romantic'
  title: string; // e.g. 'HEART — Romantic'
  tinColor: string; // background pastel of the compact
  tinAccentColor: string; // dark wine/burgundy or contrast
  balmColor: string; // color of the balm inside
  colorName: string; // e.g. 'Soft Blush Pink'
  flavor: string; // e.g. 'Wild Strawberry & Shea'
  finish: string; // e.g. 'Dewy Rose Glaze'
  moodVibe: MoodVibe;
  category: MoodCategory;
  price: number; // ₹499
  originalPrice?: number;
  quote: string; // 'For the soft heart moments.'
  description: string;
  whatsInside: string[];
  whyYoullLoveIt: string[];
  howToUse: string;
  ingredients: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  iconSymbol: IconSymbol;
  modelImage: string; // high-end beauty portrait with natural glowing skin & product
  productImage: string; // collectible round compact box shot
  openBalmImage: string; // opened compact showing buttery balm
  lipMacroImage: string; // extreme close up hydrated glossy lips
  lifestyleImage: string; // palm of hand or editorial tabletop
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  giftBox?: boolean;
}

export type ActivePage = 'home' | '12-moods' | 'shop' | 'about' | 'wishlist';

export interface FilterState {
  category: MoodCategory;
  sort: 'recommended' | 'price-asc' | 'price-desc' | 'rating';
  searchQuery: string;
}
