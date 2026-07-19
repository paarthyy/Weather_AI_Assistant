import { apiClient, getErrorMessage } from './client';

export async function getLocation(query?: string) {
  try {
    const response = await apiClient.get('/location', { params: { query } });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
