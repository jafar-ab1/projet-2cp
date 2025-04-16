import Sidebar from "../../components/shared/DashBoard/SideBar/SideBar.jsx"
import Header from "../../components/shared/DashBoard/Header/Header.jsx"
import Overview from "../../components/Dashboard/Overview/Overview.jsx"
import RoomCard from "../../components/Dashboard/RoomCard/RoomCard.jsx"
import RoomStatus from "../../components/Dashboard/RoomStatus/RoomStatus.jsx"
import FloorStatus from "../../components/Dashboard/Floor/FloorStatus.jsx"
import OccupancyStatistics from "../../components/Dashboard/OccupancyStatistic/OccupancyStatistic.jsx"
import CustomerFeedback from "../../components/Dashboard/CustomerFeedback/CustomerFeedBack.jsx"
import "./Dashboard.css"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <Overview />
        <div className="room-cards">
          <RoomCard title="Standard room" deals={2} booked={2} total={30} price="12000" />
          <RoomCard title="Deluxe room" deals={2} booked={4} total={30} price="15000" />
          <RoomCard title="Suite" deals={0} booked={2} total={30} price="20000" />
        </div>
        <div className="status-section">
          <RoomStatus />
          <FloorStatus />
        </div>
        <div className="bottom-section">
          <OccupancyStatistics />
          <CustomerFeedback />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
