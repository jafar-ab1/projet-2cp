import "./Floor.css";
import { countRooms, countRoomStatus1 } from "../../../api/index";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FloorStatus = () => {
  const [countStandard, setCountStandard] = useState(0);
  const [countDeluxe, setCountDeluxe] = useState(0);
  const [countSuite, setCountSuite] = useState(0);
  const [countOccupied, setCountOccupied] = useState(0);

  const countTotal = countStandard + countDeluxe + countSuite;
  const percentage = countTotal > 0 ? Math.round((countOccupied / countTotal) * 100) : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const standard = await countRooms("Standard");
        const deluxe = await countRooms("Deluxe");
        const suite = await countRooms("Suite");
        const occupied = await countRoomStatus1("Occupied");

        setCountStandard(standard.TypeCount);
        setCountDeluxe(deluxe.TypeCount);
        setCountSuite(suite.TypeCount);
        setCountOccupied(occupied.statusCounts);
      } catch (error) {
        console.error("Error fetching floor data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="floor-status">
      <h3>Floor status</h3>
      <div className="circle-chart">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: "#a3a284",
            trailColor: "#f0f0e8",
            textColor: "#333",
          })}
        />
      </div>
      <div className="legend">
        <span className="completed">Completed</span>
        <span className="yet">Yet to complete</span>
      </div>
    </section>
  );
};

export default FloorStatus;
