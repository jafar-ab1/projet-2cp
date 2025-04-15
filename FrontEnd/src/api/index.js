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
