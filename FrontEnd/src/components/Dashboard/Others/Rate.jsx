import { useState } from "react"
import "./Table.css"
import "./StatusBadge.css"
import Pagination from "./Common/Pagination.jsx"
import StatusBadge from "./Common/StatusBadge.jsx"
import TableHeader from "./Common/TableHeader.jsx"
import FilterButton from "./Common/FilterButton.jsx"
const Rate = () => {
  // Sample data - in a real app this would come from an API or database
  const allRates = [
    {
      type: "standard",
      deal: "Family deal",
      cancel: "Strict",
      price: "$800",
      rate: "$800",
      status: "17 rooms",
    },
    {
      type: "Deluxe",
      deal: "Ramadan deal",
      cancel: "Strict",
      price: "$700",
      rate: "$700",
      status: "5 rooms",
    },
    {
      type: "suite",
      deal: "Black friday",
      cancel: "Flexible",
      price: "$1200",
      rate: "$1200",
      status: "12 rooms",
    },
    {
      type: "standard",
      deal: "Family deal",
      cancel: "refundable",
      price: "$800",
      rate: "$800",
      status: "9 rooms",
    },
    {
      type: "suite",
      deal: "Family deal",
      cancel: "Flexible",
      price: "$500",
      rate: "$500",
      status: "Full",
    },
    // Additional rates
    {
      type: "standard",
      deal: "Summer deal",
      cancel: "Strict",
      price: "$750",
      rate: "$750",
      status: "8 rooms",
    },
    {
      type: "Deluxe",
      deal: "Weekend special",
      cancel: "Flexible",
      price: "$900",
      rate: "$900",
      status: "3 rooms",
    },
    {
      type: "suite",
      deal: "Holiday package",
      cancel: "refundable",
      price: "$1500",
      rate: "$1500",
      status: "Full",
    },
    {
      type: "standard",
      deal: "Business traveler",
      cancel: "Strict",
      price: "$650",
      rate: "$650",
      status: "15 rooms",
    },
  ]

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Show 5 items per page

  // Calculate total pages
  const totalPages = Math.ceil(allRates.length / itemsPerPage)

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRates = allRates.slice(indexOfFirstItem, indexOfLastItem)

  // Right actions for the table header
  const rightActions = (
    <>
      <button className="btn solid">Add rate</button>
      <FilterButton />
    </>
  )

  return (
    <div className="page">
      <TableHeader title="Rate" leftActions={null} rightActions={rightActions} />

      <table className="styled-table">
        <thead>
          <tr>
            <th>Room type</th>
            <th>Deals</th>
            <th>Cancellation policy</th>
            <th>Deal price</th>
            <th>Rate</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentRates.map((r, i) => (
            <tr key={i}>
              <td>
                <strong>{r.type}</strong>
              </td>
              <td>{r.deal}</td>
              <td>{r.cancel}</td>
              <td>{r.price}</td>
              <td>
                <strong>{r.rate}</strong>
              </td>
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

export default Rate
