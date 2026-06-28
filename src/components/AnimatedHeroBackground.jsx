import { motion } from 'framer-motion';

export default function AnimatedHeroBackground() {
    // Generate a 5x5 grid of tiles for the floor
    const tiles = Array.from({ length: 25 });

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, backgroundColor: '#0f172a' }}>
            
            {/* Dark gradient overlay to blend the edges */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, transparent 0%, #0f172a 80%)',
                zIndex: 2,
                pointerEvents: 'none'
            }}></div>

            {/* Isometric 3D Grid */}
            <div style={{
                position: 'absolute',
                top: '0%',
                left: '50%',
                width: '120vw',
                height: '120vw',
                transform: 'translate(-50%, -10%) rotateX(60deg) rotateZ(-45deg)',
                transformStyle: 'preserve-3d',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '2vw',
                opacity: 0.8,
                zIndex: 1
            }}>
                {tiles.map((_, i) => {
                    const delay = Math.random() * 5;
                    const duration = 8 + Math.random() * 10;
                    return (
                        <motion.div
                            key={i}
                            initial={{ z: -200, opacity: 0 }}
                            animate={{ 
                                z: [0, Math.random() * -100 - 50, 0],
                                opacity: [0.1, 0.6, 0.1],
                                backgroundColor: [
                                    'rgba(6, 182, 212, 0.05)', 
                                    'rgba(6, 182, 212, 0.25)', 
                                    'rgba(6, 182, 212, 0.05)'
                                ]
                            }}
                            transition={{
                                duration: duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: delay
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                border: '1px solid rgba(6, 182, 212, 0.4)',
                                boxShadow: '0 0 30px rgba(6, 182, 212, 0.15)',
                                borderRadius: '4px'
                            }}
                        />
                    );
                })}
            </div>
            
            {/* Floating abstract mountains/structures in the background */}
            <motion.svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
                style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%', zIndex: 0, opacity: 0.1 }}
                initial={{ y: 50 }}
                animate={{ y: [20, 0, 20] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            >
                <polygon points="0,100 30,20 60,80 100,10 100,100" fill="rgba(6, 182, 212, 1)" />
            </motion.svg>
        </div>
    );
}
