import React, { useState, useEffect } from "react";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("http://your-backend-api.com/rooms") // Replace with actual API
      .then((response) => setRooms(response.data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  return (
    <div className="rooms">
      <h3>Rooms</h3>
      <div className="room-cards">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <h4>{room.type}</h4>
            <p>{room.occupied}/{room.total} rooms occupied</p>
            <p>${room.price}/day</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
