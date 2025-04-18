import Sidebar from "../../../components/shared/DashBoard/SideBar/SideBar.jsx"
import Header from "../../../components/shared/DashBoard/Header/Header.jsx"
import Guest from "../../../components/Dashboard/Others/Guest.jsx"
import "../FrontDesk/FrontDesk.css"

const Guests= () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <Guest/>
      </div>
    </div>
  )
}

export default Guests
