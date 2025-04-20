import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

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
  return api.post("/auth/register", registerUserData).then(res => res.data); 
};

export const TodayCheckIn = async(CheckInNumber) =>{
  return (await api.get("/today/in",CheckInNumber)).then(res=>res.data);
}

export const TodayCheckOut = async(CheckOutNumber) =>{
  return (await api.get("/today/out",CheckOutNumber)).then(res=>res.data);
}

export const getOccupancyByMonth = async (month) => {
  return (await api.get(`/occupancies/${month}`)).data;
};

export const getAllFeedbacks = async () => {
  return (await api.get("/feedbacks")).data; 
};

