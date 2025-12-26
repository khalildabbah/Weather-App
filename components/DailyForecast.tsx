"use client";

import { getWeatherCondition, formatTemperature, formatPrecipitation } from "@/lib/weather-codes";
import type { DailyData } from "@/types/api";
import { Droplets } from "lucide-react";

interface DailyForecastProps {
  daily: DailyData;
  timezone: string;
}

export default function DailyForecast({ daily, timezone }: DailyForecastProps) {
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
      timeZone: timezone,
    }).format(date);
  };

  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
        7-Day Forecast
      </h3>
      <div className="space-y-2 sm:space-y-3">
        {daily.time.map((dateString, index) => {
          const condition = getWeatherCondition(daily.weathercode[index], true);
          const Icon = condition.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm active:bg-white/60 dark:active:bg-gray-700/60 transition-colors duration-200 touch-manipulation"
            >
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <div className="w-16 sm:w-20 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">
                  {formatDay(dateString)}
                </div>
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 dark:text-gray-200 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  {daily.precipitation_sum[index] > 0 && (
                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs sm:text-sm">
                      <Droplets className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{formatPrecipitation(daily.precipitation_sum[index])}mm</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-sm sm:text-base text-gray-900 dark:text-white font-semibold">
                    {formatTemperature(daily.temperature_2m_max[index])}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {formatTemperature(daily.temperature_2m_min[index])}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

