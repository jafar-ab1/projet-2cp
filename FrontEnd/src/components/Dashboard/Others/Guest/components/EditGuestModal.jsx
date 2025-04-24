import { useState } from "react"

const EditGuestModal = ({ onClose, onEditGuest, allGuests }) => {
  const [searchEmail, setSearchEmail] = useState("")
  const [matchingGuests, setMatchingGuests] = useState([])
  const [editableGuests, setEditableGuests] = useState([])
  const [didSearch, setDidSearch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = () => {
    setDidSearch(true)
    setError("")

    if (!searchEmail.trim()) {
      setMatchingGuests([])
      setEditableGuests([])
      return
    }

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

  const handleConfirm = async () => {
    if (editableGuests.length === 0) return

    setIsLoading(true)
    setError("")

    try {
      // Process each edited guest
      for (const guest of editableGuests) {
        const success = await onEditGuest(guest.email, {
          name: guest.name,
          room: guest.room,
          total: guest.total,
          guestStatus: guest.guestStatus,
          roomStatus: guest.roomStatus,
        })

        if (!success) {
          setError(`Failed to update guest: ${guest.email}`)
          setIsLoading(false)
          return
        }
      }

      // Reset and close on success
      setSearchEmail("")
      setMatchingGuests([])
      setEditableGuests([])
      setDidSearch(false)
      onClose()
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
            disabled={isLoading}
          />
          <button className="search-button" onClick={handleSearch} disabled={isLoading}>
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

        {error && <div className="error-message">{error}</div>}

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
                        disabled={isLoading}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={guest.room}
                        onChange={(e) => handleInputChange(index, "room", e.target.value)}
                        className="edit-input"
                        disabled={isLoading}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={guest.total}
                        onChange={(e) => handleInputChange(index, "total", e.target.value)}
                        className="edit-input"
                        disabled={isLoading}
                      />
                    </td>
                    <td>
                      <select
                        value={guest.guestStatus}
                        onChange={(e) => handleInputChange(index, "guestStatus", e.target.value)}
                        className="edit-select"
                        disabled={isLoading}
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
                        onChange={(e) => handleInputChange(index, "roomStatus", e.target.value)}
                        className="edit-select"
                        disabled={isLoading}
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
              <button className="done-button" onClick={handleConfirm} disabled={isLoading}>
                {isLoading ? "Saving..." : "DONE"}
              </button>
            </div>
          </div>
        )}

        {!isLoading && (
          <div className="modal-buttons">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditGuestModal
