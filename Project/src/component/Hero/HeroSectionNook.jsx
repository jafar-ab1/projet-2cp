import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import "./HeroSection.css"; 

function HeroSectionNook() {
  
  
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
        <p className="par1">our Coffee Journey Begins <br />at The Coffee Nook</p>
        <p className="par2">At The Coffee Nook, indulge in a perfect blend of flavor, ambiance, and<br/> elegance, making every dining experience unforgettable.</p>
      </div>
    </section>
  )
}

export default HeroSectionNook