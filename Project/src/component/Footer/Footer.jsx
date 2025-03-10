import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
function Footer() {
  return (
    <motion.section
      className="footer-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="footer-container">
        <div className="footer-left">
          <p>
            <i className="phone"></i> 035878709
          </p>
          <p>
            <i className="email"></i> hotelname@gmail.com
          </p>
        </div>

        <div className="footer-center">
          <motion.img
            src="#"
            alt="Hotel Logo"
            className="footer-logo"
            loading="lazy"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <ul>
            <li><Link to="/Accommodation">Accommodations</Link></li>
            <li><Link to="/Occasions">Occasions</Link></li>
            <li><Link to="/Events">Events</Link></li>
            <li><Link to="/Wellness">Wellness</Link></li>
            <li><Link to="/Dining">Dining</Link></li>
            <li><Link to='#'>Join Us</Link></li>
          </ul>
        </div>

        <div className="footer-right">
          <motion.button
            className="book-now"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Book Now
          </motion.button>
          <p>Follow us:</p>
          <div className="social-icons">
            <i className="instagram"></i>
            <i className="facebook"></i>
            <i className="tiktok"></i>
          </div>
        </div>
      </div>

      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <a href="#">FAQ</a>
        <span> | </span>
        <a href="#">Press</a>
      </motion.div>
    </motion.section>
  );
}

export default Footer;
