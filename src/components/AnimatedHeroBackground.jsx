import { motion } from 'framer-motion';

export default function AnimatedHeroBackground() {
    // Rain that hits the barrier
    const fallingDrops = Array.from({ length: 150 });
    // Rain that falls freely outside the barrier
    const freeDropsLeft = Array.from({ length: 40 });
    const freeDropsRight = Array.from({ length: 40 });

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, backgroundColor: '#ffffff' }}>
            
            {/* The single blocking line (Waterproof membrane) */}
            <div style={{
                position: 'absolute',
                top: '50vh',
                left: '20vw',
                width: '60vw',
                height: '3px',
                backgroundColor: 'rgba(6, 182, 212, 1)',
                boxShadow: '0 2px 10px rgba(6, 182, 212, 0.6)',
                zIndex: 3
            }}></div>

            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
                
                {/* Center Rain (Hits the barrier and seamlessly disappears into the stream) */}
                {fallingDrops.map((_, i) => {
                    const startX = 20 + Math.random() * 60; // 20vw to 80vw
                    const duration = 0.25 + Math.random() * 0.15; // Fast rain
                    
                    return (
                        <motion.div
                            key={`c-${i}`}
                            animate={{ 
                                y: ['-10vh', '49.8vh'],
                                opacity: [0, 0.8, 0]
                            }}
                            transition={{ 
                                duration: duration, 
                                repeat: Infinity, 
                                ease: "linear", 
                                delay: Math.random() * 2 
                            }}
                            style={{
                                position: 'absolute', left: `${startX}vw`, top: 0,
                                width: '1px', height: '30px',
                                background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.8))'
                            }}
                        />
                    );
                })}

                {/* Free Falling Droplets (Left) */}
                {freeDropsLeft.map((_, i) => (
                    <motion.div
                        key={`fl-${i}`}
                        animate={{ y: ['-10vh', '110vh'], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.5 + Math.random() * 0.3, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                        style={{
                            position: 'absolute', left: `${Math.random() * 19.5}vw`, top: 0,
                            width: '1px', height: '30px', background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.5))'
                        }}
                    />
                ))}

                {/* Free Falling Droplets (Right) */}
                {freeDropsRight.map((_, i) => (
                    <motion.div
                        key={`fr-${i}`}
                        animate={{ y: ['-10vh', '110vh'], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.5 + Math.random() * 0.3, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                        style={{
                            position: 'absolute', left: `${80.5 + Math.random() * 19.5}vw`, top: 0,
                            width: '1px', height: '30px', background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.5))'
                        }}
                    />
                ))}

                {/* --- REALISTIC WAVY WATER STREAM ON THE BARRIER --- */}
                
                {/* Left flowing WAVY stream (from center 50vw to left edge 20vw) */}
                <div style={{ position: 'absolute', top: '48.5vh', left: '20vw', width: '30vw', height: '1.5vh', pointerEvents: 'none', overflow: 'hidden' }}>
                    <motion.svg 
                        viewBox="0 0 1440 320" 
                        preserveAspectRatio="none"
                        style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', left: 0 }}
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    >
                        {/* Wave Layer 1 */}
                        <path fill="rgba(14, 165, 233, 0.8)" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L0,320Z"></path>
                        <path fill="rgba(14, 165, 233, 0.8)" transform="translate(1440, 0)" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L0,320Z"></path>
                        
                        {/* Wave Layer 2 */}
                        <path fill="rgba(6, 182, 212, 0.6)" d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,128C840,107,960,85,1080,90.7C1200,96,1320,128,1380,144L1440,160L1440,320L0,320Z"></path>
                        <path fill="rgba(6, 182, 212, 0.6)" transform="translate(1440, 0)" d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,128C840,107,960,85,1080,90.7C1200,96,1320,128,1380,144L1440,160L1440,320L0,320Z"></path>
                    </motion.svg>
                </div>

                {/* Right flowing WAVY stream (from center 50vw to right edge 80vw) */}
                <div style={{ position: 'absolute', top: '48.5vh', left: '50vw', width: '30vw', height: '1.5vh', pointerEvents: 'none', overflow: 'hidden' }}>
                    <motion.svg 
                        viewBox="0 0 1440 320" 
                        preserveAspectRatio="none"
                        style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', left: '-100%' }}
                        animate={{ x: ['0%', '50%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    >
                        {/* Wave Layer 1 */}
                        <path fill="rgba(14, 165, 233, 0.8)" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L0,320Z"></path>
                        <path fill="rgba(14, 165, 233, 0.8)" transform="translate(1440, 0)" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L0,320Z"></path>
                        
                        {/* Wave Layer 2 */}
                        <path fill="rgba(6, 182, 212, 0.6)" d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,128C840,107,960,85,1080,90.7C1200,96,1320,128,1380,144L1440,160L1440,320L0,320Z"></path>
                        <path fill="rgba(6, 182, 212, 0.6)" transform="translate(1440, 0)" d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,128C840,107,960,85,1080,90.7C1200,96,1320,128,1380,144L1440,160L1440,320L0,320Z"></path>
                    </motion.svg>
                </div>

                {/* --- CONTINUOUS WATERFALLS DRIPPING OFF EDGES --- */}
                
                {/* Left Edge Waterfall */}
                <svg style={{ position: 'absolute', top: '50vh', left: '19.5vw', width: '1vw', height: '60vh', pointerEvents: 'none' }} preserveAspectRatio="none">
                    <motion.line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(14, 165, 233, 0.9)" strokeWidth="3" strokeDasharray="15 10 5 20" 
                        animate={{ strokeDashoffset: [0, -100] }} transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }} />
                    <motion.line x1="30%" y1="0%" x2="30%" y2="100%" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="2" strokeDasharray="10 5 20 10" 
                        animate={{ strokeDashoffset: [0, -100] }} transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }} />
                </svg>

                {/* Right Edge Waterfall */}
                <svg style={{ position: 'absolute', top: '50vh', left: '79.5vw', width: '1vw', height: '60vh', pointerEvents: 'none' }} preserveAspectRatio="none">
                    <motion.line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(14, 165, 233, 0.9)" strokeWidth="3" strokeDasharray="15 10 5 20" 
                        animate={{ strokeDashoffset: [0, -100] }} transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }} />
                    <motion.line x1="70%" y1="0%" x2="70%" y2="100%" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="2" strokeDasharray="10 5 20 10" 
                        animate={{ strokeDashoffset: [0, -100] }} transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }} />
                </svg>

            </div>

            {/* Dry Zone underneath the line (Pure white to signify no water penetrates) */}
            <div style={{
                position: 'absolute',
                top: '50vh',
                left: '20vw',
                width: '60vw',
                height: '50vh',
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 10%, rgba(240, 249, 255, 0.5) 100%)',
                zIndex: 1
            }}></div>
        </div>
    );
}
