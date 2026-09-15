import React, { useState } from 'react';
import { X, User, Package, CheckCircle2, Heart, Shield, LogOut } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderCount: number;
  wishlistCount?: number;
  onViewWishlist?: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  orderCount,
  wishlistCount = 0,
  onViewWishlist,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  if (!isOpen) return null;

  return (
    <div
      id="account-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 select-none"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FFFFFF] text-[#000000] w-full max-w-md shadow-2xl border border-[#E5E5E5] overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#000000]">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#E30613]" />
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-[#000000]">
              MEMBER CLUB
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#000000] hover:text-[#E30613] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-[#E5E5E5]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-all border cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#000000] text-white border-[#000000]'
                : 'bg-transparent text-[#666666] border-[#E5E5E5] hover:border-[#000000]'
            }`}
          >
            MY PROFILE
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-all border cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#000000] text-white border-[#000000]'
                : 'bg-transparent text-[#666666] border-[#E5E5E5] hover:border-[#000000]'
            }`}
          >
            ORDERS ({orderCount})
          </button>
        </div>

        {activeTab === 'profile' ? (
          <div className="space-y-4 pt-4 text-xs">
            {/* User Details */}
            <div className="p-4 bg-[#F7F7F5] border border-[#E5E5E5] flex items-center gap-4">
              <div className="w-12 h-12 bg-[#000000] text-white font-bold text-sm flex items-center justify-center shrink-0">
                MM
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs uppercase tracking-wider text-[#000000] truncate">
                  SANJAYA V. S.
                </div>
                <div className="text-[#666666] truncate text-[11px]">
                  sanjayavs006@gmail.com
                </div>
                <div className="text-[10px] text-[#E30613] font-black uppercase tracking-[0.18em] mt-1">
                  TIER: PLUS MEMBER ★
                </div>
              </div>
            </div>

            {/* Quick Wishlist link */}
            {wishlistCount > 0 && onViewWishlist && (
              <div className="p-3.5 bg-[#FFFFFF] border border-[#E5E5E5] flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#000000]">
                  <Heart className="w-4 h-4 fill-[#E30613] text-[#E30613]" />
                  <span className="font-bold text-xs uppercase tracking-wider">SAVED ITEMS ({wishlistCount})</span>
                </div>
                <button
                  onClick={onViewWishlist}
                  className="text-xs font-bold text-[#E30613] hover:underline uppercase tracking-wider cursor-pointer"
                >
                  VIEW
                </button>
              </div>
            )}

            {/* Member Benefits */}
            <div className="p-4 bg-[#F7F7F5] border border-[#E5E5E5] space-y-2">
              <div className="font-bold text-[#000000] uppercase tracking-wider text-[11px]">
                ACTIVE PRIVILEGES
              </div>
              <ul className="text-[#666666] leading-relaxed text-[11px] space-y-1">
                <li>• Free standard delivery on orders above ₹1999</li>
                <li>• Digital receipts & 15-day return window</li>
                <li>• Early access to seasonal campaign drops</li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 border border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white font-black text-xs uppercase tracking-[0.24em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>CLOSE</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 pt-4 text-xs">
            {orderCount > 0 ? (
              <div className="p-4 bg-[#F7F7F5] border border-[#E5E5E5] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#000000]">#MM-82914</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#000000] px-2 py-0.5">
                    DISPATCHED
                  </span>
                </div>
                <div className="text-[#666666]">New Season Tailored Blazer • Size L</div>
                <div className="text-xs font-black text-[#000000]">Total: ₹3,999</div>
                <div className="pt-1 text-[11px] text-[#2B6336] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Delivery expected in 2 business days
                </div>
              </div>
            ) : (
              <div className="py-10 text-center text-[#666666] uppercase tracking-wider text-xs space-y-2">
                <Package className="w-8 h-8 mx-auto text-[#000000] stroke-[1.25]" />
                <p>No orders placed yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
