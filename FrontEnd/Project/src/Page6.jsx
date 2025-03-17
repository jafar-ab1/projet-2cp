
import backgroundImage from './assets/pexels-igor-starkov-233202-1307698.jpg';


import React from "react";


import Golden from "./component/Main/Golden.jsx";
import Footer from "./component/Footer/Footer.jsx";
import HeroSectionGolden from "./component/Hero/HeroSectionGolden.jsx";


function Page6() {
  return (
    <div className="App">
             <section className="container1" style={{backgroundImage: `url(${backgroundImage})`,}}>
      <HeroSectionGolden />
      </section>
      <Golden/>
      <Footer />
    </div>
  );
}

export default Page6;
