import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000",
})

// Auth routes
export const loginUser = async (loginUserData) => {
  try {
    const response = await api.post("/auth/login", loginUserData)
    return response.data
  } catch (error) {
    console.error("Login failed:", error)
    throw error
  }
}

export const registerUser = async (registerUserData) => {
  try {
    const response = await api.post("/auth/register", registerUserData)
    return response.data
  } catch (error) {
    console.error("Registration failed:", error)
    throw error
  }
}

// Dashboard routes
export const getTodayCheckIns = async () => {
  const response = await api.get("/dash/today/in")
  return response.data
}

export const getTodayCheckOut = async () => {
  const response = await api.get("/dash/today/out")
  return response.data
}

export const getInHotelCount = async () => {
  const response = await api.get("/dash/inHotel")
  return response.data
}

export const countRoomStatus1 = async (status1) => {
  const response = await api.get(`/dash/countStatus/${status1}`)
  return response.data
}

export const countRoomsByTypeAndAvailable = async (type) => {
  const response = await api.get(`/dash/countTypeAvailable/${type}`)
  return response.data
}

export const countRoomByStatus0AndStatus1 = async (status0, status1) => {
  const response = await api.get(`/dash/count/${status0}/${status1}`)
  return response.data
}

export const countStatusFloor = async (status) => {
  const response = await api.get(`/dash/status/${status}`)
  return response.data
}

export const OccupancyMonth = async (year) => {
  const response = await api.get(`/reservation/dash/occupancy/${year}`)
  return response.data
}

export const getAllFeedbacks = async () => {
  const response = await api.get("/feedbacks")
  return response.data
}

// Guest routes
export const getAllGuests = async () => {
  try {
    const response = await api.get("/user")
    return response.data
  } catch (error) {
    console.error("Error fetching guests:", error)
    throw error
  }
}

export const getGuestByEmail = async (email) => {
  try {
    const response = await api.get(`/user/${email}`)
    return response.data
  } catch (error) {
    console.error("Error fetching guest:", error)
    throw error
  }
}
export const addGuest = async (data) => {
  try {
    const response = await api.post("/guest/addGuest", data)
    return response.data
  } catch (error) {
    console.error("Error adding guest:", error)
    throw error
  }
}

export const updateGuest = async (email, guestData) => {
  try {
    const response = await api.put(`/user/${email}`, guestData)
    return response.data
  } catch (error) {
    console.error("Error updating guest:", error)
    throw error
  }
}

export const deleteGuest = async (email) => {
  try {
    const response = await api.delete(`/user/${email}`)
    return response.data
  } catch (error) {
    console.error("Error deleting guest:", error)
    throw error
  }
}

export const sendCheckoutEmail = async (email, roomNumber) => {
  try {
    const response = await api.get(`/user/checkOut/${email}/${roomNumber}`)
    return response.data
  } catch (error) {
    console.error("Error sending checkout email:", error)
    throw error
  }
}

// Room routes
export const addRoom = async (roomData) => {
  try {
    const formattedData = {
      roomNumber: roomData.roomNumber.toString(),
      type: roomData.type,
      floor: roomData.floor.toString(),

      status0: roomData.status0,
      // status1 will be set by the backend
    }

    console.log("Sending room data:", formattedData)
    const response = await api.post("/rooms", formattedData)

    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(response.data?.message || "Failed to add room")
    }
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message)
    throw error
  }
}

export const getAllRooms = async () => {
  const response = await api.get("/rooms")
  return response.data
}

export const getRoomsByStatus1 = async (status1) => {
  const response = await api.get(`/rooms/${status1}`)
  return response.data
}

export const getRoomByNumber = async (roomNumber) => {
  const response = await api.get(`/rooms/number/${roomNumber}`)
  return response.data
}

// Deal routes
export const addDeal = async (dealData) => {
  const response = await api.post("/deal", dealData)
  return response.data
}

export const getDealsByStatus = async (status) => {
  const response = await api.get(`/deal/${status}`)
  return response.data
}

// NEWLY ADDED RESERVATION ROUTES
export const getAllReservations = async () => {
  try {
    const response = await api.get("/reservation")
    return response.data
  } catch (error) {
    console.error("Error fetching reservations:", error)
    throw error
  }
}

export const getReservationByEmail = async (email) => {
  try {
    const response = await api.get(`/reservation/${email}`)
    return response.data
  } catch (error) {
    console.error("Error fetching reservation by email:", error)
    throw error
  }
}

export const getReservationByEmailAndRoom = async (email, roomNumber) => {
  try {
    const response = await api.get(`/reservation/${email}/${roomNumber}`)
    return response.data
  } catch (error) {
    console.error("Error fetching reservation by email and room:", error)
    throw error
  }
}

export const createReservation = async (reservationData) => {
  try {
    const response = await api.post("/reservation", reservationData)
    return response.data
  } catch (error) {
    console.error("Error creating reservation:", error)
    throw error
  }
}

export const updateReservation = async (email, roomNumber, updateData) => {
  try {
    const response = await api.put(`/reservation/${email}/${roomNumber}`, updateData)
    return response.data
  } catch (error) {
    console.error("Error updating reservation:", error)
    throw error
  }
}

export const deleteReservation = async (email, roomNumber) => {
  try {
    const response = await api.delete(`/reservation/${email}/${roomNumber}`)
    return response.data
  } catch (error) {
    console.error("Error deleting reservation:", error)
    throw error
  }
}
export const getRoomsForReservation = async (type, checkInDate, checkOutDate) => {
  try {
    // Helper function to validate and format dates
    const formatAndValidateDate = (dateString) => {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${dateString}`);
      }
      return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    };

    // Format and validate dates
    const formattedCheckIn = formatAndValidateDate(checkInDate);
    const formattedCheckOut = formatAndValidateDate(checkOutDate);

    // Validate date sequence
    if (new Date(formattedCheckIn) >= new Date(formattedCheckOut)) {
      throw new Error("Check-out date must be after check-in date");
    }

    // Make API request
    const response = await api.get(
      `/reservation/rooms/${type}/${formattedCheckIn}/${formattedCheckOut}`,
      {
        validateStatus: (status) => status < 500 // Reject only server errors
      }
    );

    // Handle 400 responses
    if (response.status === 400) {
      throw new Error(
        response.data?.message || 
        `Bad request: ${response.statusText}` || 
        "Invalid request parameters"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Room Availability API Error:", {
      error: error.message,
      request: {
        type,
        originalDates: { checkInDate, checkOutDate },
        formattedDates: {
          checkIn: new Date(checkInDate).toISOString().split('T')[0],
          checkOut: new Date(checkOutDate).toISOString().split('T')[0]
        }
      },
      response: error.response?.data
    });
    throw error;
  }
};
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
