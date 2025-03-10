import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import "./HeroSection.css"; 

function HeroSectionAlgiers() {
  
  
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
        <p className="par1">Your Stay in Algiers Awaits<br /> Your Ultimate Comfort</p>
        <p className="par2">In the vibrant city of Algiers, our hotel combines comfort, convenience,<br/> and elegance, ensuring every stay is both relaxing and memorable.</p>
      </div>
    </section>
  );
}

export default HeroSectionAlgiers