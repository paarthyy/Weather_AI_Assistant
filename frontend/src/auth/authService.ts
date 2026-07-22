import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  const response = await API.post("/signup", data);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await API.post("/login", data);
  return response.data;
};