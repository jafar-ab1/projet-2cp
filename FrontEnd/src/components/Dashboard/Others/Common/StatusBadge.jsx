import "../StatusBadge.css"

const StatusBadge = ({ status }) => {
  // Convert status to lowercase and replace spaces with hyphens for CSS class
  const statusClass = status.toLowerCase().replace(" ", "-")

  // Determine badge class based on status type
  let badgeClass = "badge "

  // Room statuses
  if (["available", "occupied"].includes(statusClass)) {
    badgeClass += statusClass
  }
  // Deal statuses
  else if (["ongoing", "full", "new", "inactive"].includes(statusClass)) {
    badgeClass += statusClass
  }
  // Guest statuses
  else if (["Maked up", "Not Maked up"].includes(statusClass)) {
    badgeClass += statusClass
  }
  else if (["checked in","checked out",'due in',"due out"].includes(statusClass)) {
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
