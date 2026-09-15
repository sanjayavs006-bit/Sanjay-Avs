import React from 'react';
import { ShoppingBag, Heart, Info, X } from 'lucide-react';
import { Product } from '../types';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'info' | 'success' | 'error';
  title?: string;
  message?: string;
  subtitle?: string;
  product?: Product;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  onOpenCart?: () => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss, onOpenCart }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full select-none">
      {toasts.map((toast) => {
        const displayText = toast.title || toast.message || 'Notification';
        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#7B2638] text-[#FFF8F2] p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-between gap-3 transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              {toast.type === 'cart' ? (
                <div className="w-8 h-8 rounded-full bg-[#FFF8F2] text-[#7B2638] flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4 stroke-[2]" />
                </div>
              ) : toast.type === 'wishlist' ? (
                <div className="w-8 h-8 rounded-full bg-[#F8DDE0] text-[#7B2638] flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-white text-[#7B2638] flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4" />
                </div>
              )}
              <div className="min-w-0">
                <div className="text-xs font-black uppercase tracking-wider text-white truncate">
                  {displayText}
                </div>
                {toast.subtitle && (
                  <div className="text-[11px] text-[#F8DDE0] truncate font-serif italic">
                    {toast.subtitle}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {toast.type === 'cart' && onOpenCart && (
                <button
                  onClick={() => {
                    onOpenCart();
                    onDismiss(toast.id);
                  }}
                  className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white text-[#7B2638] rounded-full hover:bg-[#F8DDE0] cursor-pointer"
                >
                  VIEW BAG
                </button>
              )}
              <button
                onClick={() => onDismiss(toast.id)}
                className="p-1 text-white/70 hover:text-white cursor-pointer"
                aria-label="Dismiss toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
