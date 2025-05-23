import { useState, useEffect } from "react";
import {
  getAllCheckInDueOutGuests,
  addGuest,
  updateGuest,
  sendCheckoutEmail,
  sendCheckoutEmailAndDelete,
  checkDailyDueOut,
} from "../../../../api/index";
import "../Table.css";
import "../StatusBadge.css";
import "./GuestStyles.css";
import Pagination from "../Common/Pagination";
import GuestTable from "./components/GuestTable";
import AddGuestModal from "./components/AddGuestModal";
import EditGuestModal from "./components/EditGuestModal";
import RemoveGuestModal from "./components/RemoveGuestModal";

const Guest = () => {
  const [guests, setGuests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [currentGuestEmail, setCurrentGuestEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastDueOutCheck, setLastDueOutCheck] = useState(null);

  const itemsPerPage = 7;

  // Function to fetch guests
  const fetchGuests = async () => {
    try {
      setLoading(true);
      const data = await getAllCheckInDueOutGuests();
      
      const transformedGuests = data.reservations?.map(reservation => ({
        ...reservation,
        fullName: reservation.guestInfo?.fullName,
        amount: reservation.totalPrice,
        roomStatus: "Occupied"
      })) || [];
      
      setGuests(transformedGuests);
      setLoading(false);
    } catch (err) {
      setError("Failed to load guests");
      setLoading(false);
    }
  };

  // Function to check for due-out guests
  const checkForDueOutGuests = async () => {
    try {
      const now = new Date();
      console.log("Checking for due-out guests...", now);
      
      const result = await checkDailyDueOut();
      setLastDueOutCheck(now);
      
      if (result.successCount > 0) {
        console.log(`Processed ${result.successCount} due-out guests`);
        // Refresh the guest list if any were processed
        await fetchGuests();
      }
    } catch (err) {
      console.error("Error in due-out check:", err);
    }
  };

  // Run on component mount and set up interval
  useEffect(() => {
    // Initial fetch
    fetchGuests();
    
    // Initial due-out check
    checkForDueOutGuests();
    
    // Set up interval to check every hour (adjust as needed)
    const intervalId = setInterval(() => {
      checkForDueOutGuests();
    }, 3600000); // 1 hour in milliseconds
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const filteredGuests = guests.filter((guest) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      guest.email?.toLowerCase().includes(searchTerm) ||
      guest.fullName?.toLowerCase().includes(searchTerm) ||
      (Array.isArray(guest.roomNumber)
        ? guest.roomNumber.some((rn) => rn.toString().includes(searchTerm))
        : guest.roomNumber?.toString().includes(searchTerm))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGuests = filteredGuests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);

  const handleAddGuest = async (guestData) => {
    try {
      await addGuest(guestData);
      await fetchGuests();
      setIsAddModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to add guest");
    }
  };

  const handleCheckout = async (email, roomNumber) => {
    try {
      await sendCheckoutEmail(email, roomNumber);
      await fetchGuests();
    } catch (err) {
      setError("Failed to checkout guest");
    }
  };

  const handleEdit = (email) => {
    setCurrentGuestEmail(email);
    setIsEditModalOpen(true);
  };

  const handleUpdateGuest = async (updateData) => {
    try {
      await updateGuest(updateData.email, updateData.roomNumber, updateData.roomType);
      await fetchGuests();
      setIsEditModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update guest");
    }
  };

  const handleDelete = async (email) => {
    try {
      await sendCheckoutEmailAndDelete(email);
      await fetchGuests();
      setIsRemoveModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to check out guest");
    }
  };

  const renderGuestTable = () => {
    if (loading) return <div className="loading">Loading guests...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
      <GuestTable
        guests={currentGuests}
        onCheckout={handleCheckout}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  };

  return (
    <div className="page">
      <h2 className="page-title">Guest</h2>
      {lastDueOutCheck && (
        <div className="last-check-info">
          Last due-out check: {lastDueOutCheck.toLocaleTimeString()}
        </div>
      )}

      <div className="action-buttons-container">
        <div className="left-buttons">
          <button className="btn check-in-btn">Check in</button>
          <button className="btn check-out-btn">Check out</button>
        </div>
        <div className="right-buttons">
          <div className="search-container">
            <input
              className="search"
              type="text"
              placeholder="search by room number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="filter-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filter
            </button>
          </div>
          <button className="btn edit-btn" onClick={() => setIsEditModalOpen(true)}>
            Edit
          </button>
          <button className="btn remove-btn" onClick={() => setIsRemoveModalOpen(true)}>
            Remove Guest
          </button>
          <button className="btn add-btn" onClick={() => setIsAddModalOpen(true)}>
            Add Guest
          </button>
        </div>
      </div>

      {renderGuestTable()}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isAddModalOpen && (
        <AddGuestModal
          onClose={() => setIsAddModalOpen(false)}
          onAddGuest={handleAddGuest}
          refreshGuests={fetchGuests}
          allGuests={guests}
        />
      )}

      {isEditModalOpen && (
        <EditGuestModal
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateGuest}
          refreshGuests={fetchGuests}
          allGuests={guests}
          currentGuestEmail={currentGuestEmail}
        />
      )}

      {isRemoveModalOpen && (
        <RemoveGuestModal
          onClose={() => setIsRemoveModalOpen(false)}
          refreshGuests={fetchGuests}
          allGuests={guests}
        />
      )}
    </div>
  );
};

export default Guest;