import { useState, useEffect } from "react";
import "./Basket.css";

function Basket() {
  const [reservedRooms, setReservedRooms] = useState([]);
  const [retrievedData, setRetrievedData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateNights = (checkInDate, checkOutDate) => {
    if (!checkInDate || !checkOutDate) return 0;
    const oneDay = 24 * 60 * 60 * 1000; 
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

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date";
    const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate nights for display
  const nights = retrievedData
    ? calculateNights(retrievedData.checkInDate, retrievedData.checkOutDate)
    : 0;

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
                  {retrievedData?.selectedBranch}, {room.title}
                </p>
                <p> Dzd {(room.price * nights).toFixed(2)}</p>
              </div>
              <p>
                {formatDate(retrievedData?.checkInDate)} - {formatDate(retrievedData?.checkOutDate)}
                {nights > 0 && ` (${nights} ${nights === 1 ? 'night' : 'nights'})`}
              </p>
              <p>
                {retrievedData?.adults} Adults and {retrievedData?.children} children
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="Total">
        <p>Total for {nights} {nights === 1 ? 'night' : 'nights'}</p>
        <p>Dzd {totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Basket;