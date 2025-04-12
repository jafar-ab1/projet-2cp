import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

export const loginUser = async(loginUserData) => {
    return api.post("/auth/login", loginUserData);
}

export const registerUser = async(registerUserData) => {
    return api.post("/auth/register", registerUserData);
}
