import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, Shield, Truck, RefreshCw, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const allImages = [product.image, ...(product.hoverImage ? [product.hoverImage] : []), ...product.gallery];
  const uniqueImages = Array.from(new Set(allImages));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 select-none">
      <div className="relative bg-[#FFFFFF] text-[#000000] w-full max-w-4xl min-h-screen sm:min-h-0 sm:max-h-[92vh] sm:rounded-none overflow-hidden flex flex-col sm:flex-row shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 bg-white/90 backdrop-blur-xs rounded-full flex items-center justify-center text-[#000000] hover:bg-black hover:text-white transition-colors cursor-pointer shadow-md"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* 1. Left: Editorial Gallery (Scrollable on Desktop) */}
        <div className="w-full sm:w-1/2 bg-[#F7F7F5] flex flex-col justify-between overflow-y-auto max-h-[50vh] sm:max-h-[92vh]">
          {/* Main Selected Image */}
          <div className="relative aspect-[3/4] w-full bg-[#E5E5E5] overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 bg-[#000000] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Bar */}
          {uniqueImages.length > 1 && (
            <div className="p-3 flex items-center gap-2 overflow-x-auto border-t border-[#E5E5E5] bg-white">
              {uniqueImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 aspect-[3/4] overflow-hidden border transition-all cursor-pointer ${
                    selectedImage === img ? 'border-[#000000] ring-1 ring-black' : 'border-[#E5E5E5] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Right: Product Details & Controls */}
        <div className="w-full sm:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#666666]">
                {product.category} • {product.subCategory}
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#000000] mt-1">
                {product.name}
              </h2>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-lg font-black text-[#000000]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#8E8E93] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[11px] text-[#666666] tracking-wide">
                  (INCL. ALL TAXES)
                </span>
              </div>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs tracking-wider">
                  <span className="font-bold uppercase text-[#000000]">COLOR: {selectedColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`p-1 rounded-full border transition-all cursor-pointer ${
                        selectedColor === c.name ? 'border-[#000000] scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      title={c.name}
                    >
                      <span
                        className="block w-5 h-5 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs tracking-wider">
                <span className="font-bold uppercase text-[#000000]">SELECT SIZE</span>
                <span className="text-[11px] text-[#666666] underline cursor-pointer">
                  FIT GUIDE
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#000000] text-white border-[#000000]'
                        : 'bg-white text-[#000000] border-[#E5E5E5] hover:border-[#000000]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#666666] italic pt-1">
                Fit: {product.fit}
              </p>
            </div>

            {/* Editorial Note & Description */}
            <div className="pt-2 border-t border-[#E5E5E5] space-y-2">
              <p className="text-xs text-[#333333] leading-relaxed">
                {product.description}
              </p>
              {product.editorialNote && (
                <p className="text-[11px] font-semibold text-[#000000] tracking-wide bg-[#F7F7F5] p-2.5">
                  EDITORIAL NOTE: {product.editorialNote}
                </p>
              )}
            </div>

            {/* Material & Composition */}
            <div className="text-[11px] text-[#666666] space-y-1">
              <div><span className="font-bold text-[#000000]">COMPOSITION:</span> {product.composition}</div>
              <div><span className="font-bold text-[#000000]">ITEM CODE:</span> {product.sku}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#E5E5E5] space-y-3">
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.24em] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                  addedSuccess
                    ? 'bg-[#2B6336] text-white'
                    : 'bg-[#000000] hover:bg-[#E30613] text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`w-14 border flex items-center justify-center transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-[#E30613] text-[#E30613] bg-[#FFF5F6]'
                    : 'border-[#E5E5E5] text-[#000000] hover:border-[#000000]'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#E30613]' : ''}`} />
              </button>
            </div>

            {/* Shipping & Guarantee */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-[#666666] pt-1">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#000000]" />
                <span>Standard Delivery 2–4 days</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#000000]" />
                <span>15 Days Free Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
