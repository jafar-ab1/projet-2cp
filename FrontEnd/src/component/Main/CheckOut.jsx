"use client"

import { useEffect, useState } from "react"
import "./CheckOut.css"
import PoliciesData from "../../Policies.json"
import { useNavigate } from "react-router-dom"

function CheckOut() {
  const navigate = useNavigate()

  const [policies, setPolicies] = useState(PoliciesData)
  const [reservedRooms, setReservedRooms] = useState([])
  const [retrievedData, setRetrievedData] = useState(null)
  const [branchPolicy, setBranchPolicy] = useState(null)
  const [termsAgreed, setTermsAgreed] = useState({
    privacyTerms: false,
  })

  useEffect(() => {
    const storedRooms = localStorage.getItem("ReserveRooms")
    if (storedRooms) {
      setReservedRooms(JSON.parse(storedRooms))
    }
  }, [])

  useEffect(() => {
    const storedData = localStorage.getItem("bookingData")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setRetrievedData(parsedData)
      if (parsedData?.selectedBranch) {
        const matchingPolicy = policies.find((policy) => policy.Branch === parsedData.selectedBranch)
        if (matchingPolicy) {
          setBranchPolicy(matchingPolicy)
        }
      }
    }
  }, [policies])

  const [Contact, setContact] = useState({
    FirstName: "",
    LastName: "",
    Phone: null,
    Email: "",
  })

  const [Address, setAddress] = useState({
    Country: "",
    Address: "",
    City: "",
    Code: null,
  })

  const [Payment, setPayment] = useState({
    Card: null,
    Expiration: "",
    Name: "",
  })

  const handleChange = (e, setState, state) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (e) => {
    setTermsAgreed({
      ...termsAgreed,
      [e.target.name]: e.target.checked,
    })
  }

  // Function to split the description into guarantee and cancel policies
  const splitDescription = (description) => {
    if (!description) return { guarantee: "", cancel: "" }

    const parts = description.split("Cancel Policy")
    return {
      guarantee: parts[0].replace("Guarantee Policy", "").trim(),
      cancel: parts.length > 1 ? parts[1].trim() : "",
    }
  }

  return (
    <div className="checkout-container">
      <h1>← Check out</h1>

      <div className="section">
        <h2>Contact info</h2>
        <div className="contact-form">
          <input
            type="text"
            name="FirstName"
            placeholder="First Name *"
            value={Contact.FirstName}
            onChange={(e) => handleChange(e, setContact, Contact)}
            required
          />
          <input
            type="text"
            name="LastName"
            placeholder="Last Name *"
            value={Contact.LastName}
            onChange={(e) => handleChange(e, setContact, Contact)}
            required
          />
          <input
            type="tel"
            name="Phone"
            placeholder="Phone *"
            value={Contact.Phone}
            onChange={(e) => handleChange(e, setContact, Contact)}
            required
          />
          <input
            type="email"
            name="Email"
            placeholder="Email Address *"
            value={Contact.Email}
            onChange={(e) => handleChange(e, setContact, Contact)}
            required
          />
        </div>
      </div>

      <div className="section">
        <h2>Address</h2>
        <div className="address-form">
          <select
            name="Country"
            value={Address.Country}
            onChange={(e) => handleChange(e, setAddress, Address)}
            required
          >
            <option value="">Country *</option>
            <option value="Algeria">Algeria</option>
            <option value="Morocco">Morocco</option>
            <option value="Tunisia">Tunisia</option>
          </select>
          <input
            type="text"
            name="Address"
            placeholder="Address"
            value={Address.Address}
            onChange={(e) => handleChange(e, setAddress, Address)}
            required
          />
          <input
            type="text"
            name="City"
            placeholder="City *"
            value={Address.City}
            onChange={(e) => handleChange(e, setAddress, Address)}
            required
          />
          <input
            type="text"
            name="Code"
            placeholder="Zip/postal code *"
            value={Address.Code}
            onChange={(e) => handleChange(e, setAddress, Address)}
            required
          />
        </div>
      </div>

      <div className="section">
        <h2>Payment</h2>
        <div className="payment-form">
          <input
            type="text"
            name="Card"
            placeholder="Card Number *"
            value={Payment.Card}
            onChange={(e) => handleChange(e, setPayment, Payment)}
            required
          />
          <input
            type="text"
            name="Expiration"
            placeholder="Expiration Date (MM/YY) *"
            value={Payment.Expiration}
            onChange={(e) => handleChange(e, setPayment, Payment)}
            required
          />
          <input
            type="text"
            name="Name"
            placeholder="Name on Card *"
            value={Payment.Name}
            onChange={(e) => handleChange(e, setPayment, Payment)}
            required
          />
        </div>
      </div>

      <div className="section policies-section">
        <h2>Policies:</h2>
        {branchPolicy && (
          <>
            <div className="check-times">
              <div className="check-time">
                <p className="check-label">Check-in</p>
                <p className="check-value">{branchPolicy.checkin}</p>
              </div>
              <div className="check-time">
                <p className="check-label">Check-out</p>
                <p className="check-value">{branchPolicy.checkout}</p>
              </div>
            </div>

            <div className="room-info">
              {reservedRooms.length > 0 &&
                reservedRooms.map((room, index) => (
                  <p key={index} className="room-detail">
                    Room {index + 1} {branchPolicy.Branch} branch, {room.title}
                  </p>
                ))}
            </div>

            <div className="policy-details">
              <p className="guarantee-title">Guarantee Policy</p>
              <p className="guarantee-text">{splitDescription(branchPolicy.Description).guarantee}</p>
              <p className="cancel-title">Cancel Policy</p>
              <p className="cancel-text">
                {splitDescription(branchPolicy.Description).cancel ||
                  "Cancel within five days of arrival to avoid penalty."}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="section acknowledgement-section">
        <h2>Acknowledgment</h2>
        <div className="terms-container">
          <p>By completing this booking, I agree with the Booking Conditions.</p>
          <input
            type="checkbox"
            id="privacy-terms"
            name="privacyTerms"
            checked={termsAgreed.privacyTerms}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="privacy-terms">I agree with the Privacy Terms.</label>
        </div>
      </div>

      {termsAgreed.privacyTerms && <button className="checkout-btn">Confirm Booking</button>}
    </div>
  )
}

export default CheckOut

