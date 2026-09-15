import React, { useState } from 'react';
import { MOODY_PRODUCTS } from '../data/moodyProducts';
import { ThreeBalmViewer } from './ThreeBalmViewer';
import { Sparkles, CheckCircle2, Sliders, Box, Layers } from 'lucide-react';

export const PackagingStory: React.FC = () => {
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const selectedProduct = MOODY_PRODUCTS[selectedProductIndex];

  return (
    <section className="w-full bg-[#FFFFFF] py-20 sm:py-28 border-b border-[#E8D3C2]/60 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF8F2] border border-[#7B2638]/20 text-[10px] font-bold uppercase tracking-[0.24em] text-[#7B2638] mb-3">
            <Sparkles className="w-3 h-3 text-[#7B2638]" />
            <span>3D INDUSTRIAL CRAFT & ANATOMY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111]">
            THE COLLECTIBLE COMPACT
          </h2>
          <p className="text-sm sm:text-base text-[#111111]/70 mt-2 font-serif italic">
            Precision-engineered 48mm pocket compact with real-time 3D orbit, interactive lid mechanics, and exploded layer anatomy.
          </p>
        </div>

        {/* Interactive 3D Anatomy Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Controls & Material Specs */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mood Compact Selector */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7B2638] font-bold flex items-center gap-1.5">
                <Box className="w-3 h-3 text-[#7B2638]" />
                <span>SELECT MOOD COMPACT IN 3D</span>
              </span>
              <div className="grid grid-cols-3 gap-2">
                {MOODY_PRODUCTS.slice(0, 6).map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProductIndex(idx)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedProductIndex === idx
                        ? 'border-[#7B2638] shadow-xs ring-1 ring-[#7B2638]'
                        : 'border-[#E8D3C2] hover:border-[#7B2638]/40'
                    }`}
                    style={{
                      backgroundColor: selectedProductIndex === idx ? '#FFF8F2' : '#FFFFFF',
                    }}
                  >
                    <span className="text-[9px] font-mono font-bold block text-[#7B2638]">
                      {prod.number}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#111111] truncate block">
                      {prod.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Design Spec Highlights */}
            <div className="p-5 rounded-2xl bg-[#FFF8F2] border border-[#E8D3C2] space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#7B2638] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>INDUSTRIAL ARCHITECTURE</span>
              </span>
              <ul className="space-y-2.5 text-xs text-[#111111]/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7B2638] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] font-bold block">48mm Seamless Aluminum Shell:</strong>
                    <span className="text-[11px] text-[#111111]/70">Ultra-lightweight brushed matte chassis with laser-debossed graphics.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7B2638] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] font-bold block">Optical Vanity Mirror:</strong>
                    <span className="text-[11px] text-[#111111]/70">High-clarity beveled glass mirror integrated directly into the upper lid.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7B2638] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] font-bold block">15g Hand-Poured Vegan Balm:</strong>
                    <span className="text-[11px] text-[#111111]/70">Shea butter, squalane & camellia oil core stamped with signature debossed heart.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7B2638] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] font-bold block">100% Recyclable Aluminum:</strong>
                    <span className="text-[11px] text-[#111111]/70">Zero virgin single-use plastics, infinitely recyclable circular packaging.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Full 3D Interactive Stage */}
          <div className="lg:col-span-8 relative flex flex-col items-center justify-center p-4 sm:p-8 bg-[#FFF8F2] rounded-3xl border border-[#E8D3C2] overflow-hidden shadow-sm">
            {/* Studio Engineering Background Grid */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#7B2638_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Real-time 3D Compact Model Viewer (React Three Fiber) */}
            <div className="w-full relative z-10">
              <ThreeBalmViewer
                product={selectedProduct}
                heightClass="h-[380px] sm:h-[460px]"
                showControls={true}
              />
            </div>

            {/* In-Hand Scale Demonstration Bar */}
            <div className="w-full mt-4 pt-4 border-t border-[#E8D3C2] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left z-10">
              <div>
                <span className="text-xs font-black uppercase text-[#111111]">
                  POCKET-SIZED BEAUTY COMPANION • 48MM × 14MM
                </span>
                <p className="text-[11px] text-[#111111]/70">
                  Fits effortlessly in coin pockets, micro handbags, evening clutches, or work desks.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#7B2638] font-bold bg-white px-2.5 py-1 rounded-full border border-[#7B2638]/20 shadow-2xs">
                  BATCH #MM-2026 • SWATCH TESTED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
