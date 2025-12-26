"use client";

import { getWeatherCondition, formatTemperature, formatPrecipitation } from "@/lib/weather-codes";
import type { DailyData } from "@/types/api";
import { Droplets } from "lucide-react";

interface MonthlyForecastProps {
  daily: DailyData;
  timezone: string;
}

export default function MonthlyForecast({ daily, timezone }: MonthlyForecastProps) {
  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayDate = new Date(date);
    dayDate.setHours(0, 0, 0, 0);

    if (dayDate.getTime() === today.getTime()) {
      return "Today";
    }

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: timezone,
    }).format(date);
  };

  // For monthly view, we'll show the available 7 days in a more compact grid
  // In a real app, you'd fetch extended forecast data
  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
        1-Month Forecast
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {daily.time.map((dateString, index) => {
          const condition = getWeatherCondition(daily.weathercode[index], true);
          const Icon = condition.icon;

          return (
            <div
              key={index}
              className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-gray-700/60 transition-colors duration-200"
            >
              <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formatDay(dateString)}
              </div>
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 dark:text-gray-200" />
                <div className="text-right">
                  <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {formatTemperature(daily.temperature_2m_max[index])}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {formatTemperature(daily.temperature_2m_min[index])}
                  </div>
                </div>
              </div>
              {daily.precipitation_sum[index] > 0 && (
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs sm:text-sm">
                  <Droplets className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{formatPrecipitation(daily.precipitation_sum[index])}mm</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
        Note: Extended monthly forecasts are limited. Showing available forecast data.
      </p>
    </div>
  );
}

