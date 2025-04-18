import React from "react";
import "./table.css";
import "./statusBadge.css";
const Deal = () => {
  const rates = [
    { type: "Standard", baseRate: "$100", discount: "10%", total: "$90" },
    { type: "Deluxe", baseRate: "$150", discount: "5%", total: "$142.5" },
    { type: "Suite", baseRate: "$250", discount: "15%", total: "$212.5" }
  ];

  return (
    <div className="page">
      <h3>Rate</h3>
      <div className="actions">
        <button className="btn">Add Rate</button>
        <input type="text" placeholder="Search by type" />
      </div>
      <table>
        <thead>
          <tr>
            <th>Rate Type</th>
            <th>Base Rate</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate, index) => (
            <tr key={index}>
              <td>{rate.type}</td>
              <td>{rate.baseRate}</td>
              <td>{rate.discount}</td>
              <td>{rate.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Deal;
