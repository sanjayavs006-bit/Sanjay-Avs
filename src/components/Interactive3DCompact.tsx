import React from 'react';
import { Product } from '../types';
import { ThreeBalmViewer } from './ThreeBalmViewer';

interface Interactive3DCompactProps {
  product: Product;
  initialMode?: 'orbit' | 'open' | 'exploded' | 'hinge';
  heightClass?: string;
  showControls?: boolean;
}

export const Interactive3DCompact: React.FC<Interactive3DCompactProps> = ({
  product,
  initialMode = 'orbit',
  heightClass = 'h-[360px] sm:h-[420px]',
  showControls = true,
}) => {
  // Normalize initialMode to match ThreeBalmViewer
  const mappedMode: 'orbit' | 'open' | 'exploded' =
    initialMode === 'hinge' || initialMode === 'open' ? 'open' : initialMode === 'exploded' ? 'exploded' : 'orbit';

  return (
    <ThreeBalmViewer
      product={product}
      initialMode={mappedMode}
      heightClass={heightClass}
      showControls={showControls}
    />
  );
};
