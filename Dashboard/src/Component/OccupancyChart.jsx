import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const OccupancyChart = ({ data }) => {
  return (
    <div className="occupancy-chart">
      <h3>Occupancy Statistics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="occupancy" fill="#8B9A46" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OccupancyChart;
