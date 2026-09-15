import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { BalmCompactVisual } from './BalmCompactVisual';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const POPULAR_SEARCHES = [
  'HEART #01',
  'TEDDY #02',
  'MIDNIGHT CAT',
  'CHERRY GLAZE',
  'PEACH NECTAR',
  'VANILLA HONEY',
  'MATCHA MINT',
  'COFFEE LATTE',
  'pH COLOR SHIFT',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.personality.toLowerCase().includes(query.toLowerCase()) ||
          p.flavor.toLowerCase().includes(query.toLowerCase()) ||
          p.finish.toLowerCase().includes(query.toLowerCase()) ||
          p.number.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-[#FFF8F2] overflow-y-auto select-none flex flex-col">
      {/* Top Bar with Big Search Input */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-8 pb-6 border-b border-[#7B2638]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-[#7B2638] stroke-[1.75]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH MOOD, FLAVOR, OR NUMBER..."
              className="w-full text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#111111] placeholder:text-[#111111]/30 bg-transparent border-none outline-hidden"
            />
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F8DDE0] text-[#7B2638] transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 flex-1">
        {/* If no query, show popular suggestions */}
        {!query.trim() ? (
          <div className="space-y-8">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.24em] text-[#7B2638] block mb-3">
                POPULAR SEARCHES ♡
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-[#E8D3C2] hover:border-[#7B2638] text-[#111111] transition-all cursor-pointer shadow-xs"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick 12 Moods Shortcut Grid */}
            <div className="pt-6 border-t border-[#E8D3C2]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.24em] text-[#7B2638] block mb-4">
                ALL 12 MOODS QUICK BROWSE
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-3 bg-white rounded-xl border border-[#E8D3C2] hover:border-[#7B2638] text-left flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FFF8F2] flex items-center justify-center font-mono font-bold text-[10px] text-[#7B2638]">
                      {p.number}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-black uppercase text-[#111111] block truncate">
                        {p.name}
                      </span>
                      <span className="text-[10px] text-[#7B2638] font-serif italic block truncate">
                        {p.personality}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E8D3C2]">
              <span className="text-xs font-mono font-bold text-[#7B2638] uppercase tracking-wider">
                {filteredProducts.length} MOOD{filteredProducts.length === 1 ? '' : 'S'} FOUND
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="text-lg font-black uppercase text-[#111111]">
                  NO MATCHING MOOD FOUND FOR "{query}"
                </p>
                <p className="text-xs text-[#111111]/70 font-serif italic">
                  Try searching "Heart", "Vanilla", "Berry", or explore all 12 moods.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-4 bg-white rounded-2xl border border-[#E8D3C2] hover:border-[#7B2638] transition-all flex items-center gap-4 cursor-pointer group shadow-xs hover:shadow-compact"
                  >
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-[#FFF8F2] rounded-xl">
                      <BalmCompactVisual product={p} size="sm" view="top" showShadow={false} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-[#7B2638]">
                          {p.number}
                        </span>
                        <h4 className="text-xs font-black uppercase text-[#111111] truncate">
                          {p.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#7B2638] font-serif italic">
                        {p.personality}
                      </p>
                      <p className="text-[10px] text-[#111111]/60 truncate">{p.flavor}</p>
                      <span className="text-xs font-black text-[#111111] mt-1 block">
                        ₹{p.price}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#7B2638] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
