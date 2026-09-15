import React from 'react';
import { BrandLogo } from './BrandLogo';
import { MainCategory } from '../types';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: MainCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#000000] text-white pt-16 pb-28 md:pb-16 border-t border-[#171717] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Branding & Back-To-Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-12 border-b border-[#262626] gap-6">
          <BrandLogo variant="light" size="lg" />
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#A3A3A3] hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-[0.2em] text-white text-xs">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-[#A3A3A3] uppercase tracking-wider text-[11px]">
              <li>
                <button onClick={() => onSelectCategory('WOMEN')} className="hover:text-white transition-colors cursor-pointer">
                  WOMEN
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('MEN')} className="hover:text-white transition-colors cursor-pointer">
                  MEN
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('KIDS')} className="hover:text-white transition-colors cursor-pointer">
                  KIDS
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('DENIM')} className="hover:text-white transition-colors cursor-pointer">
                  DENIM ARCHIVE
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('NEW ARRIVALS')} className="hover:text-white transition-colors cursor-pointer">
                  NEW ARRIVALS
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('SALE')} className="hover:text-[#E30613] text-[#E30613] transition-colors cursor-pointer font-bold">
                  SALE UP TO 50%
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate Info */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-[0.2em] text-white text-xs">
              CORPORATE INFO
            </h4>
            <ul className="space-y-2.5 text-[#A3A3A3] uppercase tracking-wider text-[11px]">
              <li className="hover:text-white cursor-pointer transition-colors">CAREER AT MOODY</li>
              <li className="hover:text-white cursor-pointer transition-colors">ABOUT MOODY GROUP</li>
              <li className="hover:text-white cursor-pointer transition-colors">SUSTAINABILITY REPORT</li>
              <li className="hover:text-white cursor-pointer transition-colors">PRESS ROOM</li>
              <li className="hover:text-white cursor-pointer transition-colors">INVESTOR RELATIONS</li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-[0.2em] text-white text-xs">
              HELP & SUPPORT
            </h4>
            <ul className="space-y-2.5 text-[#A3A3A3] uppercase tracking-wider text-[11px]">
              <li className="hover:text-white cursor-pointer transition-colors">CUSTOMER SERVICE</li>
              <li className="hover:text-white cursor-pointer transition-colors">MY ACCOUNT</li>
              <li className="hover:text-white cursor-pointer transition-colors">STORE LOCATOR</li>
              <li className="hover:text-white cursor-pointer transition-colors">LEGAL & PRIVACY</li>
              <li className="hover:text-white cursor-pointer transition-colors">CONTACT US</li>
              <li className="hover:text-white cursor-pointer transition-colors">COOKIE SETTINGS</li>
            </ul>
          </div>

          {/* Member Club */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-[0.2em] text-white text-xs">
              MOODY MEMBER
            </h4>
            <p className="text-[11px] text-[#A3A3A3] leading-relaxed">
              Join now and receive 10% off your second purchase, free returns, and digital receipts on all store orders.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E30613]">
                READ MORE →
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Country + Legal */}
        <div className="pt-8 border-t border-[#262626] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-[#737373] uppercase">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold">INDIA (INR ₹)</span>
            <span>•</span>
            <span>ENGLISH</span>
          </div>

          <div className="text-center md:text-right">
            <span>The content of this site is copyright-protected and belongs to MOODY MATCH.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
