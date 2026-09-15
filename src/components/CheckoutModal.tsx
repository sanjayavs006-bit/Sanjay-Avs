import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Smartphone, Banknote, Truck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

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
  const shippingFee = subtotal >= 1999 ? 0 : 199;
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
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#000000', '#E30613', '#FFFFFF', '#CCCCCC'],
        });
      } catch (err) {
        console.warn('Confetti error ignored:', err);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="relative bg-[#FFFFFF] text-[#000000] w-full max-w-2xl shadow-2xl border border-[#E5E5E5] overflow-hidden p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#000000]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#666666]">
              SECURE CHECKOUT
            </span>
            <h2 className="text-lg font-black uppercase tracking-tight text-[#000000]">
              {step === 'details' ? 'DELIVERY & PAYMENT' : 'ORDER CONFIRMATION'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#000000] hover:text-[#E30613] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmitOrder} className="pt-6 space-y-6">
            {/* Delivery Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#000000]">
                1. SHIPPING ADDRESS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E5E5E5] outline-none focus:border-black uppercase text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E5E5E5] outline-none focus:border-black text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                    STREET ADDRESS & LANDMARK
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E5E5E5] outline-none focus:border-black text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                    CITY
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E5E5E5] outline-none focus:border-black text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                    PINCODE
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E5E5E5] outline-none focus:border-black text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#000000]">
                2. PAYMENT METHOD
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 border text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-[#000000] bg-[#000000] text-white'
                      : 'border-[#E5E5E5] hover:border-[#000000]'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#000000] bg-[#000000] text-white'
                      : 'border-[#E5E5E5] hover:border-[#000000]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>CARD</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 border text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#000000] bg-[#000000] text-white'
                      : 'border-[#E5E5E5] hover:border-[#000000]'
                  }`}
                >
                  <Banknote className="w-4 h-4" />
                  <span>CASH (COD)</span>
                </button>
              </div>

              {paymentMethod === 'upi' && (
                <div className="pt-2">
                  <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                    ENTER UPI ID (GPay / PhonePe / Paytm)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E5E5] outline-none focus:border-black text-xs"
                    placeholder="name@upi"
                  />
                </div>
              )}
            </div>

            {/* Order Total & Submit */}
            <div className="pt-4 border-t border-[#E5E5E5] space-y-3">
              <div className="flex justify-between text-sm font-black text-[#000000]">
                <span>TOTAL PAYABLE</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#000000] hover:bg-[#E30613] disabled:bg-[#8E8E93] text-white text-xs font-black uppercase tracking-[0.24em] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {isProcessing ? (
                  <span>PROCESSING PAYMENT...</span>
                ) : (
                  <>
                    <span>CONFIRM ORDER (₹{grandTotal.toLocaleString('en-IN')})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8E8E93] uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-[#000000]" />
                <span>256-BIT SSL ENCRYPTED GATEWAY</span>
              </div>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 bg-[#000000] text-white rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#FFFFFF]" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E30613]">
                PAYMENT CONFIRMED
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#000000]">
                THANK YOU FOR YOUR ORDER
              </h3>
              <p className="text-xs text-[#666666]">
                Order <span className="font-bold text-[#000000]">#{orderId}</span> has been placed successfully.
              </p>
            </div>

            <div className="p-4 bg-[#F7F7F5] border border-[#E5E5E5] text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[#666666]">ESTIMATED ARRIVAL:</span>
                <span className="font-bold text-[#000000]">3-4 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">SHIPPING TO:</span>
                <span className="font-bold text-[#000000]">{formData.city}, {formData.pincode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">TRACKING CONFIRMATION:</span>
                <span className="font-bold text-[#000000]">{formData.email}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-[#000000] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#E30613] transition-colors cursor-pointer"
            >
              CONTINUE BROWSING
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
