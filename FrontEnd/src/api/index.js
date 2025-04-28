import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Auth routes
export const loginUser = async (loginUserData) => {
  try {
    const response = await api.post("/auth/login", loginUserData);
    return response.data; 
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const registerUser = async (registerUserData) => {
  try {
    const response = await api.post("/auth/register", registerUserData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

// Dashboard routes
export const getTodayCheckIns = async () => {
  const response = await api.get("/dash/today/in");
  return response.data;
};

export const getTodayCheckOut = async () => {
  const response = await api.get("/dash/today/out");
  return response.data;
};

export const getInHotelCount = async () => {
  const response = await api.get("/dash/inHotel");
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
  const response = await api.get("/feedbacks");
  return response.data;
};

// Guest routesimport axios from "axios";

// Guest Operations
export const getAllGuests = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching guests:", error);
    throw error;
  }
};

export const getGuestByEmail = async (email) => {
  try {
    const response = await api.get(`/user/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching guest:", error);
    throw error;
  }
};

export const addGuest = async (email, roomNumber) => {
  try {
    const response = await api.post("/user/addGuest", { email, roomNumber });
    return response.data;
  } catch (error) {
    console.error("Error adding guest:", error);
    throw error;
  }
};

export const updateGuest = async (email, guestData) => {
  try {
    const response = await api.put(`/user/${email}`, guestData);
    return response.data;
  } catch (error) {
    console.error("Error updating guest:", error);
    throw error;
  }
};

export const deleteGuest = async (email) => {
  try {
    const response = await api.delete(`/user/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting guest:", error);
    throw error;
  }
};

export const sendCheckoutEmail = async (email, roomNumber) => {
  try {
    const response = await api.get(`/user/checkOut/${email}/${roomNumber}`);
    return response.data;
  } catch (error) {
    console.error("Error sending checkout email:", error);
    throw error;
  }
};

// Room routes
export const addRoom = async (roomData) => {
  try {
    const formattedData = {
      roomNumber: roomData.roomNumber,
      type: roomData.type || "Standard",
      floor: roomData.floor || "1",
      facilities: Array.isArray(roomData.facilities)
        ? roomData.facilities
        : roomData.facilities.split(",").map((item) => item.trim()),
      status0: roomData.status0 || "Maked up",
      status1: roomData.status1 || "Available",
      price: Number(roomData.price),
    };

    console.log("Sending room data to server:", JSON.stringify(formattedData, null, 2));
    const response = await api.post("/rooms", formattedData);
    console.log("Room added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding room:", error);
    if (error.response) {
      console.error("Server response:", error.response.status, error.response.data);
    }
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