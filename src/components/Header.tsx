import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { MainCategory } from '../types';

interface HeaderProps {
  activeCategory: MainCategory;
  onSelectCategory: (category: MainCategory) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

const ANNOUNCEMENTS = [
  'JEANS STARTING ₹1999',
  'NEW SEASON ESSENTIALS — FREE SHIPPING OVER ₹1999',
  'MEMBERS GET 10% OFF YOUR FIRST ORDER',
  'AUTUMN / WINTER EDITORIAL COLLECTION OUT NOW',
];

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
}) => {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCategories: { id: MainCategory; label: string; isAccent?: boolean }[] = [
    { id: 'WOMEN', label: 'WOMEN' },
    { id: 'MEN', label: 'MEN' },
    { id: 'KIDS', label: 'KIDS' },
    { id: 'NEW ARRIVALS', label: 'NEW ARRIVALS' },
    { id: 'DENIM', label: 'DENIM' },
    { id: 'SALE', label: 'SALE', isAccent: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] transition-shadow duration-200">
      {/* 1. Top Announcement Bar */}
      <div className="w-full bg-[#000000] text-[#FFFFFF] py-2 px-4 flex items-center justify-between text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]">
        <div className="hidden sm:block w-12" /> {/* Spacer for centering */}
        
        <button
          onClick={() => onSelectCategory('DENIM')}
          className="mx-auto flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer text-center"
        >
          <span>{ANNOUNCEMENTS[announcementIndex]}</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 shrink-0" />
        </button>

        <div className="hidden sm:flex items-center gap-3 text-[10px] tracking-wider text-[#A3A3A3]">
          <span className="hover:text-white cursor-pointer transition-colors" onClick={onOpenAccount}>SIGN IN</span>
          <span>•</span>
          <span>INR (₹)</span>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-8 transition-all duration-200 ${
          isScrolled ? 'py-3.5 border-b border-[#E5E5E5]' : 'py-5 border-b border-transparent'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo on Left */}
          <div className="flex items-center">
            <BrandLogo
              size="md"
              variant="dark"
              onClick={() => onSelectCategory('ALL')}
            />
          </div>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.16em]">
            {navCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`relative py-1.5 transition-colors cursor-pointer ${
                    cat.isAccent
                      ? 'text-[#E30613] hover:text-[#B5000B]'
                      : isActive
                      ? 'text-[#000000]'
                      : 'text-[#171717]/75 hover:text-[#000000]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && !cat.isAccent && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#000000]" />
                  )}
                  {isActive && cat.isAccent && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E30613]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Utilities (Search, Wishlist, Account, Bag) */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={onOpenSearch}
              className="p-1.5 text-[#000000] hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Search items"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              onClick={onOpenAccount}
              className="hidden sm:block p-1.5 text-[#000000] hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="My Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              onClick={onOpenWishlist}
              className="relative p-1.5 text-[#000000] hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] rounded-full bg-[#E30613] text-white text-[10px] font-bold flex items-center justify-center px-1">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-1.5 text-[#000000] hover:opacity-60 transition-opacity cursor-pointer flex items-center gap-2"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] rounded-full bg-[#000000] text-white text-[10px] font-bold flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Category Pills below header for easy tapping */}
        <div className="lg:hidden flex items-center gap-4 overflow-x-auto no-scrollbar pt-3 text-[11px] font-bold tracking-[0.14em] uppercase border-t border-[#E5E5E5] mt-3">
          {navCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`py-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  cat.isAccent
                    ? 'text-[#E30613]'
                    : isActive
                    ? 'text-[#000000] border-b-2 border-[#000000]'
                    : 'text-[#666666]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
