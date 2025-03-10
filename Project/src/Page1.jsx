
import backgroundImageH from './assets/pexels-manuel-barros-1263073-2403017.jpg';


import React from "react";


import Footer from "./component/Footer/Footer.jsx";
import HeroSectionH from "./component/Hero/HeroSectionH.jsx";
import HomePage from './component/Main/HomePage.jsx';
import { color } from 'framer-motion';
import { useNavigate } from "react-router-dom";


function Page1() {
  const navigate= useNavigate();
  return (
    <div className="App">
             <section className="container1" style={{backgroundImage: `url(${backgroundImageH})`,}}>
      <HeroSectionH navigate={navigate} />
      </section>
      <HomePage />
      <Footer />
    </div>
  );
}

export default Page1;
