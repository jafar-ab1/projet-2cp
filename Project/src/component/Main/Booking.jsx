import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Booking.css";

function Booking() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);

    return (
        <div className="Page">
            <p className="Stay">Book your Stay</p>

            <ul className="Check">
                {/* Check-in */}
                <li>
                    <a href="#" onClick={(e) => { 
                        e.preventDefault(); 
                        setShowCalendar(!showCalendar); 
                    }}>
                        Check-in
                    </a>
                    {showCalendar && (
                        <div className="CalendarBox">
                        <DatePicker
                            selected={checkInDate}
                            onChange={(date) => {
                                setCheckInDate(date);
                                setShowCalendar(false); // Hide calendar after selection
                            }}
                            inline
                        />
                        </div>
                    )}
                </li>

                {/* Check-out */}
                <li>
                    <a href="#">Check-out</a>
                </li>

                {/* Check Availability */}
                <li>
                    <a href="#">Check-availability</a>
                </li>
            </ul>

            <p className="comment">
                A peaceful, central setting perfect for exploring the area. Surrounded by serene landscapes and vibrant attractions, our hotel offers the ideal blend of comfort and convenience.
            </p>
        </div>
    );
}

export default Booking;
