import { apiClient, getErrorMessage } from './client';

export async function getStations() {
  try {
    const response = await apiClient.get('/stations');
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getStation(name: string) {
  try {
    const response = await apiClient.get(`/station/${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getForecast(params: Record<string, string | number> = {}) {
  try {
    const response = await apiClient.get('/forecast', { params });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
