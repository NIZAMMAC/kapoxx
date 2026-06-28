import { motion } from 'framer-motion';

export default function BackgroundDroplets() {
    // Generate 45 droplets with random positioning everywhere in the section
    const droplets = Array.from({ length: 45 }).map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100; // distribute vertically as well
        const delay = Math.random() * 5;
        const duration = 4 + Math.random() * 6; 
        const size = 15 + Math.random() * 30; 
        
        return (
            <motion.div
                key={i}
                className="droplet"
                style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: size,
                    height: size,
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ 
                    y: 100, 
                    opacity: [0, 0.4, 0] 
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: delay,
                    ease: "linear"
                }}
            >
                <svg viewBox="0 0 24 24" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
                </svg>
            </motion.div>
        );
    });

    return (
        <div className="bg-droplets-container">
            {droplets}
        </div>
    );
}
