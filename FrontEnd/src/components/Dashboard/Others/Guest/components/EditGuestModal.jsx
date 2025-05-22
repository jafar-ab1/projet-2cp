
import { useState, useEffect } from "react"
import { updateGuest } from "../../../../../api/index"

const EditGuestModal = ({ onClose, onUpdate, refreshGuests, allGuests, currentGuestEmail }) => {
  const [formData, setFormData] = useState({
    email: currentGuestEmail || "",
    roomNumber: "",
    roomType: "Deluxe", // Default to Deluxe as it's an upgrade option
  })

  const [foundGuests, setFoundGuests] = useState([])
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [apiStatus, setApiStatus] = useState(null)

  // Room type options (ensure they're in ascending order of quality)
  const roomTypes = ["Standard", "Deluxe", "Suite"]

  useEffect(() => {
    // If currentGuestEmail is provided, automatically search for that guest
    if (currentGuestEmail) {
      handleSearch()
    }
  }, [currentGuestEmail])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSearch = () => {
    setError("")
    setSearchPerformed(true)

    if (!formData.email.trim()) {
      setError("Please enter an email to search")
      setFoundGuests([])
      return
    }

    const filtered = allGuests.filter((g) => g.email?.toLowerCase().includes(formData.email.toLowerCase().trim()))

    setFoundGuests(filtered)

    if (filtered.length === 0) {
      setError(`No guests found with email containing "${formData.email}"`)
    } else if (filtered.length === 1) {
      // Auto-select if only one guest is found
      setSelectedGuest(filtered[0])
    }
  }

  const handleSelectGuest = (guest) => {
    setSelectedGuest(guest)
    setFormData((prev) => ({
      ...prev,
      email: guest.email,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedGuest) {
      setError("Please select a guest first")
      return
    }

    if (!formData.roomNumber) {
      setError("Please enter a room number to update")
      return
    }

    if (!formData.roomType) {
      setError("Please select a room type")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")
    setApiStatus("Attempting to update guest room...")

    try {
      // Log the data we're sending
      console.log("Submitting update with:", {
        email: formData.email,
        roomNumber: formData.roomNumber,
        roomType: formData.roomType,
      })

      // Our new updateGuest function will try multiple approaches
      const result = await updateGuest(formData.email, formData.roomNumber, formData.roomType)

      setApiStatus("Update successful!")
      setSuccess("Guest room updated successfully!")

      // Refresh the guest list
      await refreshGuests()

      // Close modal after success
      setTimeout(() => {
        onUpdate(formData)
        onClose()
      }, 2000)
    } catch (err) {
      console.error("Update error:", err)
      setApiStatus(`Update failed: ${err.message}`)

      // Set a more user-friendly error message
      setError("Failed to update guest room. Please try again or contact support.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <div className="modal-header">
          <h2>Edit Guest Room</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-guest-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          {apiStatus && <div className="api-status">{apiStatus}</div>}

          <div className="form-group">
            <label htmlFor="email">
              Guest Email: <span className="required">*</span>
            </label>
            <div className="search-container">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="edit-input"
                placeholder="guest@example.com"
                disabled={isLoading || selectedGuest}
                required
              />
              {!selectedGuest && (
                <button type="button" className="search-btn" onClick={handleSearch} disabled={isLoading}>
                  Search
                </button>
              )}
            </div>
          </div>

          {searchPerformed && foundGuests.length > 0 && !selectedGuest && (
            <div className="guest-results">
              <h4>Select a Guest:</h4>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Room</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {foundGuests.map((guest) => (
                    <tr key={guest.email}>
                      <td>{guest.fullName || guest.guestInfo?.fullName || "N/A"}</td>
                      <td>{guest.email}</td>
                      <td>{Array.isArray(guest.roomNumber) ? guest.roomNumber.join(", ") : guest.roomNumber}</td>
                      <td>
                        <button type="button" className="select-btn" onClick={() => handleSelectGuest(guest)}>
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedGuest && (
            <>
              <div className="selected-guest-info">
                <h4>Selected Guest:</h4>
                <p>
                  <strong>Name:</strong> {selectedGuest.fullName || selectedGuest.guestInfo?.fullName || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {selectedGuest.email}
                </p>
                <p>
                  <strong>Current Room(s):</strong>{" "}
                  {Array.isArray(selectedGuest.roomNumber)
                    ? selectedGuest.roomNumber.join(", ")
                    : selectedGuest.roomNumber}
                </p>
                <button
                  type="button"
                  className="change-guest-btn"
                  onClick={() => {
                    setSelectedGuest(null)
                    setFormData((prev) => ({ ...prev, email: "" }))
                  }}
                  disabled={isLoading}
                >
                  Change Guest
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="roomNumber">
                  Room Number to Update: <span className="required">*</span>
                </label>
                <input
                  id="roomNumber"
                  name="roomNumber"
                  type="text"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="Enter room number to update"
                  disabled={isLoading}
                  required
                />
                <small className="help-text">Enter the specific room number you want to upgrade</small>
              </div>

              <div className="form-group">
                <label htmlFor="roomType">
                  New Room Type (Upgrade): <span className="required">*</span>
                </label>
                <select
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="edit-input"
                  disabled={isLoading}
                  required
                >
                  <option value="">Select room type</option>
                  {roomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <small className="help-text">Note: You can only upgrade to a higher room type</small>
              </div>
            </>
          )}

          <div className="form-buttons">
            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading || !selectedGuest || !formData.roomNumber || !formData.roomType}
            >
              {isLoading ? "Updating..." : "Update Room"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditGuestModal
