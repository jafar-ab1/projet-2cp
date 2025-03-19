import { Routes, Route } from "react-router-dom";
import Page1 from "./Page1.jsx";  
import Page2 from "./Page2.jsx";  
import Page3 from "./Page3.jsx";
import Page4 from "./Page4.jsx";
import Page5 from "./Page5.jsx";
import Page6 from "./Page6.jsx";
import Page7 from "./Page7.jsx";
import Page8 from "./Page8.jsx";
import Page9 from "./Page9.jsx";
import Page10 from "./Page1-0.jsx";
import Booking from "./component/Main/Booking.jsx"
import Page12 from "./Page12.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/Accommodation" element={<Page2 />}/>
      <Route path="/Algiers" element={<Page3/>}/>
      <Route path="/Dining" element={<Page4/>}/>
      <Route path="/Gourmet" element={<Page5/>}/>
      <Route path="/Golden" element={<Page6/>}/>
      <Route path="/Nook" element={<Page7/>}/>
      <Route path="/Occasions" element={<Page8/>}/>
      <Route path="/Events" element={<Page9/>}/>
      <Route path="/Wellness" element={<Page10/>}/>
      <Route path="/Book" element={<Booking/>}/>
      <Route path="/Choose" element={<Page12/>}/>
    </Routes>
  );
}

export default App;
