import React from "react";
import { motion } from "framer-motion";
import EventsImage from "../../assets/pexels-maorattias-5191742.jpg";
import "./Accommodation.css"; 

function Events() {
  return (
    <motion.section 
      className="acomodation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className="head">
          <p className="par3">
          Our hotel is the perfect venue for all types of events, from corporate gatherings to private celebrations. We offer versatile spaces, tailored services, and a professional atmosphere to ensure your event is a resounding success. With exceptional decor, state-of-the-art amenities, and dedicated support, every detail is crafted to exceed your expectations.</p>
        </div>


        <div className="containerWrapper2">
        <div className="BackColorG" />
        <div className="Branch-card">
          <motion.img 
            src={EventsImage} 
            alt="Events" 
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <p className="branch-title">Events</p>
          </div>
          <div className="links1">
            <a href="#">Make a reservation&gt;</a>
            
          </div>
        </div>
        </div>
        </motion.section>
        )}
        export default Events