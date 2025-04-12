import backgroundImage from './assets/pexels-kamenczak-775219.jpg';
import React from "react";

import Accommodation from "./component/Main/Accomodation/Accommodation.jsx";
import Footer from "./component/Footer/Footer.jsx";
import NavigationBar from "./component/Hero/NavigationBar-Accommodation.jsx";


function Page2() {
  return (
    <div className="App">
             <section className="container1" style={{backgroundImage: `url(${backgroundImage})`,}}>
      <NavigationBar />
      </section>
      <Accommodation />
      <Footer />
    </div>
  );
}

export default Page2;
