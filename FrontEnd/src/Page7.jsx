
import backgroundImage from './assets/pexels-igor-starkov-233202-1307698.jpg';


import React from "react";


import Nook from "./component/Main/Nook.jsx";
import Footer from "./component/Footer/Footer.jsx";
import HeroSectionNook from "./component/Hero/HeroSectionNook.jsx";


function Page7() {
  return (
    <div className="App">
             <section className="container1" style={{backgroundImage: `url(${backgroundImage})`,}}>
      <HeroSectionNook />
      </section>
      <Nook/>
      <Footer />
    </div>
  );
}

export default Page7;
