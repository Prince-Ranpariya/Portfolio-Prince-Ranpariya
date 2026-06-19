"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BrandCard {
  name: string;
  color: string;
}

const BRANDS: BrandCard[] = [
  { name: "Liquid", color: "text-[#00FF7F]" },
  { name: "Next.js", color: "text-white dark:text-white" },
  { name: "Tailwind", color: "text-sky-400" },
  { name: "React", color: "text-cyan-400" },
  { name: "GraphQL", color: "text-pink-500" },
  { name: "GSAP", color: "text-green-500" },
  { name: "Framer", color: "text-purple-500" },
  { name: "Hydrogen", color: "text-orange-400" },
];

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export default function BrandOrbit() {
  const [borderRadiusSlider, setBorderRadiusSlider] = useState(24); // Sharp to Rounded (0 to 100)
  const [scaleSlider, setScaleSlider] = useState(100); // Small to Large (50 to 150)
  const [motionSlider, setMotionSlider] = useState(0); // Push to Linear (0 to 100)
  
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  // Border radius map (0 to 50%)
  const borderRadius = `${borderRadiusSlider / 2}%`;
  // Scale map (0.5 to 1.5)
  const scale = scaleSlider / 100;
  // Font weight map (400 to 900)
  const fontWeight = Math.round(400 + (scaleSlider - 50) * 5);

  useEffect(() => {
    lastTimeRef.current = performance.now();

    const animate = (time: number) => {
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Update virtual time
      timeRef.current += dt;

      // 1. Calculate Push Mode Angle (orbit and pause)
      // cycle duration is 2800ms
      const cycleDuration = 2800;
      const cycle = timeRef.current / cycleDuration;
      const step = Math.floor(cycle);
      const progress = cycle - step;

      const rotateFraction = 0.25; // 25% of the cycle is rotation, 75% is pause
      let easedProgress = 1;
      if (progress < rotateFraction) {
        easedProgress = easeInOutCubic(progress / rotateFraction);
      }
      const pushStep = step + easedProgress;
      const anglePush = pushStep * 45; // 8 cards, 360/8 = 45 deg per step

      // 2. Calculate Linear Mode Angle (constant spin)
      // 1 full spin (360 deg) every 14 seconds
      const linearSpeed = 360 / 14000; // deg per ms
      const angleLinear = timeRef.current * linearSpeed;

      // 3. Blend the angles
      const blend = motionSlider / 100;
      const currentAngle = (1 - blend) * anglePush + blend * angleLinear;

      // 4. Update coordinates of cards directly in DOM for 60fps performance
      const isMobile = window.innerWidth < 768;
      const radius = isMobile ? 120 : 255;

      cardsRef.current.forEach((cardEl, i) => {
        if (!cardEl) return;
        const cardBaseAngle = i * 45;
        const thetaDeg = currentAngle + cardBaseAngle;
        const thetaRad = (thetaDeg * Math.PI) / 180;
        const x = Math.cos(thetaRad) * radius;
        const y = Math.sin(thetaRad) * radius;

        cardEl.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [motionSlider, scale]);

  return (
    <section
      id="brand-orbit"
      className="relative py-24 md:py-32 overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-primary)] transition-colors duration-350"
      aria-label="Interactive brand orbit playground"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col items-center gap-16">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4 max-w-[600px]">
          <span className="eyebrow text-[#00FF7F]">Dynamic Controls</span>
          <h2 className="section-heading text-[var(--text-primary)] leading-tight">
            E-commerce Tech Orbit
          </h2>
          <p className="text-[var(--text-secondary)] font-body text-sm md:text-base">
            Adjust the sliders to morph the shape, size, and motion rhythm of my core development stack.
          </p>
        </div>

        {/* Circular Orbit Display Area */}
        <div className="relative w-full min-h-[360px] md:min-h-[600px] flex items-center justify-center select-none">
          
          {/* Circular Track Guide */}
          <div className="absolute w-[240px] h-[240px] md:w-[510px] md:h-[510px] rounded-full border border-[var(--border-color)] opacity-40 pointer-events-none" />

          {/* Central Control Panel (Desktop Only in Center, Mobile Below) */}
          <div className="hidden md:flex absolute z-50 w-[280px] flex-col gap-6 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/90 backdrop-blur-md shadow-xl text-center">
            <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">Control Panel</h3>
            
            {/* Slider 1: Shape */}
            <div className="flex flex-col items-start gap-1">
              <div className="w-full flex justify-between font-mono text-[10px] text-[var(--text-secondary)] font-bold">
                <span>Sharp</span>
                <span>Rounded</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={borderRadiusSlider}
                onChange={(e) => setBorderRadiusSlider(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-[#00FF7F]"
                aria-label="Card corner sharpness slider"
              />
            </div>

            {/* Slider 2: Size */}
            <div className="flex flex-col items-start gap-1">
              <div className="w-full flex justify-between font-mono text-[10px] text-[var(--text-secondary)] font-bold">
                <span>Small</span>
                <span>Large</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={scaleSlider}
                onChange={(e) => setScaleSlider(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-[#00FF7F]"
                aria-label="Card scale slider"
              />
            </div>

            {/* Slider 3: Rhythm */}
            <div className="flex flex-col items-start gap-1">
              <div className="w-full flex justify-between font-mono text-[10px] text-[var(--text-secondary)] font-bold">
                <span>Push</span>
                <span>Linear</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={motionSlider}
                onChange={(e) => setMotionSlider(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-[#00FF7F]"
                aria-label="Orbit motion rhythm slider"
              />
            </div>
          </div>

          {/* Central Logo (Mobile Only in Center) */}
          <div className="md:hidden absolute z-50 w-24 h-24 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]/90 backdrop-blur-md flex items-center justify-center shadow-lg">
            <span className="font-display font-black text-sm text-[#00FF7F] tracking-wider">PRINCE</span>
          </div>

          {/* Orbiting Brand Cards Container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {BRANDS.map((brand, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="absolute top-1/2 left-1/2 w-16 h-16 md:w-28 md:h-28 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-md flex items-center justify-center font-display font-medium text-xs md:text-base pointer-events-auto transition-colors duration-300 select-none text-center"
                style={{
                  borderRadius,
                  fontWeight,
                }}
              >
                <span className={brand.color}>{brand.name}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Mobile Control Panel (Rendered below the orbit for accessibility) */}
        <div className="md:hidden w-full max-w-[340px] flex flex-col gap-5 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-lg text-center">
          <h3 className="font-display font-bold text-base text-[var(--text-primary)]">Control Panel</h3>
          
          {/* Slider 1: Shape */}
          <div className="flex flex-col items-start gap-1">
            <div className="w-full flex justify-between font-mono text-[9px] text-[var(--text-secondary)] font-bold">
              <span>Sharp</span>
              <span>Rounded</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={borderRadiusSlider}
              onChange={(e) => setBorderRadiusSlider(Number(e.target.value))}
              className="w-full h-1 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-[#00FF7F]"
              aria-label="Mobile card corner sharpness slider"
            />
          </div>

          {/* Slider 2: Size */}
          <div className="flex flex-col items-start gap-1">
            <div className="w-full flex justify-between font-mono text-[9px] text-[var(--text-secondary)] font-bold">
              <span>Small</span>
              <span>Large</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={scaleSlider}
              onChange={(e) => setScaleSlider(Number(e.target.value))}
              className="w-full h-1 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-[#00FF7F]"
              aria-label="Mobile card scale slider"
            />
          </div>

          {/* Slider 3: Rhythm */}
          <div className="flex flex-col items-start gap-1">
            <div className="w-full flex justify-between font-mono text-[9px] text-[var(--text-secondary)] font-bold">
              <span>Push</span>
              <span>Linear</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={motionSlider}
              onChange={(e) => setMotionSlider(Number(e.target.value))}
              className="w-full h-1 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-[#00FF7F]"
              aria-label="Mobile orbit motion rhythm slider"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
