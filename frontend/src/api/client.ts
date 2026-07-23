import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8001",
  timeout: 180000,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
========================================
Attach JWT Automatically
========================================
*/

apiClient.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

    console.log("TOKEN =", token);

    if (token) {

      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${token}`;

    }

    return config;

  },

  (error) => Promise.reject(error)

);

/*
========================================
Handle Unauthorized
========================================
*/

apiClient.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("token");

      localStorage.removeItem("user");

      window.location.href = "/login";

    }

    return Promise.reject(error);

  }

);

export function getErrorMessage(error: unknown): string {

  if (axios.isAxiosError(error)) {

    if (
      error.code === "ERR_NETWORK" ||
      error.code === "ECONNABORTED"
    ) {

      return "The backend is offline.";

    }

    if (error.response?.status === 404) {

      return "API Route not found.";

    }

    if (error.response?.status === 500) {

      return "Internal Server Error.";

    }

    return (
      error.response?.data?.detail ||
      error.message ||
      "Request Failed"
    );

  }

  return "Unexpected Error";

}