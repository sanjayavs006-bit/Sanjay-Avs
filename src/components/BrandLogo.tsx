import React from 'react';

interface BrandLogoProps {
  variant?: 'burgundy' | 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'burgundy',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-sm sm:text-base tracking-[0.24em]',
    md: 'text-lg sm:text-xl tracking-[0.28em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.3em]',
    xl: 'text-3xl sm:text-5xl tracking-[0.32em]',
  };

  const colorClasses = {
    burgundy: 'text-[#7B2638]',
    dark: 'text-[#111111]',
    light: 'text-[#FFF8F2]',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 font-sans font-black uppercase select-none ${sizeClasses[size]} ${colorClasses[variant]} ${className}`}>
      <span>MOODY MATCH</span>
      <span className="font-serif font-normal text-xs sm:text-sm tracking-normal text-[#C96B7B]">
        ♡
      </span>
    </div>
  );
};
