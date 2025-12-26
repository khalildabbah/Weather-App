// Geocoding API types
export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
  timezone: string;
  population?: number;
  country_id?: number;
  country: string;
  postcodes?: string[];
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms: number;
}

// Weather API types
export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  precipitation: string;
  relative_humidity_2m: string;
  windspeed_10m: string;
  weathercode: string;
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  precipitation: number[];
  relative_humidity_2m: number[];
  windspeed_10m: number[];
  weathercode: number[];
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_sum: string;
  weathercode: string;
  sunrise: string;
  sunset: string;
}

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  weathercode: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  hourly_units: HourlyUnits;
  hourly: HourlyData;
  daily_units: DailyUnits;
  daily: DailyData;
}

