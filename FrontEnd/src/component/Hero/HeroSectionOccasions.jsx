import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import "./HeroSection.css"; 

function HeroSectionOccasions() {
  
  
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
        <p className="par1">Where Your Special Moments <br/>
        Become Unforgettable</p>
        <p className="par2">Our hotel transforms your special occasions into unforgettable<br/> celebrations, blending elegance, charm, and exceptional service</p>
      </div>
    </section>
  );
}

export default HeroSectionOccasions