import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BookingHeader from "../../Hero/BookingHeader.jsx"
import Booking31 from "../Booking31/Booking31.jsx"
import MiniBasket from "../MiniBasket/MiniBasket.jsx"
import Room from "./Room/Room.jsx"
import { getRoomsForReservation } from "../../../api/index.js"
import "./Booking3.css"

function Booking3() {
  const [roomsByType, setRoomsByType] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [bookingData, setBookingData] = useState(null)
  const [reservedRooms, setReservedRooms] = useState([])
  const [showBasket, setShowBasket] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedData = localStorage.getItem("bookingData")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setBookingData(parsedData)
      } catch (err) {
        console.error("Error parsing booking data:", err)
        setError("Invalid booking data. Please return to the booking page.")
      }
    }

    const storedReservedRooms = localStorage.getItem("reservedRooms")
    if (storedReservedRooms) {
      try {
        const value = JSON.parse(storedReservedRooms)
        if (value) setReservedRooms(value)
      } catch (err) {
        console.error("Error parsing reserved rooms:", err)
      }
    }
  }, [])

  useEffect(() => {
    if (!bookingData) return

    const fetchRooms = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!bookingData.checkInDate || !bookingData.checkOutDate) {
          throw new Error("Please select both check-in and check-out dates")
        }

        const response = await getRoomsForReservation(
          "Standard",
          bookingData.checkInDate,
          bookingData.checkOutDate
        )

        if (!response.success) {
          throw new Error(response.message || "No rooms available for selected dates")
        }

        const formattedRooms = {}

        if (response.roomsByType?.length > 0) {
          response.roomsByType.forEach(({ type, rooms }) => {
            formattedRooms[type] = rooms.map((room) => formatRoom(room, type))
          })
        } else {
          response.availableRooms.forEach((room) => {
            const type = room.type
            if (!formattedRooms[type]) {
              formattedRooms[type] = []
            }
            formattedRooms[type].push(formatRoom(room))
          })
        }

        setRoomsByType(formattedRooms)
      } catch (err) {
        console.error("Room Fetch Error:", err)
        setError(err.message || "Failed to fetch available rooms")
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [bookingData])

  useEffect(() => {
    if (bookingData) {
      localStorage.setItem("bookingData", JSON.stringify(bookingData))
    }
  }, [bookingData])

  useEffect(() => {
    localStorage.setItem("reservedRooms", JSON.stringify(reservedRooms))
  }, [reservedRooms])

  useEffect(() => {
    if (!bookingData && !error) {
      const timeout = setTimeout(() => {
        setError("Booking data missing. Redirecting to start.")
        navigate("/")
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [bookingData, error, navigate])

  const formatRoom = (room, type = room.type) => ({
    id: room.id || room._id,
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Room ${room.roomNumber}`,
    capacity: room.capacity || getCapacityByType(type),
    bed_type: getBedType(type),
    size: `Floor ${room.floor}`,
    description: `A comfortable ${type} room with ${room.facilities?.join(", ") || "standard facilities"}`,
    price: room.price,
    image_url: room.image_url || getRoomImageByType(type),
    roomNumber: room.roomNumber,
    type: type,
    floor: room.floor,
    facilities: room.facilities || [],
  })

  const getBedType = (roomType) => {
    const type = roomType.toLowerCase()
    if (type.includes("suite")) return "King Bed"
    if (type.includes("deluxe")) return "Queen Bed"
    if (type.includes("family")) return "Multiple Beds"
    if (type.includes("executive")) return "King Bed"
    return "Double Bed"
  }

  const getCapacityByType = (roomType) => {
    const type = roomType.toLowerCase()
    if (type.includes("suite")) return 3
    if (type.includes("deluxe")) return 2
    if (type.includes("family")) return 4
    if (type.includes("executive")) return 2
    if (type.includes("single")) return 1
    return 2
  }

  const getRoomImageByType = (roomType) => {
    const type = roomType.toLowerCase()
    if (type.includes("suite")) return "/images/suite-room.jpg"
    if (type.includes("deluxe")) return "/images/deluxe-room.jpg"
    if (type.includes("family")) return "/images/family-room.jpg"
    if (type.includes("executive")) return "/images/executive-room.jpg"
    return "/placeholder.svg"
  }

  const addToBasket = (room) => {
    setReservedRooms((prevRooms) => {
      const alreadyAdded = prevRooms.some(
        (r) => r.roomNumber === room.roomNumber && r.type === room.type
      )
      return alreadyAdded ? prevRooms : [...prevRooms, { ...room }]
    })
  }

  if (!bookingData) {
    return <p>Loading booking details...</p>
  }

  return (
    <>
      <div className="Top">
        <BookingHeader
          hotelName="Your Hotel"
          cartItems={reservedRooms.length}
          onCartClick={() => setShowBasket((prev) => !prev)}
        />
        <Booking31 bookingData={bookingData} />
      </div>

      {showBasket && (
        <div className="BasketPopup" role="dialog" aria-modal="true">
          <MiniBasket
            bookingData={bookingData}
            reservedRooms={reservedRooms}
            setReservedRooms={setReservedRooms}
          />
          <button className="ClosePopup" aria-label="Close basket popup" onClick={() => setShowBasket(false)}>
            ✖
          </button>
        </div>
      )}

      <div className="RoomsWrapper">
        {loading ? (
          <p>Loading available rooms...</p>
        ) : error ? (
          <div className="ErrorMessage">
            <p>{error}</p>
            <button onClick={() => navigate("/")}>Return to Booking</button>
          </div>
        ) : (
          <div className="AvailableRoomsByType">
            {Object.keys(roomsByType).length > 0 ? (
              Object.entries(roomsByType).map(([type, rooms]) => (
                <div key={type} className="RoomTypeSection">
                  <h2 className="RoomTypeHeading">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Rooms
                  </h2>
                  <div className="RoomTypeContainer">
                    {rooms.map((room) => (
                      <Room
                        key={`${room.id}-${room.roomNumber}`}
                        room={room}
                        handleAddToBasketClick={addToBasket}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No rooms available for the selected dates and criteria.</p>
            )}
          </div>
        )}
        <button
          className="CheckOut"
          onClick={() => navigate("/CheckOut")}
          disabled={reservedRooms.length === 0}
          aria-disabled={reservedRooms.length === 0}
        >
          Check Out
        </button>
      </div>
    </>
  )
}

export default Booking3
