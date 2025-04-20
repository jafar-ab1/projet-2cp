import { useEffect, useState } from "react";
import { getOccupancyByMonth } from "../../../api/index"; // adjust the path as needed
import "./OccupancyStatistic.css";

const OccupancyStatistics = () => {
  const [occupancyData, setOccupancyData] = useState(Array(12).fill(0));
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    const fetchAllMonths = async () => {
      const data = [...occupancyData];

      for (let i = 0; i < months.length; i++) {
        try {
          const res = await getOccupancyByMonth(months[i]);
          data[i] = res.occupationRate;
        } catch (error) {
          console.warn(`No data for ${months[i]}`);
          data[i] = 0; // fallback if data is missing
        }
      }

      setOccupancyData(data);
    };

    fetchAllMonths();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="occupancy-statistics">
      <h3>Occupancy statistics</h3>
      <div className="bar-chart">
        {occupancyData.map((d, idx) => (
          <div key={idx} className="bar" style={{ height: `${d}%` }}>
            <span>{d}%</span>
            <label>{months[idx]}</label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OccupancyStatistics;
