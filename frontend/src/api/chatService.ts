import { apiClient, getErrorMessage } from './client';

export interface ChatReply {
  reply: string;
  response?: string;
}

export async function postChat(payload: { message: string }): Promise<ChatReply> {
  try {
    const response = await apiClient.post('/chat', { message: payload.message });
    return {
      reply: response.data?.response || 'The backend responded without content.',
      response: response.data?.response,
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
