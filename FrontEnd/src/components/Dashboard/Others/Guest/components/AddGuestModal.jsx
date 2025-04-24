import { useState } from "react"

const AddGuestModal = ({ onClose, onAddGuest }) => {
  const [email, setEmail] = useState("")
  const [room, setRoom] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Email is required")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const success = await onAddGuest(email, room)

      if (success) {
        // Reset form and close on success
        setEmail("")
        setRoom("")
        onClose()
      } else {
        setError("Failed to add guest. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <div className="edit-header">Add New Guest</div>

        <div className="add-guest-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>
              Email: <span className="required">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="edit-input"
              placeholder="guest@example.com"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label>Room Number:</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="edit-input"
              placeholder="Optional"
              disabled={isLoading}
            />
          </div>

          <div className="add-guest-buttons">
            <button className="done-button" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Guest"}
            </button>
            <button className="cancel-button" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddGuestModal
