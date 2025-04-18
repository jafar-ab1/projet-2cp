import React from "react";
import "./table.css";
import "./statusBadge.css";
const Guest = () => {
  const guests = new Array(10).fill({
    id: "#9841",
    name: "Ahmed",
    room: "B734",
    total: "$900",
    paid: "$1200",
    status: ["Clean", "Dirty", "Inspected", "Pick up"][Math.floor(Math.random() * 4)],
  });

  return (
    <div className="page">
      <h3>Guest</h3>
      <div className="actions">
        <button className="btn">Check in</button>
        <button className="btn">Check out</button>
        <button className="btn">Filter</button>
        <input type="text" placeholder="search by room number" />
      </div>
      <table>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Name</th>
            <th>Room number</th>
            <th>Total amount</th>
            <th>Amount paid</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, idx) => (
            <tr key={idx}>
              <td>{guest.id}</td>
              <td>{guest.name}</td>
              <td>{guest.room}</td>
              <td>{guest.total}</td>
              <td>{guest.paid}</td>
              <td><span className={`badge ${guest.status.toLowerCase().replace(" ", "-")}`}>{guest.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Guest;