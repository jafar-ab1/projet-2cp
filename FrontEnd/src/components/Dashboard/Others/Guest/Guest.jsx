import { useState, useEffect } from "react"
import "../Table.css"
import "../StatusBadge.css"
import "./GuestStyles.css"
import Pagination from "../Common/Pagination.jsx"
import { addGuest, removeGuest, editGuest } from "../../../../api/index.js"
import GuestTable from "./components/GuestTable.jsx"
import AddGuestModal from "./components/AddGuestModal.jsx"
import EditGuestModal from "./components/EditGuestModal.jsx"
import RemoveGuestModal from "./components/RemoveGuestModal.jsx"

const Guest = () => {
  // Sample data - in a real app this would come from an API or database
  const [allGuests, setAllGuests] = useState([
    {
      id: "#9841",
      name: "Ahmed",
      email: "dh04oussalahhhhhhhhhhhhhhhhhhhhhh@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "Checked in",
      roomStatus: "Dirty",
    },
    {
      id: "#9842",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "Checked in",
      roomStatus: "Dirty",
    },
    {
      id: "#9843",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "due out",
      roomStatus: "Dirty",
    },
    {
      id: "#9844",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "due in",
      roomStatus: "Dirty",
    },
    {
      id: "#9845",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "Checked in",
      roomStatus: "Dirty",
    },
    {
      id: "#9846",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "due out",
      roomStatus: "Dirty",
    },
    {
      id: "#9847",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "due out",
      roomStatus: "Dirty",
    },
    {
      id: "#9848",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "Checked in",
      roomStatus: "Dirty",
    },
    {
      id: "#9849",
      name: "Ahmed",
      email: "ahmedmoha@gmail.com",
      room: "B734",
      total: "$900",
      guestStatus: "Checked out",
      roomStatus: "Dirty",
    },
  ])

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(7)
  const [searchQuery, setSearchQuery] = useState("")

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  // Filter guests based on search query (room number)
  const filteredGuests = searchQuery
    ? allGuests.filter((guest) => guest.room.toLowerCase().includes(searchQuery.toLowerCase()))
    : allGuests

  const currentGuests = filteredGuests.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage)

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // API handlers
  const handleAddGuest = async (email, room = "Unassigned") => {
    try {
      await addGuest(email, room)

      // In a real app, you would fetch the updated list
      // For demo, we'll add a placeholder guest
      const newGuest = {
        id: `#${Math.floor(Math.random() * 1000)}`,
        name: "New Guest",
        email: email,
        room: room,
        total: "$0",
        guestStatus: "due in",
        roomStatus: "Clean",
      }

      setAllGuests([...allGuests, newGuest])
      setIsAddModalOpen(false)

      return true
    } catch (error) {
      console.error("Error adding guest:", error)
      return false
    }
  }

  const handleEditGuest = async (email, updatedData) => {
    try {
      await editGuest(email, updatedData)

      // Update the local state
      const updatedGuests = allGuests.map((guest) => (guest.email === email ? { ...guest, ...updatedData } : guest))

      setAllGuests(updatedGuests)
      setIsEditModalOpen(false)

      return true
    } catch (error) {
      console.error("Error updating guest:", error)
      return false
    }
  }

  const handleRemoveGuest = async (email) => {
    try {
      await removeGuest(email)

      // Update the local state
      const updatedGuests = allGuests.filter((guest) => guest.email !== email)
      setAllGuests(updatedGuests)
      setIsRemoveModalOpen(false)

      return true
    } catch (error) {
      console.error("Error removing guest:", error)
      return false
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">Guest</h2>

      <div className="action-buttons-container">
        <div className="left-buttons">
          <button className="btn pill">Check in</button>
          <button className="btn pill">Check out</button>
        </div>

        <div className="right-buttons">
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
          <input
            className="search"
            type="text"
            placeholder="search by room number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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

      <GuestTable guests={currentGuests} />

      <div className="pagination-container">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {/* Modals */}
      {isAddModalOpen && <AddGuestModal onClose={() => setIsAddModalOpen(false)} onAddGuest={handleAddGuest} />}

      {isEditModalOpen && (
        <EditGuestModal onClose={() => setIsEditModalOpen(false)} onEditGuest={handleEditGuest} allGuests={allGuests} />
      )}

      {isRemoveModalOpen && (
        <RemoveGuestModal
          onClose={() => setIsRemoveModalOpen(false)}
          onRemoveGuest={handleRemoveGuest}
          allGuests={allGuests}
        />
      )}
    </div>
  )
}

export default Guest
