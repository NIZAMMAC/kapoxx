import { motion } from 'framer-motion';

export default function AnimatedHeroBackground() {
    // Generate many raindrops for realistic "heavy rain"
    const blockedDrops = Array.from({ length: 150 });
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
                height: '2px',
                backgroundColor: 'rgba(6, 182, 212, 1)',
                boxShadow: '0 2px 10px rgba(6, 182, 212, 0.6)',
                zIndex: 3
            }}></div>

            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
                
                {/* Blocked Droplets (Hit the line, slide sideways extremely fast, drop off) */}
                {blockedDrops.map((_, i) => {
                    const startX = 20 + Math.random() * 60; // Starts precisely above the line (20vw to 80vw)
                    
                    // Left half slides left, right half slides right
                    const isLeft = startX < 50;
                    const edgeX = isLeft ? 19.5 : 80.5; 
                    
                    // Rain falls very fast to look realistic
                    const fallDuration = 0.3 + Math.random() * 0.2; 
                    const slideDuration = 0.15 + Math.random() * 0.15; // Fast sideways squish/slide
                    const dropDuration = 0.3 + Math.random() * 0.2;
                    const totalDuration = fallDuration + slideDuration + dropDuration;
                    
                    // Calculate exact keyframe percentages
                    const t1 = fallDuration / totalDuration;
                    const t2 = (fallDuration + slideDuration) / totalDuration;

                    return (
                        <motion.div
                            key={`blocked-${i}`}
                            animate={{ 
                                y: ['-10vh', '49.6vh', '49.6vh', '110vh'],
                                x: [`${startX}vw`, `${startX}vw`, `${edgeX}vw`, `${edgeX}vw`],
                                opacity: [0, 0.7, 0.9, 0],
                                // Rain teardrop -> Squished horizontal water -> Rain teardrop
                                height: ['25px', '25px', '2px', '25px'],
                                width: ['1px', '1px', '12px', '2px']
                            }}
                            transition={{ 
                                duration: totalDuration, 
                                repeat: Infinity, 
                                ease: "linear", 
                                delay: Math.random() * 2, // Stagger them
                                times: [0, t1, t2, 1]
                            }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.9))',
                                borderRadius: '2px'
                            }}
                        />
                    );
                })}

                {/* Free Falling Droplets (Left of the line) */}
                {freeDropsLeft.map((_, i) => (
                    <motion.div
                        key={`free-l-${i}`}
                        animate={{ 
                            y: ['-10vh', '110vh'],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{ 
                            duration: 0.5 + Math.random() * 0.3, // Fast falling
                            repeat: Infinity, 
                            ease: "linear", 
                            delay: Math.random() * 2 
                        }}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 19.5}vw`,
                            top: 0,
                            width: '1px',
                            height: '25px',
                            background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.6))',
                            borderRadius: '1px'
                        }}
                    />
                ))}

                {/* Free Falling Droplets (Right of the line) */}
                {freeDropsRight.map((_, i) => (
                    <motion.div
                        key={`free-r-${i}`}
                        animate={{ 
                            y: ['-10vh', '110vh'],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{ 
                            duration: 0.5 + Math.random() * 0.3, // Fast falling
                            repeat: Infinity, 
                            ease: "linear", 
                            delay: Math.random() * 2 
                        }}
                        style={{
                            position: 'absolute',
                            left: `${80.5 + Math.random() * 19.5}vw`,
                            top: 0,
                            width: '1px',
                            height: '25px',
                            background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.6))',
                            borderRadius: '1px'
                        }}
                    />
                ))}
            </div>

            {/* Faint blue background underneath to show the "dry zone" vs the background */}
            <div style={{
                position: 'absolute',
                top: '50vh',
                left: '20vw',
                width: '60vw',
                height: '50vh',
                background: 'linear-gradient(to bottom, #ffffff 20%, rgba(240, 249, 255, 0.6) 100%)',
                zIndex: 1
            }}></div>
        </div>
    );
}
