import { motion, useTransform } from 'framer-motion';
import { useMemo } from 'react';

export default function AnimatedHeroBackground({ progress }) {
    // Generate realistic full-screen rain droplets with stable random values
    const rainDrops = useMemo(() => {
        return Array.from({ length: 120 }).map(() => ({
            left: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 0.6 + Math.random() * 0.4,
            height: 30 + Math.random() * 30,
            splashOffset: Math.random() > 0.5 ? 15 : -15
        }));
    }, []);

    // Phase 1 (Leaking): 0 to 35% of scroll
    // Phase 2 (Applying): 35% to 55% of scroll
    // Phase 3 (Waterproof): 55% to 100% of scroll

    // Scroll-driven Opacities and Transforms
    const leakingOpacity = useTransform(progress, [0, 0.35, 0.45], [1, 1, 0]);
    const epoxyWidth = useTransform(progress, [0.35, 0.55], ['0%', '200%']);
    const bounceOpacity = useTransform(progress, [0.45, 0.55, 1], [0, 1, 1]);

    // Status Indicator Opacities
    const status1Opacity = useTransform(progress, [0, 0.35, 0.45], [1, 1, 0.3]);
    const status2Opacity = useTransform(progress, [0.25, 0.45, 0.55, 0.75], [0.3, 1, 1, 0.3]);
    const status3Opacity = useTransform(progress, [0.45, 0.55, 1], [0.3, 1, 1]);

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, backgroundColor: '#ffffff' }}>
            
            {/* White gradient overlay for text readability */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, transparent 0%, #ffffff 90%)',
                zIndex: 10,
                pointerEvents: 'none'
            }}></div>

            {/* PHASE 1: Realistic Rain (Full Screen, Leaking through cracks) */}
            {rainDrops.map((drop, i) => (
                <motion.div
                    key={`leak-${i}`}
                    animate={{ 
                        y: ['-10vh', '60vh'], // Falls completely through the floor
                        opacity: [0, 0.7, 0]
                    }}
                    transition={{
                        duration: drop.duration, // Fast, realistic rain
                        repeat: Infinity,
                        delay: drop.delay,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        left: `${drop.left}%`, // Full screen width, stable
                        width: '1px',
                        height: `${drop.height}px`,
                        background: 'linear-gradient(to bottom, transparent, #3b82f6)',
                        transform: 'rotate(10deg)', // Slight wind angle
                        zIndex: 1,
                        opacity: leakingOpacity
                    }}
                />
            ))}

            {/* PHASE 3: Waterproof Bouncing Rain (Full Screen, splashes on surface) */}
            {rainDrops.map((drop, i) => (
                <motion.div
                    key={`bounce-${i}`}
                    animate={{ 
                        y: ['-10vh', '50vh', '48vh'], // Hits the 50vh horizon and bounces slightly
                        x: [0, 0, drop.splashOffset], // Small splash
                        scale: [1, 1, 0]
                    }}
                    transition={{
                        duration: drop.duration,
                        repeat: Infinity,
                        delay: drop.delay,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        left: `${drop.left}%`,
                        width: '2px',
                        height: `${drop.height * 0.6}px`, // slightly shorter when bouncing
                        background: 'linear-gradient(to bottom, transparent, #06b6d4)',
                        transform: 'rotate(10deg)',
                        borderRadius: '2px',
                        zIndex: 4, // Bounces ABOVE the epoxy
                        opacity: bounceOpacity
                    }}
                />
            ))}

            {/* 3D Floor / Roof Container */}
            <div style={{
                position: 'absolute',
                top: '50%', left: 0,
                width: '100%', height: '50vh',
                perspective: '1000px',
                zIndex: 2,
                overflow: 'hidden'
            }}>
                {/* The Floor Base (Cracked Concrete, 3D rotated) */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: '-50%',
                    width: '200%', height: '200vh',
                    backgroundColor: '#f1f5f9',
                    backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.3) 2px, transparent 2px), linear-gradient(90deg, rgba(148, 163, 184, 0.3) 2px, transparent 2px)',
                    backgroundSize: '100px 100px',
                    borderTop: '6px solid #cbd5e1',
                    transform: 'rotateX(70deg)',
                    transformOrigin: 'top center',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    {/* Multiple Sprawling Cracks SVG Base */}
                    <svg viewBox="0 0 800 200" style={{ width: '100vw', maxWidth: '1200px', height: '300px', opacity: 0.6, position: 'absolute', top: 0 }}>
                        <g stroke="#94a3b8" fill="none">
                            {/* Center Crack */}
                            <path d="M 400 0 L 390 30 L 410 70 L 380 120 L 420 180 L 400 200" strokeWidth="4" />
                            <path d="M 410 70 L 480 90 L 520 150" strokeWidth="3" />
                            <path d="M 390 30 L 320 50 L 290 110 L 250 140" strokeWidth="3" />
                            <path d="M 290 110 L 270 180" strokeWidth="2" />
                            <path d="M 480 90 L 550 70 L 610 110" strokeWidth="2" />
                            <path d="M 380 120 L 330 160 L 310 200" strokeWidth="2" />
                            {/* Left Crack */}
                            <path d="M 150 0 L 170 40 L 140 90 L 190 150 L 160 200" strokeWidth="4" />
                            <path d="M 170 40 L 220 30 L 260 80" strokeWidth="3" />
                            <path d="M 140 90 L 90 110 L 60 180" strokeWidth="2" />
                            {/* Right Crack */}
                            <path d="M 650 0 L 630 50 L 670 120 L 620 180 L 660 200" strokeWidth="4" />
                            <path d="M 630 50 L 580 40 L 540 80" strokeWidth="3" />
                            <path d="M 670 120 L 730 140 L 760 190" strokeWidth="2" />
                        </g>
                    </svg>

                    {/* Animated Water Flowing INSIDE ALL the cracks */}
                    <motion.svg viewBox="0 0 800 200" style={{ width: '100vw', maxWidth: '1200px', height: '300px', position: 'absolute', top: 0, opacity: leakingOpacity }}>
                        {[
                            { d: "M 400 0 L 390 30 L 410 70 L 380 120 L 420 180 L 400 200", w: 4, delay: 0.1, dur: 1.5 },
                            { d: "M 410 70 L 480 90 L 520 150", w: 3, delay: 0.4, dur: 1.2 },
                            { d: "M 390 30 L 320 50 L 290 110 L 250 140", w: 3, delay: 0.3, dur: 1.4 },
                            { d: "M 290 110 L 270 180", w: 2, delay: 0.8, dur: 1.0 },
                            { d: "M 480 90 L 550 70 L 610 110", w: 2, delay: 0.7, dur: 1.3 },
                            { d: "M 380 120 L 330 160 L 310 200", w: 2, delay: 0.6, dur: 1.1 },
                            { d: "M 150 0 L 170 40 L 140 90 L 190 150 L 160 200", w: 4, delay: 0.5, dur: 1.6 },
                            { d: "M 170 40 L 220 30 L 260 80", w: 3, delay: 0.9, dur: 1.2 },
                            { d: "M 140 90 L 90 110 L 60 180", w: 2, delay: 1.1, dur: 1.4 },
                            { d: "M 650 0 L 630 50 L 670 120 L 620 180 L 660 200", w: 4, delay: 0.2, dur: 1.7 },
                            { d: "M 630 50 L 580 40 L 540 80", w: 3, delay: 0.6, dur: 1.3 },
                            { d: "M 670 120 L 730 140 L 760 190", w: 2, delay: 1.0, dur: 1.2 },
                        ].map((path, i) => (
                            <motion.path
                                key={`water-crack-${i}`}
                                d={path.d}
                                stroke="#0ea5e9"
                                strokeWidth={path.w + 1} // slightly thicker to make the water pop
                                fill="none"
                                initial={{ pathLength: 0, opacity: 1 }}
                                animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                                transition={{ duration: path.dur, repeat: Infinity, ease: 'easeIn', delay: path.delay }}
                            />
                        ))}
                    </motion.svg>
                </div>

                {/* The Epoxy Layer (Scroll-driven width, 3D rotated) */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0, left: '-50%',
                        height: '200vh',
                        background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.6), rgba(6, 182, 212, 0.95))',
                        borderTop: '8px solid #06b6d4',
                        boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)',
                        transform: 'rotateX(70deg) translateZ(5px)',
                        transformOrigin: 'top center',
                        zIndex: 3,
                        backdropFilter: 'blur(2px)',
                        width: epoxyWidth
                    }}
                >
                    {/* Glossy reflection on the epoxy */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '50px',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)'
                    }}></div>
                </motion.div>
            </div>
            
            {/* Status Text Indicator for the animation story */}
            <div style={{ position: 'absolute', bottom: '2vh', right: '2vw', zIndex: 11, display: 'flex', gap: '10px', alignItems: 'center' }}>
                <motion.span style={{ opacity: status1Opacity, fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>1. Water Leaking</motion.span>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#cbd5e1' }}></div>
                <motion.span style={{ opacity: status2Opacity, fontSize: '0.8rem', color: '#06b6d4', fontWeight: 'bold' }}>2. Epoxy Applied</motion.span>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#cbd5e1' }}></div>
                <motion.span style={{ opacity: status3Opacity, fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>3. 100% Waterproofed</motion.span>
            </div>
        </div>
    );
}
