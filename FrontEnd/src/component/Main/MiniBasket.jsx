import { useState, useEffect } from "react";
import "./MiniBasket.css";

function MiniBasket({ onClose }) {
  const [reservedRooms, setReservedRooms] = useState([]);
  const [retrievedData, setRetrievedData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

   const calculateNights = (checkInDate, checkOutDate) => {
    if (!checkInDate || !checkOutDate) return 0;
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    return Math.round(Math.abs((endDate - startDate) / oneDay));
  };

  
  const calculateTotalPrice = (rooms, checkInDate, checkOutDate) => {
    if (!rooms || rooms.length === 0) return 0;
    const nights = calculateNights(checkInDate, checkOutDate);
    return rooms.reduce(
      (sum, room) => sum + (Number.parseFloat(room.price || 0) * nights),
      0
    );
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedRooms = localStorage.getItem("ReserveRooms");
    const storedData = localStorage.getItem("bookingData");
    
    if (storedRooms) {
      const parsedRooms = JSON.parse(storedRooms);
      setReservedRooms(parsedRooms);
    }

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setRetrievedData(parsedData);
      
      if (parsedData?.checkInDate && parsedData?.checkOutDate && storedRooms) {
        const rooms = JSON.parse(storedRooms);
        setTotalPrice(
          calculateTotalPrice(
            rooms,
            parsedData.checkInDate,
            parsedData.checkOutDate
          )
        );
      }
    }
  }, []);

  // Update localStorage and total price when reservedRooms changes
  useEffect(() => {
    if (!retrievedData) return;
    
    const total = calculateTotalPrice(
      reservedRooms,
      retrievedData.checkInDate,
      retrievedData.checkOutDate
    );
    setTotalPrice(total);
    localStorage.setItem("TotalPrice", total.toString());
    localStorage.setItem("ReserveRooms", JSON.stringify(reservedRooms));
  }, [reservedRooms, retrievedData]);

  // Delete room function
  const handleDeleteRoom = (indexToDelete) => {
    setReservedRooms(prevRooms => {
      const updatedRooms = prevRooms.filter((_, index) => index !== indexToDelete);
      localStorage.setItem("ReserveRooms", JSON.stringify(updatedRooms));
      
      if (retrievedData) {
        const total = calculateTotalPrice(
          updatedRooms,
          retrievedData.checkInDate,
          retrievedData.checkOutDate
        );
        localStorage.setItem("TotalPrice", total.toString());
      }
      
      return updatedRooms;
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date";
    const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const nights = retrievedData
    ? calculateNights(retrievedData.checkInDate, retrievedData.checkOutDate)
    : 0;

  return (
    <div className="BasketOverlay">
      <div className="BasketWrapper">
        <button className="CloseButton" onClick={onClose}>✖</button>
        <h1>Price Details</h1>
        {reservedRooms.length === 0 ? (
          <p>No rooms added to the basket.</p>
        ) : (
          <div className="BasketContainer">
            {reservedRooms.map((room, index) => (
              <div key={`${room.id}-${index}`} className="RoomItem">
                <h2 className="RoomNumber">
                  Room {index + 1}
                  <button 
                    className="DeleteButton" 
                    onClick={() => handleDeleteRoom(index)}
                    aria-label="Delete room"
                  >
                    🗑️
                  </button>
                </h2>
                <div className="PDetail">
                  <p>{retrievedData?.selectedBranch}, {room.title}</p>
                  <p>Dzd {(room.price * nights).toFixed(2)}</p>
                </div>
                <p>
                  {formatDate(retrievedData?.checkInDate)} - {formatDate(retrievedData?.checkOutDate)}
                  {nights > 0 && ` (${nights} ${nights === 1 ? 'night' : 'nights'})`}
                </p>
                <p>{retrievedData?.adults} Adults and {retrievedData?.children} Children</p>
              </div>
            ))}
          </div>
        )}
        <div className="Total">
          <p>Total for {nights} {nights === 1 ? 'night' : 'nights'}</p>
          <p>Dzd {totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default MiniBasket;