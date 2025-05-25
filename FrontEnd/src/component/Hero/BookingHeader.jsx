import "./BookingHeader.css"
import { Link, useNavigate } from "react-router-dom";

function BookingHeader({ hotelName = "Hotel name", cartItems = 0, onCartClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="hotel-name"><Link to="/">{hotelName}</Link></h1>
        <div className="cart-container" onClick={onCartClick} style={{ cursor: "pointer" }}>
          <div className="cart-icon">
            <span className="cart-symbol">🛒</span>
            {cartItems > 0 && <span className="cart-badge">{cartItems}</span>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default BookingHeader
