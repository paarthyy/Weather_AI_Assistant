import { apiClient } from "./client";

export interface ChatSession {
  _id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatReply {
  response: string;
}

export async function createSession(): Promise<ChatSession> {
  try {
    const response = await apiClient.post("/chat/session");

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSessions(): Promise<ChatSession[]> {
  try {
    const response = await apiClient.get("/chat/sessions");

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSession(
  sessionId: string
): Promise<ChatSession> {
  try {
    const response = await apiClient.get(
      `/chat/session/${sessionId}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postChat(payload: {
  session_id: string;
  message: string;
  lat?: number;
  lon?: number;
}): Promise<ChatReply> {
  try {
    const provider =
      localStorage.getItem("weather_provider") || "Auto";

    const response = await apiClient.post("/chat", {
    session_id: payload.session_id,
    message: payload.message,
    provider,
    lat: payload.lat,
    lon: payload.lon,
  });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function deleteSession(
    sessionId: string
) {
    await apiClient.delete(
        `/chat/session/${sessionId}`
    );
}