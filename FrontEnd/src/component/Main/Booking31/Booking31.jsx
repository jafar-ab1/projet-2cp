import "./Booking31.css"

function Booking31({ bookingData }) {    
    const formatDate = (dateString) => {
        if (!dateString) return "Invalid Date";
        const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <>
        <div className="Booking31">
        <div className="PreviousData">
            <div className="Guests">
                <p> Guests</p>
                <p> {bookingData.adults} adults , {bookingData.children} children</p>
            </div>
            <div className="Check-in">
                <p>Check-in</p>
                <p>{formatDate(bookingData.checkInDate)}</p>
            </div>
            <div className="Check-out">
                <p>Check-out</p>
                <p>{formatDate(bookingData.checkOutDate)}</p>
            </div>
        </div>
        <p className="offers">Special codes or offers</p>
        </div>
        
        </>
    );
    
}
export default Booking31