import roomsData from "../../rooms.json";
import "./Booking3.css"
import { useState } from "react"

function Booking3() {
  
    const [rooms, setRooms] = useState(roomsData);
return(
    <>
 <div className="RoomsWrapper">
<div className="AvailableRooms">
  {rooms.map((room) => (
  <div key={room.id} className="RoomContainer">
    <div className="Room image">
    <img src={room.image_url} alt={room.title} />
    </div>
    <div className="Description">
        <div className="Descriptopn1">
    <h2>{room.title}</h2>
    <p>
      {Array.from({ length: room.capacity }).map((_, index) => (
        <span key={index}>👤 </span>
      ))}
    </p>
    <p>{room.bed_type}</p>
    <p>{room.size}</p>
    <p>{room.description}</p>
    <h2>Room Details</h2>
    </div>
    <div className="Price">
    <p>{room.price}</p>
    <p> per night</p>
    <p>Excluding taxes and fees</p>
    <button>Add to Basket</button>
    </div>
    </div>
  </div>
))}

</div>
<button className="CheckOut">Check Out</button>
</div>
    </>
)

}
export default Booking3