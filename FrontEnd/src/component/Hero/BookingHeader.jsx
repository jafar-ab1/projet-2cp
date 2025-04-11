import "./BookingHeader.css"

function BookingHeader({ hotelName = "Hotel name", cartItems = 0, onCartClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="hotel-name">{hotelName}</h1>
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
