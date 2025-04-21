import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});


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


//status1: Available or Occupied
export const countRoomStatus1 = async(status1) =>{
  const response = await api.get(`/dash/countStatus/${status1}`);
  return response.data;
};

//types: Standard or Deluxe or Suite
export const countRoomsByTypeAndAvailable = async (type) => {
  const response = await api.get(`/dash/countTypeAvailable/${type}`);
  return response.date;
}

//status 0: Dirty or Inspected or Clean
//status1: Available or Occupied
export const countRoomByStatus0AndStatus1 = async(status0, status1) =>{
  const response = await api.get(`/dash/count/${status0}/${status1}`);
  return response.data;
}

//status de chaque floor apart
export const countStatusFloor = async(status) =>{
  const response = await api.get(`/dash/status/${status}`);
  return response.data;
};


export const getOccupancyByMonth = async (month) => {
  const response = await api.get(`/occupancies/${month}`);
  return response.data;
};


export const getAllFeedbacks = async () => {
  const response = await api.get("/feedbacks");
  return response.data;
};

//II- Guest

export const addGuest = async(email) => {
  const response = await api.get(`/dash/addGuest/${email}`);
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
export const addRoom = async(roomData) =>{
  const response = await api.post('/rooms', roomData);
  return response.data;
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



