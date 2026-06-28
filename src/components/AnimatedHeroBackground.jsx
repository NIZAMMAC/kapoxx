import { motion } from 'framer-motion';

export default function AnimatedHeroBackground() {
    // Generate falling water droplets
    const droplets = Array.from({ length: 20 });

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, backgroundColor: '#ffffff' }}>
            
            {/* White gradient overlay to softly blend the edges so text remains readable */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, transparent 0%, #ffffff 90%)',
                zIndex: 2,
                pointerEvents: 'none'
            }}></div>

            {/* Falling Water Droplets (Representing Waterproofing) */}
            {droplets.map((_, i) => {
                const leftPos = Math.random() * 100;
                const delay = Math.random() * 5;
                const duration = 2 + Math.random() * 3;
                return (
                    <motion.div
                        key={`drop-${i}`}
                        initial={{ y: -50, opacity: 0, scale: Math.random() * 0.5 + 0.5 }}
                        animate={{ 
                            y: ['-5vh', '85vh'],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            ease: "easeIn",
                            delay: delay
                        }}
                        style={{
                            position: 'absolute',
                            left: `${leftPos}%`,
                            width: '10px',
                            height: '24px',
                            // Water droplet shape using border-radius
                            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                            background: 'linear-gradient(to bottom, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.6))',
                            filter: 'blur(1px)',
                            zIndex: 1
                        }}
                    />
                );
            })}

            {/* Flowing Liquid Epoxy Resin Waves at the bottom */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200%', height: '50%', zIndex: 1, opacity: 0.9 }}>
                
                {/* Wave 1 - Back Layer (Lightest) */}
                <motion.svg 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none" 
                    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    <path d="M0,40 C300,120 600,-40 1200,40 L1200,120 L0,120 Z" fill="rgba(6, 182, 212, 0.08)" />
                    <path d="M1200,40 C1500,120 1800,-40 2400,40 L2400,120 L1200,120 Z" fill="rgba(6, 182, 212, 0.08)" />
                </motion.svg>
                
                {/* Wave 2 - Middle Layer (Medium) */}
                <motion.svg 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none" 
                    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80%' }}
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <path d="M0,60 C300,-20 600,140 1200,60 L1200,120 L0,120 Z" fill="rgba(14, 165, 233, 0.12)" />
                    <path d="M1200,60 C1500,-20 1800,140 2400,60 L2400,120 L1200,120 Z" fill="rgba(14, 165, 233, 0.12)" />
                </motion.svg>

                {/* Wave 3 - Front Layer (Thickest Epoxy) */}
                <motion.svg 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none" 
                    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%' }}
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                    <path d="M0,80 C300,140 600,20 1200,80 L1200,120 L0,120 Z" fill="rgba(6, 182, 212, 0.15)" />
                    <path d="M1200,80 C1500,140 1800,20 2400,80 L2400,120 L1200,120 Z" fill="rgba(6, 182, 212, 0.15)" />
                </motion.svg>
            </div>
        </div>
    );
}
