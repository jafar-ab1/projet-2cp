import React, { useState, useEffect } from "react";
import axios from "axios";

const overview = () => {
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    axios
      .get("http://your-backend-api.com/overview") // Replace with actual API endpoint
      .then((response) => {
        setOverviewData(response.data);
      })
      .catch((error) => console.error("Error fetching overview data:", error));
  }, []);

  if (!overviewData) return <p>Loading...</p>;

  return (
    <div className="overview">
      <h3>Overview</h3>
      <div className="overview-grid">
        <div>Check-in: <strong>{overviewData.checkIn}</strong></div>
        <div>Check-out: <strong>{overviewData.checkOut}</strong></div>
        <div>Total in hotel: <strong>{overviewData.totalInHotel}</strong></div>
        <div>Available rooms: <strong>{overviewData.availableRooms}</strong></div>
        <div>Occupied rooms: <strong>{overviewData.occupiedRooms}</strong></div>
      </div>
    </div>
  );
};

export default overview;
