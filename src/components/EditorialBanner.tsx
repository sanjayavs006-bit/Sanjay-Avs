import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MainCategory } from '../types';

interface EditorialBannerProps {
  onSelectCategory: (category: MainCategory) => void;
}

export const EditorialBanner: React.FC<EditorialBannerProps> = ({ onSelectCategory }) => {
  return (
    <section className="w-full bg-[#F7F7F5] py-14 sm:py-24 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Feature 1: Denim Editorial */}
          <div
            onClick={() => onSelectCategory('DENIM')}
            className="group cursor-pointer flex flex-col space-y-4"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
              <img
                src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80"
                alt="The Denim Edit"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-6 left-6 z-10 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]">
                DENIM ARCHIVE
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#000000] group-hover:text-[#E30613] transition-colors">
                100% ORGANIC RIGID DENIM
              </h3>
              <p className="text-xs text-[#666666] tracking-wide leading-relaxed">
                Sculptural wide-leg cuts, vintage stone washes, and timeless straight silhouettes built with zero synthetic stretch.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#000000]">
                <span>EXPLORE JEANS FROM ₹1999</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* Feature 2: Tailored Outerwear */}
          <div
            onClick={() => onSelectCategory('WOMEN')}
            className="group cursor-pointer flex flex-col space-y-4"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80"
                alt="Structured Outerwear"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-6 left-6 z-10 bg-[#E30613] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]">
                PREMIUM SELECTION
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#000000] group-hover:text-[#E30613] transition-colors">
                CONTEMPORARY TAILORING
              </h3>
              <p className="text-xs text-[#666666] tracking-wide leading-relaxed">
                Water-resistant double-collar trench coats, oversized blazers, and clean-line trousers designed for timeless wardrobe longevity.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#000000]">
                <span>SHOP OUTERWEAR</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
