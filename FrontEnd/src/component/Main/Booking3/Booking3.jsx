import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingHeader from "../../Hero/BookingHeader.jsx";
import Booking31 from "../Booking31/Booking31.jsx";
import MiniBasket from "../MiniBasket/MiniBasket.jsx";
import Room from "./Room/Room.jsx";
import { getRoomsForReservation } from "../../../api/index.js";
import "./Booking3.css";

function Booking3() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [reservedRooms, setReservedRooms] = useState([]);
  const [showBasket, setShowBasket] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("bookingData");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }

    const storedReservedRooms = localStorage.getItem("reservedRooms");
    if (storedReservedRooms) {
      const value = JSON.parse(storedReservedRooms);
      if (value) setReservedRooms(value);
    }
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!bookingData) return;
    
      try {
        setLoading(true);
        setError(null);
    
        // Validate required fields
        if (!bookingData.checkInDate || !bookingData.checkOutDate) {
          throw new Error("Please select both check-in and check-out dates");
        }
    
        // Log the raw dates for debugging
        console.log("Raw booking dates:", {
          checkIn: bookingData.checkInDate,
          checkOut: bookingData.checkOutDate
        });
    
        // Make API call
        const response = await getRoomsForReservation(
          "all",
          bookingData.checkInDate,
          bookingData.checkOutDate
        );
    
        // Handle API response
        if (!response.success) {
          throw new Error(response.message || "No rooms available for selected dates");
        }
    
        // Transform room data
        const formattedRooms = response.availableRooms.map(room => ({
          id: room.id || room._id,
          title: `${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room ${room.roomNumber}`,
          capacity: room.capacity || 2,
          bed_type: getBedType(room.type),
          size: `Floor ${room.floor}`,
          description: `A comfortable ${room.type} room with ${room.facilities?.join(", ") || "standard facilities"}`,
          price: `$${room.price}`,
          image_url: room.image_url || "/placeholder.svg",
          roomNumber: room.roomNumber,
          type: room.type,
          floor: room.floor,
          facilities: room.facilities || []
        }));
    
        setRooms(formattedRooms);
      } catch (err) {
        console.error("Room Fetch Error Details:", {
          error: err,
          bookingData: {
            ...bookingData,
            // Add formatted dates for debugging
            formattedCheckIn: bookingData.checkInDate 
              ? new Date(bookingData.checkInDate).toISOString().split('T')[0]
              : null,
            formattedCheckOut: bookingData.checkOutDate
              ? new Date(bookingData.checkOutDate).toISOString().split('T')[0]
              : null
          }
        });
        
        setError(
          err.response?.data?.message || 
          err.message || 
          "Failed to fetch available rooms"
        );
      } finally {
        setLoading(false);
      }
    };
    
    // Helper function to determine bed type
    const getBedType = (roomType) => {
      const type = roomType.toLowerCase();
      if (type.includes("suite")) return "King Bed";
      if (type.includes("deluxe")) return "Queen Bed";
      return "Double Bed";
    };

    fetchRooms();
  }, [bookingData]);

  const addToBasket = (room) => {
    setReservedRooms((prevRooms) => [...prevRooms, { ...room }]);
  };

  useEffect(() => {
    localStorage.setItem("reservedRooms", JSON.stringify(reservedRooms));
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
        <Booking31 bookingData={bookingData} />
      </div>

      {showBasket && (
        <div className="BasketPopup">
          <MiniBasket 
            bookingData={bookingData} 
            reservedRooms={reservedRooms} 
            setReservedRooms={setReservedRooms} 
          />
          <button className="ClosePopup" onClick={() => setShowBasket(false)}>
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
          <div className="AvailableRooms">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <Room
                  key={`${room.id}-${room.roomNumber}`}
                  room={room}
                  handleAddToBasketClick={addToBasket}
                />
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
        >
          Check Out
        </button>
      </div>
    </>
  );
}

export default Booking3;