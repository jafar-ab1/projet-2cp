import { useState } from "react"
import "./Table.css"
import "./StatusBadge.css"
import Pagination from "./Common/Pagination.jsx"
import StatusBadge from "./Common/StatusBadge.jsx"
import TableHeader from "./Common/TableHeader.jsx"
import FilterButton from "./Common/FilterButton.jsx"
const Room = () => {
  // Sample data - in a real app this would come from an API or database
  const allRooms = [
    {
      id: "#001",
      bed: "Double bed",
      floor: "floor-1",
      facility: "AC,shower,Double bed,towel bathtub,TV",
      status: "Available",
    },
    {
      id: "#002",
      bed: "Single bed",
      floor: "floor-2",
      facility: "AC,shower,Double bed,towel bathtub,TV",
      status: "Booked",
    },
    { id: "#003", bed: "VIP", floor: "floor-1", facility: "AC,shower,Double bed,towel bathtub,TV", status: "Reserved" },
    { id: "#004", bed: "VIP", floor: "floor-1", facility: "AC,shower,Double bed,towel bathtub,TV", status: "Booked" },
    {
      id: "#005",
      bed: "Single bed",
      floor: "floor-1",
      facility: "AC,shower,Double bed,towel bathtub,TV",
      status: "Booked",
    },
    {
      id: "#006",
      bed: "Double bed",
      floor: "floor-2",
      facility: "AC,shower,Double bed,towel bathtub,TV",
      status: "Waitlist",
    },
    {
      id: "#007",
      bed: "Double bed",
      floor: "floor-3",
      facility: "AC,shower,Double bed,towel bathtub,TV",
      status: "Booked",
    },
    // Additional rooms
    {
      id: "#008",
      bed: "Double bed",
      floor: "floor-1",
      facility: "AC,shower,Double bed,towel bathtub,TV",
      status: "Available",
    },
    {
      id: "#009",
      bed: "Single bed",
      floor: "floor-2",
      facility: "AC,shower,Double bed,towel bathtub,TV",
      status: "Booked",
    },
    {
      id: "#010",
      bed: "VIP",
      floor: "floor-3",
      facility: "AC,shower,Double bed,towel bathtub,TV",
      status: "Reserved",
    },
    {
      id: "#011",
      bed: "Double bed",
      floor: "floor-1",
      facility: "AC,shower,Double bed,towel bathtub,TV",
      status: "Available",
    },
    {
      id: "#012",
      bed: "Single bed",
      floor: "floor-2",
      facility: "AC,shower,Double bed,towel bathtub,TV",
      status: "Booked",
    },
  ]

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7 // Show 7 items per page

  // Calculate total pages
  const totalPages = Math.ceil(allRooms.length / itemsPerPage)

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRooms = allRooms.slice(indexOfFirstItem, indexOfLastItem)

  // Left actions for the table header
  const leftActions = (
    <>
      <button className="btn pill active">All rooms(100)</button>
      <button className="btn pill">Available room(20)</button>
      <button className="btn pill">Booked(80)</button>
    </>
  )

  // Right actions for the table header
  const rightActions = (
    <>
      <button className="btn solid">Add room</button>
    </>
  )

  return (
    <div className="page">
      <TableHeader title="Rooms" leftActions={leftActions} rightActions={rightActions} />

      <table className="styled-table">
        <thead>
          <tr>
            <th>Room number</th>
            <th>Bed type</th>
            <th>Room floor</th>
            <th>Room facility</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentRooms.map((r, i) => (
            <tr key={i}>
              <td>
                <strong>{r.id}</strong>
              </td>
              <td>{r.bed}</td>
              <td>{r.floor}</td>
              <td>{r.facility}</td>
              <td>
                <StatusBadge status={r.status} />
              </td>
              <td className="actions">⋮</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default Room
