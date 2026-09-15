import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const EditorialStatement: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <section className="w-full bg-[#000000] text-white py-16 sm:py-24 px-4 sm:px-8 select-none">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#E30613]">
          JOIN THE CLUB
        </span>

        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans leading-tight">
          SUBSCRIBE & ENJOY 10% OFF
          <br />
          YOUR FIRST ORDER
        </h2>

        <p className="text-xs sm:text-sm text-[#A3A3A3] max-w-lg mx-auto tracking-wide leading-relaxed">
          Be first to receive seasonal campaign lookbooks, private pre-sale invitations, and exclusive editorial drops.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-4">
          <input
            type="email"
            required
            placeholder="ENTER YOUR EMAIL ADDRESS"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/10 text-white placeholder:text-[#A3A3A3] px-4 py-3.5 text-xs font-bold uppercase tracking-wider outline-none border border-white/20 focus:border-white transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#E30613] text-[#000000] hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-98"
          >
            {subscribed ? (
              <>
                <Check className="w-4 h-4" />
                <span>WELCOME</span>
              </>
            ) : (
              <>
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono tracking-widest text-[#737373] uppercase">
          <span>RESPONSIBLE PRODUCTION</span>
          <span>•</span>
          <span>100% ORGANIC CERTIFIED COTTON</span>
          <span>•</span>
          <span>CIRCULAR FASHION INITIATIVE</span>
        </div>
      </div>
    </section>
  );
};
