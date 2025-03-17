
import backgroundImage from './assets/pexels-iustin-boghitoi-2148940010-30350589.jpg';


import React from "react";


import Events from "./component/Main/Events.jsx";
import Footer from "./component/Footer/Footer.jsx";
import HeroSectionEvents from "./component/Hero/HeroSectionEvents.jsx";


function Page9() {
  return (
    <div className="App">
             <section className="container1" style={{backgroundImage: `url(${backgroundImage})`,}}>
      <HeroSectionEvents />
      </section>
      <Events />
      <Footer />
    </div>
  );
}

export default Page9;
