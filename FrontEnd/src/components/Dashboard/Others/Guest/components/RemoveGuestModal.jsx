import { useState } from "react";
import { deleteGuest } from "../../../../../api/index";

const RemoveGuestModal = ({ onClose, allGuests, refreshGuests }) => {
  const [removeEmail, setRemoveEmail] = useState("");
  const [foundGuests, setFoundGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRemoveSearch = () => {
    setError("");
    setFoundGuests(
      removeEmail.trim() 
        ? allGuests.filter(g => g.email.toLowerCase().includes(removeEmail.toLowerCase().trim()))
        : []
    );
  };

  const handleRemoveGuest = async () => {
    if (!selectedGuest?._id) return;

    setIsLoading(true);
    setError("");

    try {
      await deleteGuest(selectedGuest._id);
      await refreshGuests();
      setRemoveEmail("");
      setFoundGuests([]);
      setSelectedGuest(null);
      setShowConfirmation(false);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove guest");
    } finally {
      setIsLoading(false);
    }
  };

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
          <button 
            className="search-button" 
            onClick={handleRemoveSearch} 
            disabled={isLoading || showConfirmation}
          >
            Search
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {foundGuests.length === 0 && removeEmail && !showConfirmation && (
          <div className="no-result">
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
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {foundGuests.map((guest) => (
                  <tr
                    key={guest._id}
                    className="guest-row"
                    onClick={() => {
                      setSelectedGuest(guest);
                      setShowConfirmation(true);
                    }}
                  >
                    <td>{guest.email}</td>
                    <td>{guest.fullName}</td>
                    <td>{guest.roomNumber}</td>
                    <td>{guest.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedGuest && showConfirmation && (
          <div className="confirmation-dialog">
            <h3>Remove this guest?</h3>
            <p>
              <strong>Name:</strong> {selectedGuest.fullName}<br />
              <strong>Email:</strong> {selectedGuest.email}<br />
              <strong>Room:</strong> {selectedGuest.roomNumber}
            </p>
            <div className="confirmation-buttons">
              <button 
                className="yes-button" 
                onClick={handleRemoveGuest} 
                disabled={isLoading}
              >
                {isLoading ? "Removing..." : "YES"}
              </button>
              <button
                className="no-button"
                onClick={() => setShowConfirmation(false)}
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
  );
};

export default RemoveGuestModal;