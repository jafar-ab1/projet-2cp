import { useState } from "react";
import { updateGuest } from "../../../../../api/index";

const EditGuestModal = ({ onClose, allGuests, refreshGuests }) => {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchRoomNumber, setSearchRoomNumber] = useState("");
  const [matchingGuests, setMatchingGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [availableRoomTypes, setAvailableRoomTypes] = useState(["Standard", "Deluxe", "Suite"]);
  const [didSearch, setDidSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSearch = () => {
    setDidSearch(true);
    setError("");
    setSuccess("");

    if (!searchEmail.trim() || !searchRoomNumber.trim()) {
      setMatchingGuests([]);
      setSelectedGuest(null);
      setError("Please enter both email and room number");
      return;
    }

    const found = allGuests.filter((g) => {
      const emailMatch = g.email?.toLowerCase() === searchEmail.toLowerCase().trim();
      const roomMatch = Array.isArray(g.roomNumber)
        ? g.roomNumber.some(rn => rn.toString() === searchRoomNumber.trim())
        : g.roomNumber?.toString() === searchRoomNumber.trim();
      
      return emailMatch && roomMatch;
    });

    setMatchingGuests(found);
    if (found.length > 0) {
      setSelectedGuest(found[0]);
      // Default to the current room type
      if (found[0].roomType) {
        setSelectedRoomType(found[0].roomType);
      } else {
        setSelectedRoomType("Standard"); // Default if no room type is specified
      }
    } else {
      setSelectedGuest(null);
      setError("No guest found with that email and room number");
    }
  };

  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
  };

  const handleConfirm = async () => {
    if (!selectedGuest || !selectedGuest.email || !searchRoomNumber || !selectedRoomType) {
      setError("Missing required information. Please select a guest and room type.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await updateGuest(selectedGuest.email, searchRoomNumber, selectedRoomType);

      setSuccess(
        `Room updated successfully! ${result.roomChange?.typeUpgrade ? "Guest has been upgraded to a better room." : ""}`
      );
      await refreshGuests();

      // Don't close the modal immediately on success to show the success message
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.message || "Failed to update guest room");

      // If there are allowed changes in the error response, update the available room types
      if (err.response?.data?.allowedChanges?.allowedNewTypes) {
        setAvailableRoomTypes(err.response.data.allowedChanges.allowedNewTypes);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <div className="edit-header">Change Guest Room</div>

        <div className="search-container">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Enter email address"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              disabled={isLoading}
            />
            <input
              type="text"
              placeholder="Enter room number"
              value={searchRoomNumber}
              onChange={(e) => setSearchRoomNumber(e.target.value)}
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
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {matchingGuests.length === 0 && didSearch && !error && (
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

        {selectedGuest && (
          <div className="guest-result">
            <div className="guest-info">
              <h3>Guest Information</h3>
              <p>
                <strong>Name:</strong> {selectedGuest.fullName}
              </p>
              <p>
                <strong>Email:</strong> {selectedGuest.email}
              </p>
              <p>
                <strong>Current Room:</strong>{" "}
                {Array.isArray(selectedGuest.roomNumber)
                  ? selectedGuest.roomNumber.join(", ")
                  : selectedGuest.roomNumber}
              </p>
              <p>
                <strong>Status:</strong> {selectedGuest.status || "Checked In"}
              </p>
            </div>

            <div className="room-type-selection">
              <h3>Select New Room Type</h3>
              <p className="info-text">Note: You can only upgrade a guest to a better room type, not downgrade.</p>

              <div className="form-group">
                <label htmlFor="roomType">Room Type:</label>
                <select
                  id="roomType"
                  value={selectedRoomType}
                  onChange={handleRoomTypeChange}
                  className="edit-select"
                  disabled={isLoading}
                >
                  {availableRoomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="done-button-container">
              <button className="done-button" onClick={handleConfirm} disabled={isLoading}>
                {isLoading ? "Updating Room..." : "Change Room"}
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
  );
};

export default EditGuestModal;