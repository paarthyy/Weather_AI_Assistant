import { apiClient, getErrorMessage } from './client';

export async function getWeather(params: Record<string, string | number> = {}) {
  try {
    const response = await apiClient.get('/weather', { params });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
