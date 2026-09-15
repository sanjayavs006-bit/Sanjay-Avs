import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MainCategory } from '../types';

interface HeroProps {
  onShopNow: (category: MainCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section className="relative w-full bg-[#E30613] text-white overflow-hidden select-none min-h-[85vh] sm:min-h-[92vh] flex items-center">
      {/* Background & Model Visual Layout */}
      <div className="absolute inset-0 w-full h-full flex justify-center items-end sm:items-center">
        {/* Editorial Campaign Model Image with Solid Bold Red Studio Background */}
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85"
          alt="New Season Editorial Campaign"
          className="w-full h-full object-cover object-top sm:object-center brightness-[0.98] contrast-[1.05]"
          loading="eager"
        />
        {/* Subtle vignette / tonal blend for crisp typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#E30613]/90 via-transparent to-[#E30613]/30 sm:bg-gradient-to-r sm:from-[#E30613]/85 sm:via-[#E30613]/40 sm:to-transparent" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 flex flex-col justify-end sm:justify-center min-h-[80vh]">
        <div className="max-w-xl space-y-4 sm:space-y-6">
          <div className="inline-block">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/90 bg-black/20 px-2.5 py-1 backdrop-blur-xs">
              AUTUMN / WINTER 2026
            </span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] uppercase leading-[0.92] text-white font-sans">
              NEW SEASON
              <br />
              <span className="font-light tracking-tight">ESSENTIALS</span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm font-medium tracking-wide text-white/90 max-w-md leading-relaxed">
            Contemporary silhouettes, heavy-gauge organic cotton basics, and relaxed tailoring. Designed for everyday confidence.
          </p>

          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => onShopNow('NEW ARRIVALS')}
              className="group inline-flex items-center gap-3 bg-[#FFFFFF] text-[#000000] px-7 py-3.5 sm:px-8 sm:py-4 text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-[#000000] hover:text-white cursor-pointer active:scale-98"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onShopNow('DENIM')}
              className="inline-flex items-center gap-2 bg-transparent text-white border border-white/80 px-6 py-3.5 sm:px-7 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-white/10 cursor-pointer"
            >
              <span>EXPLORE DENIM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Minimalist Campaign Sub-Label in Bottom Right on Desktop */}
      <div className="hidden md:flex absolute bottom-8 right-12 z-10 text-right flex-col text-white/80 text-[10px] font-mono tracking-widest uppercase">
        <span>CAMPAIGN // 01</span>
        <span className="text-white font-bold">KONTRAST & SILHOUETTE</span>
      </div>
    </section>
  );
};
