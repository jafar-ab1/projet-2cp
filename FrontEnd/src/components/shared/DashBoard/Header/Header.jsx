import React from "react"
import "./Header.css"

const Header = () => {
  // Format the current date
  const today = new Date()
  const options = { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  const formattedDate = today.toLocaleDateString("en-US", options).toLowerCase()

  return (
    <header className="header">
      <div className="search-bar">
        <input type="text" placeholder="Search for rooms and offers" />
      </div>
      <div className="date">{formattedDate}</div>
      <div className="actions">
        <button className="notification">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
              fill="#666666"
            />
          </svg>
          <span className="notification-dot"></span>
        </button>
        <div className="profile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill="white"
            />
          </svg>
        </div>
        <button className="create-booking">Create booking</button>
      </div>
    </header>
  )
}

export default Header
