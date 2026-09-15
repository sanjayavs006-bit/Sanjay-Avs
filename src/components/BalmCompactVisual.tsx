import React from 'react';
import { Product, IconSymbol } from '../types';

interface BalmCompactVisualProps {
  product: Product;
  view?: 'top' | 'open' | 'side';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showShadow?: boolean;
}

// Renders the specific cute mood icon illustration
export const MoodIconIllustration: React.FC<{ symbol: IconSymbol; color?: string; size?: number }> = ({
  symbol,
  color = '#7B2638',
  size = 40,
}) => {
  switch (symbol) {
    case 'heart':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24 40C24 40 6 29.5 6 17.5C6 11.5 10.5 7 16.5 7C20.2 7 23.4 9 24 10.5C24.6 9 27.8 7 31.5 7C37.5 7 42 11.5 42 17.5C42 29.5 24 40 24 40Z"
            fill={color}
          />
          {/* Cute face on heart */}
          <circle cx="18" cy="18" r="1.5" fill="#FFF8F2" />
          <circle cx="30" cy="18" r="1.5" fill="#FFF8F2" />
          <path d="M22 23C22.5 24 25.5 24 26 23" stroke="#FFF8F2" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="15" cy="20" rx="1.5" ry="0.8" fill="#F4C7CE" opacity="0.8" />
          <ellipse cx="33" cy="20" rx="1.5" ry="0.8" fill="#F4C7CE" opacity="0.8" />
        </svg>
      );
    case 'teddy':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ears */}
          <circle cx="14" cy="14" r="6" fill={color} />
          <circle cx="34" cy="14" r="6" fill={color} />
          <circle cx="14" cy="14" r="3" fill="#FFF8F2" opacity="0.4" />
          <circle cx="34" cy="14" r="3" fill="#FFF8F2" opacity="0.4" />
          {/* Head */}
          <ellipse cx="24" cy="26" rx="15" ry="13" fill={color} />
          {/* Snout */}
          <ellipse cx="24" cy="29" rx="6.5" ry="5" fill="#FFF8F2" />
          <polygon points="24,27 21,29 27,29" fill={color} />
          <path d="M24 29V32" stroke={color} strokeWidth="1.2" />
          {/* Eyes */}
          <circle cx="18" cy="23" r="1.6" fill="#FFF8F2" />
          <circle cx="30" cy="23" r="1.6" fill="#FFF8F2" />
          {/* Cute blush */}
          <ellipse cx="14" cy="28" rx="2" ry="1" fill="#F4C7CE" opacity="0.9" />
          <ellipse cx="34" cy="28" rx="2" ry="1" fill="#F4C7CE" opacity="0.9" />
        </svg>
      );
    case 'cloud':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14 34H35C39.4 34 43 30.4 43 26C43 21.8 39.8 18.4 35.6 18.1C34.4 12.3 29.2 8 23 8C16 8 10.4 13.4 10.1 20.3C5.5 21.1 2 25.1 2 30C2 35.5 6.5 34 14 34Z"
            fill={color}
          />
          {/* Sleeping cute eyes */}
          <path d="M17 23C18 24.5 20 24.5 21 23" stroke="#FFF8F2" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M27 23C28 24.5 30 24.5 31 23" stroke="#FFF8F2" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="15" cy="26" rx="2" ry="1" fill="#F4C7CE" opacity="0.9" />
          <ellipse cx="33" cy="26" rx="2" ry="1" fill="#F4C7CE" opacity="0.9" />
        </svg>
      );
    case 'peach':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem & Leaf */}
          <path d="M24 10C24 6 27 4 30 4C30 7 28 10 24 10Z" fill="#7A9A7B" />
          <path d="M24 10V6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          {/* Peach Body */}
          <path
            d="M24 12C16 12 8 18 8 27C8 36 17 42 24 43C31 42 40 36 40 27C40 18 32 12 24 12Z"
            fill={color}
          />
          <path d="M24 13C24 23 21 34 24 42" stroke="#FFF8F2" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
          {/* Face */}
          <circle cx="17" cy="27" r="1.5" fill="#FFF8F2" />
          <circle cx="31" cy="27" r="1.5" fill="#FFF8F2" />
          <path d="M22 31C23 32 25 32 26 31" stroke="#FFF8F2" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'sun':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rays */}
          <circle cx="24" cy="24" r="14" fill={color} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <rect
              key={i}
              x="22.5"
              y="4"
              width="3"
              height="4"
              rx="1.5"
              fill={color}
              transform={`rotate(${angle} 24 24)`}
            />
          ))}
          {/* Face */}
          <circle cx="19" cy="22" r="1.5" fill="#FFF8F2" />
          <circle cx="29" cy="22" r="1.5" fill="#FFF8F2" />
          <path d="M21 27C22.5 29 25.5 29 27 27" stroke="#FFF8F2" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="16" cy="25" rx="1.5" ry="1" fill="#F4C7CE" opacity="0.9" />
          <ellipse cx="32" cy="25" rx="1.5" ry="1" fill="#F4C7CE" opacity="0.9" />
        </svg>
      );
    case 'green-heart':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24 40C24 40 6 29.5 6 17.5C6 11.5 10.5 7 16.5 7C20.2 7 23.4 9 24 10.5C24.6 9 27.8 7 31.5 7C37.5 7 42 11.5 42 17.5C42 29.5 24 40 24 40Z"
            fill={color}
          />
          {/* Sprout leaf on top */}
          <path d="M24 8C22 4 25 2 28 3C27 5 26 7 24 8Z" fill="#FFF8F2" opacity="0.9" />
          <circle cx="18" cy="19" r="1.5" fill="#FFF8F2" />
          <circle cx="30" cy="19" r="1.5" fill="#FFF8F2" />
          <path d="M21 24C22.5 25.5 25.5 25.5 27 24" stroke="#FFF8F2" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'moon':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 7C21.8 7 23.5 7.4 25.1 8.1C18.6 11.4 14.1 18.2 14.1 26C14.1 33.8 18.6 40.6 25.1 43.9C23.5 44.6 21.8 45 20 45C9.5 45 1 36.5 1 26C1 15.5 9.5 7 20 7Z"
            fill={color}
            transform="translate(10, -2)"
          />
          {/* Sleeping face */}
          <path d="M24 23C25 24 26.5 24 27.5 23" stroke="#FFF8F2" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="34" cy="18" r="1.2" fill={color} />
          <circle cx="38" cy="24" r="1" fill={color} />
        </svg>
      );
    case 'daisy':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="24"
              cy="11"
              rx="4"
              ry="7"
              fill={color}
              transform={`rotate(${angle} 24 24)`}
            />
          ))}
          {/* Center */}
          <circle cx="24" cy="24" r="7" fill="#FFF8F2" />
          <circle cx="22" cy="23" r="1" fill={color} />
          <circle cx="26" cy="23" r="1" fill={color} />
          <path d="M23 26C23.5 26.8 24.5 26.8 25 26" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'coffee':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cup */}
          <path d="M10 16H34V28C34 34.6 28.6 40 22 40C15.4 40 10 34.6 10 28V16Z" fill={color} />
          {/* Handle */}
          <path d="M34 20H37C39.2 20 41 21.8 41 24C41 26.2 39.2 28 37 28H34" stroke={color} strokeWidth="3" strokeLinecap="round" />
          {/* Steam / cute face */}
          <circle cx="18" cy="27" r="1.5" fill="#FFF8F2" />
          <circle cx="26" cy="27" r="1.5" fill="#FFF8F2" />
          <path d="M20 31C21 32 23 32 24 31" stroke="#FFF8F2" strokeWidth="1.4" strokeLinecap="round" />
          {/* Steam heart */}
          <path d="M22 11C22 9.5 20.5 8 19 8C17.5 8 16 9.5 16 11C16 13 22 15 22 15C22 15 28 13 28 11C28 9.5 26.5 8 25 8C23.5 8 22 9.5 22 11Z" fill={color} opacity="0.6" />
        </svg>
      );
    case 'cherry':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stems */}
          <path d="M16 28C16 16 23 9 27 7C30 9 32 16 32 28" stroke="#7A9A7B" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M27 7L33 5" stroke="#7A9A7B" strokeWidth="2" strokeLinecap="round" />
          {/* Cherries */}
          <circle cx="16" cy="30" r="9" fill={color} />
          <circle cx="32" cy="30" r="9" fill={color} />
          {/* Reflections */}
          <circle cx="13" cy="27" r="2" fill="#FFF8F2" opacity="0.7" />
          <circle cx="29" cy="27" r="2" fill="#FFF8F2" opacity="0.7" />
        </svg>
      );
    case 'chocolate':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="10" width="32" height="28" rx="4" fill={color} />
          <rect x="11" y="13" width="12" height="10" rx="1.5" fill="#FFF8F2" opacity="0.2" />
          <rect x="25" y="13" width="12" height="10" rx="1.5" fill="#FFF8F2" opacity="0.2" />
          <rect x="11" y="25" width="12" height="10" rx="1.5" fill="#FFF8F2" opacity="0.2" />
          <rect x="25" y="25" width="12" height="10" rx="1.5" fill="#FFF8F2" opacity="0.2" />
          {/* Tiny heart stamp in middle */}
          <path d="M24 24C24 24 21 21.5 21 19.5C21 18 22.5 17 24 18.5C25.5 17 27 18 27 19.5C27 21.5 24 24 24 24Z" fill="#FFF8F2" />
        </svg>
      );
    case 'cat':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ears */}
          <polygon points="12,22 15,8 24,18" fill={color} />
          <polygon points="36,22 33,8 24,18" fill={color} />
          <polygon points="14,19 16,11 22,18" fill="#F4C7CE" opacity="0.5" />
          <polygon points="34,19 32,11 26,18" fill="#F4C7CE" opacity="0.5" />
          {/* Head */}
          <ellipse cx="24" cy="27" rx="14" ry="12" fill={color} />
          {/* Eyes - sleek cat eyes */}
          <ellipse cx="19" cy="25" rx="2" ry="1" fill="#FFF8F2" transform="rotate(-15 19 25)" />
          <ellipse cx="29" cy="25" rx="2" ry="1" fill="#FFF8F2" transform="rotate(15 29 25)" />
          {/* Nose */}
          <polygon points="24,28 22.5,29.5 25.5,29.5" fill="#F4C7CE" />
          {/* Whiskers */}
          <line x1="12" y1="28" x2="6" y2="27" stroke="#FFF8F2" strokeWidth="1" strokeLinecap="round" />
          <line x1="12" y1="30" x2="6" y2="31" stroke="#FFF8F2" strokeWidth="1" strokeLinecap="round" />
          <line x1="36" y1="28" x2="42" y2="27" stroke="#FFF8F2" strokeWidth="1" strokeLinecap="round" />
          <line x1="36" y1="30" x2="42" y2="31" stroke="#FFF8F2" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

export const BalmCompactVisual: React.FC<BalmCompactVisualProps> = ({
  product,
  view = 'top',
  size = 'md',
  className = '',
  showShadow = true,
}) => {
  const sizeStyles = {
    sm: 'w-28 h-28',
    md: 'w-44 h-44 sm:w-48 sm:h-48',
    lg: 'w-64 h-64 sm:w-72 sm:h-72',
    xl: 'w-80 h-80 sm:w-96 sm:h-96',
  };

  const iconSizes = {
    sm: 28,
    md: 46,
    lg: 72,
    xl: 96,
  };

  if (view === 'open') {
    return (
      <div
        className={`relative aspect-square flex items-center justify-center select-none ${sizeStyles[size]} ${className}`}
      >
        {/* Soft studio shadow */}
        {showShadow && (
          <div
            className="absolute -bottom-4 w-4/5 h-8 rounded-full blur-xl opacity-40 transition-all duration-300 pointer-events-none"
            style={{ backgroundColor: product.tinAccentColor }}
          />
        )}

        {/* Outer Round Compact Tin Base */}
        <div
          className="relative w-full h-full rounded-full p-2.5 sm:p-3 flex items-center justify-center shadow-compact transition-transform duration-300"
          style={{
            backgroundColor: product.tinColor,
            border: `2px solid rgba(123, 38, 56, 0.15)`,
          }}
        >
          {/* Brushed metallic inner rim */}
          <div
            className="w-full h-full rounded-full p-2.5 sm:p-3.5 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #F3ECE6 0%, #D8CEC5 50%, #EFE7E0 100%)',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.12), 0 2px 4px rgba(255,255,255,0.6)',
            }}
          >
            {/* The Balm Itself - Freshly poured, smooth glossy core */}
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden"
              style={{
                backgroundColor: product.balmColor,
                boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.18), inset 0 -2px 6px rgba(255,255,255,0.4)',
              }}
            >
              {/* Balm glossy sheen reflection */}
              <div
                className="absolute top-1 left-2 w-3/4 h-1/2 rounded-full opacity-45 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)',
                  transform: 'rotate(-25deg)',
                }}
              />
              {/* Embossed mini heart in center of balm */}
              <div className="opacity-30 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-serif">♡</span>
              </div>
            </div>
          </div>

          {/* Lid resting off to the side at angle */}
          <div
            className="absolute -top-3 -right-3 w-1/3 h-1/3 rounded-full border border-white/60 shadow-md flex items-center justify-center"
            style={{
              backgroundColor: product.tinColor,
              transform: 'rotate(18deg)',
            }}
          >
            <span
              className="text-[9px] font-black uppercase tracking-widest"
              style={{ color: product.tinAccentColor }}
            >
              {product.number}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'side') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizeStyles[size]} ${className}`}>
        {showShadow && (
          <div
            className="absolute -bottom-2 w-5/6 h-5 rounded-full blur-lg opacity-35 pointer-events-none"
            style={{ backgroundColor: product.tinAccentColor }}
          />
        )}
        <div className="relative w-5/6 h-28 sm:h-32 flex flex-col items-center justify-center">
          {/* Top Lid */}
          <div
            className="w-full h-14 rounded-t-3xl border-b border-black/10 flex items-center justify-between px-4 shadow-sm"
            style={{
              backgroundColor: product.tinColor,
              borderTop: `2px solid rgba(123, 38, 56, 0.12)`,
            }}
          >
            <span className="text-[10px] font-mono tracking-widest text-[#7B2638] font-bold">
              MOODY MATCH
            </span>
            <span className="text-[10px] font-black text-[#7B2638]">{product.number}</span>
          </div>
          {/* Metallic middle bevel / clasp */}
          <div className="w-[101%] h-2.5 bg-gradient-to-r from-[#D8CEC5] via-[#FFF8F2] to-[#D8CEC5] shadow-xs" />
          {/* Base of Tin */}
          <div
            className="w-full h-12 rounded-b-3xl flex items-center justify-center shadow-md"
            style={{
              backgroundColor: product.tinColor,
              borderBottom: `2px solid rgba(123, 38, 56, 0.2)`,
            }}
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#7B2638]/70 font-semibold">
              100% VEGAN • 15G
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default: TOP VIEW (Authentic round collectible compact tin lid with artwork)
  return (
    <div
      className={`relative aspect-square flex items-center justify-center select-none group ${sizeStyles[size]} ${className}`}
    >
      {/* Dynamic ambient soft shadow matching balm palette */}
      {showShadow && (
        <div
          className="absolute -bottom-3 w-4/5 h-8 rounded-full blur-xl opacity-35 transition-all duration-500 group-hover:opacity-50 group-hover:scale-105 pointer-events-none"
          style={{ backgroundColor: product.tinAccentColor }}
        />
      )}

      {/* The Matte Compact Container */}
      <div
        className="relative w-full h-full rounded-full p-3 sm:p-4 flex flex-col items-center justify-between transition-transform duration-500 group-hover:scale-103 shadow-compact group-hover:shadow-compact-hover cursor-pointer"
        style={{
          backgroundColor: product.tinColor,
          border: `1.5px solid rgba(123, 38, 56, 0.16)`,
        }}
      >
        {/* Fine embossed inner circular hairline rim */}
        <div
          className="absolute inset-1.5 sm:inset-2 rounded-full pointer-events-none"
          style={{
            border: `1px dashed rgba(123, 38, 56, 0.22)`,
          }}
        />

        {/* Matte subtle lighting highlight curve */}
        <div
          className="absolute top-1 left-3 w-3/4 h-1/3 rounded-full opacity-30 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
            transform: 'rotate(-20deg)',
          }}
        />

        {/* Top Header: Brand Name + Cute Heart */}
        <div className="z-10 pt-2 flex flex-col items-center">
          <div className="flex items-center gap-1">
            <span
              className="text-[9px] sm:text-[11px] font-black tracking-[0.28em] uppercase"
              style={{ color: product.tinAccentColor }}
            >
              MOODY MATCH
            </span>
            <span className="text-[10px] sm:text-xs" style={{ color: product.tinAccentColor }}>
              ♡
            </span>
          </div>
          <span
            className="text-[7px] sm:text-[8px] font-mono tracking-widest uppercase opacity-70"
            style={{ color: product.tinAccentColor }}
          >
            LIP BALM COMPACT
          </span>
        </div>

        {/* Center: Cute Mood Icon & Badge Number */}
        <div className="z-10 flex flex-col items-center justify-center my-auto transition-transform duration-300 group-hover:scale-110">
          <MoodIconIllustration
            symbol={product.iconSymbol}
            color={product.tinAccentColor}
            size={iconSizes[size]}
          />
        </div>

        {/* Bottom: Mood Name & Number */}
        <div className="z-10 pb-2 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-1.5">
            <span
              className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full"
              style={{
                backgroundColor: 'rgba(123, 38, 56, 0.08)',
                color: product.tinAccentColor,
              }}
            >
              {product.number}
            </span>
            <span
              className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]"
              style={{ color: product.tinAccentColor }}
            >
              {product.name}
            </span>
          </div>
          <span
            className="text-[8px] sm:text-[9px] font-medium italic tracking-wider opacity-80 pt-0.5"
            style={{ color: product.tinAccentColor }}
          >
            {product.personality}
          </span>
        </div>
      </div>
    </div>
  );
};
