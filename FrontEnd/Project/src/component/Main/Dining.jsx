import React from "react";
import { motion } from "framer-motion";
import GourmetImage from "../../assets/pexels-elevate-1267320.jpg";
import GoldenImage from "../../assets/pexels-edwardeyer-687824.jpg";
import CoffeeImage from "../../assets/pexels-lina-1813466.jpg";
import "./Accommodation.css"; 
import { Link } from "react-router-dom"; 

function Dining() {
  return (
    <motion.section 
      className="acomodation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className="head">
          <p className="par3">Delight in a variety of dining options crafted for every palate.<br/> Whether for a casual meal or a fine dining experience, we<br/> offer the perfect setting for any occasion. Flavorful, elegant, <br/>and inviting, your ideal dining moment awaits.

          </p>
        </div>


        <div className="containerWrapper2">
        <div className="BackColorG" />
        <div className="Branch-card" id="Gourmet">
          <motion.img 
            src={GourmetImage} 
            alt="The Gourmet Spot" 
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <p className="branch-title">The Gourmet Spot</p>
          </div>
          <div className="links1">
          <Link to="/Gourmet">learn more &gt;</Link>
            <a href="#">menu &gt;</a>
          </div>
        </div>
        


         <div className="containerWrapper2">
          <div className="BackColorG" />
        <div className="Branch-card" id="Golden">
          <motion.img 
            src={GoldenImage} 
            alt="The Golden Plate" 
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <p className="branch-title">The Golden Plate</p>
          </div>
          <div className="links1">
          <Link to="/Golden">learn more &gt;</Link>
            <a href="#">menu  &gt;</a>
          </div>
        
        </div>
        <div className="containerWrapper2">
        <div className="BackColorG" />
        <div className="Branch-card" id="Coffee">
          <motion.img 
            src={CoffeeImage} 
            alt="The Coffee Nook" 
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <p className="branch-title">The Coffee Nook</p>
          </div>
          <div className="links1">
          <Link to="/Nook">learn more &gt;</Link>
            <a href="#">menu  &gt;</a>
          </div>
        </div>
      </div>
      
    </motion.section>
  );
}

export default React.memo(Dining);
