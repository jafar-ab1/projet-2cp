"use client"

import { useState } from "react"
import { addGuest } from "../../../../../api/index"

const AddGuestModal = ({ onClose, refreshGuests }) => {
  const [formData, setFormData] = useState({
    email: "",
    roomNumber: [],
  })
  const [roomInput, setRoomInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoomInputChange = (e) => {
    setRoomInput(e.target.value)
  }

  const addRoomNumber = () => {
    if (roomInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        roomNumber: [...prev.roomNumber, roomInput.trim()],
      }))
      setRoomInput("")
    }
  }

  const removeRoomNumber = (index) => {
    setFormData((prev) => ({
      ...prev,
      roomNumber: prev.roomNumber.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email.trim()) {
      setError("Email is required")
      return
    }

    if (formData.roomNumber.length === 0) {
      setError("At least one room number is required")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      await addGuest(formData)
      await refreshGuests()
      onClose()
    } catch (err) {
      console.error("Error adding guest:", err)
      setError(err.response?.data?.message || "Failed to check in guest.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <div className="edit-header">Check In Guest</div>

        <form onSubmit={handleSubmit} className="add-guest-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">
              Email: <span className="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="edit-input"
              placeholder="guest@example.com"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomNumber">
              Room Numbers: <span className="required">*</span>
            </label>
            <div className="room-input-container">
              <input
                id="roomInput"
                type="text"
                value={roomInput}
                onChange={handleRoomInputChange}
                className="edit-input"
                placeholder="Enter room number"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={addRoomNumber}
                className="add-room-btn"
                disabled={isLoading || !roomInput.trim()}
              >
                Add
              </button>
            </div>

            {formData.roomNumber.length > 0 && (
              <div className="room-numbers-list">
                <p>Selected rooms:</p>
                <ul>
                  {formData.roomNumber.map((room, index) => (
                    <li key={index}>
                      {room}
                      <button
                        type="button"
                        onClick={() => removeRoomNumber(index)}
                        className="remove-room-btn"
                        disabled={isLoading}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="add-guest-buttons">
            <button type="submit" className="done-button" disabled={isLoading || formData.roomNumber.length === 0}>
              {isLoading ? "Checking In..." : "Check In"}
            </button>
            <button type="button" className="cancel-button" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddGuestModal
