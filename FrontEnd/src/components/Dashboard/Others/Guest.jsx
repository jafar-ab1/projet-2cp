import { useState } from "react"
import "./Table.css"
import "./StatusBadge.css"
import StatusBadge from "./Common/StatusBadge.jsx"
import "./GuestStyles.css" // New CSS file for additional styling
import Pagination from "./Common/Pagination.jsx"
import FilterButton from "./Common/FilterButton.jsx"

const Guest = () => {
  // Sample data - in a real app this would come from an API or database
  const allGuests = [
    {
      id: "#9841",
      name: "Ahmed",
      email: "dh04oussalah@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "Checked in",
      roomStatus: "Dirty",
    },
    {
      id: "#9842",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "Checked in",
      roomStatus: "Dirty",
    },
    {
      id: "#9843",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "due out",
      roomStatus: "Dirty",
    },
    {
      id: "#9844",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "due in",
      roomStatus: "Dirty",
    },
    {
      id: "#9845",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "Checked in",
      roomStatus: "Dirty",
    },
    {
      id: "#9846",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "due out",
      roomStatus: "Dirty",
    },
    {
      id: "#9847",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "due out",
      roomStatus: "Dirty",
    },
    {
      id: "#9848",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "Checked in",
      roomStatus: "Dirty",
    },
    {
      id: "#9849",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "Checked out",
      roomStatus: "Dirty",
    },
  ]

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7 // Show 7 items per page

  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [searchEmail, setSearchEmail] = useState("")
  const [matchingGuests, setMatchingGuests] = useState([])
  const [editableGuests, setEditableGuests] = useState([])
  const [didSearch, setDidSearch] = useState(false)

  // Add these state variables after the existing state declarations
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [removeEmail, setRemoveEmail] = useState("")
  const [foundGuests, setFoundGuests] = useState([])
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Calculate total pages
  const totalPages = Math.ceil(allGuests.length / itemsPerPage)

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentGuests = allGuests.slice(indexOfFirstItem, indexOfLastItem)

  const handleSearch = () => {
    setDidSearch(true)
    const found = allGuests.filter((g) => g.email.toLowerCase() === searchEmail.toLowerCase().trim())
    setMatchingGuests(found)

    // Create a deep copy for editing
    setEditableGuests(JSON.parse(JSON.stringify(found)))
  }

  const handleInputChange = (index, field, value) => {
    const updatedGuests = [...editableGuests]
    updatedGuests[index][field] = value
    setEditableGuests(updatedGuests)
  }

  const handleStatusChange = (index, field, value) => {
    const updatedGuests = [...editableGuests]
    updatedGuests[index][field] = value
    setEditableGuests(updatedGuests)
  }

  const handleConfirm = () => {
    // TODO: send updated data to backend or update your state
    alert("Changes confirmed!")
    setIsEditModalOpen(false)
    setSearchEmail("")
    setMatchingGuests([])
    setEditableGuests([])
    setDidSearch(false)
  }

  // Add this function after the existing handler functions
  const handleRemoveSearch = () => {
    if (!removeEmail.trim()) return
    const found = allGuests.filter((g) => g.email.toLowerCase().includes(removeEmail.toLowerCase().trim()))
    setFoundGuests(found)
  }

  const handleRemoveGuest = () => {
    // In a real app, you would call an API to remove the guest
    // For this demo, we'll just show an alert
    alert(`Guest ${selectedGuest?.name} (${selectedGuest?.email}) removed successfully!`)
    setIsRemoveModalOpen(false)
    setRemoveEmail("")
    setFoundGuests([])
    setSelectedGuest(null)
    setShowConfirmation(false)
  }

  // ——— Header Buttons ———
  const leftActions = (
    <>
      <button className="btn pill">Check in</button>
      <button className="btn pill">Check out</button>
    </>
  )
  const rightActions = (
    <>
      <FilterButton />
      <input className="search" type="text" placeholder="search by room number" />
      <button className="btn solid" onClick={() => setIsEditModalOpen(true)}>
        Edit
      </button>
      <button className="btn solid remove">Remove Guest</button>
      <button className="btn solid add">Add Guest</button>
    </>
  )

  return (
    <div className="page">
      <h2 className="page-title">Guest</h2>

      <div className="action-buttons-container">
        <div className="left-buttons">
          <button className="btn pill">Check in</button>
          <button className="btn pill">Check out</button>
        </div>

        <div className="right-buttons">
          <button className="btn icon-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filter
          </button>
          <input className="search" type="text" placeholder="search by room number" />
          <button className="btn edit-btn" onClick={() => setIsEditModalOpen(true)}>
            Edit
          </button>
          {/* Replace the "Remove Guest" button onClick handler in the right-buttons div */}
          <button className="btn remove-btn" onClick={() => setIsRemoveModalOpen(true)}>
            Remove Guest
          </button>
          <button className="btn add-btn">Add Guest</button>
        </div>
      </div>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Room number</th>
              <th>Total amount</th>
              <th>Guest statut</th>
              <th>Room statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentGuests.map((g, i) => (
              <tr key={i}>
                <td>{g.email}</td>
                <td>{g.name}</td>
                <td>{g.room}</td>
                <td>{g.total}</td>
                <td>
                  <span className={`status-badge ${g.guestStatus.toLowerCase().replace(/\s+/g, "-")}`}>
                    {g.guestStatus}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${g.roomStatus.toLowerCase().replace(/\s+/g, "-")}`}>
                    {g.roomStatus}
                  </span>
                </td>
                <td className="actions">
                  <button className="action-button">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="edit-header">EDIT</div>

            <div className="search-container">
              <input
                type="text"
                placeholder="enter email address"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className="search-button" onClick={handleSearch}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>

            {matchingGuests.length === 0 && didSearch && (
              <div className="no-result">
                <div className="search-icon">
                  <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="80" fill="#E0E0E0" />
                    <path
                      d="M140 90C140 117.614 117.614 140 90 140C62.3858 140 40 117.614 40 90C40 62.3858 62.3858 40 90 40C117.614 40 140 62.3858 140 90Z"
                      fill="#A0A0A0"
                    />
                    <path d="M140 90C140 117.614 117.614 140 90 140" stroke="white" strokeWidth="8" />
                    <rect x="130" y="120" width="10" height="40" rx="5" transform="rotate(45 130 120)" fill="#A0A0A0" />
                  </svg>
                </div>
                <p>No matching result</p>
              </div>
            )}

            {matchingGuests.length > 0 && (
              <div className="guest-result">
                <table className="result-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Room</th>
                      <th>Total</th>
                      <th>Guest statut</th>
                      <th>Room statut</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {editableGuests.map((guest, index) => (
                      <tr key={index}>
                        <td>{guest.email}</td>
                        <td>
                          <input
                            type="text"
                            value={guest.name}
                            onChange={(e) => handleInputChange(index, "name", e.target.value)}
                            className="edit-input"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={guest.room}
                            onChange={(e) => handleInputChange(index, "room", e.target.value)}
                            className="edit-input"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={guest.total}
                            onChange={(e) => handleInputChange(index, "total", e.target.value)}
                            className="edit-input"
                          />
                        </td>
                        <td>
                          <select
                            value={guest.guestStatus}
                            onChange={(e) => handleStatusChange(index, "guestStatus", e.target.value)}
                            className="edit-select"
                          >
                            <option value="Checked in">Checked in</option>
                            <option value="Checked out">Checked out</option>
                            <option value="due in">due in</option>
                            <option value="due out">due out</option>
                          </select>
                        </td>
                        <td>
                          <select
                            value={guest.roomStatus}
                            onChange={(e) => handleStatusChange(index, "roomStatus", e.target.value)}
                            className="edit-select"
                          >

                            <option value="Dirty">Dirty</option>
                            <option value="Clean">Clean</option>
                            <option value="Inspected">Inspected</option>
                          </select>
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="done-button-container">
                  <button className="done-button" onClick={handleConfirm}>
                    DONE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Add this modal code at the end of the component, just before the closing </div> of the page div */}
      {/* Remove Guest Modal */}
      {isRemoveModalOpen && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="edit-header">Removing Guest</div>

            <div className="search-container">
              <input
                type="text"
                placeholder="enter email address"
                value={removeEmail}
                onChange={(e) => setRemoveEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleRemoveSearch()}
              />
              <button className="search-button" onClick={handleRemoveSearch}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>

            {foundGuests.length === 0 && removeEmail && (
              <div className="no-result">
                <div className="search-icon">
                  <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="80" fill="#E0E0E0" />
                    <path
                      d="M140 90C140 117.614 117.614 140 90 140C62.3858 140 40 117.614 40 90C40 62.3858 62.3858 40 90 40C117.614 40 140 62.3858 140 90Z"
                      fill="#A0A0A0"
                    />
                    <path d="M140 90C140 117.614 117.614 140 90 140" stroke="white" strokeWidth="8" />
                    <rect x="130" y="120" width="10" height="40" rx="5" transform="rotate(45 130 120)" fill="#A0A0A0" />
                  </svg>
                </div>
                <p>No matching result</p>
              </div>
            )}

            {foundGuests.length > 0 && !showConfirmation && (
              <div className="guest-result">
                <table className="result-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Room</th>
                      <th>Total</th>
                      <th>Guest statut</th>
                      <th>Room statut</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {foundGuests.map((guest, index) => (
                      <tr
                        key={index}
                        className="guest-row"
                        onClick={() => {
                          setSelectedGuest(guest)
                          setShowConfirmation(true)
                        }}
                      >
                        <td>{guest.email}</td>
                        <td>{guest.name}</td>
                        <td>{guest.room}</td>
                        <td>{guest.total}</td>
                        <td>
                          <span className={`status-badge ${guest.guestStatus.toLowerCase().replace(/\s+/g, "-")}`}>
                            {guest.guestStatus}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${guest.roomStatus.toLowerCase().replace(/\s+/g, "-")}`}>
                            {guest.roomStatus}
                          </span>
                        </td>
                        <td className="actions">⋮</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedGuest && showConfirmation && (
              <div className="confirmation-dialog">
                <h3>Remove this user?</h3>
                <p>
                  <strong>Name:</strong> {selectedGuest.name}
                  <br />
                  <strong>Email:</strong> {selectedGuest.email}
                  <br />
                  <strong>Room:</strong> {selectedGuest.room}
                </p>
                <div className="confirmation-buttons">
                  <button className="yes-button" onClick={handleRemoveGuest}>
                    YES
                  </button>
                  <button
                    className="no-button"
                    onClick={() => {
                      setShowConfirmation(false)
                      setSelectedGuest(null)
                    }}
                  >
                    NO
                  </button>
                </div>
              </div>
            )}

            {!showConfirmation && (
              <div className="modal-buttons">
                <button className="cancel-button" onClick={() => setIsRemoveModalOpen(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Guest
