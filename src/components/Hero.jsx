import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion, useMotionTemplate, useSpring } from 'framer-motion';

const frameCount = 240;
const currentFrame = (index) => `/images/herosection/ezgif-frame-${index.toString().padStart(3, '0')}.png`;

export default function Hero() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);

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

    // Map the smoothed scroll progress to frame index
    const frameIndex = useTransform(smoothProgress, [0, 1], [1, frameCount]);

    // Helper to scale image to cover canvas (like object-fit: cover)
    const drawImageProp = (ctx, img, x, y, w, h, offsetX, offsetY) => {
        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width / (window.devicePixelRatio || 1);
            h = ctx.canvas.height / (window.devicePixelRatio || 1);
        }

        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;

        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;

        var iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,
            nh = ih * r,
            cx, cy, cw, ch, ar = 1;

        if (nw < w) ar = w / nw;                             
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  
        nw *= ar;
        nh *= ar;

        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        // Optimization: Removed ctx.clearRect because the image covers the entire canvas anyway.
        ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
    };

    useEffect(() => {
        // Preload images sequentially to not choke the browser
        const loadImages = async () => {
            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
                imagesRef.current[i] = img;
            }
        };
        loadImages();

        const setupCanvas = () => {
            if (!canvasRef.current) return null;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d', { alpha: false });
            const dpr = window.devicePixelRatio || 1;
            
            // Upscale the internal resolution for Retina displays to fix blurriness
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            
            // Lock the CSS size to the logical viewport size
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            
            // Scale the drawing context so calculations work correctly
            context.scale(dpr, dpr);
            return context;
        };

        const drawInitial = () => {
            if (canvasRef.current && imagesRef.current[1] && imagesRef.current[1].complete) {
                const context = setupCanvas();
                drawImageProp(context, imagesRef.current[1], 0, 0, window.innerWidth, window.innerHeight);
            }
        };

        // Draw initial frame (check if already complete from cache)
        if (imagesRef.current[1]) {
            if (imagesRef.current[1].complete) {
                drawInitial();
            } else {
                imagesRef.current[1].onload = drawInitial;
            }
        }
        
        // Handle resize properly for mobile (ignore height-only changes from address bar)
        let lastWidth = window.innerWidth;
        const handleResize = () => {
            if (window.innerWidth !== lastWidth && canvasRef.current && imagesRef.current[1]) {
                lastWidth = window.innerWidth;
                const context = setupCanvas();
                let frame = Math.round(frameIndex.get()) || 1;
                frame = Math.min(Math.max(frame, 1), frameCount);
                if (imagesRef.current[frame] && imagesRef.current[frame].complete) {
                    drawImageProp(context, imagesRef.current[frame], 0, 0, window.innerWidth, window.innerHeight);
                }
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let ticking = false;
        // Cache context outside the animation loop for performance
        let cachedContext = null;
        if (canvasRef.current) {
            cachedContext = canvasRef.current.getContext('2d', { alpha: false });
        }

        return frameIndex.on("change", (latest) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    let frame = Math.round(latest);
                    frame = Math.min(Math.max(frame, 1), frameCount); 
                    const img = imagesRef.current[frame];
                    
                    if (img && img.complete && cachedContext) {
                        drawImageProp(cachedContext, img, 0, 0, window.innerWidth, window.innerHeight);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }, [frameIndex]);

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

    return (
        <section ref={containerRef} className="scroll-hero-section" id="hero">
            <div className="sticky-container">
                <canvas ref={canvasRef} className="hero-canvas"></canvas>
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
