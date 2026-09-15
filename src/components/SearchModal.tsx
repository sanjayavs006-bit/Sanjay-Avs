import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const POPULAR_SEARCHES = [
  'WIDE-LEG JEANS',
  'OVERSIZED BLAZER',
  'HEAVYWEIGHT T-SHIRT',
  'TRENCH COAT',
  'DENIM JACKET',
  'MERINO TURTLENECK',
  'ORGANIC COTTON',
  'CHELSEA BOOTS',
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
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(query.toLowerCase()) ||
          p.fit.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-[#FFFFFF] overflow-y-auto select-none flex flex-col">
      {/* Top Bar with Big Search Input */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-8 pb-6 border-b border-[#000000]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-[#000000] stroke-[1.5]" />
            <input
              ref={inputRef}
              type="text"
              placeholder="SEARCH FOR STYLES, PRODUCTS, COLORS..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-xl sm:text-3xl font-black uppercase tracking-tight text-[#000000] placeholder:text-[#8E8E93] outline-none bg-transparent"
            />
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#000000] hover:text-[#E30613] transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-7 h-7 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 py-8">
        {query.trim() === '' ? (
          /* Popular Searches */
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-[#666666]">
              POPULAR SEARCHES
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {POPULAR_SEARCHES.map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="px-4 py-2 border border-[#E5E5E5] hover:border-[#000000] text-xs font-bold uppercase tracking-[0.14em] text-[#000000] transition-colors cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          /* Search Results */
          <div className="space-y-6">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-[#666666]">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'RESULT' : 'RESULTS'} FOUND FOR &ldquo;{query}&rdquo;
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="group cursor-pointer flex flex-col space-y-2"
                >
                  <div className="aspect-[3/4] bg-[#F7F7F5] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#000000] truncate group-hover:text-[#E30613]">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-[#666666]">{p.category}</p>
                    <p className="text-xs font-black text-[#000000] pt-0.5">
                      ₹{p.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* No Results Found */
          <div className="py-16 text-center space-y-3">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#000000]">
              NO MATCHES FOR &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-[#666666]">
              Check your spelling or explore one of the trending categories above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
