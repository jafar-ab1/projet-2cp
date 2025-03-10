import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const FloorStatus = ({ completion }) => {
  const data = [
    { name: "Completed", value: completion },
    { name: "Pending", value: 100 - completion },
  ];

  const COLORS = ["#8B9A46", "#EAEAEA"];

  return (
    <div className="floor-status">
      <h3>Floor Status</h3>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <p>{completion}% Completed</p>
    </div>
  );
};

export default FloorStatus;
