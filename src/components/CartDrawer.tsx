import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Gift, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { BalmCompactVisual } from './BalmCompactVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 999;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [includeGiftBox, setIncludeGiftBox] = useState(false);

  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const giftBoxCost = includeGiftBox ? 99 : 0;
  const subtotalWithGift = rawSubtotal + giftBoxCost;

  // Auto 10% bundle discount if 3+ balms
  const isEligibleForBundle = totalQuantity >= 3;
  const effectiveDiscount = discountPercent > 0 ? discountPercent : isEligibleForBundle ? 10 : 0;
  const discountAmount = Math.round((subtotalWithGift * effectiveDiscount) / 100);
  const finalTotal = subtotalWithGift - discountAmount;

  const freeShippingMet = rawSubtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'MOODMATCH10' || code === 'MOODY10' || code === 'MATCH10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Collector Discount Applied! ♡');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "MOODMATCH10"');
      setPromoSuccess('');
    }
  };

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
              <ShoppingBag className="w-5 h-5 text-[#7B2638] stroke-[1.75]" />
              <h2 className="text-sm font-black uppercase tracking-[0.24em] text-[#111111]">
                YOUR BEAUTY BAG ({totalQuantity})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#F8DDE0] transition-colors cursor-pointer text-[#7B2638]"
              aria-label="Close bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3.5 bg-[#F8DDE0]/50 border-b border-[#E8D3C2] space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#7B2638] font-bold">
                {freeShippingMet
                  ? 'YOU HAVE UNLOCKED COMPLIMENTARY SHIPPING! ♡'
                  : `ADD ₹${remainingForFreeShipping} MORE FOR FREE SHIPPING`}
              </span>
              <span className="font-bold text-[#7B2638]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#FFFFFF] rounded-full overflow-hidden border border-[#E8D3C2]">
              <div
                className="h-full bg-[#7B2638] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F8DDE0] flex items-center justify-center text-2xl text-[#7B2638]">
                  ♡
                </div>
                <div className="space-y-1">
                  <p className="text-base font-black uppercase tracking-tight text-[#111111]">
                    YOUR BAG IS EMPTY
                  </p>
                  <p className="text-xs text-[#111111]/70 font-serif italic max-w-xs">
                    Find the balm that matches your mood today.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#7B2638] hover:bg-[#111111] text-[#FFF8F2] text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors cursor-pointer"
                >
                  EXPLORE 12 MOODS
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-white rounded-2xl border border-[#E8D3C2] shadow-xs"
                >
                  {/* Compact Visual Thumbnail */}
                  <div className="w-16 h-16 shrink-0 flex items-center justify-center p-1 bg-[#FFF8F2] rounded-xl border border-[#E8D3C2]/60">
                    <BalmCompactVisual product={item.product} size="sm" view="top" showShadow={false} />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-[#7B2638]">
                            {item.product.number}
                          </span>
                          <h4 className="text-xs font-black uppercase text-[#111111]">
                            {item.product.name}
                          </h4>
                        </div>
                        <span className="text-[11px] text-[#7B2638] font-serif italic block">
                          {item.product.personality}
                        </span>
                        <span className="text-[10px] text-[#111111]/60 block truncate max-w-[160px]">
                          {item.product.flavor}
                        </span>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#111111]/40 hover:text-[#7B2638] transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price and Quantity Stepper */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#FFF8F2]">
                      <span className="text-xs font-black text-[#111111]">
                        ₹{item.product.price * item.quantity}
                      </span>

                      <div className="flex items-center bg-[#FFF8F2] border border-[#E8D3C2] rounded-full px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-[#111111]/70 hover:text-[#7B2638] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-[#111111]/70 hover:text-[#7B2638] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Gift Box Upsell Option */}
            {items.length > 0 && (
              <div className="p-3.5 bg-white rounded-2xl border border-[#E8D3C2] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#F8DDE0] text-[#7B2638]">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-[#111111] block">
                      BURGUNDY VELVET GIFT BOX
                    </span>
                    <span className="text-[10px] text-[#111111]/70 block">
                      Embossed gold foil heart keepsake packaging (+₹99)
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="gift-box-toggle"
                  checked={includeGiftBox}
                  onChange={(e) => setIncludeGiftBox(e.target.checked)}
                  className="w-4 h-4 accent-[#7B2638] cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Footer & Checkout Section */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8D3C2] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="PROMO CODE (TRY 'MOODMATCH10')"
                    className="flex-1 px-3.5 py-2 text-xs uppercase font-mono tracking-wider bg-[#FFF8F2] border border-[#E8D3C2] rounded-full focus:outline-hidden focus:border-[#7B2638]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#111111] hover:bg-[#7B2638] text-white text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer"
                  >
                    APPLY
                  </button>
                </div>
                {promoError && (
                  <p className="text-[10px] text-red-600 font-medium px-2">{promoError}</p>
                )}
                {promoSuccess && (
                  <p className="text-[10px] text-emerald-700 font-medium px-2">{promoSuccess}</p>
                )}
                {isEligibleForBundle && !promoSuccess && (
                  <p className="text-[10px] text-[#7B2638] font-bold px-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>3+ Balms Bundle: 10% Off Automatically Active!</span>
                  </p>
                )}
              </form>

              {/* Subtotals & Taxes */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#111111]/70">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium">₹{rawSubtotal}</span>
                </div>
                {includeGiftBox && (
                  <div className="flex justify-between text-[#111111]/70">
                    <span>Velvet Keepsake Box</span>
                    <span className="font-mono font-medium">+₹99</span>
                  </div>
                )}
                {effectiveDiscount > 0 && (
                  <div className="flex justify-between text-[#7B2638] font-bold">
                    <span>Collector Discount ({effectiveDiscount}%)</span>
                    <span className="font-mono">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#111111]/70">
                  <span>Standard Shipping</span>
                  <span className="font-mono font-medium">
                    {freeShippingMet ? (
                      <strong className="text-[#7B2638]">FREE</strong>
                    ) : (
                      '₹99'
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8D3C2] flex justify-between text-sm font-black text-[#111111]">
                  <span>ESTIMATED TOTAL</span>
                  <span className="font-mono text-base text-[#7B2638]">
                    ₹{finalTotal + (freeShippingMet ? 0 : 99)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-4 bg-[#7B2638] hover:bg-[#111111] text-[#FFF8F2] text-xs font-bold uppercase tracking-[0.22em] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#111111]/60 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7B2638]" />
                <span>SECURE ENCRYPTED CHECKOUT • 100% VEGAN</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
