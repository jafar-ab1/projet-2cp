import { useEffect, useState } from "react";
import styles from "./Overview.module.css";
import {
  getTodayCheckIns,
  getTodayCheckOut,
  getInHotelCount,
  countRoomStatus1, 
} from "../../../api/index"; // Adjust path as needed

const Overview = () => {
  const [checkInCount, setCheckInCount] = useState(0);
  const [checkOutCount, setCheckOutCount] = useState(0);
  const [inHotelCount, setInHotelCount] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [occupiedRooms, setOccupiedRooms] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const checkIns = await getTodayCheckIns();
        const checkOuts = await getTodayCheckOut();
        const inHotel = await getInHotelCount();

        const available = await countRoomStatus1("Available");
        const occupied = await countRoomStatus1("Occupied");
        
        setAvailableRooms(available.statusCounts); 
        setOccupiedRooms(occupied.statusCounts);   
        
        setCheckInCount(checkIns);
        setCheckOutCount(checkOuts);
        setInHotelCount(inHotel);
        

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
          <strong>{inHotelCount}</strong>
          Total <span>In hotel</span>
        </div>
        <div>
          <strong>{availableRooms}</strong>
          Total <span>Available rooms</span>
        </div>
        <div>
          <strong>{occupiedRooms}</strong>
          Total <span>Occupied rooms</span>
        </div>
      </div>
    </section>
  );
};

export default Overview;
