import { useRef } from 'react';
import { useScroll, useTransform, motion, useMotionTemplate, useSpring } from 'framer-motion';
import AnimatedHeroBackground from './AnimatedHeroBackground';

export default function Hero() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Apply Apple-style inertia and physics smoothing to the raw scroll value
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Overlay text animations - Apple Style Flow
    
    // Text 1 (Starts visible, fades out)
    const opacity1 = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(smoothProgress, [0, 0.25], [0, -60]);
    const scale1 = useTransform(smoothProgress, [0, 0.25], [1, 1.05]);
    const blur1 = useTransform(smoothProgress, [0, 0.15, 0.25], [0, 0, 10]);
    const filter1 = useMotionTemplate`blur(${blur1}px)`;

    // Text 2 (Fades in, holds, fades out)
    const opacity2 = useTransform(smoothProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
    const y2 = useTransform(smoothProgress, [0.25, 0.35, 0.55, 0.65], [60, 0, 0, -60]);
    const scale2 = useTransform(smoothProgress, [0.25, 0.65], [0.95, 1.05]);
    const blur2 = useTransform(smoothProgress, [0.25, 0.35, 0.55, 0.65], [10, 0, 0, 10]);
    const filter2 = useMotionTemplate`blur(${blur2}px)`;

    // Text 3 (Fades in, holds, fades out before end)
    const opacity3 = useTransform(smoothProgress, [0.65, 0.75, 0.95, 1], [0, 1, 1, 0]);
    const y3 = useTransform(smoothProgress, [0.65, 0.75, 0.95, 1], [60, 0, 0, -60]);
    const scale3 = useTransform(smoothProgress, [0.65, 1], [0.95, 1.05]);
    const blur3 = useTransform(smoothProgress, [0.65, 0.75, 0.95, 1], [10, 0, 0, 10]);
    const filter3 = useMotionTemplate`blur(${blur3}px)`;

    // Background Parallax
    const bgY = useTransform(smoothProgress, [0, 1], ['0%', '30%']);

    return (
        <section ref={containerRef} className="scroll-hero-section" id="hero">
            <div className="sticky-container">
                <motion.div style={{ y: bgY, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                    <AnimatedHeroBackground />
                </motion.div>
                
                <div className="hero-overlay-gradient"></div>
                
                {/* Text 1 */}
                <motion.div style={{ opacity: opacity1, y: y1, scale: scale1, filter: filter1 }} className="hero-text-container hero-pos-top-left">
                    <h1 className="hero-title">
                        Precision <br/>
                        <span className="text-blue">Engineered</span> <br/>
                        Flooring.
                    </h1>
                    <p className="hero-subtitle">Setting the industrial standard for durability.</p>
                </motion.div>

                {/* Text 2 */}
                <motion.div style={{ opacity: opacity2, y: y2, scale: scale2, filter: filter2 }} className="hero-text-container hero-pos-bottom-right">
                    <h2 className="hero-title">
                        Unmatched <br/>
                        <span className="text-blue">Durability.</span>
                    </h2>
                    <p className="hero-subtitle">Designed to withstand extreme industrial loads without cracking or degrading.</p>
                </motion.div>

                {/* Text 3 */}
                <motion.div style={{ opacity: opacity3, y: y3, scale: scale3, filter: filter3 }} className="hero-text-container hero-pos-bottom-left">
                    <h2 className="hero-title">
                        Clinical <br/>
                        <span className="text-blue">Precision.</span>
                    </h2>
                    <p className="hero-subtitle">Antistatic, seamless, and perfectly leveled for critical hospital environments.</p>
                </motion.div>
            </div>
        </section>
    );
}
