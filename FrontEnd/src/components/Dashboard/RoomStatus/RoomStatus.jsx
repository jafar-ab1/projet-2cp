import "./RoomStatus.css"

const RoomStatus = () => {
  return (
    <section className="room-status">
      <h3>Rooms status</h3>
      <div className="room-columns">
        <div className="room-column">
          <div className="room-header">
            <span>occupied room</span>
            <strong>104</strong>
          </div>
          <div className="room-detail">
            <span>Clean</span>
            <strong>90</strong>
          </div>
          <div className="room-detail">
            <span>Dirty</span>
            <strong>4</strong>
          </div>
          <div className="room-detail">
            <span>Inspected</span>
            <strong>60</strong>
          </div>
        </div>
        <div className="room-column">
          <div className="room-header">
            <span>available room</span>
            <strong>30</strong>
          </div>
          <div className="room-detail">
            <span>Clean</span>
            <strong>20</strong>
          </div>
          <div className="room-detail">
            <span>Dirty</span>
            <strong>4</strong>
          </div>
          <div className="room-detail">
            <span>Inspected</span>
            <strong>20</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoomStatus
