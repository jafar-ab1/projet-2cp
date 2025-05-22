export default function BasketRoom({
    room, index, deleteRoomFromBasket, bookingData, nights
}) {
    const formatDate = (dateString) => {
        if (!dateString) return "Invalid Date";
        const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const handleDelete = () => deleteRoomFromBasket(room.id);
    
    return(
        <div key={`${room.id}-${index}`} className="RoomItem">
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0px"
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                    }}
                    className="RoomNumber">
                    {room.type} <span>({room.reserved})</span>
                </h2>
                <button 
                    className="DeleteButton" 
                    onClick={handleDelete}
                    aria-label="Delete room"
                    >
                    🗑️
                </button>
            </div>
            <div className="PDetail">
                <p>{bookingData?.selectedBranch}, {room.title}</p>
                <p>Dzd {(room.price * nights).toFixed(2)}</p>
            </div>
            <p>
                {formatDate(bookingData?.checkInDate)} - {formatDate(bookingData?.checkOutDate)}
                {nights > 0 && ` (${nights} ${nights === 1 ? 'night' : 'nights'})`}
            </p>
            <p>{bookingData?.adults} Adults and {bookingData?.children} Children</p>
        </div>
    )
}