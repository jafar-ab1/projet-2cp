


import React from "react";
import "./Page13.css"

import Basket from "./component/Main/Basket.jsx";

import CheckOut from "./component/Main/CheckOut.jsx";


function Page13() {
  return (
    <div className="App">
        <div className="Contenent">
        <CheckOut/>
        <Basket/>
        </div>
    </div>
  );
}

export default Page13;
