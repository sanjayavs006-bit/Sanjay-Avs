import React, { useState } from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { BalmCompactVisual } from './BalmCompactVisual';
import { ThreeBalmViewer } from './ThreeBalmViewer';
import { MOODY_PRODUCTS } from '../data/moodyProducts';
import { Product } from '../types';

interface HeroProps {
  onShopAll: () => void;
  onOpenMoodQuiz: () => void;
  onSelectProduct: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopAll, onOpenMoodQuiz, onSelectProduct }) => {
  // Featured heroes to toggle: HEART (#01) and TEDDY (#02)
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [hero3DMode, setHero3DMode] = useState(false);
  const featuredProduct = MOODY_PRODUCTS[featuredIdx];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#FFF8F2] via-[#F8DDE0]/50 to-[#FFF8F2] border-b border-[#E8D3C2]/60 overflow-hidden select-none">
      {/* Decorative subtle aesthetic ambient glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#F4C7CE]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#E8D3C2]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Minimal Editorial Typography (5 cols) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
            {/* Small uppercase eyebrow label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF]/80 border border-[#7B2638]/15 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#7B2638] shadow-xs">
              <Sparkles className="w-3 h-3 text-[#7B2638]" />
              <span>COLLECTIBLE CLEAN LIP LUXURY</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#111111] leading-[0.95] font-sans">
                YOUR MOOD.
                <br />
                <span className="text-[#7B2638] flex items-center gap-3">
                  YOUR BALM.
                  <span className="font-serif font-normal text-3xl sm:text-5xl text-[#C96B7B]">
                    ♡
                  </span>
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-[#111111]/80 max-w-md font-normal leading-relaxed tracking-wide">
              12 moods. 12 colors. Find the one that matches you. Small round collectible compacts infused with organic botanicals, vegan peptides, and pure mood magic.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onShopAll}
                className="px-7 py-4 bg-[#7B2638] hover:bg-[#111111] text-[#FFF8F2] text-xs font-black uppercase tracking-[0.22em] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
              >
                <span>SHOP ALL MOODS</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>

              <button
                onClick={onOpenMoodQuiz}
                className="px-6 py-4 bg-[#FFFFFF] hover:bg-[#F8DDE0] border border-[#7B2638]/30 text-[#7B2638] text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Heart className="w-3.5 h-3.5 fill-[#7B2638]" />
                <span>FIND YOUR MOOD</span>
              </button>
            </div>

            {/* Mini Selector Toggles between #01 Heart and #02 Teddy */}
            <div className="pt-4 flex items-center gap-4 text-[11px] font-bold tracking-wider text-[#7B2638]">
              <span className="text-[10px] text-[#111111]/60 uppercase tracking-[0.2em]">FEATURED:</span>
              <button
                onClick={() => setFeaturedIdx(0)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  featuredIdx === 0
                    ? 'bg-[#7B2638] text-white'
                    : 'bg-[#FFFFFF] border border-[#7B2638]/20 text-[#7B2638] hover:border-[#7B2638]'
                }`}
              >
                #01 HEART
              </button>
              <button
                onClick={() => setFeaturedIdx(1)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  featuredIdx === 1
                    ? 'bg-[#7B2638] text-white'
                    : 'bg-[#FFFFFF] border border-[#7B2638]/20 text-[#7B2638] hover:border-[#7B2638]'
                }`}
              >
                #02 TEDDY
              </button>
              <button
                onClick={() => setFeaturedIdx(3)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  featuredIdx === 3
                    ? 'bg-[#7B2638] text-white'
                    : 'bg-[#FFFFFF] border border-[#7B2638]/20 text-[#7B2638] hover:border-[#7B2638]'
                }`}
              >
                #04 PEACH
              </button>
            </div>

            {/* Key Quality Pillars */}
            <div className="pt-6 border-t border-[#E8D3C2]/60 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="block text-base sm:text-lg font-black text-[#7B2638]">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70">
                  Vegan & Clean
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-black text-[#7B2638]">15g</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70">
                  Pocket Compact
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-black text-[#7B2638]">₹499</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70">
                  Collector Price
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fashion Beauty Editorial + Compact Packaging Composition (7 cols) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            {/* Main Creative Split Card */}
            <div className="relative w-full max-w-lg min-h-[460px] bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 shadow-compact border border-[#E8D3C2] flex flex-col justify-between overflow-hidden group">
              {/* Background ambient blush splash */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: featuredProduct.tinColor }}
              />

              {/* Top Details Bar on Studio Card */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7B2638] animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest font-bold text-[#7B2638] uppercase">
                    CAMPAIGN NO. {featuredProduct.number}
                  </span>
                </div>
                {/* 3D Motion Mode Selector in Hero */}
                <div className="flex items-center gap-1.5 bg-[#FFF8F2] p-1 rounded-full border border-[#E8D3C2]">
                  <button
                    onClick={() => setHero3DMode(false)}
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase transition-all cursor-pointer ${
                      !hero3DMode ? 'bg-[#7B2638] text-white shadow-2xs' : 'text-[#111111]/70 hover:text-[#7B2638]'
                    }`}
                  >
                    EDITORIAL
                  </button>
                  <button
                    onClick={() => setHero3DMode(true)}
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1 ${
                      hero3DMode ? 'bg-[#7B2638] text-white shadow-2xs' : 'text-[#7B2638] hover:text-[#111111]'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>3D ORBIT</span>
                  </button>
                </div>
              </div>

              {/* Center Composition: The Round Compact or Live 3D Model Canvas */}
              {hero3DMode ? (
                <div className="relative z-10 my-auto w-full flex flex-col items-center justify-center py-1">
                  <ThreeBalmViewer
                    product={featuredProduct}
                    heightClass="h-[320px] sm:h-[350px]"
                    showControls={true}
                  />
                </div>
              ) : (
                <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
                  {/* Visual Compact Container with 3D Tilt */}
                  <div
                    className="cursor-pointer"
                    onClick={() => onSelectProduct(featuredProduct)}
                    title="Click to view full details"
                  >
                    <BalmCompactVisual
                      product={featuredProduct}
                      size="lg"
                      view="top"
                      enable3DTilt={true}
                      className="transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Floating Authentic Beauty Model Inset Card */}
                  <div className="absolute -bottom-2 -right-2 sm:-right-4 w-32 sm:w-40 aspect-[3/4] rounded-xl overflow-hidden shadow-xl border-2 border-white bg-[#F8DDE0]">
                    <img
                      src={featuredProduct.modelImage}
                      alt={`${featuredProduct.name} Beauty Model`}
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white">
                      <span className="text-[9px] font-bold uppercase tracking-wider block">
                        {featuredProduct.personality}
                      </span>
                      <span className="text-[8px] text-white/80 block">Hydrated Gloss Finish</span>
                    </div>
                  </div>

                  {/* Floating Authentic Lip Macro Inset Card */}
                  <div className="absolute -top-2 -left-2 sm:-left-4 w-24 sm:w-28 aspect-square rounded-full overflow-hidden shadow-lg border-2 border-white bg-[#F8DDE0] hidden sm:block">
                    <img
                      src={featuredProduct.lipMacroImage}
                      alt="Hydrated Lip Texture"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-white bg-black/50 px-1.5 py-0.5 rounded-full">
                        GLAZE
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Details on Studio Card */}
              <div className="relative z-10 pt-4 border-t border-[#E8D3C2]/80 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#111111]">
                    {featuredProduct.title}
                  </h3>
                  <p className="text-xs text-[#7B2638] font-medium">{featuredProduct.flavor}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-[#111111]">₹{featuredProduct.price}</span>
                  <button
                    onClick={() => onSelectProduct(featuredProduct)}
                    className="px-3.5 py-1.5 bg-[#7B2638] hover:bg-[#111111] text-white text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer"
                  >
                    EXPLORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
