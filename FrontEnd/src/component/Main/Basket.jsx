
import { useState, useEffect } from "react"
import "./Basket.css"

function Basket() {
  const [reservedRooms, setReservedRooms] = useState([])
  const [retrievedData, setRetrievedData] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  


  const calculateTotalPrice = (rooms) => {
    if (!rooms || rooms.length === 0) return 0
    return rooms.reduce((sum, room) => sum + Number.parseFloat(room.price || 0), 0)
  }


  useEffect(() => {
    const storedRooms = localStorage.getItem("ReserveRooms")
    if (storedRooms) {
      const parsedRooms = JSON.parse(storedRooms)
      setReservedRooms(parsedRooms)

      
      const total = calculateTotalPrice(parsedRooms)
      setTotalPrice(total)
      localStorage.setItem("TotalPrice", total.toString())
    }

    const storedData = localStorage.getItem("bookingData")
    if (storedData) {
      setRetrievedData(JSON.parse(storedData))
    }

   
  }, [])

  useEffect(() => {
    const total = calculateTotalPrice(reservedRooms)
    setTotalPrice(total)
    localStorage.setItem("TotalPrice", total.toString())
  }, [reservedRooms])


  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"
    const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="BasketWrapper">
      <h1>Price Details</h1>
      {reservedRooms.length === 0 ? (
        <p>No rooms added to the basket.</p>
      ) : (
        <div className="BasketContainer">
          {reservedRooms.map((room, index) => (
            <div key={index} className="RoomItem">
              <h2 className="RoomNumber">Room {index + 1}</h2>
              <div className="PDetail">
                <p>
                  {retrievedData.selectedBranch}, {room.title}
                </p>
                <p></p>
                <p>Dzd {room.price}</p>
              </div>
              <p>
                {formatDate(retrievedData.checkInDate)} - {formatDate(retrievedData.checkOutDate)}
              </p>
              <p>
                {retrievedData.adults} Adults and {retrievedData.children} children
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="Total">
        <p>Total</p>
        <p>Dzd {totalPrice}</p>
      </div>
      <button className="Confirmation">Confirm</button>
    </div>
  )
}

export default Basket

