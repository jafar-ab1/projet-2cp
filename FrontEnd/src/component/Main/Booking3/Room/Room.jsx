export default function Room({ room, handleAddToBasketClick: handleClick }) {
  // Determine room icon based on type
  const getRoomIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "suite":
        return "🌟"
      case "deluxe":
        return "✨"
      default:
        return "🏠"
    }
  }

  return (
    <div key={room.id || room.roomNumber} className="RoomContainer">
      <div className="Room image">
        <img src={room.image_url || "/placeholder.svg"} alt={room.title} />
      </div>
      <div className="Description">
        <div className="Descriptopn1">
          <h2>
            {room.title} {getRoomIcon(room.type)}
          </h2>
          <p>
            {Array.from({ length: room.capacity || 2 }).map((_, index) => (
              <span key={index}>👤 </span>
            ))}
          </p>
          <p>{room.bed_type || "Standard Bed"}</p>
          <p>{room.size || `Floor ${room.floor}`}</p>
          <p>{room.description}</p>
          <h2>Room Details</h2>
          {room.facilities && (
            <ul className="Facilities">
              {room.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="Price">
          <p>{room.price}</p>
          <p> per night</p>
          <p>Excluding taxes and fees</p>
          <button onClick={() => handleClick(room)}>Add to Basket</button>
        </div>
      </div>
    </div>
  )
}
