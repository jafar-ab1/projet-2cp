import { useState, useEffect } from "react"

const EditRoomModal = ({ room, onClose, onEditRoom, isLoading }) => {
  const [roomData, setRoomData] = useState({
    roomNumber: "",
    type: "",
    floor: "",
    facilities: "",
    status0: "",
    status1: "",
    price: "",
  })

  const [error, setError] = useState("")

  // Initialize form with room data
  useEffect(() => {
    if (room) {
      setRoomData({
        roomNumber: room.roomNumber,
        type: room.type,
        floor: room.floor,
        facilities: room.facilities,
        status0: room.status0,
        status1: room.status1,
        price: room.price.toString(),
      })
    }
  }, [room])

  const handleInputChange = (field, value) => {
    setRoomData({
      ...roomData,
      [field]: value,
    })
  }

  const validateForm = () => {
    if (!roomData.roomNumber) {
      setError("Room number is required")
      return false
    }

    if (!roomData.price) {
      setError("Price is required")
      return false
    }

    if (isNaN(roomData.price)) {
      setError("Price must be a number")
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setError("")

    try {
      // Convert price to number
      const dataToSubmit = {
        ...roomData,
        price: Number.parseFloat(roomData.price),
      }

      const success = await onEditRoom(room.roomNumber, dataToSubmit)

      if (success) {
        onClose()
      }
    } catch (err) {
      setError("Failed to update room. Please try again.")
    }
  }

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <div className="edit-header">Edit Room</div>

        <div className="add-room-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>
              Room Number: <span className="required">*</span>
            </label>
            <input
              type="text"
              value={roomData.roomNumber}
              onChange={(e) => handleInputChange("roomNumber", e.target.value)}
              className="edit-input"
              disabled={true} // Room number cannot be changed
              required
            />
          </div>

          <div className="form-group">
            <label>Bed Type:</label>
            <select
              value={roomData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="edit-select"
              disabled={isLoading}
            >
              <option value="Single bed">Single bed</option>
              <option value="Double bed">Double bed</option>
              <option value="VIP">VIP</option>
            </select>
          </div>

          <div className="form-group">
            <label>Floor:</label>
            <select
              value={roomData.floor}
              onChange={(e) => handleInputChange("floor", e.target.value)}
              className="edit-select"
              disabled={isLoading}
            >
              <option value="floor-1">Floor 1</option>
              <option value="floor-2">Floor 2</option>
              <option value="floor-3">Floor 3</option>
            </select>
          </div>

          <div className="form-group">
            <label>Facilities:</label>
            <textarea
              value={roomData.facilities}
              onChange={(e) => handleInputChange("facilities", e.target.value)}
              className="edit-input"
              placeholder="e.g. AC, shower, TV, towel"
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>
              Price: <span className="required">*</span>
            </label>
            <input
              type="text"
              value={roomData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="edit-input"
              placeholder="e.g. 100"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label>Room Status:</label>
            <select
              value={roomData.status1}
              onChange={(e) => handleInputChange("status1", e.target.value)}
              className="edit-select"
              disabled={isLoading}
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
              <option value="Reserved">Reserved</option>
              <option value="Waitlist">Waitlist</option>
            </select>
          </div>

          <div className="form-group">
            <label>Cleaning Status:</label>
            <select
              value={roomData.status0}
              onChange={(e) => handleInputChange("status0", e.target.value)}
              className="edit-select"
              disabled={isLoading}
            >
              <option value="Clean">Clean</option>
              <option value="Dirty">Dirty</option>
              <option value="Inspected">Inspected</option>
            </select>
          </div>

          <div className="add-room-buttons">
            <button className="done-button" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
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

export default EditRoomModal
