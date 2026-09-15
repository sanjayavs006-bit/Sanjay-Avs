import React from 'react';
import { ProductCard } from './ProductCard';
import { Product, MainCategory } from '../types';
import { SlidersHorizontal } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  activeCategory: MainCategory;
  onSelectCategory: (category: MainCategory) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, size: string, color: string) => void;
  onSelectProduct: (product: Product) => void;
  sortBy: 'recommended' | 'newest' | 'price-asc' | 'price-desc';
  onChangeSort: (sort: 'recommended' | 'newest' | 'price-asc' | 'price-desc') => void;
}

const CATEGORY_TABS: { id: MainCategory; label: string }[] = [
  { id: 'ALL', label: 'ALL PRODUCTS' },
  { id: 'WOMEN', label: 'WOMEN' },
  { id: 'MEN', label: 'MEN' },
  { id: 'KIDS', label: 'KIDS' },
  { id: 'NEW ARRIVALS', label: 'NEW IN' },
  { id: 'DENIM', label: 'DENIM' },
  { id: 'SALE', label: 'SALE' },
];

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  sortBy,
  onChangeSort,
}) => {
  return (
    <section id="products-section" className="w-full bg-[#FFFFFF] py-10 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* 1. Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#000000]">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#666666]">
            CURATED CATALOG
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#000000] mt-1">
            {activeCategory === 'ALL' ? 'ALL STYLES' : activeCategory}
          </h2>
        </div>

        {/* Sorting Dropdown & Style Counter */}
        <div className="flex items-center justify-between md:justify-end gap-4 text-xs font-bold uppercase tracking-[0.14em]">
          <span className="text-[#666666] font-normal">
            {products.length} {products.length === 1 ? 'ITEM' : 'ITEMS'}
          </span>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#000000]" />
            <span className="text-[#000000] hidden sm:inline">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => onChangeSort(e.target.value as any)}
              className="bg-transparent text-[#000000] font-bold cursor-pointer outline-none border-b border-black/30 pb-0.5"
            >
              <option value="recommended">RECOMMENDED</option>
              <option value="newest">NEWEST ARRIVALS</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Sub-Category Pills */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-5">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#000000] text-white border-[#000000]'
                  : tab.id === 'SALE'
                  ? 'bg-transparent text-[#E30613] border-[#E30613]/50 hover:bg-[#E30613] hover:text-white'
                  : 'bg-transparent text-[#000000] border-[#E5E5E5] hover:border-[#000000]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Products Grid (Clean 2-Col Mobile, 4-Col Desktop) */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12 pt-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickAdd={onQuickAdd}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#666666]">
            No styles found matching your criteria.
          </p>
          <button
            onClick={() => onSelectCategory('ALL')}
            className="px-6 py-3 bg-[#000000] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#E30613] transition-colors cursor-pointer"
          >
            RESET FILTERS
          </button>
        </div>
      )}
    </section>
  );
};
