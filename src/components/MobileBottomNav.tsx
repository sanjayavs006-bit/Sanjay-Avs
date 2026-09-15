import React from 'react';
import { Home, Search, Heart, User, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  cartCount: number;
  wishlistCount: number;
  onHomeClick: () => void;
  onSearchClick: () => void;
  onWishlistClick: () => void;
  onAccountClick: () => void;
  onCartClick: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  wishlistCount,
  onHomeClick,
  onSearchClick,
  onWishlistClick,
  onAccountClick,
  onCartClick,
}) => {
  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 md:hidden pointer-events-none select-none">
      <nav className="pointer-events-auto bg-[#7B2638] text-[#FFF8F2] rounded-full px-5 py-3 shadow-2xl border border-white/20 flex items-center gap-6 sm:gap-8 backdrop-blur-md">
        {/* Home */}
        <button
          onClick={onHomeClick}
          className="flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Go home"
        >
          <Home className="w-4 h-4 stroke-[2]" />
          <span className="text-[9px] font-bold uppercase tracking-wider">HOME</span>
        </button>

        {/* Search */}
        <button
          onClick={onSearchClick}
          className="flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-4 h-4 stroke-[2]" />
          <span className="text-[9px] font-bold uppercase tracking-wider">SEARCH</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={onWishlistClick}
          className="relative flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 stroke-[2] ${wishlistCount > 0 ? 'fill-white' : ''}`} />
          <span className="text-[9px] font-bold uppercase tracking-wider">WISHLIST</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-white text-[#7B2638] text-[9px] font-mono font-black w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Account */}
        <button
          onClick={onAccountClick}
          className="flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Account"
        >
          <User className="w-4 h-4 stroke-[2]" />
          <span className="text-[9px] font-bold uppercase tracking-wider">ACCOUNT</span>
        </button>

        {/* Bag */}
        <button
          onClick={onCartClick}
          className="relative flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Shopping bag"
        >
          <ShoppingBag className="w-4 h-4 stroke-[2]" />
          <span className="text-[9px] font-bold uppercase tracking-wider">BAG</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-white text-[#7B2638] text-[9px] font-mono font-black w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
};
