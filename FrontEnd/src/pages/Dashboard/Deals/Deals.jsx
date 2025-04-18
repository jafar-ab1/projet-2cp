import Sidebar from "../../../components/shared/DashBoard/SideBar/SideBar.jsx"
import Header from "../../../components/shared/DashBoard/Header/Header.jsx"
import Deal from "../../../components/Dashboard/Others/Deal.jsx"
import "../FrontDesk/FrontDesk.css"

const Deals= () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <Deal/>
      </div>
    </div>
  )
}

export default Deals
