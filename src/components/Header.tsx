import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Search, Heart, User, ShoppingBag, ArrowRight } from 'lucide-react';
import { MoodCategory } from '../types';

interface HeaderProps {
  activeCategory: MoodCategory;
  onSelectCategory: (category: MoodCategory) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenMoodQuiz: () => void;
  onScrollTo12Moods: () => void;
  onScrollToAbout: () => void;
}

const ANNOUNCEMENTS = [
  '12 MOODS. 1 PERFECT MATCH. ♡',
  'COMPLIMENTARY SHIPPING ON ALL ORDERS OVER ₹999 ♡',
  '100% ORGANIC BOTANICALS & VEGAN PEPTIDES ♡',
  'CHOOSE ANY 3 MOOD BALMS — SAVE 10% WITH CODE: MOODMATCH10 ♡',
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
  onOpenMoodQuiz,
  onScrollTo12Moods,
  onScrollToAbout,
}) => {
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextAnnouncement = () => {
    setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF8F2]/95 backdrop-blur-md border-b border-[#E8D3C2]/60 select-none transition-all">
      {/* 1. Top Minimal Announcement Bar */}
      <div className="w-full bg-[#7B2638] text-[#FFF8F2] px-4 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] flex items-center justify-between transition-colors">
        <div className="flex-1 text-center truncate pr-2">
          <span>{ANNOUNCEMENTS[announcementIdx]}</span>
        </div>
        <button
          onClick={nextAnnouncement}
          className="p-1 hover:opacity-75 transition-opacity cursor-pointer flex items-center gap-1 text-[#FFF8F2]"
          aria-label="Next announcement"
        >
          <ArrowRight className="w-3 h-3 stroke-[2]" />
        </button>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer"
          >
            <BrandLogo variant="burgundy" size="md" />
          </a>
        </div>

        {/* Center: Editorial Nav Links (Clean uppercase typography with generous spacing) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs font-bold uppercase tracking-[0.22em] text-[#111111]">
          <button
            onClick={() => {
              onSelectCategory('ALL');
              onScrollTo12Moods();
            }}
            className="hover:text-[#7B2638] transition-colors cursor-pointer py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7B2638] hover:after:w-full after:transition-all"
          >
            NEW
          </button>
          <button
            onClick={onScrollTo12Moods}
            className="hover:text-[#7B2638] transition-colors cursor-pointer py-1 text-[#7B2638] font-black relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#7B2638]"
          >
            12 MOODS
          </button>
          <button
            onClick={() => {
              onSelectCategory('ALL');
              onScrollTo12Moods();
            }}
            className="hover:text-[#7B2638] transition-colors cursor-pointer py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7B2638] hover:after:w-full after:transition-all"
          >
            SHOP
          </button>
          <button
            onClick={onScrollToAbout}
            className="hover:text-[#7B2638] transition-colors cursor-pointer py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7B2638] hover:after:w-full after:transition-all"
          >
            ABOUT
          </button>
          <button
            onClick={onOpenMoodQuiz}
            className="text-[11px] font-bold px-3 py-1 rounded-full border border-[#7B2638] text-[#7B2638] hover:bg-[#7B2638] hover:text-[#FFF8F2] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>MATCH QUIZ</span>
            <span>♡</span>
          </button>
        </nav>

        {/* Right Side: Utilities (SEARCH | ♡ | ACCOUNT | BAG) */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs font-bold uppercase tracking-[0.16em] text-[#111111]">
          {/* Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 hover:text-[#7B2638] transition-colors cursor-pointer py-1"
            aria-label="Search moods"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden sm:inline text-[11px]">SEARCH</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative flex items-center gap-1.5 hover:text-[#7B2638] transition-colors cursor-pointer py-1"
            aria-label="Saved items"
          >
            <Heart className={`w-4 h-4 stroke-[1.75] ${wishlistCount > 0 ? 'fill-[#7B2638] text-[#7B2638]' : ''}`} />
            <span className="hidden sm:inline text-[11px]">SAVED</span>
            {wishlistCount > 0 && (
              <span className="text-[10px] font-mono font-bold bg-[#7B2638] text-white w-4 h-4 rounded-full flex items-center justify-center -ml-0.5">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account */}
          <button
            onClick={onOpenAccount}
            className="hidden sm:flex items-center gap-1.5 hover:text-[#7B2638] transition-colors cursor-pointer py-1"
            aria-label="Member account"
          >
            <User className="w-4 h-4 stroke-[1.75]" />
            <span className="text-[11px]">ACCOUNT</span>
          </button>

          {/* Bag */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#7B2638] hover:bg-[#111111] text-[#FFF8F2] px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full transition-colors cursor-pointer shadow-xs"
            aria-label="Open bag"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
            <span className="text-[11px] tracking-wider">BAG ({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
