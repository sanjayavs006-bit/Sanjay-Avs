import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { MoodCategory } from '../types';
import { ArrowUp, Heart, Check } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: MoodCategory) => void;
  onOpenMoodQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenMoodQuiz }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer id="about-section" className="w-full bg-[#111111] text-[#FFF8F2] pt-16 pb-28 md:pb-16 border-t border-[#7B2638]/40 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Brand & Back to Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-12 border-b border-white/10 gap-6">
          <div className="space-y-1">
            <BrandLogo variant="light" size="lg" />
            <p className="text-xs text-[#FFF8F2]/70 font-serif italic">
              Your mood. Your balm. ♡
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FFF8F2]/70 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation & Newsletter Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          {/* 1. Explore Moods */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-[0.2em] text-white text-xs">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-[#FFF8F2]/70 uppercase tracking-wider text-[11px]">
              <li>
                <button
                  onClick={() => onSelectCategory('ALL')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  THE 12 MOODS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ROMANTIC & PLAYFUL')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ROMANTIC & PLAYFUL
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('COZY & INDULGENT')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  COZY & INDULGENT
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('FRESH & DREAMY')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FRESH & DREAMY
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('BESTSELLERS')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  BESTSELLERS
                </button>
              </li>
            </ul>
          </div>

          {/* 2. Brand Story & Matcher */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-[0.2em] text-white text-xs">
              THE BRAND
            </h4>
            <ul className="space-y-2.5 text-[#FFF8F2]/70 uppercase tracking-wider text-[11px]">
              <li>
                <button
                  onClick={onOpenMoodQuiz}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[#F8DDE0]"
                >
                  <span>FIND YOUR MOOD QUIZ</span>
                  <span>♡</span>
                </button>
              </li>
              <li>
                <span className="text-[#FFF8F2]/50">100% VEGAN FORMULA</span>
              </li>
              <li>
                <span className="text-[#FFF8F2]/50">RECYCLABLE ALUMINUM COMPACT</span>
              </li>
              <li>
                <span className="text-[#FFF8F2]/50">DERMATOLOGIST TESTED</span>
              </li>
              <li>
                <span className="text-[#FFF8F2]/50">CLEAN INGREDIENTS</span>
              </li>
            </ul>
          </div>

          {/* 3. Customer Care */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-[0.2em] text-white text-xs">
              ASSISTANCE
            </h4>
            <ul className="space-y-2.5 text-[#FFF8F2]/70 uppercase tracking-wider text-[11px]">
              <li>
                <span>SHIPPING: FREE ON ORDERS ₹999+</span>
              </li>
              <li>
                <span>DELIVERY: 2-3 BUSINESS DAYS</span>
              </li>
              <li>
                <span>HASSLE-FREE RETURNS</span>
              </li>
              <li>
                <span>CARE@MOODYMATCH.COM</span>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h4 className="font-black uppercase tracking-[0.2em] text-white text-xs">
              THE MOOD CLUB
            </h4>
            <p className="text-[11px] text-[#FFF8F2]/70 leading-relaxed font-serif italic">
              Subscribe for new collectible drop alerts and member-only packaging specials.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  className="w-full px-3.5 py-2.5 text-[11px] uppercase tracking-wider bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-hidden focus:border-[#F8DDE0] rounded-l-full"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#7B2638] hover:bg-[#F8DDE0] hover:text-[#7B2638] text-white text-[11px] font-bold uppercase tracking-wider rounded-r-full transition-colors cursor-pointer"
                >
                  {isSubscribed ? <Check className="w-3.5 h-3.5" /> : 'JOIN'}
                </button>
              </div>
              {isSubscribed && (
                <p className="text-[10px] text-[#F8DDE0] font-mono">
                  Welcome to the Club! Check your inbox for 10% off. ♡
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase font-mono text-[#FFF8F2]/50">
          <span>© 2026 MOODY MATCH. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-4">
            <span>PRIVACY POLICY</span>
            <span>TERMS OF SERVICE</span>
            <span>COMPACT SUSTAINABILITY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
