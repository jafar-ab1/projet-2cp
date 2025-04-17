import Sidebar from "../../../components/shared/DashBoard/SideBar/SideBar.jsx"
import Header from "../../../components/shared/DashBoard/Header/Header.jsx"
import Calendar from "../../../components/Dashboard/FrontDesk/Calendar.jsx"
import "./FrontDesk.css"

const FrontDesk= () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <Calendar/>
      </div>
    </div>
  )
}

export default FrontDesk
