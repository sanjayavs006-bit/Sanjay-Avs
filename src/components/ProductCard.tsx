import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, size: string, color: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [justAddedSize, setJustAddedSize] = useState<string | null>(null);

  const handleSizeClick = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    const defaultColor = product.colors[0]?.name || 'Default';
    onQuickAdd(product, size, defaultColor);
    setJustAddedSize(size);
    setTimeout(() => {
      setJustAddedSize(null);
      setShowSizes(false);
    }, 1200);
  };

  return (
    <div
      className="group relative flex flex-col cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
      onClick={() => onSelectProduct(product)}
    >
      {/* 1. Image Container (3:4 Editorial Aspect Ratio) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F7F5]">
        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
            isHovered && product.hoverImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Hover Alternate Image */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Top Badges (NEW, PREMIUM SELECTION, SALE) */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 ${
                product.badge === 'SALE'
                  ? 'bg-[#E30613] text-white'
                  : product.badge === 'PREMIUM SELECTION'
                  ? 'bg-[#000000] text-white'
                  : 'bg-[#FFFFFF] text-[#000000]'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Heart Button in Top-Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition-transform active:scale-90 hover:bg-white cursor-pointer shadow-xs"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? 'fill-[#E30613] text-[#E30613]'
                : 'text-[#000000] stroke-[1.75]'
            }`}
          />
        </button>

        {/* Quick Add Overlay Drawer (Desktop Hover / Mobile Accessible) */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs p-3 transition-transform duration-300 z-20 ${
            showSizes || isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000000]">
              QUICK ADD SIZE
            </span>
            <span className="text-[9px] text-[#666666] uppercase tracking-wider">
              {product.fit}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {product.sizes.map((size) => {
              const isAdded = justAddedSize === size;
              return (
                <button
                  key={size}
                  onClick={(e) => handleSizeClick(e, size)}
                  className={`min-w-[32px] h-7 px-2 text-[11px] font-bold uppercase border transition-all cursor-pointer flex items-center justify-center ${
                    isAdded
                      ? 'bg-[#000000] text-white border-[#000000]'
                      : 'bg-white text-[#000000] border-[#E5E5E5] hover:border-[#000000] hover:bg-[#F7F7F5]'
                  }`}
                >
                  {isAdded ? <Check className="w-3 h-3" /> : size}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Minimalist Under-Image Information */}
      <div className="pt-3 pb-1 space-y-1">
        {/* Color Dots */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pb-0.5">
            {product.colors.map((c, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-full border border-black/20"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}

        {/* Product Name */}
        <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] text-[#000000] line-clamp-1 group-hover:text-[#E30613] transition-colors">
          {product.name}
        </h3>

        {/* Category & Fit */}
        <p className="text-[11px] text-[#666666] tracking-wide truncate">
          {product.subCategory} • {product.fit}
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-xs sm:text-sm font-black text-[#000000] tracking-tight">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] sm:text-xs text-[#8E8E93] line-through font-normal">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-[10px] font-bold text-[#E30613] tracking-wide">
              SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
