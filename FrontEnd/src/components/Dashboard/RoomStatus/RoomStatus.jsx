import "./RoomStatus.css"

const RoomStatus = () => {
  return (
    <section className="room-status">
      <h3>Rooms status</h3>
      <div>
        <div>
          <strong>104</strong> occupied room
        </div>
        <div>
          <strong>30</strong> available room
        </div>
        <div>Clean: 90 / 20</div>
        <div>Dirty: 4 / 4</div>
        <div>Inspected: 60 / 20</div>
      </div>
    </section>
  )
}

export default RoomStatus
