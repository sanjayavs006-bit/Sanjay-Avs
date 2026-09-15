import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Product } from '../types';
import {
  createTopLidTexture,
  createBottomTexture,
  createBalmSurfaceTexture,
  createMirrorTexture,
} from '../utils/balmTextureGenerator';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Play,
  Pause,
  Eye,
  ZoomIn,
  ZoomOut,
  Sun,
  Palette,
} from 'lucide-react';

interface ThreeBalmViewerProps {
  product: Product;
  initialMode?: 'orbit' | 'open' | 'exploded';
  heightClass?: string;
  showControls?: boolean;
  onSelectShade?: (product: Product) => void;
}

// -----------------------------------------------------------------------------
// 3D COMPACT MESH MODEL (Built with Three.js Primitives & Procedural Canvas Textures)
// -----------------------------------------------------------------------------
interface CompactModelProps {
  product: Product;
  isOpen: boolean;
  isExploded: boolean;
  isFloating: boolean;
  activeLighting: 'studio' | 'golden' | 'rose';
}

const CompactModel: React.FC<CompactModelProps> = ({
  product,
  isOpen,
  isExploded,
}) => {
  // Pivot reference for the 3D Hinge
  const hingePivotRef = useRef<THREE.Group>(null);

  // Group references for exploded view separation
  const bottomPlateGroupRef = useRef<THREE.Group>(null);
  const baseChassisGroupRef = useRef<THREE.Group>(null);
  const balmCoreGroupRef = useRef<THREE.Group>(null);
  const gasketGroupRef = useRef<THREE.Group>(null);
  const mirrorGroupRef = useRef<THREE.Group>(null);
  const lidPlateGroupRef = useRef<THREE.Group>(null);

  // Target values for smooth frame lerping
  const targetHingeAngle = isOpen && !isExploded ? -Math.PI * 0.64 : 0; // ~115 degrees back
  const currentHingeAngle = useRef<number>(0);

  // Exploded layer Y targets
  const explodedYTargets = useMemo(() => {
    if (isExploded) {
      return {
        bottom: -1.35,
        base: -0.65,
        balm: 0.0,
        gasket: 0.65,
        mirror: 1.35,
        lid: 2.05,
      };
    }
    return {
      bottom: 0.0,
      base: 0.0,
      balm: 0.0,
      gasket: 0.0,
      mirror: 0.0,
      lid: 0.0,
    };
  }, [isExploded]);

  // Procedural Canvas Textures generated for current product shade
  const topLidTexture = useMemo(() => createTopLidTexture(product), [product]);
  const bottomTexture = useMemo(() => createBottomTexture(product), [product]);
  const balmTexture = useMemo(() => createBalmSurfaceTexture(product), [product]);
  const mirrorTexture = useMemo(() => createMirrorTexture(product), [product]);

  // Clean up textures on unmount or shade change
  useEffect(() => {
    return () => {
      topLidTexture.dispose();
      bottomTexture.dispose();
      balmTexture.dispose();
      mirrorTexture.dispose();
    };
  }, [topLidTexture, bottomTexture, balmTexture, mirrorTexture]);

  // Materials
  const tinColorObj = useMemo(() => new THREE.Color(product.tinColor), [product.tinColor]);
  const balmColorObj = useMemo(() => new THREE.Color(product.balmColor), [product.balmColor]);

  // Frame animation loop for silky physics lerping
  useFrame((_, delta) => {
    const lerpSpeed = Math.min(1, delta * 8.5);

    // 1. Lerp Hinge Opening Angle
    currentHingeAngle.current = THREE.MathUtils.lerp(
      currentHingeAngle.current,
      targetHingeAngle,
      lerpSpeed
    );
    if (hingePivotRef.current) {
      hingePivotRef.current.rotation.x = currentHingeAngle.current;
    }

    // 2. Lerp Exploded Layer Displacements
    if (bottomPlateGroupRef.current) {
      bottomPlateGroupRef.current.position.y = THREE.MathUtils.lerp(
        bottomPlateGroupRef.current.position.y,
        explodedYTargets.bottom,
        lerpSpeed
      );
    }
    if (baseChassisGroupRef.current) {
      baseChassisGroupRef.current.position.y = THREE.MathUtils.lerp(
        baseChassisGroupRef.current.position.y,
        explodedYTargets.base,
        lerpSpeed
      );
    }
    if (balmCoreGroupRef.current) {
      balmCoreGroupRef.current.position.y = THREE.MathUtils.lerp(
        balmCoreGroupRef.current.position.y,
        explodedYTargets.balm,
        lerpSpeed
      );
    }
    if (gasketGroupRef.current) {
      gasketGroupRef.current.position.y = THREE.MathUtils.lerp(
        gasketGroupRef.current.position.y,
        explodedYTargets.gasket,
        lerpSpeed
      );
    }
    if (mirrorGroupRef.current) {
      mirrorGroupRef.current.position.y = THREE.MathUtils.lerp(
        mirrorGroupRef.current.position.y,
        explodedYTargets.mirror,
        lerpSpeed
      );
    }
    if (lidPlateGroupRef.current) {
      lidPlateGroupRef.current.position.y = THREE.MathUtils.lerp(
        lidPlateGroupRef.current.position.y,
        explodedYTargets.lid,
        lerpSpeed
      );
    }
  });

  return (
    <group dispose={null}>
      {/* =================================================================== */}
      {/* 1. LOWER BASE ASSEMBLY (Bottom Plate + Aluminum Chassis + Balm Core) */}
      {/* =================================================================== */}

      {/* 1A. Bottom Batch Inspection Plate (Separates in Exploded Mode) */}
      <group ref={bottomPlateGroupRef} position={[0, 0, 0]}>
        <mesh position={[0, -0.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.76, 64]} />
          <meshStandardMaterial
            map={bottomTexture}
            roughness={0.4}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        {isExploded && (
          <Html position={[2.1, -0.19, 0]} center distanceFactor={8}>
            <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#7B2638]/20 shadow-xs flex items-center gap-1.5 whitespace-nowrap pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B2638]" />
              <span className="text-[10px] font-mono uppercase font-bold text-[#7B2638]">
                05. WEIGHTED ALU BASE
              </span>
            </div>
          </Html>
        )}
      </group>

      {/* 1B. Base Chassis Aluminum Shell */}
      <group ref={baseChassisGroupRef} position={[0, 0, 0]}>
        {/* Main Base Cylinder Shell */}
        <mesh position={[0, -0.01, 0]}>
          <cylinderGeometry args={[1.8, 1.76, 0.36, 64]} />
          <meshStandardMaterial
            color={tinColorObj}
            roughness={0.32}
            metalness={0.38}
          />
        </mesh>

        {/* Outer Chamfer Rim */}
        <mesh position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.78, 0.024, 16, 64]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.15}
            metalness={0.8}
          />
        </mesh>

        {/* Front Clasp Latch (Metallic Click Mechanism) */}
        <mesh position={[0, 0.02, 1.81]}>
          <boxGeometry args={[0.32, 0.14, 0.08]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>

        {/* Base Hinge Barrel Part (Fixed to Base) */}
        <mesh position={[0, 0.14, -1.8]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.46, 32]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.18}
            metalness={0.88}
          />
        </mesh>
      </group>

      {/* 1C. Airtight Bezel Rim & Silicone Gasket (Separates in Exploded Mode) */}
      <group ref={gasketGroupRef} position={[0, 0, 0]}>
        {/* Brushed Metallic Beveled Inset Ring */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[1.66, 1.66, 0.09, 64, 1, true]} />
          <meshStandardMaterial
            color="#F4ECE4"
            roughness={0.18}
            metalness={0.82}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Silicone Airtight Gasket Ring */}
        <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.61, 0.022, 16, 64]} />
          <meshStandardMaterial
            color="#333333"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>

        {isExploded && (
          <Html position={[2.1, 0.14, 0]} center distanceFactor={8}>
            <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#7B2638]/20 shadow-xs flex items-center gap-1.5 whitespace-nowrap pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B2638]" />
              <span className="text-[10px] font-mono uppercase font-bold text-[#7B2638]">
                03. BEVELED SEAL RIM
              </span>
            </div>
          </Html>
        )}
      </group>

      {/* 1D. Poured Botanical Lip Butter Core (Fresh glossy balm with debossed seal) */}
      <group ref={balmCoreGroupRef} position={[0, 0, 0]}>
        {/* Buttery Balm Body */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[1.56, 1.56, 0.16, 64]} />
          <meshStandardMaterial
            color={balmColorObj}
            roughness={0.16}
            metalness={0.05}
          />
        </mesh>

        {/* Top Dome Surface with Monogram Texture & Specular Sheen */}
        <mesh position={[0, 0.191, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.56, 64]} />
          <meshStandardMaterial
            map={balmTexture}
            roughness={0.14}
            metalness={0.06}
            side={THREE.DoubleSide}
          />
        </mesh>

        {isExploded && (
          <Html position={[-2.3, 0.19, 0]} center distanceFactor={8}>
            <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#7B2638]/20 shadow-xs flex items-center gap-1.5 whitespace-nowrap pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B2638]" />
              <span className="text-[10px] font-mono uppercase font-bold text-[#7B2638]">
                04. 15G VEGAN LIP BUTTER
              </span>
            </div>
          </Html>
        )}
      </group>

      {/* =================================================================== */}
      {/* 2. UPPER LID ASSEMBLY (3D Hinge Pivot, Mirror Glass & Illustrated Lid) */}
      {/* =================================================================== */}

      {/* When NOT exploded, the lid rotates about the rear hinge axis [0, 0.18, -1.8] */}
      {!isExploded ? (
        <group position={[0, 0.18, -1.8]}>
          {/* Rotating Hinge Pivot Rig */}
          <group ref={hingePivotRef}>
            {/* The Lid Assembly offset from hinge pivot back to center [0, -0.18, 1.8] */}
            <group position={[0, -0.18, 1.8]}>
              {/* Lid Aluminum Shell */}
              <mesh position={[0, 0.28, 0]}>
                <cylinderGeometry args={[1.8, 1.8, 0.18, 64]} />
                <meshStandardMaterial
                  color={tinColorObj}
                  roughness={0.32}
                  metalness={0.38}
                />
              </mesh>

              {/* Top Chamfer Edge Ring */}
              <mesh position={[0, 0.37, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.78, 0.024, 16, 64]} />
                <meshStandardMaterial
                  color="#FFFFFF"
                  roughness={0.15}
                  metalness={0.8}
                />
              </mesh>

              {/* TOP LID EXTERIOR: Illustrated Graphic & Mascot Texture */}
              <mesh position={[0, 0.372, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.78, 64]} />
                <meshStandardMaterial
                  map={topLidTexture}
                  roughness={0.3}
                  metalness={0.32}
                  side={THREE.DoubleSide}
                />
              </mesh>

              {/* LID UNDERSIDE: Optical Vanity Mirror Inside Lid */}
              <group position={[0, 0.189, 0]} rotation={[Math.PI / 2, 0, 0]}>
                {/* Mirror Glass with Chrome Bevel and Watermark */}
                <mesh position={[0, 0, 0]}>
                  <circleGeometry args={[1.58, 64]} />
                  <meshStandardMaterial
                    map={mirrorTexture}
                    roughness={0.03}
                    metalness={0.96}
                    side={THREE.DoubleSide}
                  />
                </mesh>

                {/* Mirror Beveled Chrome Rim */}
                <mesh position={[0, 0, -0.01]}>
                  <torusGeometry args={[1.62, 0.03, 16, 64]} />
                  <meshStandardMaterial
                    color="#FFFFFF"
                    roughness={0.08}
                    metalness={0.95}
                  />
                </mesh>
              </group>

              {/* Lid-side Hinge Knuckle */}
              <mesh position={[0, 0.18, -1.8]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.072, 0.072, 0.38, 32]} />
                <meshStandardMaterial
                  color="#E0D6CD"
                  roughness={0.18}
                  metalness={0.88}
                />
              </mesh>

              {/* Front Lip Clasp Notch */}
              <mesh position={[0, 0.2, 1.81]}>
                <boxGeometry args={[0.3, 0.08, 0.06]} />
                <meshStandardMaterial
                  color="#FFFFFF"
                  roughness={0.15}
                  metalness={0.9}
                />
              </mesh>
            </group>
          </group>
        </group>
      ) : (
        /* When EXPLODED, separate Mirror and Lid into independent vertical layers! */
        <>
          {/* 2B. Vanity Mirror Layer */}
          <group ref={mirrorGroupRef} position={[0, 0, 0]}>
            <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[1.58, 64]} />
              <meshStandardMaterial
                map={mirrorTexture}
                roughness={0.03}
                metalness={0.96}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.62, 0.03, 16, 64]} />
              <meshStandardMaterial
                color="#FFFFFF"
                roughness={0.08}
                metalness={0.95}
              />
            </mesh>
            <Html position={[-2.3, 0.2, 0]} center distanceFactor={8}>
              <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#7B2638]/20 shadow-xs flex items-center gap-1.5 whitespace-nowrap pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7B2638]" />
                <span className="text-[10px] font-mono uppercase font-bold text-[#7B2638]">
                  02. OPTICAL MIRROR
                </span>
              </div>
            </Html>
          </group>

          {/* 2A. Illustrated Top Lid Layer */}
          <group ref={lidPlateGroupRef} position={[0, 0, 0]}>
            <mesh position={[0, 0.35, 0]}>
              <cylinderGeometry args={[1.8, 1.8, 0.16, 64]} />
              <meshStandardMaterial
                color={tinColorObj}
                roughness={0.32}
                metalness={0.38}
              />
            </mesh>
            <mesh position={[0, 0.432, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[1.78, 64]} />
              <meshStandardMaterial
                map={topLidTexture}
                roughness={0.3}
                metalness={0.32}
                side={THREE.DoubleSide}
              />
            </mesh>
            <Html position={[2.1, 0.43, 0]} center distanceFactor={8}>
              <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#7B2638]/20 shadow-xs flex items-center gap-1.5 whitespace-nowrap pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7B2638]" />
                <span className="text-[10px] font-mono uppercase font-bold text-[#7B2638]">
                  01. MATTE ALUMINUM LID
                </span>
              </div>
            </Html>
          </group>
        </>
      )}
    </group>
  );
};

// -----------------------------------------------------------------------------
// LIGHTING RIG & STUDIO ENVIRONMENT
// -----------------------------------------------------------------------------
const StudioLighting: React.FC<{
  product: Product;
  mode: 'studio' | 'golden' | 'rose';
}> = ({ product, mode }) => {
  const lightingSetup = useMemo(() => {
    switch (mode) {
      case 'golden':
        return {
          ambient: '#FFF3E0',
          ambientIntensity: 0.85,
          keyLight: '#FFE0B2',
          fillLight: '#FFCC80',
          rimLight: '#FFFFFF',
        };
      case 'rose':
        return {
          ambient: '#FCE4EC',
          ambientIntensity: 0.9,
          keyLight: '#F8BBD0',
          fillLight: product.tinAccentColor,
          rimLight: '#FFFFFF',
        };
      case 'studio':
      default:
        return {
          ambient: '#FFFFFF',
          ambientIntensity: 0.95,
          keyLight: '#FFFFFF',
          fillLight: product.tinColor,
          rimLight: '#FFFFFF',
        };
    }
  }, [mode, product]);

  return (
    <>
      {/* Soft Ambient Fill */}
      <ambientLight
        color={lightingSetup.ambient}
        intensity={lightingSetup.ambientIntensity}
      />

      {/* Key Light: High Angle Studio Light */}
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.8}
        color={lightingSetup.keyLight}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Fill Light: Soft bounce light tinted with product's palette */}
      <directionalLight
        position={[-5, 3, -4]}
        intensity={1.1}
        color={lightingSetup.fillLight}
      />

      {/* Rim Light: Sharp backlight edge highlights for metallic chamfer */}
      <directionalLight
        position={[0, -4, -6]}
        intensity={0.85}
        color={lightingSetup.rimLight}
      />

      {/* Top Overhead Specular Highlight for the Butter & Mirror Reflection */}
      <pointLight position={[0, 4.5, 0]} intensity={1.2} color="#FFFFFF" />
    </>
  );
};

// -----------------------------------------------------------------------------
// MAIN EXPORT: ThreeBalmViewer (React Three Fiber 3D Model Viewer)
// -----------------------------------------------------------------------------
export const ThreeBalmViewer: React.FC<ThreeBalmViewerProps> = ({
  product,
  initialMode = 'orbit',
  heightClass = 'h-[360px] sm:h-[440px]',
  showControls = true,
}) => {
  const controlsRef = useRef<any>(null);

  // States
  const [isOpen, setIsOpen] = useState<boolean>(initialMode === 'open');
  const [isExploded, setIsExploded] = useState<boolean>(initialMode === 'exploded');
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);
  const [isFloating, setIsFloating] = useState<boolean>(true);
  const [lightingMode, setLightingMode] = useState<'studio' | 'golden' | 'rose'>('studio');
  const [activePreset, setActivePreset] = useState<'lid' | 'open' | 'side' | 'bottom' | 'iso'>('lid');

  // Camera Presets
  const applyPreset = (preset: 'lid' | 'open' | 'side' | 'bottom' | 'iso') => {
    setActivePreset(preset);
    setIsExploded(false);

    if (!controlsRef.current) return;

    switch (preset) {
      case 'lid':
        setIsOpen(false);
        controlsRef.current.setAzimuthalAngle(0);
        controlsRef.current.setPolarAngle(0.35); // top-down slightly angled
        break;
      case 'open':
        setIsOpen(true);
        controlsRef.current.setAzimuthalAngle(-0.35);
        controlsRef.current.setPolarAngle(0.85); // angled to see both mirror and balm
        break;
      case 'side':
        setIsOpen(false);
        controlsRef.current.setAzimuthalAngle(Math.PI / 2);
        controlsRef.current.setPolarAngle(Math.PI / 2 - 0.05); // direct side profile
        break;
      case 'bottom':
        setIsOpen(false);
        controlsRef.current.setAzimuthalAngle(Math.PI);
        controlsRef.current.setPolarAngle(Math.PI - 0.35); // bottom view
        break;
      case 'iso':
        controlsRef.current.setAzimuthalAngle(Math.PI / 4);
        controlsRef.current.setPolarAngle(Math.PI / 3); // classic 45° isometric
        break;
    }
  };

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setIsExploded(false);
      if (controlsRef.current) {
        controlsRef.current.setAzimuthalAngle(-0.35);
        controlsRef.current.setPolarAngle(0.85);
        setActivePreset('open');
      }
    } else {
      if (activePreset === 'open') setActivePreset('lid');
    }
  };

  const toggleExploded = () => {
    const nextState = !isExploded;
    setIsExploded(nextState);
    if (nextState) {
      setIsOpen(false);
      if (controlsRef.current) {
        controlsRef.current.setAzimuthalAngle(-Math.PI / 4);
        controlsRef.current.setPolarAngle(Math.PI / 3.2);
      }
    }
  };

  const resetCamera = () => {
    setIsOpen(false);
    setIsExploded(false);
    setIsAutoRotate(false);
    setIsFloating(true);
    setActivePreset('lid');
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.setAzimuthalAngle(0);
      controlsRef.current.setPolarAngle(0.4);
    }
  };

  const zoomIn = () => {
    if (controlsRef.current) {
      const currentDist = controlsRef.current.getDistance();
      controlsRef.current.minDistance = Math.max(2.2, currentDist - 0.8);
      setTimeout(() => {
        if (controlsRef.current) controlsRef.current.minDistance = 2.2;
      }, 300);
    }
  };

  const zoomOut = () => {
    if (controlsRef.current) {
      const currentDist = controlsRef.current.getDistance();
      controlsRef.current.maxDistance = Math.min(8.5, currentDist + 0.8);
      setTimeout(() => {
        if (controlsRef.current) controlsRef.current.maxDistance = 8.5;
      }, 300);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* =================================================================== */}
      {/* 3D CANVAS VIEWPORT (React Three Fiber)                              */}
      {/* =================================================================== */}
      <div
        className={`relative w-full ${heightClass} rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center`}
        style={{
          background: 'radial-gradient(circle at 50% 45%, #FFFFFF 0%, #FAF5F0 70%, #F5EFEB 100%)',
        }}
      >
        {/* Soft studio mood ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${product.tinAccentColor} 0%, transparent 65%)`,
          }}
        />

        <Canvas
          camera={{ position: [0, 2.5, 4.8], fov: 42 }}
          shadows
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            {/* Studio Lighting */}
            <StudioLighting product={product} mode={lightingMode} />

            {/* Float wrapper for delicate floating luxury levitation */}
            {isFloating && !isExploded ? (
              <Float
                speed={2}
                rotationIntensity={0.15}
                floatIntensity={0.25}
                floatingRange={[-0.08, 0.08]}
              >
                <CompactModel
                  product={product}
                  isOpen={isOpen}
                  isExploded={isExploded}
                  isFloating={isFloating}
                  activeLighting={lightingMode}
                />
              </Float>
            ) : (
              <CompactModel
                product={product}
                isOpen={isOpen}
                isExploded={isExploded}
                isFloating={isFloating}
                activeLighting={lightingMode}
              />
            )}

            {/* Soft Studio Floor Contact Shadows */}
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={isExploded ? 0.25 : 0.55}
              scale={8}
              blur={2.4}
              far={4}
              color={product.tinAccentColor}
            />

            {/* Smooth Orbit Controls with Damping */}
            <OrbitControls
              ref={controlsRef}
              enableDamping
              dampingFactor={0.06}
              minDistance={2.4}
              maxDistance={8.0}
              autoRotate={isAutoRotate}
              autoRotateSpeed={2.4}
              maxPolarAngle={Math.PI - 0.15}
            />
          </Suspense>
        </Canvas>

        {/* Floating WebGL Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[#7B2638]/20 shadow-xs flex items-center gap-2 pointer-events-none z-10">
          <Sparkles className="w-3.5 h-3.5 text-[#7B2638] animate-spin" />
          <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#7B2638]">
            3D WEBGL • DRAG TO ROTATE 360°
          </span>
        </div>

        {/* Zoom & Reset Overlay Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
          <button
            onClick={zoomIn}
            className="p-1.5 bg-white/90 hover:bg-white text-[#111111] rounded-md border border-[#E8D3C2] shadow-2xs cursor-pointer transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={zoomOut}
            className="p-1.5 bg-white/90 hover:bg-white text-[#111111] rounded-md border border-[#E8D3C2] shadow-2xs cursor-pointer transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetCamera}
            className="p-1.5 bg-white/90 hover:bg-white text-[#7B2638] rounded-md border border-[#E8D3C2] shadow-2xs cursor-pointer transition-colors"
            title="Reset 3D Camera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pinch/Scroll helper on hover */}
        <div className="absolute bottom-3 right-3 bg-white/85 backdrop-blur-xs px-2 py-0.5 rounded text-[8.5px] font-mono text-[#111111]/70 pointer-events-none border border-[#E8D3C2]">
          SCROLL OR PINCH TO ZOOM
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3D CONTROLS TOOLBAR & MOTION MODES                                  */}
      {/* =================================================================== */}
      {showControls && (
        <div className="w-full mt-3 p-3 bg-white/95 rounded-2xl border border-[#E8D3C2] shadow-xs space-y-3">
          {/* Row 1: Camera Presets & Angles */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7B2638] mr-1">
                PRESET:
              </span>
              <button
                onClick={() => applyPreset('lid')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activePreset === 'lid' && !isOpen && !isExploded
                    ? 'bg-[#7B2638] text-white shadow-xs'
                    : 'bg-[#FFF8F2] text-[#111111] hover:border-[#7B2638] border border-[#E8D3C2]'
                }`}
              >
                TOP LID
              </button>
              <button
                onClick={() => applyPreset('open')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isOpen && !isExploded
                    ? 'bg-[#7B2638] text-white shadow-xs'
                    : 'bg-[#FFF8F2] text-[#111111] hover:border-[#7B2638] border border-[#E8D3C2]'
                }`}
              >
                OPEN & MIRROR
              </button>
              <button
                onClick={() => applyPreset('side')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activePreset === 'side' && !isOpen && !isExploded
                    ? 'bg-[#7B2638] text-white shadow-xs'
                    : 'bg-[#FFF8F2] text-[#111111] hover:border-[#7B2638] border border-[#E8D3C2]'
                }`}
              >
                SIDE PROFILE
              </button>
              <button
                onClick={() => applyPreset('bottom')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activePreset === 'bottom' && !isOpen && !isExploded
                    ? 'bg-[#7B2638] text-white shadow-xs'
                    : 'bg-[#FFF8F2] text-[#111111] hover:border-[#7B2638] border border-[#E8D3C2]'
                }`}
              >
                BOTTOM BATCH
              </button>
              <button
                onClick={() => applyPreset('iso')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activePreset === 'iso' && !isOpen && !isExploded
                    ? 'bg-[#7B2638] text-white shadow-xs'
                    : 'bg-[#FFF8F2] text-[#111111] hover:border-[#7B2638] border border-[#E8D3C2]'
                }`}
              >
                3D ISOMETRIC
              </button>
            </div>

            {/* Lighting Mode Selector */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#7B2638] flex items-center gap-1 mr-1">
                <Sun className="w-3 h-3 text-[#7B2638]" />
                <span>LIGHT:</span>
              </span>
              <button
                onClick={() => setLightingMode('studio')}
                className={`px-2 py-0.5 rounded text-[9.5px] font-mono uppercase font-bold transition-all cursor-pointer ${
                  lightingMode === 'studio'
                    ? 'bg-[#7B2638] text-white shadow-2xs'
                    : 'bg-[#FFF8F2] text-[#111111]/70 hover:text-[#7B2638] border border-[#E8D3C2]'
                }`}
              >
                STUDIO
              </button>
              <button
                onClick={() => setLightingMode('golden')}
                className={`px-2 py-0.5 rounded text-[9.5px] font-mono uppercase font-bold transition-all cursor-pointer ${
                  lightingMode === 'golden'
                    ? 'bg-[#7B2638] text-white shadow-2xs'
                    : 'bg-[#FFF8F2] text-[#111111]/70 hover:text-[#7B2638] border border-[#E8D3C2]'
                }`}
              >
                GOLDEN
              </button>
              <button
                onClick={() => setLightingMode('rose')}
                className={`px-2 py-0.5 rounded text-[9.5px] font-mono uppercase font-bold transition-all cursor-pointer ${
                  lightingMode === 'rose'
                    ? 'bg-[#7B2638] text-white shadow-2xs'
                    : 'bg-[#FFF8F2] text-[#111111]/70 hover:text-[#7B2638] border border-[#E8D3C2]'
                }`}
              >
                ROSE
              </button>
            </div>
          </div>

          {/* Row 2: Interactive Motions & Physics */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#FFF8F2]">
            <div className="flex items-center gap-2">
              {/* Interactive 3D Hinge Open/Close */}
              <button
                onClick={toggleOpen}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  isOpen
                    ? 'bg-[#7B2638] text-white shadow-xs'
                    : 'bg-[#FFF8F2] hover:bg-[#F8DDE0] text-[#7B2638] border border-[#7B2638]/30'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isOpen ? 'CLOSE LID' : 'OPEN COMPACT (3D)'}</span>
              </button>

              {/* Exploded 3D Anatomy */}
              <button
                onClick={toggleExploded}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  isExploded
                    ? 'bg-[#7B2638] text-white shadow-xs'
                    : 'bg-[#FFF8F2] hover:bg-[#F8DDE0] text-[#7B2638] border border-[#7B2638]/30'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isExploded ? 'ASSEMBLE' : '3D EXPLODED LAYERS'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Auto Turntable Orbit Spin */}
              <button
                onClick={() => setIsAutoRotate((prev) => !prev)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                  isAutoRotate
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#FFF8F2] text-[#111111] hover:bg-white border border-[#E8D3C2]'
                }`}
              >
                {isAutoRotate ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>360° AUTO SPIN</span>
              </button>

              {/* Floating Levitation */}
              <button
                onClick={() => setIsFloating((prev) => !prev)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isFloating
                    ? 'bg-[#F8DDE0] text-[#7B2638] border border-[#7B2638]/30'
                    : 'bg-[#FFF8F2] text-[#111111]/70 border border-[#E8D3C2]'
                }`}
              >
                {isFloating ? 'FLOAT: ON' : 'FLOAT: OFF'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
