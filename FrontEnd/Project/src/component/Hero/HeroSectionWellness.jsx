import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import "./HeroSection.css"; 

function HeroSectionWellness() {
  
  
  return (
    <section
      className="container1"  
    >
      <div className="navigation-bar" >
        <div className="left-section">
          <p>HOTEL<br />NAME</p>
        </div>
        <div className="middle-section">
          
        </div>
        <div className="right-section">
          <button className="Sign-in"> Sign In </button>
        </div>
      </div>
      <div className="par">
        <p className="par1">Where Wellness Meets Tranquility</p>
        <p className="par2">Our hotel combines relaxation, luxury, and wellness to create an experience that rejuvenates your body and spirit, whether through a soothing spa day or a complete wellness retreat.</p>
      </div>
    </section>
  );
}

export default HeroSectionWellness