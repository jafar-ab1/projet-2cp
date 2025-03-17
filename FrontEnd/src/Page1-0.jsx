
import backgroundImage from './assets/pexels-asphotograpy-105028.jpg';


import React from "react";


import Wellness from "./component/Main/Wellness.jsx";
import Footer from "./component/Footer/Footer.jsx";
import HeroSectionWellness from "./component/Hero/HeroSectionWellness.jsx";


function Page10() {
  return (
    <div className="App">
             <section className="container1" style={{backgroundImage: `url(${backgroundImage})`,}}>
      <HeroSectionWellness />
      </section>
      <Wellness />
      <Footer />
    </div>
  );
}

export default Page10;
