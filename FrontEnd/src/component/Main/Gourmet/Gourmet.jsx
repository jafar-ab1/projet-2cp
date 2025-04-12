import "./Gourmet.css"; // Import the CSS file
import Food from "../../../assets/pexels-idinarisk-3008740.jpg";
import Chef from "../../../assets/pexels-sebastian-coman-photography-1598188-3437689.jpg";
import Restaurant from "../../../assets/pexels-pixabay-262047.jpg";

function Gourmet ()  {
  return (
    <>
    <div className="GourmetS">
      <div className="reservation-container">
        {/* Left side - Text content */}
        <div className="reservation-content">
          <h3 className="subtitle">The Gourmet Spot</h3>
          <h2 className="title">Reservation Highly<br/> Recommended</h2>
          <p>
            Open Sunday – Thursday 6 PM–9 PM and <br/>Friday – Saturday 6 PM–10 PM.<br/>
            Reservations are highly recommended.<br/> Please call 111111111 for your
            table or make a <br/>reservation online.
          </p>
          <p>
            The Gourmet Spot offers both indoor and<br/> outdoor seating, creating a
            warm and <br/>inviting atmosphere. Enjoy an extensive <br/>cocktail menu and
            homemade desserts for<br/> an unforgettable dining experience.
          </p>
          <button className="reservation-button">Make a reservation</button>

          {/* Bottom Left - Chef Image */}
          <div className="bottom-left">
            <img src={Chef} alt="Chef preparing food" />
          </div>
        </div>

        {/* Top Right - Food Image */}
        <div className="top-right">
          <img src={Food} alt="Delicious food" />
        </div>
    </div>
      
      

      {/* Full Width - Restaurant Interior Image */}
      <div className="full-width">
        <img src={Restaurant} alt="Restaurant interior" />
      </div>
      </div>
    </>
  );
};

export default Gourmet;
