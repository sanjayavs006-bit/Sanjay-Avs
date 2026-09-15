import React from 'react';
import { ShoppingBag, Heart, AlertCircle, Info, X } from 'lucide-react';
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
            className="pointer-events-auto bg-[#000000] text-white p-3.5 sm:p-4 shadow-2xl border border-white/20 flex items-center justify-between gap-3 transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              {toast.type === 'cart' ? (
                <div className="w-7 h-7 bg-white text-[#000000] flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4 stroke-[2]" />
                </div>
              ) : toast.type === 'wishlist' ? (
                <div className="w-7 h-7 bg-[#E30613] text-white flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
              ) : (
                <div className="w-7 h-7 bg-white text-black flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4" />
                </div>
              )}
              <div className="min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-white truncate">
                  {displayText}
                </div>
                {toast.subtitle && (
                  <div className="text-[11px] text-[#A3A3A3] truncate">{toast.subtitle}</div>
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
                  className="text-[11px] font-bold uppercase tracking-widest text-[#E30613] hover:underline"
                >
                  VIEW BAG
                </button>
              )}
              <button
                onClick={() => onDismiss(toast.id)}
                className="text-[#A3A3A3] hover:text-white transition-colors"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
