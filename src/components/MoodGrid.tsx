import React, { useState } from 'react';
import { Product, MoodCategory } from '../types';
import { BalmCompactVisual } from './BalmCompactVisual';
import { Heart, Plus, Sparkles, Check } from 'lucide-react';

interface MoodGridProps {
  products: Product[];
  selectedCategory: MoodCategory;
  onSelectCategory: (category: MoodCategory) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

const CATEGORY_TABS: { label: string; value: MoodCategory }[] = [
  { label: 'ALL 12 MOODS', value: 'ALL' },
  { label: 'ROMANTIC & PLAYFUL', value: 'ROMANTIC & PLAYFUL' },
  { label: 'COZY & INDULGENT', value: 'COZY & INDULGENT' },
  { label: 'FRESH & DREAMY', value: 'FRESH & DREAMY' },
  { label: 'BESTSELLERS', value: 'BESTSELLERS' },
];

export const MoodGrid: React.FC<MoodGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  // Global view toggle: 'top' (illustrated lid) vs 'open' (creamy balm)
  const [globalView, setGlobalView] = useState<'top' | 'open'>('top');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Filter products based on selected tab
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'BESTSELLERS') return p.isBestseller;
    return p.category === selectedCategory;
  });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1800);
  };

  return (
    <section id="the-12-moods" className="w-full bg-[#FFF8F2] py-16 sm:py-24 border-b border-[#E8D3C2]/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E8D3C2]/80">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.26em] text-[#7B2638] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#7B2638]" />
              <span>THE SIGNATURE COLLECTION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#111111] font-sans">
              THE 12 MOODS
            </h2>
            <p className="text-base sm:text-lg text-[#7B2638] font-serif italic mt-1">
              Different mood. Same care. ♡
            </p>
          </div>

          {/* Interactive Packaging View Mode Switcher (Lid vs Open) */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111]/70">
              VIEW PACKAGING:
            </span>
            <div className="inline-flex p-1 bg-[#FFFFFF] border border-[#E8D3C2] rounded-full shadow-xs">
              <button
                onClick={() => setGlobalView('top')}
                className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  globalView === 'top'
                    ? 'bg-[#7B2638] text-white shadow-xs'
                    : 'text-[#111111]/70 hover:text-[#111111]'
                }`}
              >
                COMPACT LID
              </button>
              <button
                onClick={() => setGlobalView('open')}
                className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  globalView === 'open'
                    ? 'bg-[#7B2638] text-white shadow-xs'
                    : 'text-[#111111]/70 hover:text-[#111111]'
                }`}
              >
                OPEN BALM
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onSelectCategory(tab.value)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer ${
                selectedCategory === tab.value
                  ? 'bg-[#7B2638] text-[#FFF8F2] shadow-xs'
                  : 'bg-[#FFFFFF] border border-[#E8D3C2] text-[#111111] hover:border-[#7B2638]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* The 12 Moods Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-4">
          {filteredProducts.map((product) => {
            const wish = isWishlisted(product.id);
            const isAdded = justAddedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-[#E8D3C2] hover:border-[#7B2638]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-compact"
              >
                {/* Top Row: Number Badge, Bestseller Pill & Wishlist button */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#7B2638] bg-[#FFF8F2] px-2 py-0.5 rounded-md border border-[#E8D3C2]">
                      {product.number}
                    </span>
                    {product.isBestseller && (
                      <span className="text-[9px] font-bold tracking-wider text-[#7B2638] bg-[#F8DDE0] px-2 py-0.5 rounded-full uppercase">
                        BESTSELLER
                      </span>
                    )}
                    {product.isNew && (
                      <span className="text-[9px] font-bold tracking-wider text-[#111111] bg-[#FEF3C7] px-2 py-0.5 rounded-full uppercase">
                        NEW
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className="p-1.5 rounded-full bg-white/80 hover:bg-[#F8DDE0] transition-colors cursor-pointer border border-[#E8D3C2]/60"
                    aria-label="Wishlist item"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        wish ? 'fill-[#7B2638] text-[#7B2638]' : 'text-[#111111]/70'
                      }`}
                    />
                  </button>
                </div>

                {/* Center Visual: The Compact packaging visual */}
                <div className="py-6 sm:py-8 flex items-center justify-center relative">
                  <BalmCompactVisual
                    product={product}
                    view={globalView}
                    size="md"
                    className="transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Bottom Details */}
                <div className="space-y-2 pt-2 border-t border-[#FFF8F2]">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-[#111111]">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#7B2638] font-serif italic">
                        {product.personality}
                      </p>
                    </div>
                    <span className="text-sm font-black text-[#111111]">
                      ₹{product.price}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#111111]/70 line-clamp-1">
                    {product.flavor}
                  </p>

                  {/* Quick Add Button */}
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`w-full py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-3 ${
                      isAdded
                        ? 'bg-[#10B981] text-white'
                        : 'bg-[#7B2638] hover:bg-[#111111] text-[#FFF8F2]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD TO BAG</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Collectors Offer Banner */}
        <div className="mt-16 bg-[#F8DDE0] rounded-2xl p-6 sm:p-10 border border-[#C96B7B]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-[#7B2638]">
              COLLECTOR'S BUNDLE PERK
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#7B2638]">
              BUILD YOUR 3-MOOD MATCH BOX
            </h3>
            <p className="text-xs sm:text-sm text-[#111111]/80 max-w-lg">
              Pick any 3 collectible lip balms, get our custom embossed burgundy presentation box + 10% off with code <strong className="font-mono text-[#7B2638]">MOODMATCH10</strong>.
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('ALL')}
            className="px-6 py-3.5 bg-[#7B2638] hover:bg-[#111111] text-[#FFF8F2] text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            PICK 3 BALMS NOW
          </button>
        </div>
      </div>
    </section>
  );
};
