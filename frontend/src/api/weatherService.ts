import { apiClient, getErrorMessage } from "./client";

export interface HourlyForecast {
  time: string;
  temp: number;
  label: string;
}

export interface Weather {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  feelsLike: number;
  visibility: number;
  clouds: number;
  sunrise: string;
  sunset: string;
  description: string;
  hourlyForecast: HourlyForecast[];
}

export async function getWeather(
  params: Record<string, string | number> = {}
): Promise<Weather> {
  try {
    const response = await apiClient.get<Weather>("/weather", {
      params,
    });

    return response.data;
  } catch (error) {
  throw new Error(getErrorMessage(error), {
    cause: error,
  });
}
}