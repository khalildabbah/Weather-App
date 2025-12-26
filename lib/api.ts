import type {
  GeocodingResponse,
  GeocodingResult,
  WeatherResponse,
} from "@/types/api";

const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

export async function searchCities(
  query: string
): Promise<GeocodingResult[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      name: query.trim(),
      count: "10",
      language: "en",
      format: "json",
    });

    const response = await fetch(`${GEOCODING_API}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }

    const data: GeocodingResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching cities:", error);
    throw error;
  }
}

export async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<WeatherResponse> {
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      timezone: "auto",
      current_weather: "true",
      hourly: [
        "temperature_2m",
        "precipitation",
        "relative_humidity_2m",
        "windspeed_10m",
        "weathercode",
      ].join(","),
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "weathercode",
        "sunrise",
        "sunset",
      ].join(","),
    });

    const response = await fetch(`${WEATHER_API}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data: WeatherResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
}

export function formatLocationName(result: GeocodingResult): string {
  const parts = [result.name];
  if (result.admin1) parts.push(result.admin1);
  if (result.country) parts.push(result.country);
  return parts.join(", ");
}

