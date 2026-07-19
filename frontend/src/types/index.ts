export type ThemeMode = 'light' | 'dark';

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface Station {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  temperature: number;
  forecastDays: number;
  region: string;
}

export interface WeatherSnapshot {
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
  hourlyForecast: Array<{
    time: string;
    temp: number;
    label: string;
  }>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  toolSteps?: string[];
  liked?: boolean | null;
}
