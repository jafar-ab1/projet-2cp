import React from "react";
import { motion } from "framer-motion";
import algiersImage from "../../assets/pexels-karlsolano-2883048.jpg";
import oranImage from "../../assets/pexels-quark-studio-1159039-2507010.jpg";
import annabaImage from "../../assets/pexels-pixabay-53577 (1).jpg";
import "./Accommodation.css"; 
import { Link } from "react-router-dom"; 

function Accommodation() {
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
            Enjoy a range of rooms designed for comfort and relaxation. Whether for business or leisure, 
            we offer the perfect space for your stay. Cozy, stylish, and welcoming, your ideal room awaits.
          </p>
        </div>


        <div className="containerWrapper2">
        <div className="BackColorG" />
        <div className="Branch-card" id="Alger">
          <motion.img 
            src={algiersImage} 
            alt="Algiers Branch" 
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <p className="branch-title">Algiers branch</p>
          </div>
          <div className="links1">
            <Link to="/Algiers">learn more &gt;</Link>
            <a href="#">book now &gt;</a>
          </div>
        </div>
        


         <div className="containerWrapper2">
          <div className="BackColorG" />
        <div className="Branch-card" id="Oran">
          <motion.img 
            src={oranImage} 
            alt="Oran Branch" 
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <p className="branch-title">Oran branch</p>
          </div>
          <div className="links1">
            <a href="#">learn more &gt;</a>
            <a href="#">book now &gt;</a>
          </div>
        
        </div>
        <div className="containerWrapper2">
        <div className="BackColorG" />
        <div className="Branch-card" id="Annaba">
          <motion.img 
            src={annabaImage} 
            alt="Annaba Branch" 
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <p className="branch-title">Annaba branch</p>
          </div>
          <div className="links1">
            <a href="#">learn more &gt;</a>
            <a href="#">book now &gt;</a>
          </div>
        </div>
      </div>
      
    </motion.section>
  );
}

export default React.memo(Accommodation);
