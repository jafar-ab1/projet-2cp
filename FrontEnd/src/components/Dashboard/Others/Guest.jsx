import { useState } from "react"
import "./Table.css"
import "./StatusBadge.css"
import Pagination from "./Common/Pagination.jsx"
import StatusBadge from "./Common/StatusBadge.jsx"
import TableHeader from "./Common/TableHeader.jsx"
import FilterButton from "./Common/FilterButton.jsx"
const Guest = () => {
  // Sample data - in a real app this would come from an API or database
  const allGuests = [
    {
      id: "#9841",
      name: "Ahmed",
      room: "B734",
      total: "$900",
      paid: "$1200",
      status: "Clean",
    },
    {
      id: "#9842",
      name: "Mohammed",
      room: "B735",
      total: "$850",
      paid: "$850",
      status: "Dirty",
    },
    {
      id: "#9843",
      name: "Sara",
      room: "B736",
      total: "$1100",
      paid: "$500",
      status: "Inspected",
    },
    {
      id: "#9844",
      name: "John",
      room: "B737",
      total: "$750",
      paid: "$750",
      status: "Pick up",
    },
    {
      id: "#9845",
      name: "Ali",
      room: "B738",
      total: "$950",
      paid: "$950",
      status: "Clean",
    },
    {
      id: "#9846",
      name: "Fatima",
      room: "B739",
      total: "$1200",
      paid: "$600",
      status: "Dirty",
    },
    {
      id: "#9847",
      name: "Hassan",
      room: "B740",
      total: "$800",
      paid: "$800",
      status: "Inspected",
    },
    // Additional guests
    {
      id: "#9848",
      name: "Layla",
      room: "B741",
      total: "$950",
      paid: "$950",
      status: "Clean",
    },
    {
      id: "#9849",
      name: "Omar",
      room: "B742",
      total: "$1050",
      paid: "$500",
      status: "Dirty",
    },
    {
      id: "#9850",
      name: "Noor",
      room: "B743",
      total: "$900",
      paid: "$900",
      status: "Pick up",
    },
    {
      id: "#9851",
      name: "Yusuf",
      room: "B744",
      total: "$850",
      paid: "$850",
      status: "Inspected",
    },
    {
      id: "#9852",
      name: "Aisha",
      room: "B745",
      total: "$1000",
      paid: "$500",
      status: "Clean",
    },
  ]

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7 // Show 7 items per page

  // Calculate total pages
  const totalPages = Math.ceil(allGuests.length / itemsPerPage)

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentGuests = allGuests.slice(indexOfFirstItem, indexOfLastItem)

  // Left actions for the table header
  const leftActions = (
    <>
      <button className="btn pill">Check in</button>
      <button className="btn pill">Check out</button>
    </>
  )

  // Right actions for the table header
  const rightActions = (
    <>
      <FilterButton />
      <input className="search" type="text" placeholder="search by room number" />
      <button className="btn solid">Add Guest</button>
    </>
  )

  return (
    <div className="page">
      <TableHeader title="Guest" leftActions={leftActions} rightActions={rightActions} />

      <table className="styled-table">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Name</th>
            <th>Room number</th>
            <th>Total amount</th>
            <th>Amount paid</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentGuests.map((g, i) => (
            <tr key={i}>
              <td>
                <strong>{g.id}</strong>
              </td>
              <td>{g.name}</td>
              <td>{g.room}</td>
              <td>{g.total}</td>
              <td>{g.paid}</td>
              <td>
                <StatusBadge status={g.status} />
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

export default Guest
