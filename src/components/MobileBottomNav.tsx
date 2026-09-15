import React from 'react';
import { Home, Search, Heart, User, ShoppingBag } from 'lucide-react';
import { ActivePage, MainCategory } from '../types';

interface MobileBottomNavProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, category?: MainCategory) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePage,
  onNavigate,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  cartCount,
  wishlistCount,
}) => {
  return (
    <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm pointer-events-auto">
      {/* Floating rounded black navigation pill inspired by modern luxury & fast-fashion shopping apps */}
      <nav
        aria-label="Mobile Navigation"
        className="w-full bg-[#000000]/95 backdrop-blur-md text-white rounded-full px-4 py-2.5 shadow-2xl border border-white/15 flex items-center justify-between"
      >
        {/* Home */}
        <button
          onClick={() => onNavigate('home', 'ALL')}
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
            activePage === 'home' ? 'text-white' : 'text-[#8E8E93] hover:text-white'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[9px] font-bold tracking-wider uppercase mt-0.5">Home</span>
        </button>

        {/* Search */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center p-2 rounded-full text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[9px] font-bold tracking-wider uppercase mt-0.5">Search</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={onOpenWishlist}
          className="relative flex flex-col items-center justify-center p-2 rounded-full text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart className="w-5 h-5 stroke-[1.5]" />
          {wishlistCount > 0 && (
            <span className="absolute top-1 right-2 min-w-[15px] h-[15px] rounded-full bg-[#E30613] text-white text-[9px] font-bold flex items-center justify-center px-0.5">
              {wishlistCount}
            </span>
          )}
          <span className="text-[9px] font-bold tracking-wider uppercase mt-0.5">Saved</span>
        </button>

        {/* Account */}
        <button
          onClick={onOpenAccount}
          className="flex flex-col items-center justify-center p-2 rounded-full text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
          aria-label="Account"
        >
          <User className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[9px] font-bold tracking-wider uppercase mt-0.5">Profile</span>
        </button>

        {/* Shopping Bag */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center p-2 rounded-full text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
          aria-label="Bag"
        >
          <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-2 min-w-[15px] h-[15px] rounded-full bg-[#E30613] text-white text-[9px] font-bold flex items-center justify-center px-0.5">
              {cartCount}
            </span>
          )}
          <span className="text-[9px] font-bold tracking-wider uppercase mt-0.5">Bag</span>
        </button>
      </nav>
    </div>
  );
};
