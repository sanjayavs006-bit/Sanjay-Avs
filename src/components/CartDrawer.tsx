import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 1999;

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

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const freeShippingMet = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'FASHION10' || code === 'MODEMEMBER') {
      setDiscountPercent(10);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "FASHION10"');
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
        <div className="w-screen max-w-md bg-[#FFFFFF] text-[#000000] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5E5E5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#000000]">
                SHOPPING BAG ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#000000] hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F7F7F5] px-6 py-3 border-b border-[#E5E5E5]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#000000] mb-1.5 flex justify-between">
              <span>{freeShippingMet ? '✓ FREE SHIPPING UNLOCKED' : `ADD ₹${remainingForFreeShipping.toLocaleString('en-IN')} FOR FREE SHIPPING`}</span>
              <span>₹{FREE_SHIPPING_THRESHOLD}</span>
            </div>
            <div className="w-full h-1 bg-[#E5E5E5] overflow-hidden">
              <div
                className="h-full bg-[#E30613] transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
              />
            </div>
          </div>

          {/* Bag Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#666666]">
                  <ShoppingBag className="w-7 h-7 stroke-[1.25]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#000000]">
                    YOUR BAG IS EMPTY
                  </h3>
                  <p className="text-xs text-[#666666] tracking-wide">
                    Explore new season drops, denim, and tailoring.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#000000] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#E30613] transition-colors cursor-pointer"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-[#E5E5E5] last:border-b-0"
                >
                  {/* Item Image */}
                  <div className="w-20 aspect-[3/4] bg-[#F7F7F5] shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#000000] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#8E8E93] hover:text-[#E30613] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#666666] tracking-wide mt-0.5 space-y-0.5">
                        <div>SIZE: <span className="text-[#000000] font-bold">{item.selectedSize}</span></div>
                        <div>COLOR: <span className="text-[#000000] font-bold">{item.selectedColor}</span></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#E5E5E5]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-[#000000] hover:bg-[#F7F7F5] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#000000] hover:bg-[#F7F7F5] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="text-xs font-black text-[#000000]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-[#FFFFFF] border-t border-[#E5E5E5] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="PROMO CODE (FASHION10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-[#E5E5E5] uppercase tracking-wider outline-none focus:border-[#000000]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#000000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E30613] transition-colors cursor-pointer"
                >
                  APPLY
                </button>
              </form>

              {promoError && (
                <p className="text-[11px] text-[#E30613] font-medium">{promoError}</p>
              )}
              {discountPercent > 0 && (
                <p className="text-[11px] text-[#2B6336] font-bold">✓ 10% Member Discount Applied</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs tracking-wider">
                <div className="flex justify-between text-[#666666]">
                  <span>SUBTOTAL</span>
                  <span className="font-semibold text-[#000000]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#E30613]">
                    <span>DISCOUNT ({discountPercent}%)</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#666666]">
                  <span>ESTIMATED DELIVERY</span>
                  <span className="font-semibold text-[#000000]">
                    {freeShippingMet ? 'FREE' : '₹199'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#000000] pt-2 border-t border-[#E5E5E5]">
                  <span>TOTAL (INCL. TAXES)</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full py-4 bg-[#000000] hover:bg-[#E30613] text-white text-xs font-black uppercase tracking-[0.24em] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>CONTINUE TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8E8E93] tracking-widest uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SECURE ENCRYPTED PAYMENT • EASY 15-DAY RETURNS</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
