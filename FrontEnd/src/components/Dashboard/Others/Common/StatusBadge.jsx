import "../StatusBadge.css"

const StatusBadge = ({ status }) => {
  // Convert status to lowercase and replace spaces with hyphens for CSS class
  const statusClass = status.toLowerCase().replace(" ", "-")

  // Determine badge class based on status type
  let badgeClass = "badge "

  // Room statuses
  if (["available", "booked", "reserved", "waitlist"].includes(statusClass)) {
    badgeClass += statusClass
  }
  // Deal statuses
  else if (["ongoing", "full", "new", "inactive"].includes(statusClass)) {
    badgeClass += statusClass
  }
  // Guest statuses
  else if (["clean", "dirty", "inspected", "pick-up"].includes(statusClass)) {
    badgeClass += statusClass
  }
  // Rate statuses (special case)
  else if (status.includes("rooms")) {
    badgeClass += "available"
  } else if (status === "Full") {
    badgeClass += "full"
  }

  return <span className={badgeClass}>{status}</span>
}

export default StatusBadge
