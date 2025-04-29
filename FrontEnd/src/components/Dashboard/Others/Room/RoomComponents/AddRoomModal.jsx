import { useState } from "react";
const AddRoomModal = ({ onClose, onAddRoom, isLoading }) => {
  const [roomData, setRoomData] = useState({
    roomNumber: "",
    type: "Standard",
    floor: "1",
    facilities: "",
    status0: "Maked up"
  });

  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setRoomData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!roomData.roomNumber.trim()) {
      setError("Room number is required");
      return false;
    }

    if (!roomData.floor.trim()) {
      setError("Floor is required");
      return false;
    }

    if (isNaN(roomData.floor)) {
      setError("Floor must be a number");
      return false;
    }

    if (!roomData.facilities.trim()) {
      setError("At least one facility is required");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // Prepare the data for submission
      const submissionData = {
        ...roomData,
        facilities: roomData.facilities
      };

      const success = await onAddRoom(submissionData);
      
      if (success) {
        onClose();
      }
    } catch (err) {
      console.error("Add room error:", err);
      setError(err.message || "Failed to add room. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <div className="edit-header">Add New Room</div>

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
              placeholder="e.g. 101"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label>Room Type:</label>
            <select
              value={roomData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="edit-select"
              disabled={isLoading}
            >
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Floor: <span className="required">*</span>
            </label>
            <input
              type="text"
              value={roomData.floor}
              onChange={(e) => handleInputChange("floor", e.target.value)}
              className="edit-input"
              placeholder="e.g. 1"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Facilities: <span className="required">*</span>
            </label>
            <textarea
              value={roomData.facilities}
              onChange={(e) => handleInputChange("facilities", e.target.value)}
              className="edit-input"
              placeholder="e.g. AC, shower, TV, towel (comma separated)"
              disabled={isLoading}
              rows={3}
              required
            />
            <small>Enter facilities separated by commas</small>
          </div>

          

          <div className="form-group">
            <label>Cleaning Status:</label>
            <select
              value={roomData.status0}
              onChange={(e) => handleInputChange("status0", e.target.value)}
              className="edit-select"
              disabled={isLoading}
            >
              <option value="Maked up">Maked up</option>
              <option value="Not Maked up">Not Maked up</option>
            </select>
          </div>
<div className="add-room-buttons">
            <button 
              className="done-button" 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Room"}
            </button>
            <button 
              className="cancel-button" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default AddRoomModal;
