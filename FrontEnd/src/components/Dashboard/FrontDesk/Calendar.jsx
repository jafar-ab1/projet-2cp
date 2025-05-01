import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getAllReservations, getAllGuests } from "../../../api/";
import "./Calendar.css"
export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [selectedDay, setSelectedDay] = useState(1);
  const [reservations, setReservations] = useState([]);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const months = [
    { name: "Jan", days: 31 },
    { name: "Feb", days: 29 },
    { name: "Mar", days: 31 },
    { name: "Apr", days: 30 },
    { name: "May", days: 31 },
    { name: "Jun", days: 30 },
    { name: "Jul", days: 31 },
    { name: "Aug", days: 31 },
    { name: "Sep", days: 30 },
    { name: "Oct", days: 31 },
    { name: "Nov", days: 30 },
    { name: "Dec", days: 31 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservationsData, guestsData] = await Promise.all([
          getAllReservations(),
          getAllGuests()
        ]);
        setReservations(reservationsData);
        setGuests(guestsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const bookings = reservations.map((reservation, index) => {
    const checkIn = new Date(reservation.checkInDate);
    const checkOut = new Date(reservation.checkOutDate);
    const month = months[checkIn.getMonth()].name;
    
    // Find guest details - now using fullName from your schema
    const guest = guests.find(g => g.email === reservation.email);
    const name = guest ? guest.fullName : reservation.email.split('@')[0];
    
    // Status colors mapping
    const statusColors = {
      "Due in": "booking-amber",
      "Checked out": "booking-blue",
      "Due out": "booking-olive",
      "Checked in": "booking-rose"
    };
    const colorClass = statusColors[reservation.status] || "booking-amber";

    // Handle roomNumber (array or single value)
    const roomNumber = Array.isArray(reservation.roomNumber) 
      ? reservation.roomNumber[0] 
      : reservation.roomNumber;

    return {
      id: reservation._id,
      name,
      month,
      startDay: checkIn.getDate(),
      endDay: checkOut.getDate(),
      colorClass,
      roomNumber,
      positionIndex: index % 4 // Simple positioning (0-3)
    };
  });

  const days = Array.from(
    { length: months.find(m => m.name === selectedMonth).days },
    (_, i) => i + 1
  );

  const filteredBookings = bookings.filter(b => b.month === selectedMonth);

  if (loading) {
    return <div className="content-area">Loading reservations...</div>;
  }

  return (
    <div className="content-area">
      <h2 className="content-title">Front desk</h2>

      <div className="status-filters">
        <button className="filter-button filter-due-in">Due in</button>
        <button className="filter-button filter-checked-out">Checked out</button>
        <button className="filter-button filter-due-out">Due out</button>
        <button className="filter-button filter-checked-in">Checked in</button>
      </div>

      <div className="booking-actions">
        <div className="room-search-container">
          <Search className="room-search-icon" />
          <input className="room-search-input" placeholder="search by room number" />
        </div>
        <button className="create-booking-button">Create booking</button>
      </div>

      <div className="calendar-container">
        <div className="month-tabs">
          {months.map(({ name }) => (
            <button
              key={name}
              className={`month-tab ${selectedMonth === name ? "month-tab-selected" : ""}`}
              onClick={() => {
                setSelectedMonth(name);
                setSelectedDay(1);
              }}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="day-tabs">
          {days.map(day => (
            <div
              key={day}
              className={`day-tab ${selectedDay === day ? "day-tab-selected" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          <div className="grid-lines">
            {days.map(day => (
              <div key={day} className="grid-line"></div>
            ))}
          </div>

          {filteredBookings.map(booking => (
            <div
              key={booking.id}
              className={`booking-item ${booking.colorClass}`}
              style={{
                left: `${((booking.startDay - 1) / days.length) * 100}%`,
                width: `${((booking.endDay - booking.startDay + 1) / days.length) * 100}%`,
                top: `${booking.positionIndex * 40}px`
              }}
            >
              <div className="booking-content">
                <span className="booking-name">{booking.name}</span>
                {booking.roomNumber && (
                  <span className="booking-room">Room {booking.roomNumber}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}