import { useState, useEffect } from "react"
import { getAllCheckInDueOutGuests, addGuest, sendCheckoutEmail } from "../../../../api/index"
import "../Table.css"
import "../StatusBadge.css"
import "./GuestStyles.css"
import Pagination from "../Common/Pagination"
import GuestTable from "./components/GuestTable"
import AddGuestModal from "./components/AddGuestModal"
import EditGuestModal from "./components/EditGuestModal"
import RemoveGuestModal from "./components/RemoveGuestModal"

const Guest = () => {
  const [guests, setGuests] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedGuest, setSelectedGuest] = useState(null)

  const itemsPerPage = 7

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        setLoading(true)
        const data = await getAllCheckInDueOutGuests()
        setGuests(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load guests")
        setLoading(false)
      }
    }
    fetchGuests()
  }, [])

  const filteredGuests = guests.filter(
    (guest) =>
      (guest.roomNumber &&
        (Array.isArray(guest.roomNumber)
          ? guest.roomNumber.some((num) => num.toString().includes(searchQuery.toLowerCase()))
          : guest.roomNumber.toString().includes(searchQuery.toLowerCase()))) ||
      guest.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.fullName?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentGuests = filteredGuests.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage)

  const handleAddGuest = async (guestData) => {
    try {
      const response = await addGuest(guestData)
      // Refresh the guest list after successful addition
      const updatedGuests = await getAllCheckInDueOutGuests()
      setGuests(updatedGuests)
      setIsAddModalOpen(false)
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to add guest")
    }
  }

  const refreshGuests = async () => {
    try {
      setLoading(true)
      const data = await getAllCheckInDueOutGuests()
      setGuests(data)
      setLoading(false)
    } catch (err) {
      setError("Failed to refresh guests")
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading guests...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="page">
      <h2 className="page-title">Guest Management</h2>

      <div className="action-buttons-container">
        <div className="right-buttons">
          <input
            className="search"
            type="text"
            placeholder="Search by room, email, or name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
          <button className="btn add-btn" onClick={() => setIsAddModalOpen(true)}>
            Add Guest (Check-In)
          </button>
          <button className="btn edit-btn" onClick={() => setIsEditModalOpen(true)}>
            Edit Guest
          </button>
          <button className="btn remove-btn" onClick={() => setIsRemoveModalOpen(true)}>
            Remove Guest
          </button>
        </div>
      </div>

      <GuestTable
        guests={currentGuests}
        onCheckOut={(guest) => {
          if (window.confirm(`Are you sure you want to check out ${guest.fullName || guest.email}?`)) {
            sendCheckoutEmail(guest.email, guest.roomNumber)
              .then(() => refreshGuests())
              .catch((err) => setError(err.message || "Failed to check out guest"))
          }
        }}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {isAddModalOpen && (
        <AddGuestModal
          onClose={() => setIsAddModalOpen(false)}
          onAddGuest={handleAddGuest}
          refreshGuests={refreshGuests}
        />
      )}

      {isEditModalOpen && (
        <EditGuestModal onClose={() => setIsEditModalOpen(false)} allGuests={guests} refreshGuests={refreshGuests} />
      )}

      {isRemoveModalOpen && (
        <RemoveGuestModal
          onClose={() => setIsRemoveModalOpen(false)}
          allGuests={guests}
          refreshGuests={refreshGuests}
        />
      )}
    </div>
  )
}

export default Guest
