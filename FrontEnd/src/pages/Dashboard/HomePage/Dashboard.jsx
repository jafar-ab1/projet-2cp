import { useEffect, useState } from "react";
import Sidebar from "../../../components/shared/DashBoard/SideBar/SideBar.jsx";
import Header from "../../../components/shared/DashBoard/Header/Header.jsx";
import Overview from "../../../components/Dashboard/Overview/Overview.jsx";
import RoomCard from "../../../components/Dashboard/RoomCard/RoomCard.jsx";
import RoomStatus from "../../../components/Dashboard/RoomStatus/RoomStatus.jsx";
import FloorStatus from "../../../components/Dashboard/Floor/FloorStatus.jsx";
import OccupancyStatistics from "../../../components/Dashboard/OccupancyStatistic/OccupancyStatistic.jsx";

import "./Dashboard.module.css"; // Use regular CSS for simplicity

import { countRoomsByTypeAndAvailable } from "../../../api/index.js";

const Dashboard = () => {
  const [countRoomsStandard, setCountRoomsStandard] = useState(0);
  const [countRoomsDeluxe, setCountRoomsDeluxe] = useState(0);
  const [countRoomsSuite, setCountRoomsSuite] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const standardRes = await countRoomsByTypeAndAvailable("Standard");
        const deluxeRes = await countRoomsByTypeAndAvailable("Deluxe");
        const suiteRes = await countRoomsByTypeAndAvailable("Suite");
        console.log("Standard Response:", standardRes);
          
        setCountRoomsStandard(standardRes.count);
        setCountRoomsDeluxe(deluxeRes.count);
        setCountRoomsSuite(suiteRes.count);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };
  
    fetchData();
  }, []);
  
   
  

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <Overview />
        <div className="room-cards">
  <RoomCard 
    title="Standard room" 
    deals={2} 
    booked={(countRoomsStandard) }  // Fallback to 0 if invalid
    total={30} 
    price={12000} 
  />
  <RoomCard 
    title="Deluxe room" 
    deals={2} 
    booked={countRoomsDeluxe} 
    total={30} 
    price={15000} 
  />
  <RoomCard 
    title="Suite" 
    deals={0} 
    booked={countRoomsSuite} 
    total={30} 
    price={20000} 
  />
</div>
        <div className="status-section">
          <RoomStatus />
          <FloorStatus />
        </div>

        <div className="bottom-section">
          <OccupancyStatistics />
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
