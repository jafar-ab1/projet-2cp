import { useState } from "react";
import { sendCheckoutEmailAndDelete } from "../../../../../api/index";
import "./removeEdit.css";

const RemoveGuestModal = ({ onClose, allGuests, refreshGuests }) => {
  const [removeEmail, setRemoveEmail] = useState("");
  const [foundGuests, setFoundGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleRemoveSearch = () => {
    setError("")
    setFoundGuests(
      removeEmail.trim()
        ? allGuests.filter((g) => g.email?.toLowerCase().includes(removeEmail.toLowerCase().trim()))
        : [],
    )
  }

  const handleRemoveGuest = async () => {
    if (!selectedGuest?.email) {
      setError("No guest selected");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await sendCheckoutEmailAndDelete(selectedGuest.email);
      setSuccess("Guest checked out successfully. A confirmation email has been sent.");
      await refreshGuests();
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.response?.data?.message || "Failed to check out guest");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <div className="modal-header">
          <h2>Check Out Guest</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {!showConfirmation ? (
          <>
            <div className="search-container">
              <input
                type="text"
                placeholder="Enter guest email"
                value={removeEmail}
                onChange={(e) => setRemoveEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleRemoveSearch()}
                disabled={isLoading}
              />
              <button 
                className="search-btn"
                onClick={handleRemoveSearch}
                disabled={isLoading}
              >
                Search
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            {foundGuests.length > 0 && (
              <div className="guest-results">
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
                        <td>{guest.fullName}</td>
                        <td>{guest.email}</td>
                        <td>
                          {Array.isArray(guest.roomNumber)
                            ? guest.roomNumber.join(", ")
                            : guest.roomNumber}
                        </td>
                        <td>
                          <button
                            className="select-btn"
                            onClick={() => {
                              setSelectedGuest(guest);
                              setShowConfirmation(true);
                            }}
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {foundGuests.length === 0 && removeEmail && (
              <div className="no-results">No guests found matching "{removeEmail}"</div>
            )}
          </>
        ) : (
          <div className="confirmation-dialog">
            <h3>Confirm Check Out</h3>
            <div className="guest-details">
              <p><strong>Name:</strong> {selectedGuest.fullName}</p>
              <p><strong>Email:</strong> {selectedGuest.email}</p>
              <p>
                <strong>Room:</strong>{" "}
                {Array.isArray(selectedGuest.roomNumber)
                  ? selectedGuest.roomNumber.join(", ")
                  : selectedGuest.roomNumber}
              </p>
            </div>
            <p className="warning-message">
              This will check out the guest, send a confirmation email, and mark the room as available.
            </p>
            
            <div className="confirmation-buttons">
              <button
                className="confirm-btn"
                onClick={handleRemoveGuest}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Confirm Check Out"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowConfirmation(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveGuestModal;