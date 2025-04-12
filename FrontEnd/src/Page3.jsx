import backgroundImage from './assets/pexels-keeganjchecks-19199133.jpg';
import React from "react";

import Hotels from "./component/Main/Hotels/Hotels.jsx";
import Footer from "./component/Footer/Footer.jsx";
import HeroSectionAlgiers from "./component/Hero/HeroSectionAlgiers.jsx";


function Page2() {
  return (
    <div className="App">
             <section className="container1" style={{backgroundImage: `url(${backgroundImage})`,}}>
      <HeroSectionAlgiers />
      </section>
      <Hotels />
      <Footer />
    </div>
  );
}

export default Page2;
