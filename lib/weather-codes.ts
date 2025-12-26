import {
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sun,
  Moon,
  CloudDrizzle,
  Wind,
  Eye,
  EyeOff,
} from "lucide-react";

export interface WeatherCondition {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  dayIcon?: React.ComponentType<{ className?: string }>;
  nightIcon?: React.ComponentType<{ className?: string }>;
}

// Open-Meteo Weather Code mapping
// https://open-meteo.com/en/docs
export const weatherCodeMap: Record<number, WeatherCondition> = {
  0: {
    label: "Clear sky",
    icon: Sun,
    dayIcon: Sun,
    nightIcon: Moon,
  },
  1: {
    label: "Mainly clear",
    icon: Sun,
    dayIcon: Sun,
    nightIcon: Moon,
  },
  2: {
    label: "Partly cloudy",
    icon: Cloud,
    dayIcon: Cloud,
    nightIcon: Cloud,
  },
  3: {
    label: "Overcast",
    icon: Cloud,
    dayIcon: Cloud,
    nightIcon: Cloud,
  },
  45: {
    label: "Foggy",
    icon: EyeOff,
    dayIcon: EyeOff,
    nightIcon: EyeOff,
  },
  48: {
    label: "Depositing rime fog",
    icon: EyeOff,
    dayIcon: EyeOff,
    nightIcon: EyeOff,
  },
  51: {
    label: "Light drizzle",
    icon: CloudDrizzle,
    dayIcon: CloudDrizzle,
    nightIcon: CloudDrizzle,
  },
  53: {
    label: "Moderate drizzle",
    icon: CloudDrizzle,
    dayIcon: CloudDrizzle,
    nightIcon: CloudDrizzle,
  },
  55: {
    label: "Dense drizzle",
    icon: CloudDrizzle,
    dayIcon: CloudDrizzle,
    nightIcon: CloudDrizzle,
  },
  56: {
    label: "Light freezing drizzle",
    icon: CloudDrizzle,
    dayIcon: CloudDrizzle,
    nightIcon: CloudDrizzle,
  },
  57: {
    label: "Dense freezing drizzle",
    icon: CloudDrizzle,
    dayIcon: CloudDrizzle,
    nightIcon: CloudDrizzle,
  },
  61: {
    label: "Slight rain",
    icon: CloudRain,
    dayIcon: CloudRain,
    nightIcon: CloudRain,
  },
  63: {
    label: "Moderate rain",
    icon: CloudRain,
    dayIcon: CloudRain,
    nightIcon: CloudRain,
  },
  65: {
    label: "Heavy rain",
    icon: CloudRain,
    dayIcon: CloudRain,
    nightIcon: CloudRain,
  },
  66: {
    label: "Light freezing rain",
    icon: CloudRain,
    dayIcon: CloudRain,
    nightIcon: CloudRain,
  },
  67: {
    label: "Heavy freezing rain",
    icon: CloudRain,
    dayIcon: CloudRain,
    nightIcon: CloudRain,
  },
  71: {
    label: "Slight snow fall",
    icon: CloudSnow,
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
  },
  73: {
    label: "Moderate snow fall",
    icon: CloudSnow,
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
  },
  75: {
    label: "Heavy snow fall",
    icon: CloudSnow,
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
  },
  77: {
    label: "Snow grains",
    icon: CloudSnow,
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
  },
  80: {
    label: "Slight rain showers",
    icon: CloudRain,
    dayIcon: CloudRain,
    nightIcon: CloudRain,
  },
  81: {
    label: "Moderate rain showers",
    icon: CloudRain,
    dayIcon: CloudRain,
    nightIcon: CloudRain,
  },
  82: {
    label: "Violent rain showers",
    icon: CloudRain,
    dayIcon: CloudRain,
    nightIcon: CloudRain,
  },
  85: {
    label: "Slight snow showers",
    icon: CloudSnow,
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
  },
  86: {
    label: "Heavy snow showers",
    icon: CloudSnow,
    dayIcon: CloudSnow,
    nightIcon: CloudSnow,
  },
  95: {
    label: "Thunderstorm",
    icon: CloudLightning,
    dayIcon: CloudLightning,
    nightIcon: CloudLightning,
  },
  96: {
    label: "Thunderstorm with slight hail",
    icon: CloudLightning,
    dayIcon: CloudLightning,
    nightIcon: CloudLightning,
  },
  99: {
    label: "Thunderstorm with heavy hail",
    icon: CloudLightning,
    dayIcon: CloudLightning,
    nightIcon: CloudLightning,
  },
};

export function getWeatherCondition(
  code: number,
  isDay: boolean = true
): WeatherCondition {
  const condition = weatherCodeMap[code] || weatherCodeMap[0];
  return {
    ...condition,
    icon: isDay
      ? condition.dayIcon || condition.icon
      : condition.nightIcon || condition.icon,
  };
}

export function formatTemperature(temp: number, unit: string = "°C"): string {
  return `${Math.round(temp)}${unit}`;
}

export function formatWindSpeed(speed: number, unit: string = " km/h"): string {
  return `${Math.round(speed)}${unit}`;
}

export function formatPrecipitation(precip: number): string {
  if (precip === 0) return "0";
  return precip < 1 ? precip.toFixed(1) : Math.round(precip).toString();
}

