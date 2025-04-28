
import { useState, useEffect } from "react"
import "../Table.css"
import "../StatusBadge.css"
import "./RoomStyles.css"
import Pagination from "../Common/Pagination.jsx"
import RoomTable from "./RoomComponents/RoomTable.jsx"
import AddRoomModal from "./RoomComponents/AddRoomModal.jsx"
import EditRoomModal from "./RoomComponents/EditRoomModal.jsx"
import { addRoom, getAllRooms } from "../../../../api/index.js"
import axios from "axios"
const Room = () => {
  // State for rooms data
  const [allRooms, setAllRooms] = useState([])

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
    const booked = allRooms.filter((room) => room.status1 === "Occupied").length

    setRoomCounts({
      total,
      available,
      booked,
    })
  }, [allRooms])

  const fetchRooms = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Call the API to get all rooms
      const rooms = await getAllRooms()
      console.log("Rooms fetched successfully:", rooms)

      // Format the response data
      const formattedRooms = Array.isArray(rooms)
        ? rooms.map((room) => ({
            id: `#${room.roomNumber}`,
            ...room,
          }))
        : []

      setAllRooms(formattedRooms)
    } catch (err) {
      console.error("Error fetching rooms:", err)
      setError("Failed to fetch rooms. Please check if the backend server is running.")
      // Initialize with empty array to prevent errors
      setAllRooms([])
    } finally {
      setIsLoading(false)
    }
  }

  // Filter rooms based on active filter and search query
  const getFilteredRooms = () => {
    let filtered = [...allRooms]

    // Apply status filter
    if (activeFilter === "available") {
      filtered = filtered.filter((room) => room.status1 === "Available")
    } else if (activeFilter === "Occupied") {
      filtered = filtered.filter((room) => room.status1 === "Occupied")
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

  const handleAddRoom = async (roomData) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Adding room with data:", roomData)
      // Call the API function to add a room
      const newRoom = await addRoom(roomData)
      console.log("Room added successfully:", newRoom)

      // Format the new room for the UI
      const formattedRoom = {
        id: `#${newRoom.roomNumber || roomData.roomNumber}`,
        ...newRoom,
      }

      // Update the local state with the new room
      setAllRooms((prevRooms) => [...prevRooms, formattedRoom])

      setIsAddModalOpen(false)
      alert("Room added successfully!")
      return true
    } catch (err) {
      console.error("Error adding room:", err)
      setError("Failed to add room. Please check if the backend server is running.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditRoom = async (roomNumber, updatedData) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Updating room:", roomNumber, "with data:", updatedData)

      // Make a direct axios call since we don't have updateRoom in the API
      const response = await axios.put(`http://localhost:3000/rooms/${roomNumber}`, updatedData)
      const updatedRoom = response.data
      console.log("Room updated successfully:", updatedRoom)

      // Update the local state
      const updatedRooms = allRooms.map((room) => (room.roomNumber === roomNumber ? { ...room, ...updatedRoom } : room))

      setAllRooms(updatedRooms)
      setIsEditModalOpen(false)
      setSelectedRoom(null)

      alert("Room updated successfully!")
      return true
    } catch (err) {
      console.error("Error updating room:", err)
      setError("Failed to update room. Please check if the backend server is running.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteRoom = async (roomNumber) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Deleting room:", roomNumber)

      // Make a direct axios call since we don't have deleteRoom in the API
      await axios.delete(`http://localhost:3000/rooms/${roomNumber}`)
      console.log("Room deleted successfully")

      // Update the local state
      const updatedRooms = allRooms.filter((room) => room.roomNumber !== roomNumber)
      setAllRooms(updatedRooms)

      alert("Room deleted successfully!")
      return true
    } catch (err) {
      console.error("Error deleting room:", err)
      setError("Failed to delete room. Please check if the backend server is running.")
      return false
    } finally {
      setIsLoading(false)
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
            className={`btn pill ${activeFilter === "Occupied" ? "active" : ""}`}
            onClick={() => setActiveFilter("Occupied")}
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

      {error && (
        <div
          className="error-message"
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px 15px",
            marginBottom: "15px",
            border: "1px solid #f5c6cb",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}

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
