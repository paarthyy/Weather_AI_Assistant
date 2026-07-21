import { apiClient, getErrorMessage } from './client';

export interface ChatReply {
  reply: string;
  response?: string;
}

export async function postChat(payload: { message: string }): Promise<ChatReply> {
  try {
    // Read saved provider from Settings
    const provider =
      localStorage.getItem("weather_provider") || "Auto";

    const response = await apiClient.post("/chat", {
      message: payload.message,
      provider: provider,
    });

    return {
      reply: response.data?.response || "The backend responded without content.",
      response: response.data?.response,
    };

  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}