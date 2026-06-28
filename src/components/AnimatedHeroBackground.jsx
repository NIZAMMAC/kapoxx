import { motion } from 'framer-motion';

export default function AnimatedHeroBackground() {
    // Generate heavy rain
    // Middle rain hits the roof (top 0 to 50%)
    const centerRain = Array.from({ length: 80 });
    
    // Edge rain falls all the way down (top 0 to 100%)
    const edgeRainLeft = Array.from({ length: 30 });
    const edgeRainRight = Array.from({ length: 30 });

    // Splashes for when rain hits the roof
    const splashes = Array.from({ length: 40 });

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, backgroundColor: '#ffffff' }}>
            
            {/* Soft background gradient */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(to bottom, #ffffff 0%, #e0f2fe 100%)',
                zIndex: 1,
            }}></div>

            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
                
                {/* Center Rain (Heavy rain hitting the roof) */}
                {centerRain.map((_, i) => {
                    // Random x position between 20% and 80%
                    const left = 20 + Math.random() * 60;
                    
                    // Exact mathematical calculation for the Y coordinate of the roof curve at this X position
                    const t = (left - 20) / 60;
                    const dropY = 65 - 90 * t + 90 * Math.pow(t, 2);
                    
                    const duration = 0.3 + Math.random() * 0.2; // Fast falling rain
                    const delay = Math.random() * 2;
                    
                    return (
                        <motion.div
                            key={`c-${i}`}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ 
                                y: ['-5vh', `${dropY}vh`],
                                opacity: [0, 0.7, 0]
                            }}
                            transition={{ duration, repeat: Infinity, ease: "linear", delay }}
                            style={{
                                position: 'absolute',
                                left: `${left}%`,
                                top: 0,
                                width: '2px',
                                height: '25px',
                                background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.9))',
                                borderRadius: '2px'
                            }}
                        />
                    );
                })}

                {/* Left Edge Rain (Bypasses the roof) */}
                {edgeRainLeft.map((_, i) => {
                    const duration = 0.5 + Math.random() * 0.3;
                    return (
                        <motion.div
                            key={`l-${i}`}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: ['-5vh', '110vh'], opacity: [0, 0.6, 0] }}
                            transition={{ duration, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                            style={{
                                position: 'absolute', left: `${Math.random() * 19}%`, top: 0,
                                width: '2px', height: '35px', background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.6))'
                            }}
                        />
                    );
                })}

                {/* Right Edge Rain (Bypasses the roof) */}
                {edgeRainRight.map((_, i) => {
                    const duration = 0.5 + Math.random() * 0.3;
                    return (
                        <motion.div
                            key={`r-${i}`}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: ['-5vh', '110vh'], opacity: [0, 0.6, 0] }}
                            transition={{ duration, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                            style={{
                                position: 'absolute', left: `${81 + Math.random() * 19}%`, top: 0,
                                width: '2px', height: '35px', background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.6))'
                            }}
                        />
                    );
                })}

                {/* Splashes exactly on the roof curve */}
                {splashes.map((_, i) => {
                    const left = 20 + Math.random() * 60;
                    const t = (left - 20) / 60;
                    const splashY = 65 - 90 * t + 90 * Math.pow(t, 2);
                    
                    return (
                        <motion.div
                            key={`s-${i}`}
                            animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
                            transition={{ duration: 0.2 + Math.random() * 0.2, repeat: Infinity, delay: Math.random() * 2 }}
                            style={{
                                position: 'absolute',
                                left: `${left}%`,
                                top: `${splashY}vh`,
                                width: '8px', height: '3px',
                                borderRadius: '50%',
                                border: '1px solid rgba(6, 182, 212, 0.9)',
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    );
                })}

                {/* SVG Shield / Roof and Runoff water streams */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} preserveAspectRatio="none">
                    
                    {/* The Main Waterproof Shield/Roof Curve */}
                    <path 
                        d="M 20 65 Q 50 20 80 65" 
                        fill="none" 
                        stroke="rgba(14, 165, 233, 0.5)" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                    />
                    
                    {/* Water streams running down the LEFT side of the roof */}
                    {[0, 0.5, 1.0].map((delay, i) => (
                        <motion.path 
                            key={`runoff-l-${i}`}
                            d="M 50 42.5 Q 35 42.5 20 65" 
                            fill="none" 
                            stroke="rgba(6, 182, 212, 0.9)" 
                            strokeWidth="3" 
                            strokeLinecap="round"
                            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                            animate={{ 
                                pathLength: [0, 0.4, 0],
                                pathOffset: [0, 0.6, 1],
                                opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeIn", delay: delay }}
                        />
                    ))}

                    {/* Water streams running down the RIGHT side of the roof */}
                    {[0.2, 0.7, 1.2].map((delay, i) => (
                        <motion.path 
                            key={`runoff-r-${i}`}
                            d="M 50 42.5 Q 65 42.5 80 65" 
                            fill="none" 
                            stroke="rgba(6, 182, 212, 0.9)" 
                            strokeWidth="3" 
                            strokeLinecap="round"
                            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                            animate={{ 
                                pathLength: [0, 0.4, 0],
                                pathOffset: [0, 0.6, 1],
                                opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeIn", delay: delay }}
                        />
                    ))}
                </svg>

                {/* Waterfall drips off the very edges of the roof */}
                {[20, 80].map((leftPos, sideIndex) => (
                    Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                            key={`drip-${sideIndex}-${i}`}
                            initial={{ y: '65vh', opacity: 0 }}
                            animate={{ y: ['65vh', '110vh'], opacity: [0, 0.8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeIn", delay: Math.random() }}
                            style={{
                                position: 'absolute',
                                left: `${leftPos}%`,
                                top: 0,
                                width: '3px',
                                height: '15px',
                                background: 'rgba(6, 182, 212, 0.8)',
                                borderRadius: '2px',
                                transform: 'translateX(-50%)'
                            }}
                        />
                    ))
                ))}

                {/* Dry Zone underneath the roof (Pure white to signify no water penetrates) */}
                <div style={{
                    position: 'absolute',
                    top: '65vh',
                    left: '20%',
                    width: '60%',
                    height: '35vh',
                    background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0) 100%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}></div>
            </div>
        </div>
    );
}
