import { useState } from "react";
import { addGuest } from "../../../../../api/index";

const AddGuestModal = ({ onClose, refreshGuests }) => {
  const [formData, setFormData] = useState({
    email: "",
    roomNumber: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await addGuest(formData);
      console.log("Add Guest Response:", response.data);
      await refreshGuests();
      onClose();
    } catch (err) {
      console.error("Error adding guest:", err);
      setError(err.response?.data?.message || "Failed to check in guest.");
    } finally {
      setIsLoading(false);
    }
  };

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
            <label htmlFor="roomNumber">Room Number:</label>
            <input
              id="roomNumber"
              name="roomNumber"
              type="text"
              value={formData.roomNumber}
              onChange={handleChange}
              className="edit-input"
              placeholder="Room number"
              disabled={isLoading}
              required
            />
          </div>

          <div className="add-guest-buttons">
            <button 
              type="submit" 
              className="done-button" 
              disabled={isLoading}
            >
              {isLoading ? "Checking In..." : "Check In"}
            </button>
            <button 
              type="button"
              className="cancel-button" 
              onClick={onClose} 
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGuestModal;
