import { useState, useEffect } from "react";
import { 
  getAllGuests,
  addGuest,
  updateGuest,
  deleteGuest,
  sendCheckoutEmail
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
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 7;

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const data = await getAllGuests();
        setGuests(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load guests");
        setLoading(false);
      }
    };
    fetchGuests();
  }, []);

  const filteredGuests = guests.filter(guest =>
    guest.roomNumber?.toString().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGuests = filteredGuests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);

  const handleCheckout = async (email, roomNumber) => {
    try {
      await sendCheckoutEmail(email, roomNumber);
      setGuests(guests.filter(g => g.email !== email));
    } catch (err) {
      setError("Checkout failed");
    }
  };

  const refreshGuests = async () => {
    try {
      const data = await getAllGuests();
      setGuests(data);
    } catch (err) {
      setError("Failed to refresh guests");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page">
      <h2 className="page-title">Guest</h2>

      <div className="action-buttons-container">
        <div className="left-buttons">
          <button className="btn pill">Check in</button>
          <button className="btn pill">Check out</button>
        </div>

        <div className="right-buttons">
          <input
            className="search"
            type="text"
            placeholder="search by room number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn icon-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
          <button 
            className="btn edit-btn" 
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </button>
          <button 
            className="btn remove-btn" 
            onClick={() => setIsRemoveModalOpen(true)}
          >
            Remove Guest
          </button>
          <button 
            className="btn add-btn" 
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Guest
          </button>
        </div>
      </div>

      <GuestTable 
        guests={currentGuests} 
        onRowSelect={setSelectedGuest}
        selectedGuestId={selectedGuest?._id}
        onCheckout={(guest) => handleCheckout(guest.email, guest.roomNumber)}
      />

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />

      {isAddModalOpen && (
        <AddGuestModal 
          onClose={() => setIsAddModalOpen(false)}
          refreshGuests={refreshGuests}
        />
      )}

      {isEditModalOpen && (
        <EditGuestModal
          onClose={() => setIsEditModalOpen(false)}
          refreshGuests={refreshGuests}
          allGuests={guests}
        />
      )}

      {isRemoveModalOpen && (
        <RemoveGuestModal
          onClose={() => setIsRemoveModalOpen(false)}
          refreshGuests={refreshGuests}
          allGuests={guests}
        />
      )}
    </div>
  );
};

export default Guest;