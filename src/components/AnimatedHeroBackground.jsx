import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedHeroBackground() {
    const [phase, setPhase] = useState('leaking'); // 'leaking' | 'applying' | 'waterproof'

    useEffect(() => {
        const runStory = () => {
            setPhase('leaking');
            // After 4 seconds of leaking, apply epoxy
            setTimeout(() => setPhase('applying'), 4000);
            // After 3 seconds of applying, it's waterproof
            setTimeout(() => setPhase('waterproof'), 7000);
        };
        
        runStory();
        // Loop the entire story every 12 seconds
        const interval = setInterval(runStory, 12000);
        return () => clearInterval(interval);
    }, []);

    // Generate random droplets
    const droplets = Array.from({ length: 15 });

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

            {/* PHASE 1: Leaking Droplets (Only visible when leaking) */}
            <AnimatePresence>
                {phase === 'leaking' && droplets.map((_, i) => (
                    <motion.div
                        key={`leak-${i}`}
                        initial={{ y: '-10vh', opacity: 0 }}
                        animate={{ 
                            y: ['-10vh', '85vh', '85vh'],
                            opacity: [0, 1, 0],
                            scale: [1, 1, 0]
                        }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeIn"
                        }}
                        style={{
                            position: 'absolute',
                            left: `${30 + Math.random() * 40}%`,
                            width: '4px',
                            height: '20px',
                            background: 'linear-gradient(to bottom, transparent, #3b82f6)',
                            borderRadius: '5px',
                            zIndex: 1
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* PHASE 3: Waterproof Bouncing Droplets (Only visible when waterproof) */}
            <AnimatePresence>
                {phase === 'waterproof' && droplets.map((_, i) => (
                    <motion.div
                        key={`bounce-${i}`}
                        initial={{ y: '-10vh', opacity: 0, x: 0 }}
                        animate={{ 
                            y: ['-10vh', '65vh', '75vh'],
                            x: [0, 0, (Math.random() > 0.5 ? 50 : -50)],
                            opacity: [0, 1, 0],
                            scale: [1, 1, 0]
                        }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeIn"
                        }}
                        style={{
                            position: 'absolute',
                            left: `${20 + Math.random() * 60}%`,
                            width: '6px',
                            height: '15px',
                            background: 'linear-gradient(to bottom, transparent, #06b6d4)',
                            borderRadius: '5px',
                            zIndex: 1
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* The Floor Base (Cracked Concrete) */}
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0,
                width: '100%', height: '35vh',
                backgroundColor: '#f1f5f9',
                borderTop: '2px solid #e2e8f0',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center'
            }}>
                {/* Crack SVG */}
                <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100%', opacity: 0.3, marginTop: '-2px' }}>
                    <path d="M50,0 L40,20 L55,40 L45,60 L60,80 L50,100" stroke="#94a3b8" strokeWidth="3" fill="none" />
                    <path d="M50,40 L35,50 L40,70" stroke="#94a3b8" strokeWidth="2" fill="none" />
                </svg>
            </div>

            {/* The Epoxy Layer (Applies during phase 2, stays during phase 3) */}
            <motion.div
                initial={{ width: '0%' }}
                animate={{ width: phase === 'leaking' ? '0%' : '100%' }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    bottom: 0, left: 0,
                    height: '35vh',
                    background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.8))',
                    borderTop: '4px solid #06b6d4',
                    boxShadow: '0 -5px 20px rgba(6, 182, 212, 0.3)',
                    zIndex: 3,
                    backdropFilter: 'blur(2px)'
                }}
            >
                {/* Glossy reflection on the epoxy */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '10px',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)'
                }}></div>
            </motion.div>
            
            {/* Status Text Indicator for the animation story */}
            <div style={{ position: 'absolute', bottom: '2vh', right: '2vw', zIndex: 11, display: 'flex', gap: '10px', alignItems: 'center' }}>
                <motion.span animate={{ opacity: phase === 'leaking' ? 1 : 0.3 }} style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>1. Water Leaking</motion.span>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#cbd5e1' }}></div>
                <motion.span animate={{ opacity: phase === 'applying' ? 1 : 0.3 }} style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 'bold' }}>2. Epoxy Applied</motion.span>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#cbd5e1' }}></div>
                <motion.span animate={{ opacity: phase === 'waterproof' ? 1 : 0.3 }} style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>3. 100% Waterproofed</motion.span>
            </div>
        </div>
    );
}
