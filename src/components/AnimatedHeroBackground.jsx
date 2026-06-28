import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedHeroBackground() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Generate arrays for our rain and splashes
    const dropCount = 45;
    
    // We create static random values so they don't jump around on re-renders
    const [drops] = useState(() => 
        Array.from({ length: dropCount }).map(() => ({
            x: Math.random() * 100, // percentage across screen
            delay: Math.random() * 2, // stagger falling
            duration: 0.8 + Math.random() * 0.6 // speed of fall
        }))
    );

    if (!isMounted) return null;

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, backgroundColor: '#ffffff' }}>
            
            {/* The Waterproofing Shield (Invisible Barrier) */}
            <motion.div 
                style={{
                    position: 'absolute',
                    top: '45%',
                    left: '-10%',
                    width: '120%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), rgba(14, 165, 233, 1), rgba(6, 182, 212, 0.8), transparent)',
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.5), 0 -10px 30px rgba(6, 182, 212, 0.2)',
                    borderRadius: '50%' // Gives it a slight curve if we make it taller
                }}
                animate={{
                    opacity: [0.6, 1, 0.6],
                    scaleY: [1, 2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* The Safe Zone (Dry area below the shield) */}
            <div style={{
                position: 'absolute',
                top: '45%',
                left: 0,
                width: '100%',
                height: '55%',
                background: 'linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, #ffffff 100%)',
                zIndex: 1
            }}></div>

            {/* Falling Raindrops hitting the shield */}
            {drops.map((drop, i) => (
                <motion.div
                    key={`drop-${i}`}
                    style={{
                        position: 'absolute',
                        left: `${drop.x}%`,
                        top: '-10%',
                        width: '2px',
                        height: '35px',
                        background: 'linear-gradient(to bottom, transparent, rgba(14, 165, 233, 0.8))',
                        borderRadius: '2px',
                        zIndex: 0
                    }}
                    initial={{ y: '0vh', opacity: 0 }}
                    animate={{
                        y: ['0vh', '54vh'], // Falls exactly to the 45% mark (45vh is relative to container, 55vh relative to drop origin)
                        opacity: [0, 1, 0],
                        scaleY: [1, 1, 0.1] // Flattens on impact
                    }}
                    transition={{
                        duration: drop.duration,
                        repeat: Infinity,
                        ease: "easeIn",
                        delay: drop.delay
                    }}
                />
            ))}

            {/* Splashes / Ripples when drops hit the shield */}
            {drops.map((drop, i) => (
                <motion.div
                    key={`splash-${i}`}
                    style={{
                        position: 'absolute',
                        left: `calc(${drop.x}% - 15px)`,
                        top: '45%',
                        marginTop: '-5px',
                        width: '30px',
                        height: '10px',
                        border: '2px solid rgba(14, 165, 233, 0.5)',
                        borderRadius: '50%',
                        zIndex: 2
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.2, 1.5, 2]
                    }}
                    transition={{
                        duration: drop.duration,
                        repeat: Infinity,
                        ease: "easeOut",
                        // The splash triggers right as the raindrop finishes falling
                        delay: drop.delay + (drop.duration * 0.95) 
                    }}
                />
            ))}
            
            {/* Soft glowing ambient orbs representing water vapor above */}
            <motion.div 
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '20%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    zIndex: 0
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 20, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div 
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '15%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(50px)',
                    zIndex: 0
                }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
        </div>
    );
}
