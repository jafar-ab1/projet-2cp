import { useState } from "react"
import "./Booking.css"
import { useNavigate } from "react-router-dom"; 

function CheckOut() {
  const navigate = useNavigate();
  const [Contact, setContact] = useState({
    FirstName: "your first name is required",
    LastName: "your last name is required",
    Phone: "please enter your phone number",
   Email: "please enter your email"
  })
  const [Address,setAdress]=useState({
    Country: "",
    Address :"",
    City :"",
    Code:"",

  })

  const[Payment,setPayment]=useState({
    Card:"",
    Expiration:null,
    Name:"",

  })
}
export default CheckOut
