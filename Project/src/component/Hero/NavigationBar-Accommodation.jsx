import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import "./HeroSection.css"; 

function NavigationBar() {
  
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
          <Link to="Alger" smooth={true} duration={800} className="AlgiersB">Algiers</Link>
          <Link to="Oran" smooth={true} duration={800} className="OranB">Oran</Link>
          <Link to="Annaba" smooth={true} duration={800} className="AnnabaB">Annaba</Link>
        </div>
        <div className="right-section">
          <button className="Sign-in"> Sign In </button>
        </div>
      </div>
      <div className="par">
        <p className="par1">Relax In Rooms Designed For<br /> Your Ultimate Comfort</p>
        <p className="par2">Wherever your journey takes you, our accommodations offer a blend of<br /> comfort, convenience, and luxury, making every stay unforgettable</p>
      </div>
    </motion.section>
  );
}

export default React.memo(NavigationBar);
