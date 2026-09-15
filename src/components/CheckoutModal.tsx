import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Smartphone, Banknote, Truck, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { BalmCompactVisual } from './BalmCompactVisual';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal?: number;
  discountPercent?: number;
  onOrderComplete?: () => void;
  onCompleteOrder?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountPercent = 0,
  onOrderComplete,
  onCompleteOrder,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: 'Sanjaya V. S.',
    email: 'sanjayavs006@gmail.com',
    phone: '+91 98765 43210',
    address: '42, Boulevard Residency, 100ft Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('sanjaya@okhdfcbank');
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const subtotal = rawSubtotal - discountAmount;
  const shippingFee = subtotal >= 999 ? 0 : 99;
  const grandTotal = subtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderId = `MM-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(randomOrderId);
      setStep('success');
      if (onCompleteOrder) {
        onCompleteOrder();
      } else if (onOrderComplete) {
        onOrderComplete();
      }

      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7B2638', '#F8DDE0', '#E8D3C2'],
        });
      } catch (_) {}
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 select-none">
      <div className="relative bg-[#FFF8F2] text-[#111111] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8D3C2] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8D3C2] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black uppercase tracking-[0.24em] text-[#111111]">
              MOODY MATCH CHECKOUT ♡
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F8DDE0] text-[#7B2638] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {step === 'details' ? (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Order Quick Summary Bar */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8D3C2] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B2638] font-bold">
                    ORDER SUMMARY ({items.length} ITEM{items.length === 1 ? '' : 'S'})
                  </span>
                  <p className="text-xs text-[#111111]/70 truncate max-w-xs">
                    {items.map((it) => `${it.product.name} (x${it.quantity})`).join(', ')}
                  </p>
                </div>
                <span className="text-sm font-black text-[#111111]">₹{grandTotal}</span>
              </div>

              {/* Shipping Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#7B2638] flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>SHIPPING ADDRESS</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#111111]/60 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8D3C2] rounded-xl font-medium focus:border-[#7B2638] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#111111]/60 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8D3C2] rounded-xl font-medium focus:border-[#7B2638] outline-hidden"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase font-bold text-[#111111]/60 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8D3C2] rounded-xl font-medium focus:border-[#7B2638] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#111111]/60 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8D3C2] rounded-xl font-medium focus:border-[#7B2638] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#111111]/60 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8D3C2] rounded-xl font-medium focus:border-[#7B2638] outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#7B2638] flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>PAYMENT METHOD</span>
                </h3>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-center font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-[#7B2638] text-white border-[#7B2638]'
                        : 'bg-white border-[#E8D3C2] text-[#111111]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-[11px]">UPI / QR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-[#7B2638] text-white border-[#7B2638]'
                        : 'bg-white border-[#E8D3C2] text-[#111111]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-[11px]">CARD</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-center font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-[#7B2638] text-white border-[#7B2638]'
                        : 'bg-white border-[#E8D3C2] text-[#111111]'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span className="text-[11px]">COD</span>
                  </button>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="p-3 bg-white rounded-xl border border-[#E8D3C2]">
                    <label className="block text-[10px] uppercase font-bold text-[#111111]/60 mb-1">
                      UPI ID (GPay / PhonePe / Paytm)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FFF8F2] border border-[#E8D3C2] rounded-lg text-xs font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#7B2638] hover:bg-[#111111] text-[#FFF8F2] text-xs font-bold uppercase tracking-[0.22em] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>CONFIRMING MOOD ORDER...</span>
                ) : (
                  <>
                    <span>CONFIRM & PAY ₹{grandTotal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success Confirmation Screen */
            <div className="py-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#F8DDE0] text-[#7B2638] flex items-center justify-center mx-auto text-3xl">
                ♡
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-[#7B2638]">
                  ORDER PLACED SUCCESSFULLY
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#111111]">
                  YOUR MOOD IS ON ITS WAY!
                </h3>
                <p className="text-xs sm:text-sm text-[#111111]/70 font-serif italic max-w-sm mx-auto">
                  We are hand-packing your collectible lip balms with gentle botanical care.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#E8D3C2] text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#FFF8F2] pb-2">
                  <span className="text-[#111111]/60">Order Reference:</span>
                  <span className="font-mono font-bold text-[#7B2638]">{orderId}</span>
                </div>
                <div className="flex justify-between border-b border-[#FFF8F2] pb-2">
                  <span className="text-[#111111]/60">Delivery Address:</span>
                  <span className="font-medium truncate max-w-[200px]">{formData.city}, {formData.pincode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#111111]/60">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-800">2-3 Business Days</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3.5 bg-[#7B2638] hover:bg-[#111111] text-[#FFF8F2] text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors cursor-pointer"
              >
                CONTINUE SHOPPING ♡
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
