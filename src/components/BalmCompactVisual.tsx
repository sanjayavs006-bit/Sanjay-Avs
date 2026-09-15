import React, { useState, useRef } from 'react';
import { Product, IconSymbol } from '../types';

export interface BalmCompactVisualProps {
  product: Product;
  view?: 'top' | 'open' | 'side' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showShadow?: boolean;
  enable3DTilt?: boolean;
  interactiveHinge?: boolean;
}

// Renders the specific cute mood icon illustration with high-precision vectors & cute expressions
export const MoodIconIllustration: React.FC<{ symbol: IconSymbol; color?: string; size?: number }> = ({
  symbol,
  color = '#7B2638',
  size = 40,
}) => {
  switch (symbol) {
    case 'heart':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          <path
            d="M24 41C24 41 6 30 6 17.5C6 11.2 10.5 6.5 16.5 6.5C20.4 6.5 23.4 8.5 24 10.2C24.6 8.5 27.6 6.5 31.5 6.5C37.5 6.5 42 11.2 42 17.5C42 30 24 41 24 41Z"
            fill={color}
          />
          {/* Bevel highlight */}
          <path
            d="M16.5 8.5C11.8 8.5 8 12.3 8 17.5C8 23 14 30.5 24 38C34 30.5 40 23 40 17.5C40 12.3 36.2 8.5 31.5 8.5C28.2 8.5 25.4 10.3 24.5 12.5H23.5C22.6 10.3 19.8 8.5 16.5 8.5Z"
            stroke="white"
            strokeWidth="0.8"
            opacity="0.25"
          />
          {/* Cute Face with twinkling eyes */}
          <circle cx="18" cy="18" r="1.8" fill="#FFF8F2" />
          <circle cx="17.4" cy="17.4" r="0.7" fill="#111111" />
          <circle cx="30" cy="18" r="1.8" fill="#FFF8F2" />
          <circle cx="29.4" cy="17.4" r="0.7" fill="#111111" />
          {/* Rosy blush cheeks */}
          <ellipse cx="14" cy="20.5" rx="2" ry="1.2" fill="#F48B9B" opacity="0.9" />
          <ellipse cx="34" cy="20.5" rx="2" ry="1.2" fill="#F48B9B" opacity="0.9" />
          {/* Sweet smile */}
          <path d="M21.5 23C22.5 24.5 25.5 24.5 26.5 23" stroke="#FFF8F2" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'teddy':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          {/* Bear Ears */}
          <circle cx="13" cy="14" r="6.5" fill={color} />
          <circle cx="35" cy="14" r="6.5" fill={color} />
          <circle cx="13" cy="14" r="3.2" fill="#FFF8F2" opacity="0.6" />
          <circle cx="35" cy="14" r="3.2" fill="#FFF8F2" opacity="0.6" />
          {/* Head */}
          <ellipse cx="24" cy="26" rx="15.5" ry="13.5" fill={color} />
          {/* Snout */}
          <ellipse cx="24" cy="29" rx="6.5" ry="5.2" fill="#FFF8F2" />
          <polygon points="24,26.8 21.2,29 26.8,29" fill={color} />
          <path d="M24 29V32" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M22 32C22.8 32.8 25.2 32.8 26 32" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="17.5" cy="22.5" r="1.8" fill="#FFF8F2" />
          <circle cx="17" cy="22" r="0.7" fill="#111111" />
          <circle cx="30.5" cy="22.5" r="1.8" fill="#FFF8F2" />
          <circle cx="30" cy="22" r="0.7" fill="#111111" />
          {/* Blush */}
          <ellipse cx="13" cy="27" rx="2.4" ry="1.2" fill="#F48B9B" opacity="0.85" />
          <ellipse cx="35" cy="27" rx="2.4" ry="1.2" fill="#F48B9B" opacity="0.85" />
        </svg>
      );
    case 'cloud':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          <path
            d="M14 34H35C39.4 34 43 30.4 43 26C43 21.8 39.8 18.4 35.6 18.1C34.4 12.3 29.2 8 23 8C16 8 10.4 13.4 10.1 20.3C5.5 21.1 2 25.1 2 30C2 35.5 6.5 34 14 34Z"
            fill={color}
          />
          {/* Sleeping cute eyes */}
          <path d="M16 23C17.5 25 20.5 25 22 23" stroke="#FFF8F2" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M26 23C27.5 25 30.5 25 32 23" stroke="#FFF8F2" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="14" cy="26" rx="2.2" ry="1.2" fill="#F48B9B" opacity="0.85" />
          <ellipse cx="34" cy="26" rx="2.2" ry="1.2" fill="#F48B9B" opacity="0.85" />
          {/* Star twinkle */}
          <path d="M38 12L39 14L41 15L39 16L38 18L37 16L35 15L37 14L38 12Z" fill="#FFF8F2" opacity="0.8" />
        </svg>
      );
    case 'peach':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          {/* Leaf */}
          <path d="M24 9C24 5 28 3 32 3C32 7 29 9 24 9Z" fill="#6E9473" />
          <path d="M24 9V5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          {/* Peach Body */}
          <path
            d="M24 11C15.5 11 7 17.5 7 27C7 36.5 16.5 43 24 44C31.5 43 41 36.5 41 27C41 17.5 32.5 11 24 11Z"
            fill={color}
          />
          <path d="M24 12C24 23 21 34 24 43" stroke="#FFF8F2" strokeWidth="1.4" opacity="0.45" strokeLinecap="round" />
          {/* Face */}
          <circle cx="17" cy="27" r="1.8" fill="#FFF8F2" />
          <circle cx="31" cy="27" r="1.8" fill="#FFF8F2" />
          <path d="M21.5 31.5C22.5 32.5 25.5 32.5 26.5 31.5" stroke="#FFF8F2" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="14" cy="29" rx="2" ry="1.2" fill="#F48B9B" opacity="0.8" />
          <ellipse cx="34" cy="29" rx="2" ry="1.2" fill="#F48B9B" opacity="0.8" />
        </svg>
      );
    case 'sun':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          {/* Center */}
          <circle cx="24" cy="24" r="14" fill={color} />
          {/* Sun Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <rect
              key={i}
              x="22.5"
              y="3"
              width="3"
              height="5"
              rx="1.5"
              fill={color}
              transform={`rotate(${angle} 24 24)`}
            />
          ))}
          {/* Happy Face */}
          <circle cx="19" cy="22" r="1.8" fill="#FFF8F2" />
          <circle cx="29" cy="22" r="1.8" fill="#FFF8F2" />
          <path d="M20.5 26.5C22 28.5 26 28.5 27.5 26.5" stroke="#FFF8F2" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="15.5" cy="24.5" rx="1.8" ry="1.1" fill="#F48B9B" opacity="0.85" />
          <ellipse cx="32.5" cy="24.5" rx="1.8" ry="1.1" fill="#F48B9B" opacity="0.85" />
        </svg>
      );
    case 'green-heart':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          <path
            d="M24 41C24 41 6 30 6 17.5C6 11.2 10.5 6.5 16.5 6.5C20.4 6.5 23.4 8.5 24 10.2C24.6 8.5 27.6 6.5 31.5 6.5C37.5 6.5 42 11.2 42 17.5C42 30 24 41 24 41Z"
            fill={color}
          />
          {/* Botanical Sprout on top */}
          <path d="M24 7C21 3 25 1 28 2C27 4.5 26 6.5 24 7Z" fill="#FFF8F2" opacity="0.95" />
          <circle cx="18" cy="19" r="1.8" fill="#FFF8F2" />
          <circle cx="30" cy="19" r="1.8" fill="#FFF8F2" />
          <path d="M21 24.5C22.5 26 25.5 26 27 24.5" stroke="#FFF8F2" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="14" cy="21" rx="1.8" ry="1" fill="#F48B9B" opacity="0.75" />
          <ellipse cx="34" cy="21" rx="1.8" ry="1" fill="#F48B9B" opacity="0.75" />
        </svg>
      );
    case 'moon':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          <path
            d="M18 7C19.8 7 21.5 7.4 23.1 8.1C16.6 11.4 12.1 18.2 12.1 26C12.1 33.8 16.6 40.6 23.1 43.9C21.5 44.6 19.8 45 18 45C8.5 45 1 36.5 1 26C1 15.5 8.5 7 18 7Z"
            fill={color}
            transform="translate(11, -2)"
          />
          {/* Sleeping Moon Face */}
          <path d="M23 23C24 24.5 26 24.5 27 23" stroke="#FFF8F2" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="22" cy="25" rx="1.6" ry="1" fill="#F48B9B" opacity="0.8" />
          {/* Sparkles around */}
          <circle cx="34" cy="17" r="1.5" fill={color} />
          <circle cx="38" cy="24" r="1.2" fill={color} />
          <circle cx="33" cy="33" r="1.4" fill={color} />
        </svg>
      );
    case 'daisy':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="24"
              cy="10.5"
              rx="4.2"
              ry="7.5"
              fill={color}
              transform={`rotate(${angle} 24 24)`}
            />
          ))}
          <circle cx="24" cy="24" r="7.5" fill="#FFF8F2" />
          <circle cx="21.5" cy="23" r="1.2" fill={color} />
          <circle cx="26.5" cy="23" r="1.2" fill={color} />
          <path d="M22.5 26C23.2 26.8 24.8 26.8 25.5 26" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case 'coffee':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          <path d="M10 16H34V28C34 34.6 28.6 40 22 40C15.4 40 10 34.6 10 28V16Z" fill={color} />
          <path d="M34 20H37C39.2 20 41 21.8 41 24C41 26.2 39.2 28 37 28H34" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <circle cx="18" cy="27" r="1.6" fill="#FFF8F2" />
          <circle cx="26" cy="27" r="1.6" fill="#FFF8F2" />
          <path d="M20 31C21.2 32.2 22.8 32.2 24 31" stroke="#FFF8F2" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="15" cy="28.5" rx="1.6" ry="1" fill="#F48B9B" opacity="0.8" />
          <ellipse cx="29" cy="28.5" rx="1.6" ry="1" fill="#F48B9B" opacity="0.8" />
          {/* Steam heart */}
          <path d="M22 10.5C22 9 20.5 7.5 19 7.5C17.5 7.5 16 9 16 10.5C16 12.5 22 14.5 22 14.5C22 14.5 28 12.5 28 10.5C28 9 26.5 7.5 25 7.5C23.5 7.5 22 9 22 10.5Z" fill={color} opacity="0.75" />
        </svg>
      );
    case 'cherry':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          <path d="M16 28C16 15 23 8 27 6C30 8 32 15 32 28" stroke="#6E9473" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M27 6L34 4" stroke="#6E9473" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="16" cy="30" r="9.5" fill={color} />
          <circle cx="32" cy="30" r="9.5" fill={color} />
          <circle cx="13" cy="27" r="2.2" fill="#FFF8F2" opacity="0.8" />
          <circle cx="29" cy="27" r="2.2" fill="#FFF8F2" opacity="0.8" />
        </svg>
      );
    case 'chocolate':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          <rect x="8" y="10" width="32" height="28" rx="4.5" fill={color} />
          <rect x="11" y="13" width="12" height="10" rx="2" fill="#FFF8F2" opacity="0.25" />
          <rect x="25" y="13" width="12" height="10" rx="2" fill="#FFF8F2" opacity="0.25" />
          <rect x="11" y="25" width="12" height="10" rx="2" fill="#FFF8F2" opacity="0.25" />
          <rect x="25" y="25" width="12" height="10" rx="2" fill="#FFF8F2" opacity="0.25" />
          <path d="M24 24C24 24 21 21.5 21 19.5C21 18 22.5 17 24 18.5C25.5 17 27 18 27 19.5C27 21.5 24 24 24 24Z" fill="#FFF8F2" />
        </svg>
      );
    case 'cat':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xs">
          <polygon points="11,22 15,7 24,18" fill={color} />
          <polygon points="37,22 33,7 24,18" fill={color} />
          <polygon points="13,19 16,10 22,18" fill="#F48B9B" opacity="0.6" />
          <polygon points="35,19 32,10 26,18" fill="#F48B9B" opacity="0.6" />
          <ellipse cx="24" cy="27" rx="14.5" ry="12.5" fill={color} />
          <ellipse cx="19" cy="25" rx="2.2" ry="1.2" fill="#FFF8F2" transform="rotate(-15 19 25)" />
          <ellipse cx="29" cy="25" rx="2.2" ry="1.2" fill="#FFF8F2" transform="rotate(15 29 25)" />
          <polygon points="24,28 22.5,29.5 25.5,29.5" fill="#F48B9B" />
          <line x1="12" y1="28" x2="5" y2="27" stroke="#FFF8F2" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="12" y1="30" x2="5" y2="31" stroke="#FFF8F2" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="36" y1="28" x2="43" y2="27" stroke="#FFF8F2" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="36" y1="30" x2="43" y2="31" stroke="#FFF8F2" strokeWidth="1.2" strokeLinecap="round" />
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
  enable3DTilt = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50, isHovered: false });

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enable3DTilt || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate smooth 3D tilt angles (max 14 degrees)
    const rx = (0.5 - y) * 26;
    const ry = (x - 0.5) * 26;
    setTilt({ rx, ry, glareX: x * 100, glareY: y * 100, isHovered: true });
  };

  const handleMouseLeave = () => {
    if (!enable3DTilt) return;
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  // OPEN COMPACT VIEW (Real Mirror in lid + Freshly poured botanical balm core)
  if (view === 'open') {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative aspect-square flex items-center justify-center select-none ${sizeStyles[size]} ${className}`}
        style={{ perspective: '1000px' }}
      >
        {/* Dynamic ambient studio shadow */}
        {showShadow && (
          <div
            className="absolute -bottom-4 w-4/5 h-8 rounded-full blur-xl transition-all duration-300 pointer-events-none"
            style={{
              backgroundColor: product.tinAccentColor,
              opacity: tilt.isHovered ? 0.5 : 0.35,
              transform: `translateX(${tilt.ry * 0.8}px) translateY(${tilt.rx * -0.5}px) scale(${tilt.isHovered ? 1.05 : 1})`,
            }}
          />
        )}

        {/* 3D Transform Wrapper */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: enable3DTilt && tilt.isHovered
              ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.02, 1.02, 1.02)`
              : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Mirrored Open Lid (Angled slightly behind/above the base) */}
          <div
            className="absolute -top-3 sm:-top-5 -right-3 sm:-right-5 w-3/4 h-3/4 rounded-full p-2 flex items-center justify-center shadow-lg border border-white/60 pointer-events-none"
            style={{
              backgroundColor: product.tinColor,
              transform: 'rotate(16deg) translateZ(-10px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            }}
          >
            {/* Mirror Frame Bevel */}
            <div
              className="w-full h-full rounded-full p-1.5 flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #EAE5E0 0%, #C8BFB7 50%, #FAF6F2 100%)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {/* Reflective Mirror Glass */}
              <div
                className="w-full h-full rounded-full relative overflow-hidden flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, #EEF2F6 0%, #DCE3E8 50%, #F5F7FA 100%)',
                  boxShadow: 'inset 0 0 10px rgba(123, 38, 56, 0.1)',
                }}
              >
                {/* Mirror Reflection Streak */}
                <div
                  className="absolute inset-0 opacity-60 pointer-events-none"
                  style={{
                    background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0.95) 50%, transparent 65%)',
                  }}
                />
                {/* Subtle Brand Watermark in Mirror reflection */}
                <span
                  className="text-[7px] sm:text-[9px] font-black tracking-[0.25em] uppercase opacity-35 select-none"
                  style={{ color: product.tinAccentColor }}
                >
                  MOODY MATCH ♡
                </span>
              </div>
            </div>
          </div>

          {/* Main Lower Tin Base holding the Balm */}
          <div
            className="relative w-full h-full rounded-full p-3 sm:p-4 flex items-center justify-center shadow-compact border"
            style={{
              backgroundColor: product.tinColor,
              borderColor: 'rgba(123, 38, 56, 0.2)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.12), inset 0 2px 4px rgba(255,255,255,0.8)',
            }}
          >
            {/* Brushed Metallic Inner Rim Ring (Lathe-turned aluminum) */}
            <div
              className="w-full h-full rounded-full p-2.5 sm:p-3.5 flex items-center justify-center relative"
              style={{
                background: 'conic-gradient(from 180deg at 50% 50%, #FAF4EE 0deg, #D4C7BC 90deg, #FAF4EE 180deg, #C5B6AA 270deg, #FAF4EE 360deg)',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.25), 0 1px 3px rgba(255,255,255,0.8)',
              }}
            >
              {/* Precision airtight silicone gasket ring */}
              <div className="absolute inset-1 rounded-full border border-black/10 pointer-events-none" />

              {/* The Balm Itself - Freshly poured, luscious creamy dome */}
              <div
                className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: product.balmColor,
                  boxShadow: 'inset 0 6px 14px rgba(0,0,0,0.22), inset 0 -3px 8px rgba(255,255,255,0.4)',
                }}
              >
                {/* Micro-swirl buttery texture rings */}
                <div
                  className="absolute inset-0 rounded-full opacity-15 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.2) 60%, transparent 80%)',
                  }}
                />

                {/* Glossy sheen specular glint */}
                <div
                  className="absolute top-1 left-2 w-3/4 h-1/2 rounded-full pointer-events-none transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)',
                    transform: 'rotate(-25deg)',
                    opacity: tilt.isHovered ? 0.6 : 0.4,
                  }}
                />

                {/* Embossed signature Heart Seal in the center of balm core */}
                <div className="opacity-45 flex items-center justify-center drop-shadow-xs">
                  <span
                    className="text-2xl sm:text-3xl font-serif font-bold"
                    style={{ color: product.tinAccentColor }}
                  >
                    ♡
                  </span>
                </div>
              </div>
            </div>

            {/* Precision metallic front latch clasp */}
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full border border-black/15 shadow-xs"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #D8CEC5 100%)',
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // SIDE PROFILE VIEW (Precision machined aluminum silhouette with knurling & seam)
  if (view === 'side') {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative flex items-center justify-center select-none ${sizeStyles[size]} ${className}`}
        style={{ perspective: '1000px' }}
      >
        {showShadow && (
          <div
            className="absolute -bottom-2 w-5/6 h-5 rounded-full blur-lg opacity-35 pointer-events-none transition-all duration-300"
            style={{
              backgroundColor: product.tinAccentColor,
              transform: `translateX(${tilt.ry * 0.5}px)`,
            }}
          />
        )}
        <div
          className="relative w-5/6 h-32 sm:h-36 flex flex-col items-center justify-center transition-transform duration-200"
          style={{
            transform: enable3DTilt && tilt.isHovered
              ? `rotateX(${tilt.rx * 0.8}deg) rotateY(${tilt.ry}deg)`
              : 'none',
          }}
        >
          {/* Top Domed Lid */}
          <div
            className="relative w-full h-16 rounded-t-3xl border-b border-black/10 flex flex-col justify-between px-5 pt-2 shadow-sm overflow-hidden"
            style={{
              backgroundColor: product.tinColor,
              borderTop: `2px solid rgba(123, 38, 56, 0.15)`,
            }}
          >
            {/* Subtle curve highlight */}
            <div
              className="absolute top-0 inset-x-4 h-3 rounded-full opacity-40 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, transparent 100%)',
              }}
            />
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono tracking-widest text-[#7B2638] font-bold">
                MOODY MATCH
              </span>
              <span className="text-[10px] font-black text-[#7B2638]">{product.number}</span>
            </div>
            <div className="pb-1 text-center">
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#7B2638]/70">
                LIP BALM COMPACT
              </span>
            </div>
          </div>

          {/* Knurled Grip Ring & Metallic Seam */}
          <div className="w-[101.5%] h-3 flex items-center justify-between px-1 bg-gradient-to-r from-[#CFC4BA] via-[#FAF4EE] to-[#CFC4BA] shadow-xs border-y border-black/10">
            {/* Micro-knurling vertical ridges */}
            <div className="w-full h-full flex justify-between opacity-30 px-1 pointer-events-none">
              {[...Array(28)].map((_, i) => (
                <div key={i} className="w-[1px] h-full bg-[#7B2638]" />
              ))}
            </div>
          </div>

          {/* Bottom Base of Tin */}
          <div
            className="w-full h-14 rounded-b-3xl flex flex-col items-center justify-center shadow-md px-4"
            style={{
              backgroundColor: product.tinColor,
              borderBottom: `2.5px solid rgba(123, 38, 56, 0.22)`,
            }}
          >
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#7B2638]/80 font-bold">
              100% VEGAN • 15G
            </span>
            <span className="text-[7.5px] font-mono tracking-widest text-[#7B2638]/60 mt-0.5">
              RECYCLABLE ALUMINUM
            </span>
          </div>
        </div>
      </div>
    );
  }

  // BOTTOM VIEW (Cosmetic Inspection & Batch Details Plate)
  if (view === 'bottom') {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative aspect-square flex items-center justify-center select-none ${sizeStyles[size]} ${className}`}
        style={{ perspective: '1000px' }}
      >
        {showShadow && (
          <div
            className="absolute -bottom-3 w-4/5 h-8 rounded-full blur-xl opacity-35 transition-all duration-300 pointer-events-none"
            style={{
              backgroundColor: product.tinAccentColor,
              transform: `translateX(${tilt.ry * 0.8}px)`,
            }}
          />
        )}

        <div
          className="relative w-full h-full rounded-full p-4 flex flex-col items-center justify-between shadow-compact border transition-transform duration-200"
          style={{
            backgroundColor: product.tinColor,
            borderColor: 'rgba(123, 38, 56, 0.18)',
            transform: enable3DTilt && tilt.isHovered
              ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.03, 1.03, 1.03)`
              : 'none',
          }}
        >
          {/* Lathe-turned aluminum concentric record rings */}
          <div
            className="absolute inset-3 rounded-full pointer-events-none opacity-25"
            style={{
              border: '1px solid #7B2638',
              boxShadow: 'inset 0 0 0 6px transparent, inset 0 0 0 7px rgba(123,38,56,0.2), inset 0 0 0 14px transparent, inset 0 0 0 15px rgba(123,38,56,0.15)',
            }}
          />

          {/* Embossed Batch Plate Text */}
          <div className="z-10 pt-2 text-center">
            <span className="text-[9px] font-mono font-black uppercase tracking-[0.25em] text-[#7B2638] block">
              MOODY MATCH
            </span>
            <span className="text-[7px] font-mono tracking-widest text-[#7B2638]/70 uppercase block">
              PARIS • NEW YORK
            </span>
          </div>

          <div className="z-10 text-center my-auto space-y-1">
            <div className="inline-block px-2 py-0.5 rounded-full bg-[#7B2638]/10 text-[9px] font-mono font-bold text-[#7B2638]">
              SHADE {product.number} : {product.name}
            </div>
            <p className="text-[7.5px] font-mono text-[#7B2638]/80 max-w-[140px] leading-tight">
              15G / 0.53 OZ • 100% VEGAN
            </p>
            <p className="text-[7px] font-mono text-[#7B2638]/60 uppercase tracking-wider">
              BATCH #MM-2026 • 24M EXP
            </p>
          </div>

          <div className="z-10 pb-2 flex items-center justify-center gap-2 text-[8px] font-mono text-[#7B2638]/75">
            <span>♻ ALU</span>
            <span>•</span>
            <span>CRUELTY FREE</span>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT: TOP VIEW (Authentic round collectible compact tin lid with tactile 3D sheen & artwork)
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative aspect-square flex items-center justify-center select-none group ${sizeStyles[size]} ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Dynamic ambient soft shadow matching balm palette with 3D offset */}
      {showShadow && (
        <div
          className="absolute -bottom-3 w-4/5 h-8 rounded-full blur-xl transition-all duration-300 pointer-events-none"
          style={{
            backgroundColor: product.tinAccentColor,
            opacity: tilt.isHovered ? 0.5 : 0.35,
            transform: `translateX(${tilt.ry * 0.9}px) translateY(${tilt.rx * -0.5}px) scale(${tilt.isHovered ? 1.08 : 1})`,
          }}
        />
      )}

      {/* The Matte Compact Container with 3D Tilt */}
      <div
        className="relative w-full h-full rounded-full p-3 sm:p-4 flex flex-col items-center justify-between shadow-compact cursor-pointer transition-transform duration-200 ease-out"
        style={{
          backgroundColor: product.tinColor,
          border: `1.8px solid rgba(123, 38, 56, 0.18)`,
          transform: enable3DTilt && tilt.isHovered
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.04, 1.04, 1.04)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Brushed Aluminum Outer Chamfer Highlight Bevel */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.06) 60%, rgba(255,255,255,0.4) 100%)',
            boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.8), inset 0 -2px 3px rgba(0,0,0,0.1)',
          }}
        />

        {/* Precision Concentric Lathe Machining Rings */}
        <div
          className="absolute inset-1.5 sm:inset-2.5 rounded-full pointer-events-none opacity-40"
          style={{
            border: `1px dashed rgba(123, 38, 56, 0.26)`,
            boxShadow: 'inset 0 0 0 3px transparent, inset 0 0 0 4px rgba(123,38,56,0.06)',
          }}
        />

        {/* Dynamic Specular Glare following mouse in 3D */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 55%)`,
            opacity: tilt.isHovered ? 0.9 : 0.35,
          }}
        />

        {/* Top Header: Brand Name + Cute Heart */}
        <div className="z-10 pt-2 flex flex-col items-center">
          <div className="flex items-center gap-1">
            <span
              className="text-[9px] sm:text-[11px] font-black tracking-[0.28em] uppercase drop-shadow-xs"
              style={{
                color: product.tinAccentColor,
                textShadow: '0 1px 0 rgba(255,255,255,0.6)',
              }}
            >
              MOODY MATCH
            </span>
            <span
              className="text-[10px] sm:text-xs font-bold"
              style={{ color: product.tinAccentColor }}
            >
              ♡
            </span>
          </div>
          <span
            className="text-[7px] sm:text-[8px] font-mono tracking-widest uppercase opacity-75 font-semibold"
            style={{ color: product.tinAccentColor }}
          >
            LIP BALM COMPACT
          </span>
        </div>

        {/* Center: Cute Mood Icon & Mascot with Micro-zoom */}
        <div className="z-10 flex flex-col items-center justify-center my-auto transition-transform duration-300 group-hover:scale-108">
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
              className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border border-[rgba(123,38,56,0.15)] shadow-2xs"
              style={{
                backgroundColor: 'rgba(123, 38, 56, 0.08)',
                color: product.tinAccentColor,
              }}
            >
              {product.number}
            </span>
            <span
              className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]"
              style={{
                color: product.tinAccentColor,
                textShadow: '0 1px 0 rgba(255,255,255,0.6)',
              }}
            >
              {product.name}
            </span>
          </div>
          <span
            className="text-[8px] sm:text-[9px] font-medium italic tracking-wider opacity-85 pt-0.5"
            style={{ color: product.tinAccentColor }}
          >
            {product.personality}
          </span>
        </div>
      </div>
    </div>
  );
};

