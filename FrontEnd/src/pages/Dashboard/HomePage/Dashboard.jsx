import { useEffect, useState } from "react";
import Sidebar from "../../../components/shared/DashBoard/SideBar/SideBar.jsx";
import Header from "../../../components/shared/DashBoard/Header/Header.jsx";
import Overview from "../../../components/Dashboard/Overview/Overview.jsx";
import RoomCard from "../../../components/Dashboard/RoomCard/RoomCard.jsx";
import RoomStatus from "../../../components/Dashboard/RoomStatus/RoomStatus.jsx";
import FloorStatus from "../../../components/Dashboard/Floor/FloorStatus.jsx";
import OccupancyStatistics from "../../../components/Dashboard/OccupancyStatistic/OccupancyStatistic.jsx";

import "./Dashboard.module.css"; // Use regular CSS for simplicity

import { countRoomsByTypeAndAvailable,countRooms } from "../../../api/index.js";

const Dashboard = () => {
  const [countRoomsStandard, setCountRoomsStandard] = useState(0);
  const [countRoomsDeluxe, setCountRoomsDeluxe] = useState(0);
  const [countRoomsSuite, setCountRoomsSuite] = useState(0);
  const [countStandard, setCountStandard] = useState(0);
  const [countDeluxe, setCountDeluxe] = useState(0);
  const [countSuite, setCountSuite] = useState(0);
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
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const Allstandard = await countRooms("Standard");
        const Alldeluxe = await countRooms("Deluxe");
        const Allsuite= await countRooms("Suite");
          
        setCountStandard(Allstandard.TypeCount);
        setCountDeluxe(Alldeluxe.TypeCount);
        setCountSuite(Allsuite.TypeCount);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };
  
    fetchData2();
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
    deals={countRoomsStandard} 
    booked={(countRoomsStandard) }  // Fallback to 0 if invalid
    total={countStandard} 
    price={100} 
  />
  <RoomCard 
    title="Deluxe room" 
    deals={countRoomsDeluxe} 
    booked={countRoomsDeluxe} 
    total={countDeluxe} 
    price={200} 
  />
  <RoomCard 
    title="Suite" 
    deals={countRoomsSuite} 
    booked={countRoomsSuite} 
    total={countSuite} 
    price={300} 
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
