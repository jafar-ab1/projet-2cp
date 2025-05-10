import { useState } from "react"
import "./Booking.css"
import { useNavigate } from "react-router-dom"

function Booking() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    checkInDate: null,
    checkOutDate: null,
    selectedBranch: "choose your branch",
    adults: 4,
    children: 2,
  })

  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false)
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false)
  const [showBranchDropdown, setShowBranchDropdown] = useState(false)
  const [showGuestSelector, setShowGuestSelector] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0)) // January 2025
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleCheckAvailability = () => {
    const { checkInDate, checkOutDate, selectedBranch, adults, children } = formData

    // Basic validation
    if (!checkInDate || !checkOutDate || selectedBranch === "choose your branch" || adults < 1) {
      setSubmitMessage("Please fill in all booking details before continuing.")
      return
    }

    setSubmitMessage("") // Clear previous message
    localStorage.setItem("bookingData", JSON.stringify(formData))
    navigate("/Choose")
  }
  ;<button className="CheckAvailability">Check Availability</button>

  // Function to update form data
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Function to close all popups
  const closeAllPopups = () => {
    setShowCheckInCalendar(false)
    setShowCheckOutCalendar(false)
    setShowBranchDropdown(false)
    setShowGuestSelector(false)
  }

  // Function to format the month and year for the calendar header
  const formatMonthYear = (date) => {
    const options = { month: "long", year: "numeric" }
    return date.toLocaleDateString("en-US", options).toUpperCase()
  }

  // Function to get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Function to get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = (calendarType) => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: "", isCurrentMonth: false })
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      let isSelected = false

      if (calendarType === "checkIn" && formData.checkInDate) {
        isSelected =
          formData.checkInDate.getDate() === day &&
          formData.checkInDate.getMonth() === month &&
          formData.checkInDate.getFullYear() === year
      }
      if (calendarType === "checkOut" && formData.checkOutDate) {
        isSelected =
          formData.checkOutDate.getDate() === day &&
          formData.checkOutDate.getMonth() === month &&
          formData.checkOutDate.getFullYear() === year
      }

      days.push({
        day,
        isCurrentMonth: true,
        isSelected: isSelected,
      })
    }

    return days
  }

  // Handle previous month
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  // Handle next month
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  // Handle day selection
  const handleDayClick = (day, calendarType) => {
    if (!day) return

    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    if (calendarType === "checkIn") {
      updateFormData("checkInDate", selectedDate)
      setShowCheckInCalendar(false)
    } else {
      updateFormData("checkOutDate", selectedDate)
      setShowCheckOutCalendar(false)
    }
  }

  // Custom Calendar Component
  const CustomCalendar = ({ calendarType }) => {
    const days = generateCalendarDays(calendarType)

    return (
      <div className="custom-calendar">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>{"<-"}</button>
          <div className="calendar-month-year">{formatMonthYear(currentMonth)}</div>
          <button onClick={handleNextMonth}>{"->"}</button>
        </div>
        <div className="calendar-grid">
          {days.map((dayObj, index) => (
            <div
              key={index}
              className={`calendar-day ${!dayObj.isCurrentMonth ? "outside-month" : ""} ${dayObj.isSelected ? "selected" : ""}`}
              onClick={() => handleDayClick(dayObj.day, calendarType)}
            >
              {dayObj.day}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="Page">
      {/* Close button in the top right corner */}
      <div className="CloseIcon" onClick={closeAllPopups}>
        ✕
      </div>

      <p className="Stay">Book your Stay</p>

      <ul className="Check">
        {/* Branch Selector */}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              closeAllPopups()
              setShowBranchDropdown(!showBranchDropdown)
            }}
          >
            {formData.selectedBranch} ◎
          </a>
          {showBranchDropdown && (
            <ul className="Dropdown">
              {["Algiers", "Oran", "Annaba"].map((branch) => (
                <li
                  key={branch}
                  onClick={() => {
                    updateFormData("selectedBranch", branch)
                    setShowBranchDropdown(false)
                  }}
                >
                  {branch}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Check-in */}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              closeAllPopups()
              setShowCheckInCalendar(!showCheckInCalendar)
            }}
          >
            Check-in ◎
            {formData.checkInDate && (
              <div style={{ fontSize: "14px", marginTop: "2px" }}>{formData.checkInDate.toLocaleDateString()}</div>
            )}
          </a>
          {showCheckInCalendar && (
            <div className="CalendarBox">
              <CustomCalendar calendarType="checkIn" />
            </div>
          )}
        </li>

        {/* Check-out */}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              closeAllPopups()
              setShowCheckOutCalendar(!showCheckOutCalendar)
            }}
          >
            Check-out ◎
            {formData.checkOutDate && (
              <div style={{ fontSize: "14px", marginTop: "2px" }}>{formData.checkOutDate.toLocaleDateString()}</div>
            )}
          </a>
          {showCheckOutCalendar && (
            <div className="CalendarBox">
              <CustomCalendar calendarType="checkOut" />
            </div>
          )}
        </li>

        {/* Guests Selector */}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              closeAllPopups()
              setShowGuestSelector(!showGuestSelector)
            }}
          >
            guests
            <div style={{ fontSize: "14px", marginTop: "2px" }}>
              {formData.adults} Adult, {formData.children} children
            </div>
          </a>
          {showGuestSelector && (
            <div className="GuestSelector">
              <h3>select guests</h3>

              <div className="GuestRow">
                <span>Adults</span>
                <div className="GuestControls">
                  <button onClick={() => updateFormData("adults", Math.max(1, formData.adults - 1))}>-</button>
                  <span className="GuestCount">{formData.adults}</span>
                  <button onClick={() => updateFormData("adults", formData.adults + 1)}>+</button>
                </div>
              </div>

              <div className="GuestRow">
                <span>Children</span>
                <div className="GuestControls">
                  <button onClick={() => updateFormData("children", Math.max(0, formData.children - 1))}>-</button>
                  <span className="GuestCount">{formData.children}</span>
                  <button onClick={() => updateFormData("children", formData.children + 1)}>+</button>
                </div>
              </div>

              <div className="ButtonRow">
                <button onClick={() => setShowGuestSelector(false)}>Cancel</button>
                <button className="Apply" onClick={() => setShowGuestSelector(false)}>
                  Apply
                </button>
              </div>
            </div>
          )}
        </li>
      </ul>

      <p className="comment">
        A peaceful, central setting perfect for exploring the area. Surrounded by serene landscapes and vibrant
        attractions, our hotel offers the ideal blend of comfort and convenience.
      </p>

      <button className="CheckAvailability" onClick={handleCheckAvailability}>
        Check Availability
      </button>
      {submitMessage && <p className="SubmitMessage">{submitMessage}</p>}
    </div>
  )
}

export default Booking
