import React, { useState } from 'react';
import { X, User, Package, CheckCircle2, Heart, Sparkles, LogOut } from 'lucide-react';

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
        className="relative bg-[#FFF8F2] text-[#111111] w-full max-w-md rounded-3xl shadow-2xl border border-[#E8D3C2] overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#7B2638]">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#7B2638]" />
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-[#111111]">
              MOODY MATCH CLUB ♡
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F8DDE0] text-[#7B2638] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-[#E8D3C2]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#7B2638] text-white'
                : 'bg-white text-[#111111]/70 border border-[#E8D3C2]'
            }`}
          >
            MEMBER PROFILE
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#7B2638] text-white'
                : 'bg-white text-[#111111]/70 border border-[#E8D3C2]'
            }`}
          >
            ORDER HISTORY ({orderCount})
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4 pt-4 text-xs">
            <div className="p-4 bg-white rounded-2xl border border-[#E8D3C2] flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#F8DDE0] text-[#7B2638] font-black text-sm flex items-center justify-center font-mono">
                MM
              </div>
              <div>
                <span className="text-sm font-black uppercase text-[#111111] block">
                  MOOD COLLECTOR
                </span>
                <span className="text-[11px] text-[#7B2638] font-serif italic block">
                  collector@moodymatch.com
                </span>
                <span className="text-[10px] text-[#111111]/60 font-mono">
                  MEMBER ID: #MM-88429
                </span>
              </div>
            </div>

            {/* Member Perks */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8D3C2] space-y-2.5">
              <div className="flex items-center gap-2 text-[#7B2638] font-bold uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ACTIVE COLLECTOR PERKS</span>
              </div>
              <ul className="space-y-2 text-[11px] text-[#111111]/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7B2638]" />
                  <span>Complimentary Shipping on all orders ₹999+</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7B2638]" />
                  <span>10% Off on 3-Balm Collector Box (MOODMATCH10)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7B2638]" />
                  <span>Early access to seasonal limited compact drops</span>
                </li>
              </ul>
            </div>

            {wishlistCount > 0 && onViewWishlist && (
              <button
                onClick={() => {
                  onClose();
                  onViewWishlist();
                }}
                className="w-full py-3 bg-[#F8DDE0] hover:bg-[#F4C7CE] text-[#7B2638] rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-[#7B2638]" />
                <span>VIEW {wishlistCount} SAVED MOODS</span>
              </button>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4 pt-4">
            {orderCount === 0 ? (
              <div className="py-12 text-center space-y-2">
                <Package className="w-8 h-8 text-[#7B2638]/40 mx-auto" />
                <p className="text-sm font-black uppercase text-[#111111]">NO ORDERS YET</p>
                <p className="text-xs text-[#111111]/70 font-serif italic">
                  Your shipped mood compacts will appear here.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-white rounded-2xl border border-[#E8D3C2] space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-[#7B2638]">ORDER #MM-2026-0914</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold uppercase">
                    CONFIRMED & PACKED
                  </span>
                </div>
                <p className="text-[11px] text-[#111111]/70">
                  MOODY MATCH Signature Duo (#01 HEART & #02 TEDDY)
                </p>
                <div className="pt-2 border-t border-[#FFF8F2] flex justify-between font-bold text-xs">
                  <span>Total Paid</span>
                  <span>₹998 (Free Shipping)</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
