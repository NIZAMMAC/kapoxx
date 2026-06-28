import { motion, useTransform } from 'framer-motion';

export default function AnimatedHeroBackground({ progress }) {
    // Generate random droplets
    const droplets = Array.from({ length: 15 });

    // Phase 1 (Leaking): 0 to 35% of scroll
    // Phase 2 (Applying): 35% to 55% of scroll
    // Phase 3 (Waterproof): 55% to 100% of scroll

    // Scroll-driven Opacities and Transforms
    const leakingOpacity = useTransform(progress, [0, 0.35, 0.45], [1, 1, 0]);
    const epoxyWidth = useTransform(progress, [0.35, 0.55], ['0%', '100%']);
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

            {/* PHASE 1: Leaking Droplets */}
            {droplets.map((_, i) => (
                <motion.div
                    key={`leak-${i}`}
                    animate={{ 
                        y: ['-10vh', '50vh', '60vh'],
                        scale: [1, 1, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeIn"
                    }}
                    style={{
                        position: 'absolute',
                        // Water drops directly into the crack (centered between 45% and 55%)
                        left: `${45 + Math.random() * 10}%`,
                        width: '4px',
                        height: '20px',
                        background: 'linear-gradient(to bottom, transparent, #3b82f6)',
                        borderRadius: '5px',
                        zIndex: 1,
                        opacity: leakingOpacity
                    }}
                />
            ))}

            {/* PHASE 3: Waterproof Bouncing Droplets */}
            {droplets.map((_, i) => (
                <motion.div
                    key={`bounce-${i}`}
                    animate={{ 
                        y: ['-10vh', '50vh', '40vh'],
                        x: [0, 0, (Math.random() > 0.5 ? 80 : -80)],
                        scale: [1, 1.2, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeOut"
                    }}
                    style={{
                        position: 'absolute',
                        left: `${20 + Math.random() * 60}%`,
                        width: '6px',
                        height: '15px',
                        background: 'linear-gradient(to bottom, transparent, #06b6d4)',
                        borderRadius: '5px',
                        zIndex: 4, // Higher z-index so it bounces ABOVE the epoxy
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
                    top: '-50%', left: '-50%',
                    width: '200%', height: '200%',
                    backgroundColor: '#f1f5f9',
                    borderTop: '6px solid #cbd5e1',
                    transform: 'rotateX(70deg)',
                    transformOrigin: 'top center',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    {/* Crack SVG Base */}
                    <svg viewBox="0 0 100 100" style={{ width: '150px', height: '100%', opacity: 0.5, marginTop: '-6px', position: 'absolute' }}>
                        <path d="M50,0 L40,20 L55,40 L45,60 L60,80 L50,100" stroke="#94a3b8" strokeWidth="3" fill="none" />
                        <path d="M50,40 L35,50 L40,70" stroke="#94a3b8" strokeWidth="2" fill="none" />
                    </svg>

                    {/* Animated Water Flowing INSIDE the cracks */}
                    <motion.svg viewBox="0 0 100 100" style={{ width: '150px', height: '100%', marginTop: '-6px', position: 'absolute', opacity: leakingOpacity }}>
                        <motion.path 
                            d="M50,0 L40,20 L55,40 L45,60 L60,80 L50,100" 
                            stroke="#0ea5e9" strokeWidth="4" fill="none" 
                            initial={{ pathLength: 0, opacity: 1 }}
                            animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeIn', delay: 0.2 }}
                        />
                        <motion.path 
                            d="M50,40 L35,50 L40,70" 
                            stroke="#0ea5e9" strokeWidth="3" fill="none" 
                            initial={{ pathLength: 0, opacity: 1 }}
                            animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeIn', delay: 0.6 }}
                        />
                    </motion.svg>
                </div>

                {/* The Epoxy Layer (Scroll-driven width, 3D rotated) */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '-50%', left: '-50%',
                        height: '200%',
                        background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.8))',
                        borderTop: '8px solid #06b6d4',
                        boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)',
                        transform: 'rotateX(70deg) translateZ(10px)',
                        transformOrigin: 'top center',
                        zIndex: 3,
                        backdropFilter: 'blur(2px)',
                        width: useTransform(progress, [0.35, 0.55], ['0%', '200%'])
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
