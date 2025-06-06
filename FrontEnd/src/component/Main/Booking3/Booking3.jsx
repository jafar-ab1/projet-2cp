import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingHeader from "../../Hero/BookingHeader.jsx";
import Booking31 from "../Booking31/Booking31.jsx";
import MiniBasket from "../MiniBasket/MiniBasket.jsx";
import Room from "./Room/Room.jsx";
import { getRoomsForReservation } from "../../../api/index.js";
import "./Booking3.css";

function Booking3() {
  // localStorage.removeItem("reservedRooms");

  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBasket, setShowBasket] = useState(false);
  const navigate = useNavigate();
  
  const [reservedRooms, setReservedRooms] = useState(() => {
    const storedReservedRooms = localStorage.getItem("reservedRooms");
    if (storedReservedRooms) {
      try {
        const value = JSON.parse(storedReservedRooms);
        if (value) return value;
      } catch (err) {
        return [];
      }
    }
    return [];
  });

  const [bookingData, setBookingData] = useState(() => {
    const storedData = localStorage.getItem("bookingData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        return parsedData;
      } catch (err) {
        setError("Invalid booking data. Please start over.");
        return null;
      }
    }
    setError("Invalid booking data. Please start over.");
    return null;
  });

  const formatDate = (date) => {
    if (!date) return null;
    
    try {
      // Handle string dates
      if (typeof date === 'string') {
        // If already in YYYY-MM-DD format
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return date;
        }
        // Convert from other formats
        const d = new Date(date);
        if (isNaN(d.getTime())) throw new Error("Invalid date string");
        return d.toISOString().split('T')[0];
      }
      
      // Handle Date objects
      if (date instanceof Date) {
        if (isNaN(date.getTime())) throw new Error("Invalid Date object");
        return date.toISOString().split('T')[0];
      }
      
      throw new Error("Unsupported date format");
    } catch (err) {
      console.error("Date formatting error:", err);
      throw new Error("Please select valid dates");
    }
  };

  useEffect(() => {
    if (!bookingData) return;

    const fetchRoomTypes = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!bookingData.checkInDate || !bookingData.checkOutDate) {
          throw new Error("Please select both check-in and check-out dates");
        }

        const checkInDate = formatDate(bookingData.checkInDate);
        const checkOutDate = formatDate(bookingData.checkOutDate);


        const response = await getRoomsForReservation(checkInDate, checkOutDate);
        if (!response.success) {
          throw new Error(response.message || "No rooms available for selected dates");
        }

        const roomsByType = response.roomsByType;

        // Create room type data structure
        const availableRoomTypes = [];

        roomsByType.forEach((room) => {
          const type = room.type;
          const data = room.rooms[0];
          if(data.count == 0) return;
          availableRoomTypes.push(createSampleRoom(type, data));
        })

        setRoomTypes(availableRoomTypes);

        if (availableRoomTypes.length === 0) {
          setError("No rooms available for the selected dates. Please try different dates.");
        }
      } catch (err) {
        console.error("Room Fetch Error:", err);
        setError(err.message || "Failed to fetch available rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomTypes();
  }, [bookingData]);

  const createSampleRoom = (type, data) => ({
    id: `${type.toLowerCase()}-sample`,
    title: `${type} Room`,
    capacity: getCapacityByType(type),
    bed_type: getBedType(type),
    size: getRoomSizeByType(type),
    description: `A ${type.toLowerCase()} room with ${data.facilities?.join(", ") || "standard facilities"}`,
    price: data.price || 0,
    image_url: getRoomImageByType(type),
    roomNumber: `${type.substring(0, 3).toUpperCase()}-001`,
    type: type,
    floor: getFloorByType(type),
    facilities: data.facilities || [],
    count: data.count || 0,
  });

  const getBedType = (roomType) => {
    const type = roomType.toLowerCase();
    if (type.includes("suite")) return "King Bed";
    if (type.includes("deluxe")) return "Queen Bed";
    return "Double Bed";
  };

  const getCapacityByType = (roomType) => {
    const type = roomType.toLowerCase();
    if (type.includes("suite")) return 3;
    if (type.includes("deluxe")) return 2;
    return 2;
  };

  const getFloorByType = (roomType) => {
    const type = roomType.toLowerCase();
    if (type.includes("suite")) return "3rd-5th Floor";
    if (type.includes("deluxe")) return "2nd-4th Floor";
    return "1st-3rd Floor";
  };

  const getRoomSizeByType = (roomType) => {
    const type = roomType.toLowerCase();
    if (type.includes("suite")) return "60-80 m²";
    if (type.includes("deluxe")) return "40-50 m²";
    return "30-40 m²";
  };

  const getRoomImageByType = (roomType) => {
    const type = roomType.toLowerCase();
    if (type.includes("suite")) return "src/assets/SUITE.png";
    if (type.includes("deluxe")) return "src/assets/DELUXE.png";
    return "src/assets/STANDARD.png";
  };

  const addToBasket = (room) => {
    setReservedRooms((prevRooms) => {
      const foundRoomIndex = prevRooms.findIndex(roomType => roomType.type === room.type)

      if(foundRoomIndex != -1) {
        if(prevRooms[foundRoomIndex].count <= 0) return prevRooms;
        prevRooms[foundRoomIndex].reserved += 1;
        prevRooms[foundRoomIndex].count -= 1;
        return [
          ...prevRooms
        ];
      }
 
      // Create a unique room number based on count
      const roomNumber = `${room.type.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      return [...prevRooms, {
        ...room,
        roomNumber,
        reserved: 1,
      }];
    });
  };

  const removeFromBasket = (roomType) => {
    setReservedRooms(prevRooms => {
      const foundRoomIndex = prevRooms.findIndex(room => room.type === roomType.type);
      prevRooms[foundRoomIndex].reserved -= 1;
      if(prevRooms[foundRoomIndex].reserved == 0) {
        prevRooms.splice(foundRoomIndex, 1);
      }
      console.log(prevRooms);
      return [
        ...prevRooms
      ]
    })
  };

  useEffect(() => {
    console.log("reserved rooms", reservedRooms);
    return () => {
      return localStorage.setItem("reservedRooms", JSON.stringify(reservedRooms));
    }
  }, [reservedRooms])

  if (!bookingData) {
    return <div className="loading-message">Loading booking details...</div>;
  }

  return (
    <>
      <div className="Top">
        <BookingHeader
          hotelName="Your Hotel"
          cartItems={reservedRooms.map(room => room.reserved).reduce((prev, curr) => prev + curr, 0)}
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
            removeFromBasket={removeFromBasket}
          />
          <button 
            className="ClosePopup" 
            onClick={() => setShowBasket(false)}
          >
            ✖
          </button>
        </div>
      )}

      <div className="RoomsWrapper">
        {loading ? (
          <div className="loading-message">Loading available rooms...</div>
        ) : error ? (
          <div className="ErrorMessage">
            <p>{error}</p>
            <button onClick={() => navigate("/")}>Return to Booking</button>
          </div>
        ) : (
          <div className="AvailableRoomsByType">
            {roomTypes.length > 0 ? (
              roomTypes.map((roomType) => {
                return (
                <div key={roomType.type} className="RoomTypeSection">
                  <h2 className="RoomTypeHeading">
                    {roomType.type} Rooms (Available: {roomType.count})
                  </h2>
                  <div className="RoomTypeContainer">
                      <Room
                        key={`${roomType.id}-${roomType.type}`}
                        room={roomType}
                        handleAddToBasketClick={() => addToBasket(roomType)}
                        isAdded={reservedRooms.some(r => r.type === roomType.type)}
                      />
                  </div>
                </div>
              ) })
            ) : (
              <p className="no-rooms-message">
                No rooms available for the selected dates and criteria.
              </p>
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