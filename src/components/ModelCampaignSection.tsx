import React from 'react';
import { Product } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ModelCampaignSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const ModelCampaignSection: React.FC<ModelCampaignSectionProps> = ({
  products,
  onSelectProduct,
}) => {
  // Select key campaign stories representing diverse moods and beauty editorial styles
  const campaignStories = [
    {
      product: products[0], // #01 HEART - Romantic
      headline: 'ROMANTIC ROSY GLOW',
      tagline: 'Hydrated sheer strawberry petal finish.',
      ratio: 'aspect-[3/4]',
    },
    {
      product: products[1], // #02 TEDDY - Cozy
      headline: 'WARM CASHMERE COMFORT',
      tagline: 'Bourbon vanilla honey nourishment.',
      ratio: 'aspect-[3/4]',
    },
    {
      product: products[9], // #10 CHERRY - Fun
      headline: 'JUICY GLAZED CHERRY',
      tagline: 'Vibrant berry statement glaze.',
      ratio: 'aspect-[3/4]',
    },
    {
      product: products[11], // #12 MIDNIGHT CAT - Mysterious
      headline: 'THE pH COLOR SHIFT',
      tagline: 'Adapts to your lip warmth into berry plum.',
      ratio: 'aspect-[3/4]',
    },
  ];

  return (
    <section className="w-full bg-[#FFF8F2] py-20 sm:py-28 border-b border-[#E8D3C2]/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7B2638] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#7B2638]" />
              <span>THE 2026 BEAUTY EDITORIAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111] font-sans">
              ONE CAMPAIGN. 12 FACES.
            </h2>
            <p className="text-sm sm:text-base text-[#111111]/70 font-serif italic mt-1">
              Hydrated glossy lips, glowing bare skin, and emotions captured in real time.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#7B2638] uppercase">
            <span>40% BEAUTY EDITORIAL</span>
            <span>•</span>
            <span>40% COMPACT CRAFT</span>
            <span>•</span>
            <span>20% MACRO TEXTURE</span>
          </div>
        </div>

        {/* Editorial Campaign Gallery (Editorial 4-column bento-like photo spread) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaignStories.map(({ product, headline, tagline, ratio }) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-[#E8D3C2] hover:border-[#7B2638]/50 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-compact"
            >
              {/* Campaign Model Image */}
              <div className={`relative w-full ${ratio} overflow-hidden bg-[#F8DDE0]`}>
                <img
                  src={product.modelImage}
                  alt={`${product.name} Campaign`}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-106"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-70 group-hover:opacity-60 transition-opacity" />

                {/* Top Badge: Mood Number */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono font-bold bg-white/90 backdrop-blur-xs text-[#7B2638] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {product.number} {product.name}
                  </span>
                </div>

                {/* Bottom Model Inset Tag */}
                <div className="absolute bottom-3 inset-x-3 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-80 block">
                    {product.personality}
                  </span>
                  <h3 className="text-sm font-black uppercase tracking-tight leading-tight">
                    {headline}
                  </h3>
                </div>
              </div>

              {/* Campaign Macro & Product Details Strip */}
              <div className="p-4 space-y-3 bg-white">
                <div className="flex items-center gap-3">
                  {/* Macro Lip Close-up */}
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#E8D3C2]">
                    <img
                      src={product.lipMacroImage}
                      alt={`${product.name} Lip Finish`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#7B2638] uppercase tracking-wider block truncate">
                      {product.finish}
                    </span>
                    <p className="text-[11px] text-[#111111]/70 truncate">{tagline}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#FFF8F2] flex items-center justify-between">
                  <span className="text-xs font-black text-[#111111]">₹{product.price}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B2638] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    DISCOVER ♡
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Statement Footer Quote */}
        <div className="mt-14 p-8 rounded-2xl bg-[#FFFFFF] border border-[#E8D3C2] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-black uppercase text-[#111111] tracking-tight">
              NEVER DRY. NEVER STICKY. ALWAYS YOU.
            </h4>
            <p className="text-xs sm:text-sm text-[#111111]/75 max-w-xl">
              Formulated without petroleum, mineral oil, or synthetic microplastics. Every tin contains 15g of skin-barrier loving botanicals, cold-pressed fruit seed oils, and vegan peptides.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#7B2638] font-bold">
            <span>DERMATOLOGIST TESTED</span>
            <span>•</span>
            <span>CRUELTY FREE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
