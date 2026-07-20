import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8001',
  timeout: 180000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
      return 'The backend is offline or unreachable. Please start the FastAPI server and try again.';
    }

    if (error.response?.status === 404) {
      return 'The requested backend route could not be found.';
    }

    if (error.response?.status === 500) {
      return 'The backend returned an internal server error. Please try again in a moment.';
    }

    return error.response?.data?.detail || error.message || 'A request error occurred.';
  }

  return 'An unexpected error occurred while contacting the backend.';
}
