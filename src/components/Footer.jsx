import { motion } from 'framer-motion';
import { Phone, MapPin, ChevronDown, User, Globe, Building } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <motion.div 
                    className="footer-cta"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="cta-content">
                        <h2>Ready to upgrade your industrial flooring?</h2>
                        <p>Get in touch with Kapoxx today for a professional consultation and quote.</p>
                    </div>
                    <div className="cta-form-container" id="quote">
                        <form className="contact-form" onSubmit={(e) => { 
                            e.preventDefault(); 
                            const formData = new FormData(e.target);
                            const name = formData.get('name');
                            const email = formData.get('email');
                            const phone = formData.get('phone');
                            const service = formData.get('service');
                            const message = formData.get('message');
                            
                            const text = `*New Quote Request*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Service:* ${service}%0A*Message:* ${message}`;
                            const whatsappUrl = `https://wa.me/+96899062181?text=${text}`;
                            
                            window.open(whatsappUrl, '_blank');
                        }}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" name="name" placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Contact Number</label>
                                <input type="tel" id="phone" name="phone" placeholder="+968 1234 5678" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id="email" name="email" placeholder="john@example.com" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="service">Service Required</label>
                                <div className="select-wrapper">
                                    <select id="service" name="service" required defaultValue="">
                                        <option value="" disabled>Select a Service</option>
                                        <option value="laser-concrete">Industrial Laser Concrete</option>
                                        <option value="preparation">Concrete Floor Preparations</option>
                                        <option value="epoxy">Comprehensive Epoxy Works</option>
                                        <option value="vinyl">Vinyl Flooring Works</option>
                                        <option value="waterproofing">Waterproofing Solutions</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <ChevronDown className="select-icon" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Project Details</label>
                                <textarea id="message" name="message" rows="4" placeholder="Tell us about your project requirements..." required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Send Message</button>
                        </form>
                    </div>
                </motion.div>

                <div className="footer-bottom" id="contact">
                    <div className="footer-brand">
                        <a href="#hero" className="logo footer-logo">
                            <img src="/images/logo.png" alt="Kapoxx Logo" className="logo-img" />
                            <span className="logo-tagline footer-tagline">INTEGRATED MOUNTAIN TRD& CONT SPC</span>
                        </a>
                        <p className="footer-desc">Precision engineered industrial flooring and construction solutions.</p>
                    </div>
                    <div className="footer-contact">
                        <div className="contact-item">
                            <User />
                            <span><strong>C K Noushad</strong> <br/>Sales Manager</span>
                        </div>
                        <div className="contact-item">
                            <Phone />
                            <span>+968 99062181</span>
                        </div>
                        <div className="contact-item">
                            <Globe />
                            <span>www.kapoxx.com</span>
                        </div>
                        <div className="contact-item">
                            <MapPin />
                            <span><strong>Head Office:</strong> 51, Al Atta Pharmacy Building, Al Safa RAB, Al Khair St, Mabela, Muscat, Sultanate of Oman</span>
                        </div>
                        <div className="contact-item">
                            <Building />
                            <span><strong>Branch:</strong> Opp. Sultan Qaboos University, Salalah, Sultanate of Oman</span>
                        </div>
                    </div>
                </div>
                
                <div className="footer-copyright">
                    <p>&copy; {currentYear} Kapoxx. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
