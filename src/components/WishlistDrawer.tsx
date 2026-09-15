import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

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
        <div className="w-screen max-w-md bg-[#FFFFFF] text-[#000000] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5E5E5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-[#E30613] text-[#E30613]" />
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#000000]">
                SAVED ITEMS ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#000000] hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#666666]">
                  <Heart className="w-7 h-7 stroke-[1.25]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#000000]">
                    YOUR WISHLIST IS EMPTY
                  </h3>
                  <p className="text-xs text-[#666666] tracking-wide">
                    Tap the heart icon on any product to save it here for later.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#000000] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#E30613] transition-colors cursor-pointer"
                >
                  EXPLORE STYLES
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 pb-6 border-b border-[#E5E5E5] last:border-b-0 cursor-pointer group"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                >
                  <div className="w-20 aspect-[3/4] bg-[#F7F7F5] shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#000000] line-clamp-1 group-hover:text-[#E30613]">
                          {product.name}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveWishlist(product);
                          }}
                          className="text-[#8E8E93] hover:text-[#E30613] transition-colors p-1"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#666666]">{product.category} • {product.fit}</p>
                      <p className="text-xs font-black text-[#000000] pt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveToBag(product);
                      }}
                      className="mt-2 py-2 px-3 bg-[#000000] hover:bg-[#E30613] text-white text-[11px] font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD TO BAG</span>
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
