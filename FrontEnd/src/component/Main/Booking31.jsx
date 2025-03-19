import roomsData from "../../rooms.json";
import "./Booking31.css"
import { useState } from "react"
import { useEffect } from "react";

function Booking31() {
    const [retrievedData, setRetrievedData] = useState(null);

    useEffect(() => {
      const storedData = localStorage.getItem("bookingData");
      if (storedData) {
        setRetrievedData(JSON.parse(storedData));
      }
    }, []);
    if (!retrievedData) {
        return <p>Loading booking details...</p>;
    }
    

    const formatDate = (dateString) => {
        if (!dateString) return "Invalid Date";
        const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <>
        <div className="Booking31">
        <div className="PreviousData">
            <div className="Guests">
                <p> Guests</p>
                <p> {retrievedData.adults} adults , {retrievedData.children} children</p>

            </div>
            <div className="Check-in">
                <p>Check-in</p>
                <p>{formatDate(retrievedData.checkInDate)}</p>
            </div>
            <div className="Check-out">
                <p>Check-out</p>
                <p>{formatDate(retrievedData.checkOutDate)}</p>
            </div>
        </div>
        <p className="offers">Special codes or offers</p>
        </div>
        
        </>
    );
    
}
export default Booking31