import { useState } from "react"
import "./Table.css"
import "./StatusBadge.css"
import Pagination from "./Common/Pagination.jsx"
import StatusBadge from "./Common/StatusBadge.jsx"
import TableHeader from "./Common/TableHeader.jsx"
import FilterButton from "./Common/FilterButton.jsx"

const Deal = () => {
  // Sample data - in a real app this would come from an API or database
  const allDeals = [
    {
      ref: "#9841",
      name: "Family deal",
      reservations: "10",
      endDate: "20/06/25",
      roomType: "suite",
      status: "ongoing",
    },
    {
      ref: "#9842",
      name: "Ramadan deal",
      reservations: "12",
      endDate: "20/06/25",
      roomType: "standard, deluxe",
      status: "full",
    },
    {
      ref: "#9843",
      name: "Black friday",
      reservations: "15",
      endDate: "20/06/25",
      roomType: "suite",
      status: "new",
    },
    {
      ref: "#9844",
      name: "Family deal",
      reservations: "10",
      endDate: "20/06/25",
      roomType: "deluxe",
      status: "inactive",
    },
    {
      ref: "#9845",
      name: "Family deal",
      reservations: "8",
      endDate: "20/06/25",
      roomType: "standard",
      status: "full",
    },
    // Additional deals
    {
      ref: "#9846",
      name: "Summer deal",
      reservations: "20",
      endDate: "15/08/25",
      roomType: "suite, deluxe",
      status: "ongoing",
    },
    {
      ref: "#9847",
      name: "Weekend special",
      reservations: "5",
      endDate: "30/07/25",
      roomType: "standard",
      status: "new",
    },
    {
      ref: "#9848",
      name: "Holiday package",
      reservations: "18",
      endDate: "25/12/25",
      roomType: "suite",
      status: "ongoing",
    },
    {
      ref: "#9849",
      name: "Business traveler",
      reservations: "7",
      endDate: "10/09/25",
      roomType: "deluxe",
      status: "full",
    },
    {
      ref: "#9850",
      name: "Honeymoon package",
      reservations: "3",
      endDate: "15/10/25",
      roomType: "suite",
      status: "inactive",
    },
  ]

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Show 5 items per page

  // Calculate total pages
  const totalPages = Math.ceil(allDeals.length / itemsPerPage)

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentDeals = allDeals.slice(indexOfFirstItem, indexOfLastItem)

  // Left actions for the table header
  const leftActions = (
    <>
      <button className="btn pill active">ongoing</button>
      <button className="btn pill">Finished</button>
    </>
  )

  // Right actions for the table header
  const rightActions = (
    <>
      <button className="btn solid">Add deal</button>
      <FilterButton />
    </>
  )

  return (
    <div className="page">
      <TableHeader title="Deal" leftActions={leftActions} rightActions={rightActions} />

      <table className="styled-table">
        <thead>
          <tr>
            <th>Refrence number</th>
            <th>Deal name</th>
            <th>Reservation left</th>
            <th>End date</th>
            <th>Room type</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentDeals.map((deal, index) => (
            <tr key={index}>
              <td>
                <strong>{deal.ref}</strong>
              </td>
              <td>{deal.name}</td>
              <td>{deal.reservations}</td>
              <td>{deal.endDate}</td>
              <td>{deal.roomType}</td>
              <td>
                <StatusBadge status={deal.status} />
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

export default Deal
