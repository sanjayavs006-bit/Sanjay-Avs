import React, { useState } from 'react';
import { Product } from '../types';
import { BalmCompactVisual } from './BalmCompactVisual';
import {
  X,
  Heart,
  Star,
  Plus,
  Minus,
  Check,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Truck,
  Leaf,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'top' | 'open' | 'side' | 'model' | 'lip'>('top');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>('inside');

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion((prev) => (prev === section ? '' : section));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs select-none overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FFF8F2] rounded-3xl border border-[#E8D3C2] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-[#F8DDE0] text-[#111111] transition-colors cursor-pointer border border-[#E8D3C2] shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Body: Two Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
          {/* Left Column: Media Stage & Angle Switcher (6 cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 bg-white border-b md:border-b-0 md:border-r border-[#E8D3C2] flex flex-col justify-between">
            {/* Media Display Window */}
            <div className="relative aspect-square w-full rounded-2xl bg-[#FFF8F2] border border-[#E8D3C2]/80 flex items-center justify-center overflow-hidden">
              {/* Top Lid View */}
              {activeMediaTab === 'top' && (
                <BalmCompactVisual product={product} view="top" size="xl" />
              )}

              {/* Open Balm Core View */}
              {activeMediaTab === 'open' && (
                <BalmCompactVisual product={product} view="open" size="xl" />
              )}

              {/* Side Profile View */}
              {activeMediaTab === 'side' && (
                <BalmCompactVisual product={product} view="side" size="xl" />
              )}

              {/* Campaign Beauty Model Portrait */}
              {activeMediaTab === 'model' && (
                <div className="w-full h-full relative">
                  <img
                    src={product.modelImage}
                    alt={`${product.name} Campaign Model`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                    <span className="text-[10px] font-mono tracking-widest uppercase block">
                      EDITORIAL CAMPAIGN
                    </span>
                    <span className="text-xs font-bold">{product.finish}</span>
                  </div>
                </div>
              )}

              {/* Lip Macro Hydrated Glaze */}
              {activeMediaTab === 'lip' && (
                <div className="w-full h-full relative">
                  <img
                    src={product.lipMacroImage}
                    alt={`${product.name} Macro Lip`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                    <span className="text-[10px] font-mono tracking-widest uppercase block">
                      MACRO LIP FINISH
                    </span>
                    <span className="text-xs font-bold">{product.flavor}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex items-center gap-2 pt-4 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveMediaTab('top')}
                className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border cursor-pointer whitespace-nowrap ${
                  activeMediaTab === 'top'
                    ? 'bg-[#7B2638] text-white border-[#7B2638]'
                    : 'bg-[#FFF8F2] border-[#E8D3C2] text-[#111111]'
                }`}
              >
                LID ARTWORK
              </button>
              <button
                onClick={() => setActiveMediaTab('open')}
                className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border cursor-pointer whitespace-nowrap ${
                  activeMediaTab === 'open'
                    ? 'bg-[#7B2638] text-white border-[#7B2638]'
                    : 'bg-[#FFF8F2] border-[#E8D3C2] text-[#111111]'
                }`}
              >
                OPEN BALM
              </button>
              <button
                onClick={() => setActiveMediaTab('side')}
                className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border cursor-pointer whitespace-nowrap ${
                  activeMediaTab === 'side'
                    ? 'bg-[#7B2638] text-white border-[#7B2638]'
                    : 'bg-[#FFF8F2] border-[#E8D3C2] text-[#111111]'
                }`}
              >
                SIDE PROFILE
              </button>
              <button
                onClick={() => setActiveMediaTab('model')}
                className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border cursor-pointer whitespace-nowrap ${
                  activeMediaTab === 'model'
                    ? 'bg-[#7B2638] text-white border-[#7B2638]'
                    : 'bg-[#FFF8F2] border-[#E8D3C2] text-[#111111]'
                }`}
              >
                MODEL
              </button>
              <button
                onClick={() => setActiveMediaTab('lip')}
                className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border cursor-pointer whitespace-nowrap ${
                  activeMediaTab === 'lip'
                    ? 'bg-[#7B2638] text-white border-[#7B2638]'
                    : 'bg-[#FFF8F2] border-[#E8D3C2] text-[#111111]'
                }`}
              >
                LIP GLOSS
              </button>
            </div>
          </div>

          {/* Right Column: Product Narrative, Price & Accordions (6 cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 space-y-6">
            {/* Header Identity */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-[#7B2638] bg-[#F8DDE0] px-2 py-0.5 rounded-full uppercase">
                  {product.number} OF 12 MOODS
                </span>
                <div className="flex items-center text-[#7B2638] text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#7B2638]" />
                  ))}
                  <span className="ml-1 text-[11px] font-bold text-[#111111]">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111111]">
                {product.title}
              </h2>
              <p className="text-xs sm:text-sm font-serif italic text-[#7B2638]">
                "{product.quote}"
              </p>
            </div>

            {/* Price & Flavor Summary */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8D3C2] space-y-2">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#111111]">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-[#111111]/40">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-[#7B2638] font-bold uppercase tracking-wider">
                  FREE SHIP OVER ₹999
                </span>
              </div>
              <p className="text-xs text-[#111111]/80">
                <strong className="text-[#7B2638] font-semibold">Flavor Notes:</strong>{' '}
                {product.flavor}
              </p>
              <p className="text-xs text-[#111111]/80">
                <strong className="text-[#7B2638] font-semibold">Finish:</strong> {product.finish}
              </p>
            </div>

            {/* Quantity and Primary CTAs */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center bg-white border border-[#E8D3C2] rounded-full px-3 py-1.5 shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 hover:text-[#7B2638] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 hover:text-[#7B2638] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    justAdded
                      ? 'bg-[#10B981] text-white'
                      : 'bg-[#7B2638] hover:bg-[#111111] text-[#FFF8F2]'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <span>ADD TO BAG — ₹{product.price * quantity}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-full border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#F8DDE0] border-[#7B2638] text-[#7B2638]'
                      : 'bg-white border-[#E8D3C2] text-[#111111] hover:border-[#7B2638]'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#7B2638]' : ''}`} />
                </button>
              </div>
            </div>

            {/* Luxury Accordions */}
            <div className="space-y-2 pt-2 border-t border-[#E8D3C2]/80">
              {/* Accordion 1: WHAT'S INSIDE */}
              <div className="border border-[#E8D3C2] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleAccordion('inside')}
                  className="w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer"
                >
                  <span>WHAT'S INSIDE</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      openAccordion === 'inside' ? 'rotate-180 text-[#7B2638]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'inside' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#111111]/80 space-y-2 border-t border-[#FFF8F2]">
                    <ul className="space-y-1.5 list-disc list-inside">
                      {product.whatsInside.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: WHY YOU'LL LOVE IT */}
              <div className="border border-[#E8D3C2] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleAccordion('love')}
                  className="w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer"
                >
                  <span>WHY YOU'LL LOVE IT</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      openAccordion === 'love' ? 'rotate-180 text-[#7B2638]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'love' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#111111]/80 space-y-2 border-t border-[#FFF8F2]">
                    <ul className="space-y-1.5 list-disc list-inside">
                      {product.whyYoullLoveIt.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: HOW TO USE */}
              <div className="border border-[#E8D3C2] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleAccordion('how')}
                  className="w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer"
                >
                  <span>HOW TO USE</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      openAccordion === 'how' ? 'rotate-180 text-[#7B2638]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'how' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#111111]/80 leading-relaxed border-t border-[#FFF8F2]">
                    {product.howToUse}
                  </div>
                )}
              </div>

              {/* Accordion 4: INGREDIENTS */}
              <div className="border border-[#E8D3C2] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleAccordion('ingredients')}
                  className="w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer"
                >
                  <span>FULL INGREDIENTS LIST</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      openAccordion === 'ingredients' ? 'rotate-180 text-[#7B2638]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'ingredients' && (
                  <div className="px-4 pb-4 pt-1 text-[11px] text-[#111111]/70 leading-relaxed font-mono border-t border-[#FFF8F2]">
                    {product.ingredients}
                  </div>
                )}
              </div>
            </div>

            {/* Clean Beauty Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] font-bold uppercase tracking-wider text-[#7B2638]">
              <div className="p-2 rounded-xl bg-white border border-[#E8D3C2] flex flex-col items-center gap-1">
                <Leaf className="w-3.5 h-3.5" />
                <span>100% VEGAN</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E8D3C2] flex flex-col items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CLEAN FORMULA</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E8D3C2] flex flex-col items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>FAST SHIPPING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
