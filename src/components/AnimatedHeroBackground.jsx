import { motion, useTransform } from 'framer-motion';
import { useMemo } from 'react';

export default function AnimatedHeroBackground({ progress }) {
    // Generate highly realistic, fine full-screen rain droplets
    const rainDrops = useMemo(() => {
        return Array.from({ length: 200 }).map(() => {
            // Depth layers: 1 = far background, 2 = midground, 3 = foreground
            const depth = Math.random();
            const layer = depth > 0.85 ? 3 : (depth > 0.4 ? 2 : 1);
            
            // Foreground rain is faster, but still very thin and faint to look like real water
            const speedMultiplier = layer === 3 ? 1.5 : (layer === 2 ? 1 : 0.7);
            const width = 1; // Real rain is always visually thin, never thick blocks
            const baseOpacity = layer === 3 ? 0.35 : (layer === 2 ? 0.2 : 0.08); // Much fainter for realism
            
            return {
                left: Math.random() * 100,
                delay: Math.random() * 2,
                duration: (0.3 + Math.random() * 0.2) / speedMultiplier, // Very fast
                height: (40 + Math.random() * 40) * speedMultiplier, // Long motion-blur streaks
                width: width,
                baseOpacity: baseOpacity,
                splashOffset: Math.random() > 0.5 ? 10 * speedMultiplier : -10 * speedMultiplier
            };
        });
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
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, backgroundColor: '#f8fafc' }}>
            
            {/* Stormy Dark Clouds Background Overlay */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '60vh',
                background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.9), rgba(51, 65, 85, 0.7), transparent)',
                zIndex: 0
            }}></div>

            {/* Physical SVG Cloud Shapes */}
            <svg width="100%" height="30vh" style={{ position: 'absolute', top: '-5vh', left: 0, zIndex: 1, filter: 'blur(8px)', opacity: 0.9 }}>
                <circle cx="5%" cy="0" r="100" fill="#0f172a" />
                <circle cx="20%" cy="20" r="140" fill="#1e293b" />
                <circle cx="35%" cy="0" r="180" fill="#0f172a" />
                <circle cx="50%" cy="30" r="150" fill="#334155" />
                <circle cx="65%" cy="-10" r="200" fill="#1e293b" />
                <circle cx="85%" cy="40" r="160" fill="#0f172a" />
                <circle cx="100%" cy="10" r="120" fill="#334155" />
            </svg>

            {/* Ambient Lightning Flashes (Full Screen) */}
            <motion.div
                style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    zIndex: 0, pointerEvents: 'none'
                }}
                animate={{ opacity: [0, 0, 0, 0, 0.6, 0, 0, 0.3, 0, 0, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Physical Lightning Bolts */}
            <motion.svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '35vh', zIndex: 1, pointerEvents: 'none' }}>
                {/* Bolt 1 (Left) */}
                <motion.path
                    d="M 25,10 L 28,30 L 22,35 L 30,60 L 26,65 L 35,90"
                    stroke="#fef08a" strokeWidth="0.3" fill="none"
                    style={{ filter: 'drop-shadow(0 0 2px #fef08a)' }}
                    animate={{ opacity: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                {/* Bolt 2 (Right) */}
                <motion.path
                    d="M 75,5 L 72,20 L 78,25 L 70,45 L 75,50 L 65,75"
                    stroke="#ffffff" strokeWidth="0.2" fill="none"
                    style={{ filter: 'drop-shadow(0 0 2px #ffffff)' }}
                    animate={{ opacity: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
            </motion.svg>
            
            {/* White gradient overlay for text readability */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, transparent 0%, #ffffff 90%)',
                zIndex: 10,
                pointerEvents: 'none'
            }}></div>

            {/* PHASE 1: Realistic Rain (Full Screen, Parallax Depth) */}
            {rainDrops.map((drop, i) => (
                <motion.div
                    key={`leak-${i}`}
                    animate={{ 
                        y: ['-10vh', '110vh'], // Falls completely through the floor
                        opacity: [0, drop.baseOpacity, 0]
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
                        width: `${drop.width}px`,
                        height: `${drop.height}px`,
                        background: 'linear-gradient(to bottom, transparent, rgba(148, 163, 184, 0.8))',
                        transform: 'rotate(15deg)', // Realistic wind angle
                        zIndex: 1
                    }}
                />
            ))}

            {/* PHASE 3: Waterproof Bouncing Rain (Realistic Splashes on Epoxy) */}
            {rainDrops.map((drop, i) => (
                <motion.div
                    key={`bounce-${i}`}
                    animate={{ 
                        y: ['-10vh', '50vh', '48vh'], // Hits the horizon
                        x: [0, 0, drop.splashOffset], // Splash outwards
                        height: [drop.height, drop.height, 4], // Shrinks into a tiny ball when splashing
                        opacity: [0, drop.baseOpacity, 0]
                    }}
                    transition={{
                        duration: drop.duration,
                        repeat: Infinity,
                        delay: drop.delay,
                        ease: "linear",
                        times: [0, 0.9, 1] // Spends 90% of time falling, 10% splashing
                    }}
                    style={{
                        position: 'absolute',
                        left: `${drop.left}%`,
                        width: `${drop.width * 1.5}px`, // Slightly thicker for the splash
                        background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.9))',
                        transform: 'rotate(15deg)',
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
