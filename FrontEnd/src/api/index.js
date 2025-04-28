import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

//done
//auth routes
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
  try{
  const response = await api.post("/auth/register", registerUserData);
  return response.data;
  }catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};
//done
//I- dash board

export const getTodayCheckIns = async () => {
  const response = await api.get("/dash/today/in");
  return response.data;
};


export const getTodayCheckOut = async() =>{
  const response = await api.get("/dash/today/out");
  return response.data;
};


export const getInHotelCount = async () => {
  const response = await api.get("/dash/inHotel");
  return response.data;
};

//done
//status1: Available or Occupied
export const countRoomStatus1 = async(status1) =>{
  const response = await api.get(`/dash/countStatus/${status1}`);
  return response.data;
};
//done
//types: Standard or Deluxe or Suite(occupied)
export const countRoomsByTypeAndAvailable = async (type) => {
  const response = await api.get(`/dash/countTypeAvailable/${type}`);
  return response.data;
}
//done
//status 0: Maked up, Not Maked up
//status1: Available or Occupied
export const countRoomByStatus0AndStatus1 = async(status0, status1) =>{
  const response = await api.get(`/dash/count/${status0}/${status1}`);
  return response.data;
}
//later after finding a good design
//status de chaque floor apart
export const countStatusFloor = async(status) =>{
  const response = await api.get(`/dash/status/${status}`);
  return response.data;
};

//done
export const OccupancyMonth = async (year) => {
  const response = await api.get(`/reservation/dash/occupancy/${year}`);
  return response.data;
};


//change
export const getAllFeedbacks = async () => {
  const response = await api.get("/feedbacks");
  return response.data;
};

//II- Guest
//UI not ready
export const addGuest = async(email, roomNumber) => {
  const response = await api.get(`/dash/addGuest/${email}/${roomNumber}`);
  return response.data;
};

export const removeGuest = async(email) => {
  const response = await api.delete(`/user/${email}`);
  return response.data;
};

export const editGuest = async(email, guestData) => {
  const response = await api.put(`/user/${email}`, guestData);
  return response.data
};




//rooms
export const addRoom = async (roomData) => {
  try {
    // Create a simplified version of the data with only the essential fields
    const formattedData = {
      roomNumber: roomData.roomNumber,
      type: roomData.type || "Standard",
      floor: roomData.floor || "1",
      facilities: Array.isArray(roomData.facilities)
        ? roomData.facilities
        : roomData.facilities.split(",").map((item) => item.trim()),
      status0: roomData.status0 || "Maked-up",
      status1: roomData.status1 || "Available",
      price: Number(roomData.price),
    }

    // Log the exact data being sent to the server
    console.log("Sending room data to server:", JSON.stringify(formattedData, null, 2))
    
    const response = await api.post("/rooms", formattedData)
    console.log("Room added successfully:", response.data)
    return response.data
  } catch (error) {
    console.error("Error adding room:", error)
    // Log more detailed error information
    if (error.response) {
      console.error("Server response:", error.response.status, error.response.data)
    }
    throw error
  }
}

export const getAllRooms = async() =>{
  const response = await api.get('/rooms');
  return response.data;
}


            //status1 : occupied available 
export const getRoomsByStatus1 = async(status1) => {
  const response = await api.get(`/rooms/${status1}`);
  return response.data;
}


//deal
export const addDeals = async(dealData) => {
  const response = await api.post('/deal', dealData);
  return response.data;
} 

export const dealStatus = async(status) => {
  const response = await api.get(`/deal/${status}`);
  return response.data;
}

//sendEmail
export const sendEmail = async(email, roomNumber) => {
  const response = await api.get(`/user/checkOut/${email, roomNumber}`);
  return response.data;
}

//after sending email we delete users
export const userDelete = async(email) =>{
  const response = await api.delete(`/user/${email}`);
  return response.data;
}

export const getRoomByNumber = async(roomNumber) => {
  const response = await api.get(`/rooms/number/${roomNumber}`);
    return response.data;
}

   

