import React from "react";
import { motion } from "framer-motion";
import OccasionImage from "../../assets/pexels-fakhribagirov-13659421.jpg";
import "./Accommodation.css"; 

function Occasions() {
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
          Our hotel is the perfect venue for your special occasions, whether it’s a wedding or a birthday celebration. We offer elegant spaces, tailored services, and a refined atmosphere to create unforgettable memories. From stunning decor to   personalized menus, every detail is designed to make your event truly exceptional
          </p>
        </div>


        <div className="containerWrapper2">
        <div className="BackColorG" />
        <div className="Branch-card">
          <motion.img 
            src={OccasionImage} 
            alt="Occasions" 
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <p className="branch-title">Occasions</p>
          </div>
          <div className="links1">
            <a href="#">Make a reservation&gt;</a>
            
          </div>
        </div>
        </div>
        </motion.section>
        )}
        export default Occasions