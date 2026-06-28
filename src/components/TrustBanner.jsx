import { motion } from 'framer-motion';

export default function TrustBanner() {
    return (
        <section id="about" className="trust-banner">
            <div className="container">
                <div className="trust-content">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="trust-title">Uncompromising Quality & Precision</h2>
                        <p className="trust-text">We build the foundation of your success. At <span className="highlight">Kapoxx</span>, we adhere to the highest industrial standards, delivering floors that withstand the test of time, extreme loads, and clinical requirements.</p>
                    </motion.div>
                    
                    <motion.div 
                        className="stats-grid"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.3 }
                            }
                        }}
                    >
                        {[
                            { num: "100%", label: "Industrial Standards" },
                            { num: "Ultra", label: "Durability Guarantee" },
                            { num: "Laser", label: "Precision Finishing" }
                        ].map((stat, i) => (
                            <motion.div 
                                key={i} 
                                className="stat-item"
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                }}
                            >
                                <div className="stat-number">{stat.num}</div>
                                <div className="stat-label">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
