import { useState } from "react"

const RemoveGuestModal = ({ onClose, onRemoveGuest, allGuests }) => {
  const [removeEmail, setRemoveEmail] = useState("")
  const [foundGuests, setFoundGuests] = useState([])
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRemoveSearch = () => {
    setError("")

    if (!removeEmail.trim()) {
      setFoundGuests([])
      return
    }

    const found = allGuests.filter((g) => g.email.toLowerCase().includes(removeEmail.toLowerCase().trim()))

    setFoundGuests(found)
  }

  const handleRemoveGuest = async () => {
    if (!selectedGuest?.email) return

    setIsLoading(true)
    setError("")

    try {
      const success = await onRemoveGuest(selectedGuest.email)

      if (success) {
        // Reset and close on success
        setRemoveEmail("")
        setFoundGuests([])
        setSelectedGuest(null)
        setShowConfirmation(false)
        onClose()
      } else {
        setError("Failed to remove guest. Please try again.")
        setShowConfirmation(false)
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setShowConfirmation(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
            disabled={isLoading || showConfirmation}
          />
          <button className="search-button" onClick={handleRemoveSearch} disabled={isLoading || showConfirmation}>
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

        {foundGuests.length === 0 && removeEmail && !showConfirmation && (
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
              <button className="yes-button" onClick={handleRemoveGuest} disabled={isLoading}>
                {isLoading ? "Removing..." : "YES"}
              </button>
              <button
                className="no-button"
                onClick={() => {
                  setShowConfirmation(false)
                  setSelectedGuest(null)
                }}
                disabled={isLoading}
              >
                NO
              </button>
            </div>
          </div>
        )}

        {!showConfirmation && !isLoading && (
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

export default RemoveGuestModal
