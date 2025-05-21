const GuestTable = ({ guests = [], onCheckOut }) => {
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Room Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.length > 0 ? (
            guests.map((guest, index) => (
              <tr key={index}>
                <td>{guest.email}</td>
                <td>{guest.fullName}</td>
                <td>{Array.isArray(guest.roomNumber) ? guest.roomNumber.join(", ") : guest.roomNumber}</td>
                <td>
                  <span
                    className={`status-badge ${guest.status ? guest.status.toLowerCase().replace(/\s+/g, "-") : "unknown"}`}
                  >
                    {guest.status}
                  </span>
                </td>
                <td className="actions">
                  <div className="action-buttons">
                    <button
                      className="action-button checkout-btn"
                      onClick={() => onCheckOut(guest)}
                      title="Check Out Guest"
                    >
                      Check Out
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
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
