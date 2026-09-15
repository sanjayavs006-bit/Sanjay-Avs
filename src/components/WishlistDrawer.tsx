import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { BalmCompactVisual } from './BalmCompactVisual';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onMoveToBag: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onMoveToBag,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF8F2] text-[#111111] shadow-2xl flex flex-col border-l border-[#E8D3C2]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8D3C2] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-[#7B2638] text-[#7B2638]" />
              <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#111111]">
                SAVED MOODS ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#F8DDE0] text-[#7B2638] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F8DDE0] flex items-center justify-center text-2xl text-[#7B2638]">
                  ♡
                </div>
                <div className="space-y-1">
                  <p className="text-base font-black uppercase tracking-tight text-[#111111]">
                    NO MOODS SAVED YET
                  </p>
                  <p className="text-xs text-[#111111]/70 font-serif italic max-w-xs">
                    Tap the heart icon on any compact to bookmark your favorite moods.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#7B2638] hover:bg-[#111111] text-[#FFF8F2] text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors cursor-pointer"
                >
                  DISCOVER THE 12 MOODS
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3.5 bg-white rounded-2xl border border-[#E8D3C2] shadow-xs cursor-pointer hover:border-[#7B2638]/40 transition-colors"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                >
                  <div className="w-16 h-16 shrink-0 flex items-center justify-center p-1 bg-[#FFF8F2] rounded-xl border border-[#E8D3C2]/60">
                    <BalmCompactVisual product={product} size="sm" view="top" showShadow={false} />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-[#7B2638]">
                            {product.number}
                          </span>
                          <h4 className="text-xs font-black uppercase text-[#111111]">
                            {product.name}
                          </h4>
                        </div>
                        <span className="text-[11px] text-[#7B2638] font-serif italic block">
                          {product.personality}
                        </span>
                        <span className="text-xs font-black text-[#111111] mt-1 block">
                          ₹{product.price}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveWishlist(product);
                        }}
                        className="text-[#111111]/40 hover:text-[#7B2638] transition-colors p-1 cursor-pointer"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveToBag(product);
                      }}
                      className="mt-2 py-2 px-3 bg-[#7B2638] hover:bg-[#111111] text-white text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>MOVE TO BAG</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
