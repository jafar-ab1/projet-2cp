import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom"; 

import "./HeroSection.css"; 


function HeroSectionH() {
  const navigate = useNavigate();
 
  return (
    <div className="hero-container">
      {/* Navigation Bar */}
      <div className="Navigation-Bar">
        <div className="left-section">
          <p>HOTEL<br />NAME</p>
        </div>
        
        <ul className="middle-section">
            {/* ✅ Use <Link> instead of <a> */}
           <li> <Link to="/Accommodation">Accommodation</Link>
          </li>
          <li><Link to="/Occasions">Occasions</Link></li>
          <li><Link to="/Events">Events</Link></li>
          <li><Link to="/Wellness">Wellness</Link></li>
          <li><Link to="/Dining">Dining</Link></li>
        
          </ul>
        
        <div className="right-section">
          <button className="Sign-in">Sign In</button>
        </div>
      </div>

      {/* Hero Section Content */}
      
      <div className="par">
        <p className="par1">Where Every Moment<br />
        Feels Like Home</p>
        <p className="par2">
        Experience comfort and luxury at our hotel, where every stay is<br /> unforgettable. From elegant rooms to world-class amenities, your perfect<br /> getaway awaits.
        </p>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button className="Booking" onClick={() => navigate("/Book")}>Book now</button>
        <button className="More">Learn more &gt;</button>
      </div>
    </div>
    
  );
}

export default HeroSectionH;
