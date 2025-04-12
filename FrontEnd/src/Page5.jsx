import backgroundImage from './assets/pexels-pixabay-262047.jpg';
import React from "react";

import Gourmet from "./component/Main/Gourmet/Gourmet.jsx";
import Footer from "./component/Footer/Footer.jsx";
import HeroSectionGourmet from "./component/Hero/HeroSectionGourmet.jsx";

function Page5() {
  return (
    <div className="App">
             <section className="container1" style={{backgroundImage: `url(${backgroundImage})`,}}>
      <HeroSectionGourmet />
      </section>
      <Gourmet/>
      <Footer />
    </div>
  );
}

export default Page5;
