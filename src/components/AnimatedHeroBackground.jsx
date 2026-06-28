import { motion, useTransform } from 'framer-motion';
import { useMemo } from 'react';

export default function AnimatedHeroBackground({ progress }) {
    // Generate highly realistic, turbulent full-screen rain droplets
    const rainDrops = useMemo(() => {
        return Array.from({ length: 200 }).map(() => {
            // Depth layers: 1 = far background, 2 = midground, 3 = foreground
            const depth = Math.random();
            const layer = depth > 0.85 ? 3 : (depth > 0.4 ? 2 : 1);
            
            // Foreground rain is faster and slightly thicker, picking up more light
            const speedMultiplier = layer === 3 ? 1.5 : (layer === 2 ? 1 : 0.7);
            const width = layer === 3 ? 2 : 1; 
            const baseOpacity = layer === 3 ? 0.5 : (layer === 2 ? 0.3 : 0.15); 
            
            return {
                left: Math.random() * 100,
                delay: Math.random() * 2,
                duration: (0.3 + Math.random() * 0.2) / speedMultiplier, 
                height: (40 + Math.random() * 50) * speedMultiplier, 
                width: width,
                baseOpacity: baseOpacity,
                angle: 10 + Math.random() * 10, // Turbulent wind variation (10 to 20 degrees)
                splashOffset: Math.random() > 0.5 ? 10 * speedMultiplier : -10 * speedMultiplier
            };
        });
    }, []);

    // Phase 1 (Leaking): 0 to 30% of scroll
    // Phase 2 (Applying): 30% to 70% of scroll
    // Phase 3 (Waterproof): 70% to 100% of scroll

    // Scroll-driven Opacities and Transforms
    // Epoxy takes twice as much scroll distance to spread now
    const leakingOpacity = useTransform(progress, [0, 0.30, 0.50], [1, 1, 0]);
    const epoxyWidth = useTransform(progress, [0.30, 0.70], ['0%', '200%']);
    const bounceOpacity = useTransform(progress, [0.50, 0.70, 0.85], [0, 1, 0]); // Splashes fade out too

    // Status Indicator Opacities
    const status1Opacity = useTransform(progress, [0, 0.30, 0.40], [1, 1, 0.3]);
    const status2Opacity = useTransform(progress, [0.20, 0.40, 0.70, 0.85], [0.3, 1, 1, 0.3]);
    const status3Opacity = useTransform(progress, [0.60, 0.75, 1], [0.3, 1, 1]);

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, backgroundColor: '#0f172a' }}>
            
            {/* Stormy Dark Clouds Background Overlay */}
            <motion.div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '60vh',
                background: 'linear-gradient(to bottom, rgba(15, 23, 42, 1), rgba(30, 41, 59, 0.9), transparent)',
                zIndex: 0
            }}></motion.div>

            {/* Physical SVG Cloud Shapes */}
            <motion.svg width="100%" height="30vh" style={{ position: 'absolute', top: '-5vh', left: 0, zIndex: 1, filter: 'blur(8px)', opacity: 0.9 }}>
                <circle cx="5%" cy="0" r="100" fill="#0f172a" />
                <circle cx="20%" cy="20" r="140" fill="#1e293b" />
                <circle cx="35%" cy="0" r="180" fill="#0f172a" />
                <circle cx="50%" cy="30" r="150" fill="#334155" />
                <circle cx="65%" cy="-10" r="200" fill="#1e293b" />
                <circle cx="85%" cy="40" r="160" fill="#0f172a" />
                <circle cx="100%" cy="10" r="120" fill="#334155" />
            </motion.svg>

            {/* Ambient Lightning Flashes (Full Screen) */}
            <motion.div
                style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    zIndex: 0, pointerEvents: 'none'
                }}
            >
                <motion.div
                    style={{ width: '100%', height: '100%' }}
                    animate={{ opacity: [0, 0, 0, 0, 0.6, 0, 0, 0.3, 0, 0, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
            </motion.div>

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
            
            {/* Dark gradient overlay for text readability on dark background */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.8) 100%)',
                zIndex: 10,
                pointerEvents: 'none'
            }}></div>

            {/* ENTIRE RAIN SYSTEM (Continuous & Consistent) */}
            <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                
                {/* Unified Realistic Rain (Always falls and splashes on the roof) */}
                {rainDrops.map((drop, i) => (
                    <motion.div
                        key={`rain-${i}`}
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
                            width: `${drop.width * 1.5}px`,
                            background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8))',
                            transform: `rotate(${drop.angle}deg)`,
                            borderRadius: '2px',
                            zIndex: 4 // Bounces ABOVE the epoxy
                        }}
                    />
                ))}
            </motion.div>

            {/* 3D Floor / Roof Container */}
            <div style={{
                position: 'absolute',
                top: '50%', left: 0,
                width: '100%', height: '50vh',
                perspective: '1000px',
                zIndex: 2,
                overflow: 'hidden',
                // This mask seamlessly blends the harsh horizon line into the background
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)'
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
                    <svg viewBox="0 0 800 200" preserveAspectRatio="none" style={{ width: '100vw', maxWidth: '1400px', height: '100%', opacity: 0.9, position: 'absolute', top: 0 }}>
                        <g stroke="#334155" fill="none" strokeLinecap="butt" strokeLinejoin="miter">
                            {[
                                // Crack 1
                                { d: "M 100 0 L 120 40 L 80 90 L 130 150 L 100 200", w: 2, delay: 0.1, dur: 1.5 },
                                { d: "M 120 40 L 160 30 L 190 80", w: 1.5, delay: 0.4, dur: 1.2 },
                                { d: "M 80 90 L 40 110 L 20 180", w: 1, delay: 0.7, dur: 1.4 },
                                // Crack 2
                                { d: "M 300 0 L 280 30 L 320 70 L 290 120 L 330 180 L 300 200", w: 2.5, delay: 0.3, dur: 1.6 },
                                { d: "M 320 70 L 380 90 L 410 150", w: 1.5, delay: 0.6, dur: 1.3 },
                                { d: "M 280 30 L 230 50 L 210 110", w: 1.5, delay: 0.2, dur: 1.1 },
                                // Crack 3
                                { d: "M 500 0 L 520 40 L 480 80 L 530 140 L 490 200", w: 2, delay: 0.5, dur: 1.7 },
                                { d: "M 520 40 L 580 30 L 620 70", w: 1.5, delay: 0.9, dur: 1.2 },
                                { d: "M 480 80 L 430 100 L 400 160", w: 1, delay: 1.1, dur: 1.4 },
                                // Crack 4
                                { d: "M 700 0 L 680 50 L 720 120 L 670 180 L 700 200", w: 2.5, delay: 0.2, dur: 1.5 },
                                { d: "M 680 50 L 630 40 L 590 80", w: 1.5, delay: 0.6, dur: 1.3 },
                                { d: "M 720 120 L 780 140 L 800 190", w: 1.5, delay: 1.0, dur: 1.2 }
                            ].map((path, i) => (
                                <path key={`crack-base-${i}`} d={path.d} strokeWidth={path.w} vectorEffect="non-scaling-stroke" />
                            ))}
                        </g>
                    </svg>

                    {/* Animated Water Flowing INSIDE ALL the cracks */}
                    <motion.svg viewBox="0 0 800 200" preserveAspectRatio="none" style={{ width: '100vw', maxWidth: '1400px', height: '100%', position: 'absolute', top: 0, opacity: leakingOpacity }}>
                        {[
                            // Crack 1
                            { d: "M 100 0 L 120 40 L 80 90 L 130 150 L 100 200", w: 2, delay: 0.1, dur: 1.5 },
                            { d: "M 120 40 L 160 30 L 190 80", w: 1.5, delay: 0.4, dur: 1.2 },
                            { d: "M 80 90 L 40 110 L 20 180", w: 1, delay: 0.7, dur: 1.4 },
                            // Crack 2
                            { d: "M 300 0 L 280 30 L 320 70 L 290 120 L 330 180 L 300 200", w: 2.5, delay: 0.3, dur: 1.6 },
                            { d: "M 320 70 L 380 90 L 410 150", w: 1.5, delay: 0.6, dur: 1.3 },
                            { d: "M 280 30 L 230 50 L 210 110", w: 1.5, delay: 0.2, dur: 1.1 },
                            // Crack 3
                            { d: "M 500 0 L 520 40 L 480 80 L 530 140 L 490 200", w: 2, delay: 0.5, dur: 1.7 },
                            { d: "M 520 40 L 580 30 L 620 70", w: 1.5, delay: 0.9, dur: 1.2 },
                            { d: "M 480 80 L 430 100 L 400 160", w: 1, delay: 1.1, dur: 1.4 },
                            // Crack 4
                            { d: "M 700 0 L 680 50 L 720 120 L 670 180 L 700 200", w: 2.5, delay: 0.2, dur: 1.5 },
                            { d: "M 680 50 L 630 40 L 590 80", w: 1.5, delay: 0.6, dur: 1.3 },
                            { d: "M 720 120 L 780 140 L 800 190", w: 1.5, delay: 1.0, dur: 1.2 }
                        ].map((path, i) => (
                            <motion.path
                                key={`water-crack-${i}`}
                                d={path.d}
                                stroke="#0ea5e9"
                                strokeWidth={Math.max(1, path.w - 1)} // Water is inside the crack
                                strokeLinecap="butt" strokeLinejoin="miter"
                                vectorEffect="non-scaling-stroke"
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
