import { motion } from 'framer-motion';

export default function AnimatedHeroBackground() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, backgroundColor: '#ffffff' }}>
            
            {/* Liquid Epoxy Orbs */}
            
            {/* Orb 1 - Top Left to Bottom Right */}
            <motion.div 
                animate={{
                    x: ['0vw', '40vw', '10vw', '0vw'],
                    y: ['0vh', '30vh', '50vh', '0vh'],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '-10%', left: '-10%',
                    width: '60vw', height: '60vw',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(6, 182, 212, 0) 70%)',
                    zIndex: 1
                }}
            />

            {/* Orb 2 - Bottom Right to Top Left */}
            <motion.div 
                animate={{
                    x: ['0vw', '-40vw', '-20vw', '0vw'],
                    y: ['0vh', '-40vh', '-10vh', '0vh'],
                    scale: [1, 1.1, 1.3, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    bottom: '-20%', right: '-10%',
                    width: '70vw', height: '70vw',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(14, 165, 233, 0.5) 0%, rgba(14, 165, 233, 0) 70%)',
                    zIndex: 1
                }}
            />

            {/* Orb 3 - Middle floating */}
            <motion.div 
                animate={{
                    x: ['0vw', '20vw', '-20vw', '0vw'],
                    y: ['0vh', '20vh', '-20vh', '0vh'],
                    scale: [1, 1.4, 0.8, 1],
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '20%', left: '20%',
                    width: '50vw', height: '50vw',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0) 70%)',
                    zIndex: 1
                }}
            />

            {/* Glassmorphism Overlay (Mixes the colors into a smooth liquid) */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                backdropFilter: 'blur(80px)',
                WebkitBackdropFilter: 'blur(80px)',
                zIndex: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
            }}></div>

            {/* Subtle Grid overlay for technical texture */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.08) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                zIndex: 3,
                opacity: 0.8
            }}></div>
        </div>
    );
}
