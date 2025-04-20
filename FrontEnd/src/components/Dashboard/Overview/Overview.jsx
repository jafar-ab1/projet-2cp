import { useEffect, useState } from "react";
import styles from "./Overview.module.css";
import { TodayCheckIn, TodayCheckOut } from "../../../api/index"; // Adjust path as needed

const Overview = () => {
  const [checkInCount, setCheckInCount] = useState(0);
  const [checkOutCount, setCheckOutCount] = useState(0);
  const [inHotelCount, setInHotelCount] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [occupiedRooms, setOccupiedRooms] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const checkIns = await TodayCheckIn();   // Assuming these return counts
        const checkOuts = await TodayCheckOut();

        setCheckInCount(checkIns.count || 0);
        setCheckOutCount(checkOuts.count || 0);

        // Assuming you calculate others based on check-ins/outs
        const totalRooms = 100; // replace with actual logic or value
       // const currentInHotel = checkIns.count - checkOuts.count;
       // setInHotelCount(currentInHotel);
        //setOccupiedRooms(currentInHotel);
       // setAvailableRooms(totalRooms - currentInHotel);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.overview}>
      <h3>Overview</h3>
      <div className={styles.stats}>
        <div>
          <strong>{checkInCount}</strong>
          Today's <span>check-in</span>
        </div>
        <div>
          <strong>{checkOutCount}</strong>
          Today's <span>check-out</span>
        </div>
        <div>
          <strong>Not Yet</strong>
          Total <span>In hotel</span>
        </div>
        <div>
          <strong>Not Yet</strong>
          Total <span>Available rooms</span>
        </div>
        <div>
          <strong>Not Yet</strong>
          Total <span>Occupied rooms</span>
        </div>
      </div>
    </section>
  );
};

export default Overview;
