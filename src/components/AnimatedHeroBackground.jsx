import { motion } from 'framer-motion';

export default function AnimatedHeroBackground() {
    // Generate raindrops
    const drops = Array.from({ length: 45 });

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, backgroundColor: '#ffffff' }}>
            
            {/* Soft background gradient */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f0f9ff 100%)',
                zIndex: 1,
            }}></div>

            {/* Falling Raindrops representing water */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
                {drops.map((_, i) => {
                    const delay = Math.random() * 5;
                    const duration = 1.2 + Math.random() * 1.5;
                    const left = `${Math.random() * 100}%`;
                    return (
                        <motion.div
                            key={i}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ 
                                y: ['-10vh', '110vh'],
                                opacity: [0, 0.6, 0]
                            }}
                            transition={{
                                duration: duration,
                                repeat: Infinity,
                                ease: "linear",
                                delay: delay
                            }}
                            style={{
                                position: 'absolute',
                                left: left,
                                top: 0,
                                width: '2px',
                                height: '35px',
                                background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.8))',
                                borderRadius: '2px'
                            }}
                        />
                    );
                })}
            </div>

            {/* Shield / Membrane curve representing waterproofing */}
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '150%',
                height: '80%',
                borderTop: '4px solid rgba(6, 182, 212, 0.25)',
                borderRadius: '50%',
                boxShadow: '0 -30px 60px rgba(6, 182, 212, 0.1)',
                zIndex: 2,
                pointerEvents: 'none'
            }}></div>

            {/* Flowing Water Waves at the bottom */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '35%', zIndex: 3, opacity: 0.9 }}>
                {/* Wave 1 (Back - Moves Left) */}
                <motion.svg 
                    viewBox="0 0 1440 320" 
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', left: 0 }}
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    <path fill="rgba(6, 182, 212, 0.15)" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,138.7C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    <path fill="rgba(6, 182, 212, 0.15)" transform="translate(1440, 0)" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,138.7C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </motion.svg>
                
                {/* Wave 2 (Front - Moves Right) */}
                <motion.svg 
                    viewBox="0 0 1440 320" 
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', bottom: 0, width: '200%', height: '70%', left: 0 }}
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                    <path fill="rgba(14, 165, 233, 0.25)" d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,128C840,107,960,85,1080,90.7C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    <path fill="rgba(14, 165, 233, 0.25)" transform="translate(1440, 0)" d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,128C840,107,960,85,1080,90.7C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </motion.svg>
            </div>
            
        </div>
    );
}
