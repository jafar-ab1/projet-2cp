import "./SideBar.css"

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">Hotel</h2>
      <nav className="nav">
        <a href="/dashboard" className="active">
          Dashboard
        </a>
        <a href="/front-desk">Front Desk</a>
        <a href="/guest">Guest</a>
        <a href="/rooms">Rooms</a>
        <a href="/deal">Deals</a>
        <a href="/rate">Rate</a>
      </nav>
    </aside>
  )
}

export default Sidebar
