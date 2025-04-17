import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import "./Calendar.css";

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [selectedDay, setSelectedDay] = useState(1);

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

  const days = useMemo(() => {
    const monthObj = months.find((m) => m.name === selectedMonth);
    return Array.from({ length: monthObj.days }, (_, i) => i + 1);
  }, [selectedMonth]);

  const bookings = [
    { id: 1, name: "Ahmed", month: "Mar", startDay: 2, endDay: 19, colorClass: "booking-amber" },
    { id: 2, name: "Mohammed", month: "Feb", startDay: 1, endDay: 28, colorClass: "booking-blue" },
    { id: 3, name: "Khadija", month: "Feb", startDay: 4, endDay: 16, colorClass: "booking-olive" },
    { id: 4, name: "Abdalhak", month: "Apr", startDay: 6, endDay: 7, colorClass: "booking-rose" },
    { id: 5, name: "Zineb", month: "Feb", startDay: 7, endDay: 9, colorClass: "booking-olive" },
    { id: 6, name: "Rania", month: "Jun", startDay: 9, endDay: 10, colorClass: "booking-rose" },
    { id: 7, name: "Salim", month: "Feb", startDay: 2, endDay: 4, colorClass: "booking-amber" },
    { id: 8, name: "Omar", month: "Feb", startDay: 5, endDay: 7, colorClass: "booking-blue" },
  ];

  const filteredBookings = bookings.filter((b) => b.month === selectedMonth);

  return (
    <div className="content-area">
      <h2 className="content-title">Front desk</h2>

      {/* Status filters */}
      <div className="status-filters">
        <button className="filter-button filter-due-in">Due in</button>
        <button className="filter-button filter-checked-out">Checked out</button>
        <button className="filter-button filter-due-out">Due out</button>
        <button className="filter-button filter-checked-in">Checked in</button>
      </div>

      {/* Search and Create booking */}
      <div className="booking-actions">
        <div className="room-search-container">
          <Search className="room-search-icon" />
          <input className="room-search-input" placeholder="search by room number" />
        </div>
        <button className="create-booking-button">Create booking</button>
      </div>

      {/* Calendar */}
      <div className="calendar-container">
        {/* Month tabs */}
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

        {/* Days */}
        <div className="day-tabs">
          {days.map((day) => (
            <div
              key={day}
              className={`day-tab ${selectedDay === day ? "day-tab-selected" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="calendar-grid">
          {/* Grid lines */}
          <div className="grid-lines">
            {days.map((day) => (
              <div key={day} className="grid-line"></div>
            ))}
          </div>

          {/* Bookings */}
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className={`booking-item ${booking.colorClass}`}
              style={{
                left: `${(booking.startDay - 1) * (100 / days.length)}%`,
                width: `${(booking.endDay - booking.startDay + 1) * (100 / days.length)}%`,
                top: `${(booking.id * 40) % 480}px`,
              }}
            >
              {booking.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
