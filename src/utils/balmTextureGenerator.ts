import * as THREE from 'three';
import { Product, IconSymbol } from '../types';

export function getIconSvgString(symbol: IconSymbol, color: string): string {
  switch (symbol) {
    case 'heart':
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 41C24 41 6 30 6 17.5C6 11.2 10.5 6.5 16.5 6.5C20.4 6.5 23.4 8.5 24 10.2C24.6 8.5 27.6 6.5 31.5 6.5C37.5 6.5 42 11.2 42 17.5C42 30 24 41 24 41Z" fill="${color}" />
          <path d="M16.5 8.5C11.8 8.5 8 12.3 8 17.5C8 23 14 30.5 24 38C34 30.5 40 23 40 17.5C40 12.3 36.2 8.5 31.5 8.5C28.2 8.5 25.4 10.3 24.5 12.5H23.5C22.6 10.3 19.8 8.5 16.5 8.5Z" stroke="white" stroke-width="0.8" opacity="0.3" fill="none" />
          <circle cx="18" cy="18" r="1.8" fill="#FFF8F2" />
          <circle cx="17.4" cy="17.4" r="0.7" fill="#111111" />
          <circle cx="30" cy="18" r="1.8" fill="#FFF8F2" />
          <circle cx="29.4" cy="17.4" r="0.7" fill="#111111" />
          <ellipse cx="14" cy="20.5" rx="2" ry="1.2" fill="#F48B9B" opacity="0.9" />
          <ellipse cx="34" cy="20.5" rx="2" ry="1.2" fill="#F48B9B" opacity="0.9" />
          <path d="M21.5 23C22.5 24.5 25.5 24.5 26.5 23" stroke="#FFF8F2" stroke-width="1.6" stroke-linecap="round" fill="none" />
        </svg>
      `;
    case 'teddy':
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13" cy="14" r="6.5" fill="${color}" />
          <circle cx="35" cy="14" r="6.5" fill="${color}" />
          <circle cx="13" cy="14" r="3.2" fill="#FFF8F2" opacity="0.6" />
          <circle cx="35" cy="14" r="3.2" fill="#FFF8F2" opacity="0.6" />
          <ellipse cx="24" cy="26" rx="15.5" ry="13.5" fill="${color}" />
          <ellipse cx="24" cy="29" rx="6.5" ry="5.2" fill="#FFF8F2" />
          <polygon points="24,26.8 21.2,29 26.8,29" fill="${color}" />
          <path d="M24 29V32" stroke="${color}" stroke-width="1.3" stroke-linecap="round" />
          <path d="M22 32C22.8 32.8 25.2 32.8 26 32" stroke="${color}" stroke-width="1.2" stroke-linecap="round" fill="none" />
          <circle cx="17.5" cy="22.5" r="1.8" fill="#FFF8F2" />
          <circle cx="17" cy="22" r="0.7" fill="#111111" />
          <circle cx="30.5" cy="22.5" r="1.8" fill="#FFF8F2" />
          <circle cx="30" cy="22" r="0.7" fill="#111111" />
          <ellipse cx="13" cy="27" rx="2.4" ry="1.2" fill="#F48B9B" opacity="0.85" />
          <ellipse cx="35" cy="27" rx="2.4" ry="1.2" fill="#F48B9B" opacity="0.85" />
        </svg>
      `;
    case 'cloud':
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 34H35C39.4 34 43 30.4 43 26C43 21.8 39.8 18.4 35.6 18.1C34.4 12.3 29.2 8 23 8C16 8 10.4 13.4 10.1 20.3C5.5 21.1 2 25.1 2 30C2 35.5 6.5 34 14 34Z" fill="${color}" />
          <path d="M16 23C17.5 25 20.5 25 22 23" stroke="#FFF8F2" stroke-width="1.8" stroke-linecap="round" fill="none" />
          <path d="M26 23C27.5 25 30.5 25 32 23" stroke="#FFF8F2" stroke-width="1.8" stroke-linecap="round" fill="none" />
          <ellipse cx="14" cy="26" rx="2.2" ry="1.2" fill="#F48B9B" opacity="0.85" />
          <ellipse cx="34" cy="26" rx="2.2" ry="1.2" fill="#F48B9B" opacity="0.85" />
        </svg>
      `;
    case 'peach':
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 9C24 5 28 3 32 3C32 7 29 9 24 9Z" fill="#6E9473" />
          <path d="M24 9V5" stroke="${color}" stroke-width="1.8" stroke-linecap="round" />
          <path d="M24 11C15.5 11 7 17.5 7 27C7 36.5 16.5 43 24 44C31.5 43 41 36.5 41 27C41 17.5 32.5 11 24 11Z" fill="${color}" />
          <path d="M24 12C24 23 21 34 24 43" stroke="#FFF8F2" stroke-width="1.4" opacity="0.45" stroke-linecap="round" fill="none" />
          <circle cx="17" cy="27" r="1.8" fill="#FFF8F2" />
          <circle cx="31" cy="27" r="1.8" fill="#FFF8F2" />
          <path d="M21.5 31.5C22.5 32.5 25.5 32.5 26.5 31.5" stroke="#FFF8F2" stroke-width="1.6" stroke-linecap="round" fill="none" />
          <ellipse cx="14" cy="29" rx="2" ry="1.2" fill="#F48B9B" opacity="0.8" />
          <ellipse cx="34" cy="29" rx="2" ry="1.2" fill="#F48B9B" opacity="0.8" />
        </svg>
      `;
    case 'sun':
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="14" fill="${color}" />
          <rect x="22.5" y="3" width="3" height="5" rx="1.5" fill="${color}" />
          <rect x="22.5" y="40" width="3" height="5" rx="1.5" fill="${color}" />
          <rect x="3" y="22.5" width="5" height="3" rx="1.5" fill="${color}" />
          <rect x="40" y="22.5" width="5" height="3" rx="1.5" fill="${color}" />
          <circle cx="19" cy="22" r="1.8" fill="#FFF8F2" />
          <circle cx="29" cy="22" r="1.8" fill="#FFF8F2" />
          <path d="M20.5 26.5C22 28.5 26 28.5 27.5 26.5" stroke="#FFF8F2" stroke-width="1.8" stroke-linecap="round" fill="none" />
          <ellipse cx="15.5" cy="24.5" rx="1.8" ry="1.1" fill="#F48B9B" opacity="0.85" />
          <ellipse cx="32.5" cy="24.5" rx="1.8" ry="1.1" fill="#F48B9B" opacity="0.85" />
        </svg>
      `;
    case 'green-heart':
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 41C24 41 6 30 6 17.5C6 11.2 10.5 6.5 16.5 6.5C20.4 6.5 23.4 8.5 24 10.2C24.6 8.5 27.6 6.5 31.5 6.5C37.5 6.5 42 11.2 42 17.5C42 30 24 41 24 41Z" fill="${color}" />
          <path d="M24 7C21 3 25 1 28 2C27 4.5 26 6.5 24 7Z" fill="#FFF8F2" opacity="0.95" />
          <circle cx="18" cy="19" r="1.8" fill="#FFF8F2" />
          <circle cx="30" cy="19" r="1.8" fill="#FFF8F2" />
          <path d="M21 24.5C22.5 26 25.5 26 27 24.5" stroke="#FFF8F2" stroke-width="1.6" stroke-linecap="round" fill="none" />
          <ellipse cx="14" cy="21" rx="1.8" ry="1" fill="#F48B9B" opacity="0.75" />
          <ellipse cx="34" cy="21" rx="1.8" ry="1" fill="#F48B9B" opacity="0.75" />
        </svg>
      `;
    case 'moon':
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M29 5C30.8 5 32.5 5.4 34.1 6.1C27.6 9.4 23.1 16.2 23.1 24C23.1 31.8 27.6 38.6 34.1 41.9C32.5 42.6 30.8 43 29 43C19.5 43 12 34.5 12 24C12 13.5 19.5 5 29 5Z" fill="${color}" />
          <path d="M23 23C24 24.5 26 24.5 27 23" stroke="#FFF8F2" stroke-width="1.6" stroke-linecap="round" fill="none" />
          <ellipse cx="22" cy="25" rx="1.6" ry="1" fill="#F48B9B" opacity="0.8" />
        </svg>
      `;
    case 'daisy':
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="18" fill="${color}" />
          <circle cx="24" cy="24" r="8" fill="#FFF8F2" />
          <circle cx="21" cy="23" r="1.3" fill="${color}" />
          <circle cx="27" cy="23" r="1.3" fill="${color}" />
          <path d="M22 26C23 27 25 27 26 26" stroke="${color}" stroke-width="1.4" stroke-linecap="round" fill="none" />
        </svg>
      `;
    case 'coffee':
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 16H34V28C34 34.6 28.6 40 22 40C15.4 40 10 34.6 10 28V16Z" fill="${color}" />
          <path d="M34 20H37C39.2 20 41 21.8 41 24C41 26.2 39.2 28 37 28H34" stroke="${color}" stroke-width="3" stroke-linecap="round" fill="none" />
          <circle cx="18" cy="27" r="1.6" fill="#FFF8F2" />
          <circle cx="26" cy="27" r="1.6" fill="#FFF8F2" />
          <path d="M20 31C21.2 32.2 22.8 32.2 24 31" stroke="#FFF8F2" stroke-width="1.5" stroke-linecap="round" fill="none" />
          <ellipse cx="15" cy="28.5" rx="1.6" ry="1" fill="#F48B9B" opacity="0.8" />
          <ellipse cx="29" cy="28.5" rx="1.6" ry="1" fill="#F48B9B" opacity="0.8" />
        </svg>
      `;
    case 'cherry':
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 28C16 15 23 8 27 6C30 8 32 15 32 28" stroke="#6E9473" stroke-width="2.2" stroke-linecap="round" fill="none" />
          <circle cx="16" cy="30" r="9.5" fill="${color}" />
          <circle cx="32" cy="30" r="9.5" fill="${color}" />
          <circle cx="13" cy="27" r="2.2" fill="#FFF8F2" opacity="0.8" />
          <circle cx="29" cy="27" r="2.2" fill="#FFF8F2" opacity="0.8" />
        </svg>
      `;
    case 'chocolate':
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="10" width="32" height="28" rx="4.5" fill="${color}" />
          <rect x="11" y="13" width="12" height="10" rx="2" fill="#FFF8F2" opacity="0.25" />
          <rect x="25" y="13" width="12" height="10" rx="2" fill="#FFF8F2" opacity="0.25" />
          <rect x="11" y="25" width="12" height="10" rx="2" fill="#FFF8F2" opacity="0.25" />
          <rect x="25" y="25" width="12" height="10" rx="2" fill="#FFF8F2" opacity="0.25" />
        </svg>
      `;
    case 'cat':
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <polygon points="11,22 15,7 24,18" fill="${color}" />
          <polygon points="37,22 33,7 24,18" fill="${color}" />
          <ellipse cx="24" cy="27" rx="14.5" ry="12.5" fill="${color}" />
          <ellipse cx="19" cy="25" rx="2.2" ry="1.2" fill="#FFF8F2" />
          <ellipse cx="29" cy="25" rx="2.2" ry="1.2" fill="#FFF8F2" />
          <polygon points="24,28 22.5,29.5 25.5,29.5" fill="#F48B9B" />
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="16" fill="${color}" />
        </svg>
      `;
  }
}

// Generates high-res texture for top aluminum lid
export function createTopLidTexture(product: Product): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.48;

  // Background pastel circle
  ctx.fillStyle = product.tinColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Subtle radial gradient for satin aluminum depth
  const grad = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
  grad.addColorStop(0.7, 'rgba(255, 255, 255, 0)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.12)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Concentric lathe grooves (machined finish)
  ctx.lineWidth = 1.5;
  for (let r = 80; r < radius - 20; r += 24) {
    ctx.strokeStyle = 'rgba(123, 38, 56, 0.04)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Outer decorative dashed lathe groove
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = 'rgba(123, 38, 56, 0.22)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.93, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Outer chamfer border
  ctx.strokeStyle = 'rgba(123, 38, 56, 0.35)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 4, 0, Math.PI * 2);
  ctx.stroke();

  // Brand Name Typography
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // "MOODY MATCH ♡"
  ctx.fillStyle = product.tinAccentColor;
  ctx.font = 'bold 42px "Plus Jakarta Sans", -apple-system, sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('MOODY MATCH ♡', centerX, centerY - 260);

  // "LIP BALM COMPACT"
  ctx.font = 'bold 24px monospace';
  ctx.letterSpacing = '6px';
  ctx.fillStyle = 'rgba(123, 38, 56, 0.75)';
  ctx.fillText('LIP BALM COMPACT', centerX, centerY - 210);

  // Mascot SVG Drawing
  const svgString = getIconSvgString(product.iconSymbol, product.tinAccentColor);
  const img = new Image();
  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  img.onload = () => {
    const iconSize = 280;
    ctx.drawImage(img, centerX - iconSize / 2, centerY - iconSize / 2 + 10, iconSize, iconSize);

    // Bottom Shade Info
    ctx.fillStyle = product.tinAccentColor;
    ctx.font = 'bold 36px monospace';
    ctx.letterSpacing = '4px';
    ctx.fillText(`${product.number}  ${product.name}`, centerX, centerY + 220);

    ctx.font = 'italic 500 28px serif';
    ctx.fillStyle = 'rgba(123, 38, 56, 0.85)';
    ctx.fillText(product.personality, centerX, centerY + 270);

    texture.needsUpdate = true;
  };

  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

  // Also draw bottom text immediately as fallback before image load
  ctx.fillStyle = product.tinAccentColor;
  ctx.font = 'bold 36px monospace';
  ctx.letterSpacing = '4px';
  ctx.fillText(`${product.number}  ${product.name}`, centerX, centerY + 220);

  ctx.font = 'italic 500 28px serif';
  ctx.fillStyle = 'rgba(123, 38, 56, 0.85)';
  ctx.fillText(product.personality, centerX, centerY + 270);

  return texture;
}

// Generates high-res texture for bottom batch inspection plate
export function createBottomTexture(product: Product): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.48;

  // Background pastel circle
  ctx.fillStyle = product.tinColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Lathe rings
  ctx.lineWidth = 2;
  for (let r = 100; r < radius - 30; r += 32) {
    ctx.strokeStyle = 'rgba(123, 38, 56, 0.08)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Border ring
  ctx.strokeStyle = 'rgba(123, 38, 56, 0.25)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 8, 0, Math.PI * 2);
  ctx.stroke();

  // Typography
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Brand
  ctx.fillStyle = product.tinAccentColor;
  ctx.font = 'bold 36px monospace';
  ctx.letterSpacing = '8px';
  ctx.fillText('MOODY MATCH', centerX, centerY - 240);

  ctx.font = '22px monospace';
  ctx.letterSpacing = '5px';
  ctx.fillStyle = 'rgba(123, 38, 56, 0.7)';
  ctx.fillText('PARIS  •  NEW YORK', centerX, centerY - 190);

  // Center Badge Pill
  ctx.fillStyle = 'rgba(123, 38, 56, 0.12)';
  const pillW = 440;
  const pillH = 64;
  ctx.beginPath();
  ctx.roundRect(centerX - pillW / 2, centerY - pillH / 2, pillW, pillH, 32);
  ctx.fill();

  ctx.fillStyle = product.tinAccentColor;
  ctx.font = 'bold 28px monospace';
  ctx.letterSpacing = '3px';
  ctx.fillText(`SHADE ${product.number} : ${product.name}`, centerX, centerY);

  // Details
  ctx.font = '24px monospace';
  ctx.fillStyle = 'rgba(123, 38, 56, 0.85)';
  ctx.letterSpacing = '2px';
  ctx.fillText('15G / 0.53 OZ  •  100% VEGAN', centerX, centerY + 100);

  ctx.font = '20px monospace';
  ctx.fillStyle = 'rgba(123, 38, 56, 0.65)';
  ctx.letterSpacing = '3px';
  ctx.fillText('BATCH #MM-2026  •  EXP 24M', centerX, centerY + 150);

  // Recycle and Cruelty Free
  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = 'rgba(123, 38, 56, 0.75)';
  ctx.fillText('♻ ALU   •   CRUELTY FREE', centerX, centerY + 240);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

// Generates texture for balm surface with debossed monogram
export function createBalmSurfaceTexture(product: Product): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.48;

  // Creamy balm color
  ctx.fillStyle = product.balmColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Subtle swirl rings
  for (let r = 40; r < radius - 20; r += 30) {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Soft gloss specular highlight
  const grad = ctx.createRadialGradient(centerX - 60, centerY - 60, 20, centerX, centerY, radius);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
  grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Debossed Heart Seal Monogram in center
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.font = 'bold 110px serif';
  ctx.fillText('♡', centerX + 2, centerY + 4);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fillText('♡', centerX - 2, centerY - 2);

  ctx.fillStyle = product.tinAccentColor;
  ctx.globalAlpha = 0.35;
  ctx.fillText('♡', centerX, centerY);
  ctx.globalAlpha = 1.0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

// Generates mirror texture with subtle reflective sheen and watermark
export function createMirrorTexture(product: Product): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.48;

  // Mirror glass gradient
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, '#EEF4F8');
  grad.addColorStop(0.45, '#D5DEE5');
  grad.addColorStop(0.55, '#F8FAFC');
  grad.addColorStop(1, '#E2E8F0');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Diagonal reflection streak
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.beginPath();
  ctx.moveTo(size * 0.2, 0);
  ctx.lineTo(size * 0.45, 0);
  ctx.lineTo(size * 0.8, size);
  ctx.lineTo(size * 0.55, size);
  ctx.closePath();
  ctx.fill();

  // Bevel rim
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 4, 0, Math.PI * 2);
  ctx.stroke();

  // Watermark
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(123, 38, 56, 0.28)';
  ctx.font = 'bold 22px monospace';
  ctx.letterSpacing = '5px';
  ctx.fillText('MOODY MATCH ♡', centerX, centerY - 30);

  ctx.font = '16px monospace';
  ctx.fillStyle = 'rgba(123, 38, 56, 0.2)';
  ctx.letterSpacing = '4px';
  ctx.fillText('VANITY MIRROR', centerX, centerY + 10);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}
