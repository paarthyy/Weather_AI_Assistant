import { apiClient } from "../api/client";



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
  const response = await apiClient.post("/signup", data);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await apiClient.post("/login", data);
  return response.data;
};

export const changePassword = async (data: {
  current_password: string;
  new_password: string;
}) => {
  const response = await apiClient.post("/change-password", data);
  return response.data;
};
export const getCurrentUser = async () => {

    const response = await apiClient.get("/me");

    return response.data;

};
export const deleteAccount = async (password: string) => {

    const response = await apiClient.post(
        "/delete-account",
        {
            password,
        }
    );

    return response.data;

};
