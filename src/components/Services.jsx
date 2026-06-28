import { motion } from 'framer-motion';
import { PaintBucket, Droplets, Layers } from 'lucide-react';
import BackgroundDroplets from './BackgroundDroplets';

const services = [
    {
        title: "Epoxy",
        icon: <PaintBucket size={60} strokeWidth={1.5} />
    },
    {
        title: "Waterproofing",
        icon: <Droplets size={60} strokeWidth={1.5} />
    },
    {
        title: "Flooring Solutions",
        icon: <Layers size={60} strokeWidth={1.5} />
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Services() {
    return (
        <section id="services" className="services-section">
            <BackgroundDroplets />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div 
                    className="services-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {services.map((service, index) => (
                        <motion.div key={index} className="service-card" variants={itemVariants}>
                            <div className="icon-wrapper">
                                {service.icon}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div 
                    className="expertise-banner"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                >
                    <div className="expertise-text">15 Years Of Expertise In Water Proof & Epoxy Solutions</div>
                </motion.div>
            </div>
        </section>
    );
}
