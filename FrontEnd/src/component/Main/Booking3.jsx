import roomsData from "../../data/room"
import "./Booking3.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BookingHeader from "../Hero/BookingHeader.jsx"
import Booking31 from "./Booking31.jsx"
import MiniBasket from "./MiniBasket.jsx"

function Booking3() {
  const [rooms, setRooms] = useState(roomsData)
  const [reserveRooms, setReserveRooms] = useState(() => {
    const stored = localStorage.getItem("ReserveRooms")
    return stored ? JSON.parse(stored) : []
  })
  const [showBasket, setShowBasket] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("ReserveRooms", JSON.stringify(reserveRooms))
  }, [reserveRooms])

  const addToBasket = (room) => {
    const newRoom = { ...room }
    setReserveRooms((prevRooms) => [...prevRooms, newRoom])
  }

  return (
    <>
      <div className="Top">
        <BookingHeader
          hotelName="Your Hotel"
          cartItems={reserveRooms.length}
          onCartClick={() => setShowBasket((prev) => !prev)}
        />
        <Booking31 />
      </div>

      {showBasket && (
        <div className="BasketPopup">
          <MiniBasket reserveRooms={reserveRooms} setReserveRooms={setReserveRooms} />
          <button className="ClosePopup" onClick={() => setShowBasket(false)} >✖</button>
        </div>
      )}

      <div className="RoomsWrapper">
        <div className="AvailableRooms">
          {rooms.map((room) => (
            <div key={room.id} className="RoomContainer">
              <div className="Room image">
                <img src={room.image_url || "/placeholder.svg"} alt={room.title} />
              </div>
              <div className="Description">
                <div className="Descriptopn1">
                  <h2>{room.title}</h2>
                  <p>
                    {Array.from({ length: room.capacity }).map((_, index) => (
                      <span key={index}>👤 </span>
                    ))}
                  </p>
                  <p>{room.bed_type}</p>
                  <p>{room.size}</p>
                  <p>{room.description}</p>
                  <h2>Room Details</h2>
                </div>
                <div className="Price">
                  <p>{room.price}</p>
                  <p> per night</p>
                  <p>Excluding taxes and fees</p>
                  <button onClick={() => addToBasket(room)}>Add to Basket</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="CheckOut" onClick={() => navigate("/CheckOut")}>
          Check Out
        </button>
      </div>
    </>
  )
}

export default Booking3
