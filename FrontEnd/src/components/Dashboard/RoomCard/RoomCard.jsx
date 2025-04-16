import "./RoomCard.css"

const RoomCard = ({ title, deals, booked, total, price }) => {
  return (
    <div className="room-card">
      {deals > 0 && <span className="deals">{deals} Deals</span>}
      <h4>{title}</h4>
      <p>
        {booked}/{total}
      </p>
      <p>Dzd {price}/day</p>
    </div>
  )
}

export default RoomCard
