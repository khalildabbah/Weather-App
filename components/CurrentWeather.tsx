"use client";

import { useState, useEffect } from "react";
import { getWeatherCondition, formatTemperature, formatWindSpeed } from "@/lib/weather-codes";
import type { CurrentWeather, GeocodingResult } from "@/types/api";
import { Droplets, Wind, Clock } from "lucide-react";

interface CurrentWeatherProps {
  weather: CurrentWeather;
  location: GeocodingResult;
  humidity?: number;
  timezone: string;
}

export default function CurrentWeather({
  weather,
  location,
  humidity,
  timezone,
}: CurrentWeatherProps) {
  const condition = getWeatherCondition(weather.weathercode, weather.is_day === 1);
  const Icon = condition.icon;
  const isDay = weather.is_day === 1;
  const [currentDateTime, setCurrentDateTime] = useState<{ time: string; date: string }>({
    time: "",
    date: "",
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const time = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: timezone,
      }).format(now);

      const date = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: timezone,
      }).format(now);

      setCurrentDateTime({ time, date });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="flex-1 min-w-0 pr-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 truncate">
            {location.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base truncate mb-2">
            {location.admin1 && `${location.admin1}, `}
            {location.country}
          </p>
          {currentDateTime.time && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-xs sm:text-sm font-medium">{currentDateTime.time}</span>
                <span className="text-xs sm:text-sm hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm">{currentDateTime.date}</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm flex-shrink-0">
          {isDay ? (
            <span className="text-amber-500 text-xs sm:text-sm font-medium">Day</span>
          ) : (
            <span className="text-indigo-400 text-xs sm:text-sm font-medium">Night</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex-1 min-w-0">
          <div className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-900 dark:text-white mb-1 sm:mb-2">
            {formatTemperature(weather.temperature)}
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl truncate">
            {condition.label}
          </p>
        </div>
        <div className="flex-shrink-0 ml-2">
          <Icon className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-gray-700 dark:text-gray-200" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm flex-shrink-0">
            <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Wind
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
              {formatWindSpeed(weather.windspeed)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm flex-shrink-0">
            <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Humidity
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
              {humidity !== undefined ? `${Math.round(humidity)}%` : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

