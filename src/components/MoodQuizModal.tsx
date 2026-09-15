import React, { useState } from 'react';
import { Product } from '../types';
import { MOODY_PRODUCTS } from '../data/moodyProducts';
import { BalmCompactVisual } from './BalmCompactVisual';
import { X, Sparkles, Heart, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MoodQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const MoodQuizModal: React.FC<MoodQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [step, setStep] = useState<1 | 2 | 'result'>(1);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  if (!isOpen) return null;

  const FEELINGS = [
    { id: 'romantic', label: 'Soft, romantic & dreaming', icon: '♡', target: 'mood-01' },
    { id: 'cozy', label: 'Cozy, grounded & calm', icon: '☕', target: 'mood-02' },
    { id: 'fresh', label: 'Bright, energized & sunny', icon: '☀️', target: 'mood-05' },
    { id: 'sweet', label: 'Sweet, playful & fruity', icon: '🍑', target: 'mood-04' },
    { id: 'bold', label: 'Mysterious, bold & magnetic', icon: '✨', target: 'mood-12' },
  ];

  const FINISHES = [
    { id: 'rose-glaze', label: 'Dewy soft petal glaze' },
    { id: 'cashmere', label: 'Cashmere comforting melt' },
    { id: 'glass-shine', label: 'Crystal-clear glass shine' },
    { id: 'berry-pop', label: 'Juicy pop of berry color' },
    { id: 'custom-shift', label: 'Unique pH color-changing berry' },
  ];

  const handleSelectFeeling = (feelingId: string) => {
    setSelectedFeeling(feelingId);
    setStep(2);
  };

  const handleSelectFinish = (finishId: string) => {
    setSelectedFinish(finishId);

    // Compute match logic
    let resultId = 'mood-01';
    if (finishId === 'custom-shift' || selectedFeeling === 'bold') {
      resultId = 'mood-12'; // Midnight Cat
    } else if (selectedFeeling === 'cozy' || finishId === 'cashmere') {
      resultId = 'mood-02'; // Teddy
    } else if (finishId === 'berry-pop') {
      resultId = 'mood-10'; // Cherry
    } else if (selectedFeeling === 'sweet') {
      resultId = 'mood-04'; // Peach
    } else if (selectedFeeling === 'fresh') {
      resultId = 'mood-05'; // Sun
    } else {
      resultId = 'mood-01'; // Heart
    }

    const found = MOODY_PRODUCTS.find((p) => p.id === resultId) || MOODY_PRODUCTS[0];
    setMatchedProduct(found);
    setStep('result');

    // Celebration burst
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#7B2638', '#F8DDE0', '#E8D3C2'],
      });
    } catch (_) {}
  };

  const handleReset = () => {
    setStep(1);
    setSelectedFeeling(null);
    setSelectedFinish(null);
    setMatchedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-lg bg-[#FFF8F2] rounded-3xl p-6 sm:p-8 border border-[#E8D3C2] shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-[#F8DDE0] text-[#111111] transition-colors cursor-pointer border border-[#E8D3C2]"
          aria-label="Close match quiz"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Brand Indicator */}
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-[#7B2638] font-bold mb-4">
          <Sparkles className="w-3 h-3 text-[#7B2638]" />
          <span>MOODY MATCHER ALGORITHM</span>
        </div>

        {/* Step 1: Feeling */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-mono text-[#7B2638] font-bold">STEP 01 OF 02</span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#111111] tracking-tight mt-1">
                HOW DOES YOUR HEART FEEL TODAY?
              </h3>
              <p className="text-xs sm:text-sm text-[#111111]/70 font-serif italic mt-1">
                Choose the mood that speaks to your current frequency.
              </p>
            </div>

            <div className="space-y-2.5">
              {FEELINGS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectFeeling(item.id)}
                  className="w-full text-left p-4 rounded-2xl bg-white border border-[#E8D3C2] hover:border-[#7B2638] transition-all flex items-center justify-between cursor-pointer group hover:bg-[#F8DDE0]/30"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111]">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7B2638] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Finish */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-mono text-[#7B2638] font-bold">STEP 02 OF 02</span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#111111] tracking-tight mt-1">
                WHAT FINISH DO YOU DESIRE?
              </h3>
              <p className="text-xs sm:text-sm text-[#111111]/70 font-serif italic mt-1">
                From ultra-sheer moisture glass to comforting cashmere hugs.
              </p>
            </div>

            <div className="space-y-2.5">
              {FINISHES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectFinish(item.id)}
                  className="w-full text-left p-4 rounded-2xl bg-white border border-[#E8D3C2] hover:border-[#7B2638] transition-all flex items-center justify-between cursor-pointer group hover:bg-[#F8DDE0]/30"
                >
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111]">
                    {item.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#7B2638] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#7B2638] font-bold uppercase tracking-wider hover:underline cursor-pointer"
            >
              ← BACK TO QUESTION 1
            </button>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 'result' && matchedProduct && (
          <div className="text-center space-y-6 py-2">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#7B2638] uppercase">
                YOUR PERFECT MOOD MATCH IS
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#111111] tracking-tight mt-1">
                {matchedProduct.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#7B2638] font-serif italic mt-1">
                "{matchedProduct.quote}"
              </p>
            </div>

            {/* Compact Packaging Visual Result */}
            <div className="py-2 flex items-center justify-center">
              <BalmCompactVisual product={matchedProduct} size="lg" view="top" />
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8D3C2] text-left space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#111111]">
                  FLAVOR: {matchedProduct.flavor}
                </span>
                <span className="text-xs font-black text-[#111111]">₹{matchedProduct.price}</span>
              </div>
              <p className="text-[11px] text-[#111111]/70">{matchedProduct.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onAddToCart(matchedProduct);
                  onClose();
                }}
                className="w-full py-3.5 bg-[#7B2638] hover:bg-[#111111] text-[#FFF8F2] text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors cursor-pointer shadow-xs"
              >
                ADD TO BAG — ₹{matchedProduct.price}
              </button>

              <button
                onClick={() => {
                  onSelectProduct(matchedProduct);
                  onClose();
                }}
                className="w-full py-3.5 bg-white border border-[#7B2638]/40 hover:bg-[#F8DDE0] text-[#7B2638] text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-colors cursor-pointer"
              >
                VIEW FULL DETAILS
              </button>
            </div>

            <button
              onClick={handleReset}
              className="text-[11px] font-mono text-[#111111]/60 hover:text-[#7B2638] flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RETAKE MOOD QUIZ</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
