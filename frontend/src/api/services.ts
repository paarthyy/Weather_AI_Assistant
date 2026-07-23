import { apiClient } from './client';

export async function postChat(payload: Record<string, unknown>) {
  try {
    const response = await apiClient.post('/chat', payload);
    return response.data;
  } catch {
    return {
      reply:
        'WeatherOps AI is ready to connect to your backend. The frontend is prepared to send chat requests to the /chat endpoint once the service is available.',
      model: 'gemini',
      tools: ['weather', 'imd', 'forecast'],
    };
  }
}

export async function getWeather(params: Record<string, unknown> = {}) {
  try {
    const response = await apiClient.get('/weather', { params });
    return response.data;
  } catch {
    return {
      city: params.city || 'Delhi',
      temperature: 31,
      humidity: 48,
      windSpeed: 13,
      pressure: 1008,
      feelsLike: 34,
      visibility: 10,
      clouds: 24,
      sunrise: '05:53',
      sunset: '19:11',
      hourlyForecast: [
        { time: '09:00', temp: 30, label: 'Clear' },
        { time: '12:00', temp: 33, label: 'Sunny' },
        { time: '15:00', temp: 34, label: 'Warm' },
        { time: '18:00', temp: 31, label: 'Cloudy' },
      ],
    };
  }
}

export async function getLocation(query: string) {
  try {
    const response = await apiClient.get('/location', { params: { query } });
    return response.data;
  } catch {
    return { query, coordinates: [28.6139, 77.209] };
  }
}

export async function getStations() {
  try {
    const response = await apiClient.get('/stations');
    return response.data;
  } catch {
    return [
      { id: 'delhi', name: 'Delhi Station', latitude: 28.6139, longitude: 77.209, elevation: 216, temperature: 31, forecastDays: 7, region: 'Delhi' },
      { id: 'jaipur', name: 'Jaipur Station', latitude: 26.9124, longitude: 75.7873, elevation: 431, temperature: 35, forecastDays: 6, region: 'Rajasthan' },
      { id: 'mumbai', name: 'Mumbai Station', latitude: 19.076, longitude: 72.8777, elevation: 14, temperature: 29, forecastDays: 5, region: 'Maharashtra' },
      { id: 'bengaluru', name: 'Bengaluru Station', latitude: 12.9716, longitude: 77.5946, elevation: 920, temperature: 24, forecastDays: 7, region: 'Karnataka' },
    ];
  }
}

export async function getStation(id: string) {
  try {
    const response = await apiClient.get(`/station/${id}`);
    return response.data;
  } catch {
    return {
      id,
      name: 'Weather Station',
      latitude: 28.6139,
      longitude: 77.209,
      elevation: 216,
      temperature: 31,
      forecastDays: 7,
      region: 'Delhi',
    };
  }
}

export async function getForecast(params: Record<string, unknown> = {}) {
  try {
    const response = await apiClient.get('/forecast', { params });
    return response.data;
  } catch {
    return [
      { day: 'Today', summary: 'Sunny', high: 34, low: 27 },
      { day: 'Tomorrow', summary: 'Cloudy', high: 33, low: 26 },
      { day: 'Wed', summary: 'Rain', high: 30, low: 25 },
    ];
  }
}

export async function getMetadata() {
  try {
    const response = await apiClient.get('/metadata');
    return response.data;
  } catch {
    return { source: 'IMD Dataset', coverage: 'India', lastUpdated: '2026-07-19' };
  }
}

export async function getAnalytics() {
  try {
    const response = await apiClient.get('/analytics');
    return response.data;
  } catch {
    return {
      temperatureTrend: [
        { name: 'Jan', value: 24 },
        { name: 'Feb', value: 27 },
        { name: 'Mar', value: 32 },
        { name: 'Apr', value: 36 },
        { name: 'May', value: 39 },
      ],
      humidityTrend: [
        { name: 'Jan', value: 45 },
        { name: 'Feb', value: 41 },
        { name: 'Mar', value: 38 },
        { name: 'Apr', value: 35 },
        { name: 'May', value: 33 },
      ],
      accuracy: [
        { name: 'Forecast', value: 92 },
        { name: 'Observed', value: 88 },
      ],
      bias: [
        { name: 'Day 1', value: 1.2 },
        { name: 'Day 2', value: -0.7 },
        { name: 'Day 3', value: 0.9 },
      ],
    };
  }
}
