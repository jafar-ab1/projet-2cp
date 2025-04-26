import { useEffect, useState } from "react";
import { getOccupancyByMonth } from "../../../api/index"; // adjust the path as needed
import "./OccupancyStatistic.css";

const apiMonths = [
  "01-2025", "02-2025", "03-2025", "04-2025", "05-2025", "06-2025",
  "07-2025", "08-2025", "09-2025", "10-2025", "11-2025", "12-2025"
];

const displayMonths = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const OccupancyStatistics = () => {
  const [occupancyData, setOccupancyData] = useState(new Array(12).fill(0));

  useEffect(() => {
    const fetchAllMonths = async () => {
      const data = new Array(12).fill(0);

      for (let i = 0; i < apiMonths.length; i++) {
        try {
          const res = await getOccupancyByMonth(apiMonths[i]);
          data[i] = res.occupationRate;
        } catch (error) {
          console.warn(`No data for ${apiMonths[i]}`);
        }
      }

      setOccupancyData(data);
    };

    fetchAllMonths();
  }, []);

  return (
    <div className="chart-container">
      {occupancyData.map((rate, idx) => (
        <div key={idx} className="bar-container">
          <div className="bar" style={{ height: `${rate}%` }}>
            <span>{rate}%</span>
          </div>
          <label>{displayMonths[idx]}</label>
        </div>
      ))}
    </div>
  );
};

export default OccupancyStatistics;
