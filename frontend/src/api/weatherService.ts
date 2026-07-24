import { apiClient } from "./client";

export interface HourlyForecast {
  time: string;
  temp: number;
  label: string;
}

export interface Weather {
  city: string;
  country: string;
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

export async function getWeather({
    lat,
    lon,
}: {
    lat: number;
    lon: number;
}) {

    const response = await apiClient.get("/weather", {

        params: {
            lat,
            lon,
        },

    });

    return response.data;

}