import { motion } from 'framer-motion';

const steps = [
    {
        number: "01",
        title: "Site Assessment & Planning",
        desc: "We conduct a thorough structural and environmental analysis to determine the precise flooring compound needed for your facility's unique load and chemical exposure."
    },
    {
        number: "02",
        title: "Advanced Surface Preparation",
        desc: "Using industrial-grade milling and diamond grinding equipment, we prepare the substrate to guarantee 100% adhesion and eliminate future delamination."
    },
    {
        number: "03",
        title: "Precision Application",
        desc: "Our certified technicians apply the selected system (Laser Concrete, U-crete, or Epoxy) maintaining strict environmental controls for optimal curing."
    },
    {
        number: "04",
        title: "Quality Assurance & Handover",
        desc: "Final inspections include load-bearing tests and antistatic verification, ensuring the floor meets all rigorous clinical and industrial standards."
    }
];

import BackgroundDroplets from './BackgroundDroplets';

export default function Process() {
    return (
        <section id="process" className="process-section">
            <BackgroundDroplets />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="section-title">The Kapoxx Process</h2>
                    <p className="section-subtitle">A systematic, clinical approach to industrial flooring.</p>
                </motion.div>

                <div className="process-grid">
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index} 
                            className="process-step"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="step-number">{step.number}</div>
                            <div className="step-content">
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
