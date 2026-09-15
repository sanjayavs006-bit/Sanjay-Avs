import React, { useState } from 'react';
import { MOODY_PRODUCTS } from '../data/moodyProducts';
import { BalmCompactVisual } from './BalmCompactVisual';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const PackagingStory: React.FC = () => {
  const [activeAngle, setActiveAngle] = useState<'top' | 'open' | 'side'>('top');
  const sampleProduct = MOODY_PRODUCTS[0]; // #01 Heart

  const ANGLES: { id: 'top' | 'open' | 'side'; label: string; desc: string }[] = [
    {
      id: 'top',
      label: '01. TOP VIEW',
      desc: 'Collectible matte-finish tin lid with authentic mood artwork & burgundy typography.',
    },
    {
      id: 'open',
      label: '02. OPEN COMPACT',
      desc: 'Precision-poured 15g vegan lip butter with protective beveled rim.',
    },
    {
      id: 'side',
      label: '03. SIDE PROFILE',
      desc: 'Seamless airtight seal engineered for on-the-go pocket and purse carrying.',
    },
  ];

  return (
    <section className="w-full bg-[#FFFFFF] py-20 sm:py-28 border-b border-[#E8D3C2]/60 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF8F2] border border-[#7B2638]/20 text-[10px] font-bold uppercase tracking-[0.24em] text-[#7B2638] mb-3">
            <Sparkles className="w-3 h-3 text-[#7B2638]" />
            <span>INDUSTRIAL DESIGN & CRAFT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111]">
            THE COLLECTIBLE COMPACT
          </h2>
          <p className="text-sm sm:text-base text-[#111111]/70 mt-2 font-serif italic">
            Engineered to feel as precious in your palm as it looks on your vanity.
          </p>
        </div>

        {/* Interactive Anatomy Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Angle Controls & Architectural Callouts */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7B2638] font-bold">
                PERSPECTIVE SELECTOR
              </span>
              <div className="flex flex-col gap-2">
                {ANGLES.map((angle) => (
                  <button
                    key={angle.id}
                    onClick={() => setActiveAngle(angle.id)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      activeAngle === angle.id
                        ? 'bg-[#FFF8F2] border-[#7B2638] shadow-sm'
                        : 'bg-white border-[#E8D3C2] hover:border-[#7B2638]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-[#111111]">
                        {angle.label}
                      </span>
                      {activeAngle === angle.id && (
                        <span className="w-2 h-2 rounded-full bg-[#7B2638]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#111111]/70 mt-1">{angle.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Design Spec Highlights */}
            <div className="p-5 rounded-2xl bg-[#FFF8F2] border border-[#E8D3C2] space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#7B2638]">
                MATERIAL SPECIFICATION
              </span>
              <ul className="space-y-2 text-xs text-[#111111]/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7B2638]" />
                  <span>Ultra-lightweight aluminum matte compact</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7B2638]" />
                  <span>Embossed heart and mood illustration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7B2638]" />
                  <span>100% recyclable, plastic-free outer casing</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Center: Hero Packaging Stage with Thin Architectural Annotation Lines */}
          <div className="lg:col-span-8 relative flex flex-col items-center justify-center p-8 sm:p-14 bg-[#FFF8F2] rounded-3xl border border-[#E8D3C2] overflow-hidden">
            {/* Architectural Grid backdrop lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#7B2638_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Center Product Display */}
            <div className="relative py-8 sm:py-12 z-10">
              <BalmCompactVisual
                product={sampleProduct}
                view={activeAngle}
                size="xl"
                className="transform transition-all duration-700 hover:rotate-2"
              />

              {/* Annotation Line: Top */}
              <div className="hidden sm:flex absolute -top-4 left-1/2 -translate-x-1/2 items-center flex-col pointer-events-none">
                <span className="text-[9px] font-mono tracking-widest text-[#7B2638] bg-white px-2 py-0.5 rounded border border-[#7B2638]/20 shadow-xs">
                  DIAMETER 48MM • MATTE FINISH
                </span>
                <div className="w-[1px] h-6 bg-[#7B2638]/40" />
              </div>

              {/* Annotation Line: Right */}
              <div className="hidden md:flex absolute top-1/2 -right-12 -translate-y-1/2 items-center pointer-events-none">
                <div className="w-10 h-[1px] bg-[#7B2638]/40" />
                <span className="text-[9px] font-mono tracking-widest text-[#7B2638] bg-white px-2 py-0.5 rounded border border-[#7B2638]/20 shadow-xs ml-1">
                  15G NET WT
                </span>
              </div>

              {/* Annotation Line: Left */}
              <div className="hidden md:flex absolute top-1/2 -left-16 -translate-y-1/2 items-center pointer-events-none">
                <span className="text-[9px] font-mono tracking-widest text-[#7B2638] bg-white px-2 py-0.5 rounded border border-[#7B2638]/20 shadow-xs mr-1">
                  COLLECTIBLE NO. #01
                </span>
                <div className="w-10 h-[1px] bg-[#7B2638]/40" />
              </div>
            </div>

            {/* In-Hand Scale Demonstration */}
            <div className="w-full mt-8 pt-6 border-t border-[#E8D3C2] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left z-10">
              <div>
                <span className="text-xs font-black uppercase text-[#111111]">
                  POCKET-SIZED BEAUTY COMPANION
                </span>
                <p className="text-[11px] text-[#111111]/70">
                  Fits effortlessly in coin pockets, evening clutches, or work bags.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#7B2638] font-bold">
                  SWATCH TESTED ON 200+ LIP TONES
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
