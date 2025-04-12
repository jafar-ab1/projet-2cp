export default function Room({ room, handleAddToBasketClick: handleClick }) {
    return(
        <div key={room.id} className="RoomContainer">
            <div className="Room image">
                <img src={room.image_url || "/placeholder.svg"} alt={room.title} />
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
                <button onClick={() => handleClick(room)}>Add to Basket</button>
                </div>
            </div>
        </div>
    )
}