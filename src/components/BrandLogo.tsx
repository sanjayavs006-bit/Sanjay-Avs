import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light' | 'red';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  onClick,
}) => {
  const textColors = {
    dark: 'text-[#000000]',
    light: 'text-[#FFFFFF]',
    red: 'text-[#E30613]',
  };

  const fontSizes = {
    sm: 'text-base tracking-[0.24em]',
    md: 'text-xl sm:text-2xl tracking-[0.28em]',
    lg: 'text-3xl sm:text-4xl tracking-[0.32em]',
  };

  return (
    <div
      id="brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 select-none font-sans font-black uppercase ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <span className={`transition-colors duration-150 ${textColors[variant]} ${fontSizes[size]}`}>
        MOODY MATCH
      </span>
      {/* Signature Red Fashion Square Accent */}
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#E30613] inline-block shrink-0 mt-[-2px]" />
    </div>
  );
};
