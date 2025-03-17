
import backgroundImage from './assets/pexels-bertellifotografia-17023023.jpg';


import React from "react";


import Occasions from "./component/Main/Occasions.jsx";
import Footer from "./component/Footer/Footer.jsx";
import HeroSectionOccasions from "./component/Hero/HeroSectionOccasions.jsx";


function Page8() {
  return (
    <div className="App">
             <section className="container1" style={{backgroundImage: `url(${backgroundImage})`,}}>
      <HeroSectionOccasions />
      </section>
      <Occasions />
      <Footer />
    </div>
  );
}

export default Page8;
