import axios from 'axios';
import { LOCAL_STORAGE } from '../constants';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth routes
export const loginUser = async (loginUserData) => {
  try {
    const response = await api.post('/auth/login', loginUserData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const registerUser = async (registerUserData) => {
  try {
    const response = await api.post('/auth/register', registerUserData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

// Email verification routes
export const sendVerificationCode = async (email) => {
  try {
    const response = await api.post('/auth/send-verification-code', { email });
    return response.data;
  } catch (error) {
    console.error('Send verification code failed:', error);
    throw error;
  }
};

export const verifyEmail = async (email, code) => {
  try {
    const response = await api.post('/auth/verify-email', { email, code });
    return response.data;
  } catch (error) {
    console.error('Email verification failed:', error);
    throw error;
  }
};

// Dashboard routes
export const getTodayCheckIns = async () => {
  const response = await api.get('/dash/today/in');
  return response.data;
};

export const getTodayCheckOut = async () => {
  const response = await api.get('/dash/today/out');
  return response.data;
};

export const getInHotelCount = async () => {
  const response = await api.get('/dash/inHotel');
  return response.data;
};

export const countRoomStatus1 = async (status1) => {
  const response = await api.get(`/dash/countStatus/${status1}`);
  return response.data;
};

export const countRoomsByTypeAndAvailable = async (type) => {
  const response = await api.get(`/dash/countTypeAvailable/${type}`);
  return response.data;
};

export const countRoomByStatus0AndStatus1 = async (status0, status1) => {
  const response = await api.get(`/dash/count/${status0}/${status1}`);
  return response.data;
};

export const countStatusFloor = async (status) => {
  const response = await api.get(`/dash/status/${status}`);
  return response.data;
};

export const OccupancyMonth = async (year) => {
  const response = await api.get(`/reservation/dash/occupancy/${year}`);
  return response.data;
};

export const getAllFeedbacks = async () => {
  const response = await api.get('/feedbacks');
  return response.data;
};

// Guest routes
export const updateGuest = async (email, roomNumber, type) => {
  try {
    const encodedEmail = encodeURIComponent(email)
    const encodedRoomNumber = encodeURIComponent(roomNumber)
    const encodedType = encodeURIComponent(type)

    const response = await api.put(`/guest/update/${encodedEmail}/${encodedRoomNumber}/${encodedType}`)
    return response.data
  } catch (error) {
    console.error("Error updating guest:", error)
    throw error
  }
}

export const getAllGuests = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching guests:', error);
    throw error;
  }
};

export const getGuestByEmail = async (email) => {
  try {
    const response = await api.get(`/user/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching guest:', error);
    throw error;
  }
}

export const getAllCheckInDueOutGuests = async () => {
  try {
    const response = await api.get("/guest/checkIn/dueOut")
    return response.data
  } catch (error) {
    console.error("Error fetching checked-in/due-out guests:", error)
    throw error
  }
}

export const addGuest = async (guestData) => {
  try {
    const response = await api.post("/guest/addGuest", guestData)
    return response.data
  } catch (error) {
    console.error("Add guest failed:", error)
    throw error
  }
}
<<<<<<< HEAD
export const updateGuest = async (email, roomNumber, type) => {
  try {
    const response = await fetch(`/guest/update/${email}/${roomNumber}/${type}`, {
      method: "PUT"
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la modification du client");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur updateGuest:", error.message);
    throw error;
  }
};

=======
>>>>>>> ac7087dcc798ed0b7e02cf90af785ce3a4961437

export const sendCheckoutEmail = async (email, roomNumber) => {
  try {
    const response = await api.get(`/user/checkOut/${email}/${roomNumber}`)
    return response.data
  } catch (error) {
    console.error("Error sending checkout email:", error)
    throw error
  }
}

export const sendCheckoutEmailAndDelete = async (email) => {
  try {
    const response = await api.get(`/user/checkOut/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error sending checkout email and deleting guest:", error);
    throw error;
  }
};

export const deleteGuest = async (email) => {
  try {
    const response = await api.delete(`/user/${email}`)
    return response.data
  } catch (error) {
    console.error("Error deleting guest:", error)
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
    };

    console.log('Sending room data:', formattedData);
    const response = await api.post('/rooms', formattedData);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Failed to add room');
    }
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const getAllRooms = async () => {
  const response = await api.get('/rooms');
  return response.data;
};

export const getRoomsByStatus1 = async (status1) => {
  const response = await api.get(`/rooms/${status1}`);
  return response.data;
};

export const getRoomByNumber = async (roomNumber) => {
  const response = await api.get(`/rooms/number/${roomNumber}`);
  return response.data;
};

// Deal routes
export const addDeal = async (dealData) => {
  const response = await api.post('/deal', dealData);
  return response.data;
};

export const getDealsByStatus = async (status) => {
  const response = await api.get(`/deal/${status}`);
  return response.data;
};

// Reservation routes
export const getAllReservations = async () => {
  try {
    const response = await api.get('/reservation');
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};

export const getReservationByEmail = async (email) => {
  try {
    const response = await api.get(`/reservation/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservation by email:', error);
    throw error;
  }
};

export const getReservationByEmailAndRoom = async (email, roomNumber) => {
  try {
    const response = await api.get(`/reservation/${email}/${roomNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservation by email and room:', error);
    throw error;
  }
};

export const updateReservation = async (email, roomNumber, updateData) => {
  try {
    const response = await api.put(
      `/reservation/${email}/${roomNumber}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw error;
  }
};

export const deleteReservation = async (email, roomNumber) => {
  try {
    const response = await api.delete(`/reservation/${email}/${roomNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
}

export const getRoomsForReservation = async (checkInDate, checkOutDate) => {
  try {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(checkInDate) || !/^\d{4}-\d{2}-\d{2}$/.test(checkOutDate)) {
      throw new Error("Dates must be in YYYY-MM-DD format");
    }

    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    if (startDate >= endDate) {
      throw new Error("Check-out date must be after check-in date");
    }

    const response = await api.get(
      `/reservation/rooms/${checkInDate}/${checkOutDate}`
    );
    
    if (!response.data) {
      throw new Error("No data received from server");
    }
    
    return response.data;
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    
    if (error.response?.data?.message?.includes("Date invalide")) {
      throw new Error("Invalid date format or sequence. Please check your dates.");
    }
    
    throw error;
  }
};

export const createReservation = async (reservationData) => {
  try {
    const response = await api.post('/reservation', reservationData);
    return response.data;
  } catch (error) {
    console.error('Reservation failed:', error);
    throw error;
  }
};