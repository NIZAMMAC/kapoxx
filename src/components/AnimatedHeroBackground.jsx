import { motion } from 'framer-motion';

export default function AnimatedHeroBackground() {
    // Generate droplets that hit the line
    const blockedDrops = Array.from({ length: 60 });
    
    // Generate droplets that fall freely on the left and right sides
    const freeDropsLeft = Array.from({ length: 20 });
    const freeDropsRight = Array.from({ length: 20 });

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, backgroundColor: '#ffffff' }}>
            
            {/* The single blocking line (Waterproofing barrier) */}
            <div style={{
                position: 'absolute',
                top: '50vh',
                left: '20vw',
                width: '60vw',
                height: '4px',
                backgroundColor: 'rgba(6, 182, 212, 0.8)',
                borderRadius: '4px',
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)',
                zIndex: 3
            }}></div>

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

            {/* Droplets Layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
                
                {/* Blocked Droplets (Hit the line, slide sideways, drop off) */}
                {blockedDrops.map((_, i) => {
                    const startX = 22 + Math.random() * 56; // Starts above the line (22vw to 78vw)
                    
                    // Decide which way the water slides (left if left of center, right if right of center)
                    const isLeft = startX < 50;
                    const edgeX = isLeft ? 20 : 80; 
                    
                    // Timings:
                    // 0% - start falling
                    // 40% - hit the line
                    // 70% - reached the edge sliding sideways
                    // 100% - fell off the screen
                    const duration = 2 + Math.random() * 1.5;
                    const delay = Math.random() * 5;
                    
                    return (
                        <motion.div
                            key={`blocked-${i}`}
                            animate={{ 
                                y: ['-5vh', '49vh', '49vh', '110vh'],
                                x: [`${startX}vw`, `${startX}vw`, `${edgeX}vw`, `${edgeX}vw`],
                                opacity: [0, 1, 1, 0],
                                // When sliding sideways, we can make it look like a horizontal streak, then back to vertical when falling
                                height: ['20px', '20px', '4px', '20px'],
                                width: ['3px', '3px', '15px', '3px']
                            }}
                            transition={{ 
                                duration, 
                                repeat: Infinity, 
                                ease: "linear", 
                                delay,
                                times: [0, 0.4, 0.7, 1] // Matches the 4 keyframes exactly
                            }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                backgroundColor: 'rgba(14, 165, 233, 0.7)',
                                borderRadius: '3px'
                            }}
                        />
                    );
                })}

                {/* Free Falling Droplets (Left of the line) */}
                {freeDropsLeft.map((_, i) => (
                    <motion.div
                        key={`free-l-${i}`}
                        animate={{ 
                            y: ['-5vh', '110vh'],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{ 
                            duration: 1 + Math.random(), 
                            repeat: Infinity, 
                            ease: "linear", 
                            delay: Math.random() * 3 
                        }}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 18}vw`,
                            top: 0,
                            width: '3px',
                            height: '20px',
                            backgroundColor: 'rgba(14, 165, 233, 0.5)',
                            borderRadius: '3px'
                        }}
                    />
                ))}

                {/* Free Falling Droplets (Right of the line) */}
                {freeDropsRight.map((_, i) => (
                    <motion.div
                        key={`free-r-${i}`}
                        animate={{ 
                            y: ['-5vh', '110vh'],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{ 
                            duration: 1 + Math.random(), 
                            repeat: Infinity, 
                            ease: "linear", 
                            delay: Math.random() * 3 
                        }}
                        style={{
                            position: 'absolute',
                            left: `${82 + Math.random() * 18}vw`,
                            top: 0,
                            width: '3px',
                            height: '20px',
                            backgroundColor: 'rgba(14, 165, 233, 0.5)',
                            borderRadius: '3px'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
