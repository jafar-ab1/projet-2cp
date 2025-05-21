
const GuestTable = ({ guests = [] }) => {
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Room number</th>
            <th>Total amount</th>
            <th>Guest statut</th>
            <th>Room staut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {guests.length > 0 ? (
            guests.map((guest, index) => (
              <tr key={index}>
                <td>{guest.email}</td>
                <td>{guest.fullName}</td>
                <td>{Array.isArray(guest.roomNumber) ? guest.roomNumber.join(", ") : guest.roomNumber}</td>
                <td>${guest.amount || "900"}</td>
                <td>
                  <span
                    className={`status-badge ${guest.status ? guest.status.toLowerCase().replace(/\s+/g, "-") : "checked-in"}`}
                  >
                    {guest.status || "Checked in"}
                  </span>
                </td>
                <td>
                  <span
                    className={`room-status-badge ${guest.roomStatus ? guest.roomStatus.toLowerCase().replace(/\s+/g, "-") : "made-up"}`}
                  >
                    {guest.roomStatus || "Made up"}
                  </span>
                </td>
                <td>
                  <button className="action-more-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="no-data">
                No guests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default GuestTable
