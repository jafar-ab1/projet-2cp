const GuestTable = ({ guests }) => {
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
              <th>Room statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {guests.length > 0 ? (
              guests.map((guest, index) => (
                <tr key={index}>
                  <td>{guest.email}</td>
                  <td>{guest.name}</td>
                  <td>{guest.room}</td>
                  <td>{guest.total}</td>
                  <td>
                    <span className={`status-badge ${guest.guestStatus.toLowerCase().replace(/\s+/g, "-")}`}>
                      {guest.guestStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${guest.roomStatus.toLowerCase().replace(/\s+/g, "-")}`}>
                      {guest.roomStatus}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="action-button">⋮</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
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
  