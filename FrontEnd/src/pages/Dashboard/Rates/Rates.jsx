import Sidebar from "../../../components/shared/DashBoard/SideBar/SideBar.jsx"
import Header from "../../../components/shared/DashBoard/Header/Header.jsx"
import Rate from "../../../components/Dashboard/Others/Rate.jsx"
import "../FrontDesk/FrontDesk.css"


const Rates= () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <Rate/>
      </div>
    </div>
  )
}

export default Rates