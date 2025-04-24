import Sidebar from "../../../components/shared/DashBoard/SideBar/SideBar.jsx"
import Header from "../../../components/shared/DashBoard/Header/Header.jsx"
import Room from "../../../components/Dashboard/Others/Room/Room.jsx"
import "../FrontDesk/FrontDesk.css"

const Rooms= () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <Room/>
      </div>
    </div>
  )
}

export default Rooms
