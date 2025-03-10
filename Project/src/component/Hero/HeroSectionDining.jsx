import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import "./HeroSection.css"; 

function HeroDining() {
  
  const [navBackground, setNavBackground] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavBackground("rgba(0, 0, 0, 0.8)");
      } else {
        setNavBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container1"  
    >
      <div className="navigation-bar" style={{ backgroundColor: navBackground, transition: "0.3s ease" }}>
        <div className="left-section">
          <p>HOTEL<br />NAME</p>
        </div>
        <div className="middle-section">
          <Link to="Gourmet" smooth={true} duration={800} className="AlgiersB">The Gourmet Spot</Link>
          <Link to="Golden" smooth={true} duration={800} className="OranB">The Golden Plate</Link>
          <Link to="Coffee" smooth={true} duration={800} className="AnnabaB">The Coffee Nook</Link>
        </div>
        <div className="right-section">
          <button className="Sign-in"> Sign In </button>
        </div>
      </div>
      <div className="par">
        <p className="par1">Savor culinary delights crafted for <br/> your ultimate satisfaction.</p>
        <p className="par2">Wherever your journey takes you, our dining experiences combine<br/> flavor, ambiance, and exceptional service, making every meal <br/>unforgettable</p>
      </div>
    </motion.section>
  );
}

export default React.memo(HeroDining);
