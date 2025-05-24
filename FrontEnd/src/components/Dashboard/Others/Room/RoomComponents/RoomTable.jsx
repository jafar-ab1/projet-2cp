// Update the RoomTable component to match the MongoDB schema

import StatusBadge from "../../Common/StatusBadge.jsx"

const RoomTable = ({ rooms, onEdit, onDelete }) => {
  const handleActionClick = (e, room) => {
    e.stopPropagation()

    // Create a dropdown menu for actions
    const menu = document.createElement("div")
    menu.className = "action-menu"

    const editButton = document.createElement("button")
    editButton.innerText = "Edit"
    editButton.onclick = () => {
      onEdit(room)
      document.body.removeChild(menu)
    }

    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    deleteButton.onclick = () => {
      if (window.confirm(`Are you sure you want to delete room ${room.roomNumber}?`)) {
        onDelete(room.roomNumber)
      }
      document.body.removeChild(menu)
    }

    menu.appendChild(editButton)
    menu.appendChild(deleteButton)

    // Position the menu
    menu.style.position = "absolute"
    menu.style.top = `${e.clientY}px`
    menu.style.left = `${e.clientX}px`
    menu.style.backgroundColor = "white"
    menu.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)"
    menu.style.borderRadius = "4px"
    menu.style.padding = "8px 0"
    menu.style.zIndex = "1000"

    // Style the buttons
    const buttons = [editButton, deleteButton]
    buttons.forEach((button) => {
      button.style.display = "block"
      button.style.width = "100%"
      button.style.padding = "8px 16px"
      button.style.textAlign = "left"
      button.style.border = "none"
      button.style.backgroundColor = "transparent"
      button.style.cursor = "pointer"
    })

    // Add hover effect
    buttons.forEach((button) => {
      button.onmouseover = () => {
        button.style.backgroundColor = "#f5f5f5"
      }
      button.onmouseout = () => {
        button.style.backgroundColor = "transparent"
      }
    })

    document.body.appendChild(menu)

    // Close menu when clicking outside
    const closeMenu = (e) => {
      if (!menu.contains(e.target)) {
        document.body.removeChild(menu)
        document.removeEventListener("click", closeMenu)
      }
    }

    // Add a small delay to prevent immediate closing
    setTimeout(() => {
      document.addEventListener("click", closeMenu)
    }, 100)
  }

  // Format facilities for display
  const formatFacilities = (facilities) => {
    if (Array.isArray(facilities)) {
      return facilities.join(", ")
    }
    return facilities
  }

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Room number</th>
            <th>Room type</th>
            <th>Floor</th>
            <th>Facilities</th>
            <th>Price</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((room, index) => (
              <tr key={index}>
                <td>
                  <strong>{room.roomNumber}</strong>
                </td>
                <td>{room.type}</td>
                <td>{room.floor}</td>
                <td>{formatFacilities(room.facilities)}</td>
                <td>DZD{room.price}</td>
                <td>
                  <StatusBadge status={room.status1} />
                </td>
                <td className="actions">
                  <button className="action-button" onClick={(e) => handleActionClick(e, room)}>
                    ⋮
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No rooms found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RoomTable
