import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EDITORIAL_CATEGORIES } from '../data/fashionProducts';
import { MainCategory } from '../types';

interface CategoryTilesProps {
  onSelectCategory: (category: MainCategory) => void;
}

export const CategoryTiles: React.FC<CategoryTilesProps> = ({ onSelectCategory }) => {
  return (
    <section className="w-full bg-[#FFFFFF] py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-baseline justify-between mb-8 sm:mb-12 border-b border-[#000000] pb-4">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#666666]">
            EDITORIAL COLLECTIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#000000] mt-1">
            SHOP BY CATEGORY
          </h2>
        </div>
        <button
          onClick={() => onSelectCategory('ALL')}
          className="text-xs font-bold uppercase tracking-[0.16em] text-[#000000] hover:text-[#E30613] transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>VIEW ALL</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Large Editorial Tiles (No boxed borders or shadow cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {EDITORIAL_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.hrefCategory)}
            className="group cursor-pointer relative flex flex-col"
          >
            {/* Image Container with Smooth Zoom */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F7F5]">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              
              {/* Minimal Tag Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#FFFFFF] text-[#000000] text-[10px] font-bold uppercase px-2.5 py-1 tracking-[0.2em]">
                  {cat.label}
                </span>
              </div>
            </div>

            {/* Minimal Under-Image Editorial Typography */}
            <div className="pt-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-black uppercase tracking-[0.18em] text-[#000000] group-hover:text-[#E30613] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#666666] tracking-wide mt-0.5">
                  {cat.tagline}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#000000] group-hover:border-[#000000] group-hover:bg-[#000000] group-hover:text-white transition-all shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
