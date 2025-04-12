import roomsData from "../../../data/room"
import "./Booking3.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BookingHeader from "../../Hero/BookingHeader.jsx"
import Booking31 from "../Booking31/Booking31.jsx"
import MiniBasket from "../MiniBasket/MiniBasket.jsx"
import Room from "./Room/Room.jsx"

function Booking3() {
  const [rooms, setRooms] = useState(roomsData);
  const [bookingData, setBookingData] = useState(null);
  const [reservedRooms, setReservedRooms] = useState([]);
  const [showBasket, setShowBasket] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedData = localStorage.getItem("bookingData");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }

    const storedReservedRooms = localStorage.getItem("reservedRooms");
    if(storedReservedRooms) {
      const value = JSON.parse(storedReservedRooms);
      if(value) setReservedRooms(value);
    }
  }, []);

  const addToBasket = (room) => {
    const newRoom = { ...room }
    return setReservedRooms((prevRooms) => [...prevRooms, newRoom])
  }

  useEffect(() => {
    return localStorage.setItem("reservedRooms", JSON.stringify(reservedRooms));
  }, [reservedRooms]);

  if (!bookingData) {
    return <p>Loading booking details...</p>;
  }

  return (
    <>
      <div className="Top">
        <BookingHeader
          hotelName="Your Hotel"
          cartItems={reservedRooms.length}
          onCartClick={() => setShowBasket((prev) => !prev)}
        />
        <Booking31 bookingData={bookingData}/>
      </div>

      {showBasket && (
        <div className="BasketPopup">
          <MiniBasket bookingData={bookingData} reservedRooms={reservedRooms} setReservedRooms={setReservedRooms} />
          <button className="ClosePopup" onClick={() => setShowBasket(false)} >✖</button>
        </div>
      )}

      <div className="RoomsWrapper">
        <div className="AvailableRooms">
          {
            rooms.map((room) => <Room key={`${room.id} for booking 3`} room={room} handleAddToBasketClick={addToBasket} />)
          }
        </div>
        <button className="CheckOut" onClick={() => navigate("/CheckOut")}>
          Check Out
        </button>
      </div>
    </>
  )
}

export default Booking3
