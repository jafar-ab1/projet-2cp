import { useEffect, useState } from "react";
import "./MiniBasket.css";
import BasketRoom from "./BasketRoom/BasketRoom";

function MiniBasket({ 
  reservedRooms, 
  setReservedRooms,
  bookingData,
  removeFromBasket
}) {
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

  const nights = bookingData
    ? calculateNights(bookingData.checkInDate, bookingData.checkOutDate)
    : 0;

  useEffect(() => {
    localStorage.setItem("reservedRooms", JSON.stringify(reservedRooms));
    return setTotalPrice(calculateTotalPrice(reservedRooms, bookingData.checkInDate, bookingData.checkOutDate));
  }, [bookingData, reservedRooms]);

    return (
    <div className="BasketOverlay">
      <div className="BasketWrapper">
        <h1>Price Details</h1>
        {reservedRooms.length === 0 ? (
          <p>No rooms added to the basket.</p>
        ) : (
          <div className="BasketContainer">
            {
              reservedRooms.map((room, index) => <BasketRoom deleteRoomFromBasket={() => removeFromBasket(room)} index={index} room={room} nights={nights} bookingData={bookingData} key={`${room.id}--${index}`} />)
            }
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