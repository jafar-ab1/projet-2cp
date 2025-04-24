import { useState, useEffect } from "react"
import "../Table.css"
import "../StatusBadge.css"
import "./RoomStyles.css"
import Pagination from "../Common/Pagination.jsx"
import RoomTable from "./RoomComponents/RoomTable.jsx"
import AddRoomModal from "./RoomComponents/AddRoomModal.jsx"
import EditRoomModal from "./RoomComponents/EditRoomModal.jsx"
import { addRoom, getAllRooms } from "../../../../api/index.js"

const Room = () => {
  // State for rooms data
  const [allRooms, setAllRooms] = useState([
    {
      id: "#001",
      roomNumber: "001",
      type: "Double bed",
      floor: "floor-1",
      facilities: "AC,shower,Double bed,towel bathtub,TV",
      status1: "Available",
      price: 100,
      status0: "Clean",
    },
    {
      id: "#002",
      roomNumber: "002",
      type: "Single bed",
      floor: "floor-2",
      facilities: "AC,shower,Double bed,towel bathtub,TV",
      status1: "Booked",
      price: 80,
      status0: "Clean",
    },
    // More sample data...
  ])

  // State for room counts
  const [roomCounts, setRoomCounts] = useState({
    total: 0,
    available: 0,
    booked: 0,
  })

  // State for loading and error
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(7)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)

  // Fetch rooms on component mount
  useEffect(() => {
    fetchRooms()
  }, [])

  // Update room counts whenever allRooms changes
  useEffect(() => {
    const total = allRooms.length
    const available = allRooms.filter((room) => room.status1 === "Available").length
    const booked = allRooms.filter((room) => room.status1 === "Booked").length

    setRoomCounts({
      total,
      available,
      booked,
    })
  }, [allRooms])

  // Fetch rooms from API
  const fetchRooms = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Call the API to get all rooms
      const rooms = await getAllRooms()

      // Format the response data if needed
      const formattedRooms = Array.isArray(rooms)
        ? rooms.map((room) => ({
            id: `#${room.roomNumber}`,
            ...room,
          }))
        : []

      setAllRooms(formattedRooms)
      setIsLoading(false)
    } catch (err) {
      setError("Failed to fetch rooms: " + (err.message || "Unknown error"))
      setIsLoading(false)
    }
  }

  // Filter rooms based on active filter and search query
  const getFilteredRooms = () => {
    let filtered = [...allRooms]

    // Apply status filter
    if (activeFilter === "available") {
      filtered = filtered.filter((room) => room.status1 === "Available")
    } else if (activeFilter === "booked") {
      filtered = filtered.filter((room) => room.status1 === "Booked")
    }

    // Apply search filter if there's a search query
    if (searchQuery) {
      filtered = filtered.filter(
        (room) =>
          room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.floor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.type.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return filtered
  }

  const filteredRooms = getFilteredRooms()
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage)
  const currentRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset to first page when filter or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter, searchQuery])

  // Handle adding a new room
  const handleAddRoom = async (roomData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Call the API function to add a room
      const newRoomData = await addRoom(roomData)

      // Add the new room to the local state
      const newRoom = {
        id: `#${roomData.roomNumber}`,
        ...newRoomData,
      }

      setAllRooms([...allRooms, newRoom])
      setIsAddModalOpen(false)
      setIsLoading(false)
      return true
    } catch (err) {
      setError("Failed to add room: " + (err.message || "Unknown error"))
      setIsLoading(false)
      return false
    }
  }

  // Handle editing a room (local only since API not available)
  const handleEditRoom = async (roomNumber, updatedData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Since we don't have the modifyRoom API function,
      // we'll just update the local state for now
      const updatedRooms = allRooms.map((room) => (room.roomNumber === roomNumber ? { ...room, ...updatedData } : room))

      setAllRooms(updatedRooms)
      setIsEditModalOpen(false)
      setSelectedRoom(null)
      setIsLoading(false)

      // Show a message that this is local only
      alert("Room updated locally. API update not implemented.")
      return true
    } catch (err) {
      setError("Failed to update room: " + (err.message || "Unknown error"))
      setIsLoading(false)
      return false
    }
  }

  // Handle deleting a room (local only since API not available)
  const handleDeleteRoom = async (roomNumber) => {
    setIsLoading(true)
    setError(null)

    try {
      // Since we don't have the suppRoom API function,
      // we'll just update the local state for now
      const updatedRooms = allRooms.filter((room) => room.roomNumber !== roomNumber)
      setAllRooms(updatedRooms)
      setIsLoading(false)

      // Show a message that this is local only
      alert("Room deleted locally. API deletion not implemented.")
      return true
    } catch (err) {
      setError("Failed to delete room: " + (err.message || "Unknown error"))
      setIsLoading(false)
      return false
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">Rooms</h2>

      <div className="action-buttons-container">
        <div className="left-buttons">
          <button
            className={`btn pill ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All rooms({roomCounts.total})
          </button>
          <button
            className={`btn pill ${activeFilter === "available" ? "active" : ""}`}
            onClick={() => setActiveFilter("available")}
          >
            Available room({roomCounts.available})
          </button>
          <button
            className={`btn pill ${activeFilter === "booked" ? "active" : ""}`}
            onClick={() => setActiveFilter("booked")}
          >
            Booked({roomCounts.booked})
          </button>
        </div>

        <div className="right-buttons">
          <input
            className="search"
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn add-btn" onClick={() => setIsAddModalOpen(true)}>
            Add room
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading">Loading rooms...</div>
      ) : (
        <>
          <RoomTable
            rooms={currentRooms}
            onEdit={(room) => {
              setSelectedRoom(room)
              setIsEditModalOpen(true)
            }}
            onDelete={handleDeleteRoom}
          />

          <div className="pagination-container">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </>
      )}

      {/* Modals */}
      {isAddModalOpen && (
        <AddRoomModal onClose={() => setIsAddModalOpen(false)} onAddRoom={handleAddRoom} isLoading={isLoading} />
      )}

      {isEditModalOpen && selectedRoom && (
        <EditRoomModal
          room={selectedRoom}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedRoom(null)
          }}
          onEditRoom={handleEditRoom}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default Room
