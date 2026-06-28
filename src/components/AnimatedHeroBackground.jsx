import { motion } from 'framer-motion';

export default function AnimatedHeroBackground() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, backgroundColor: '#ffffff' }}>
            
            {/* Animated Epoxy Liquid Gradients (using blurred glowing orbs on white background) */}
            <motion.div 
                animate={{
                    scale: [1, 1.2, 1],
                    x: ['0%', '5%', '-5%', '0%'],
                    y: ['0%', '-5%', '5%', '0%'],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
                    filter: 'blur(60px)',
                    zIndex: 1
                }}
            />
            
            <motion.div 
                animate={{
                    scale: [1, 1.3, 1],
                    x: ['0%', '-8%', '5%', '0%'],
                    y: ['0%', '8%', '-5%', '0%'],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    right: '-10%',
                    width: '70vw',
                    height: '70vw',
                    background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 60%)',
                    filter: 'blur(80px)',
                    zIndex: 1
                }}
            />

            {/* Precision Engineering Blueprint Rings */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotateX(60deg)',
                transformStyle: 'preserve-3d',
                width: '100%',
                height: '100%',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none'
            }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            rotateZ: [0, 360],
                            scale: [1, 1.02, 1]
                        }}
                        transition={{
                            rotateZ: { duration: 40 + i * 15, repeat: Infinity, ease: "linear", direction: i % 2 === 0 ? "reverse" : "normal" },
                            scale: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{
                            position: 'absolute',
                            width: `${15 + i * 18}vw`,
                            height: `${15 + i * 18}vw`,
                            border: `1px solid rgba(6, 182, 212, ${0.4 - i * 0.05})`,
                            borderRadius: '50%',
                            boxShadow: `0 0 15px rgba(6, 182, 212, ${0.1 - i * 0.01}) inset, 0 0 15px rgba(6, 182, 212, ${0.1 - i * 0.01})`
                        }}
                    >
                        {/* Nodes on the rings for a technical look */}
                        <div style={{
                            position: 'absolute',
                            top: '-3px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '6px',
                            height: '6px',
                            backgroundColor: 'rgba(6, 182, 212, 0.8)',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px rgba(6, 182, 212, 1)'
                        }}></div>
                        {i % 2 === 0 && (
                            <div style={{
                                position: 'absolute',
                                bottom: '-3px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '4px',
                                height: '4px',
                                backgroundColor: 'rgba(6, 182, 212, 0.5)',
                                borderRadius: '50%',
                            }}></div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Floating Technical Plus signs (Blueprint style) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.5, 0],
                            scale: [0.5, 1, 0.5],
                            rotate: [0, 90]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 6,
                            ease: "easeInOut"
                        }}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{ position: 'absolute', width: '2px', height: '12px', backgroundColor: 'rgba(6, 182, 212, 0.5)' }}></div>
                        <div style={{ position: 'absolute', width: '12px', height: '2px', backgroundColor: 'rgba(6, 182, 212, 0.5)' }}></div>
                    </motion.div>
                ))}
            </div>
            
        </div>
    );
}
