import React from "react";
import "./table.css";
import "./statusBadge.css";

const Room = () => {
  const rooms = [
    { number: "101", type: "Single", price: "$100", status: "Clean" },
    { number: "102", type: "Double", price: "$150", status: "Dirty" },
    { number: "103", type: "Suite", price: "$250", status: "Inspected" },
    { number: "104", type: "Single", price: "$100", status: "Pick up" }
  ];

  return (
    <div className="page">
      <h3>Rooms</h3>
      <div className="actions">
        <button className="btn">Add Room</button>
        <input type="text" placeholder="Search by number" />
      </div>
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td>{room.number}</td>
              <td>{room.type}</td>
              <td>{room.price}</td>
              <td><span className={`badge ${room.status.toLowerCase().replace(" ", "-")}`}>{room.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Room;
