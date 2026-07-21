import { apiClient, getErrorMessage } from './client';

export async function getAnalytics() {
  try {
    const response = await apiClient.get('/analytics');
    return response.data;
  } catch (error) {
  throw new Error(getErrorMessage(error), {
    cause: error,
  });
}
}
