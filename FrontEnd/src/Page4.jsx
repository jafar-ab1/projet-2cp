
import backgroundImage from './assets/pexels-pixabay-262978.jpg';


import React from "react";


import Dining from "./component/Main/Dining.jsx";
import Footer from "./component/Footer/Footer.jsx";
import HeroDining from "./component/Hero/HeroSectionDining.jsx";


function Page4() {
  return (
    <div className="App">
             <section className="container1" style={{backgroundImage: `url(${backgroundImage})`,}}>
      <HeroDining />
      </section>
      <Dining />
      <Footer />
    </div>
  );
}

export default Page4;
