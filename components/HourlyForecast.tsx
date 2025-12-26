"use client";

import { useMemo } from "react";
import { getWeatherCondition, formatTemperature, formatPrecipitation } from "@/lib/weather-codes";
import type { HourlyData } from "@/types/api";
import { Droplets } from "lucide-react";

interface HourlyForecastProps {
  hourly: HourlyData;
  timezone: string;
  currentTime: string;
}

export default function HourlyForecast({
  hourly,
  timezone,
  currentTime,
}: HourlyForecastProps) {
  const next24Hours = useMemo(() => {
    const now = new Date(currentTime);
    const endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    return hourly.time
      .map((time, index) => {
        const date = new Date(time);
        const hour = date.getHours();
        // Simple day/night detection: 6 AM to 8 PM is day
        const isDay = hour >= 6 && hour < 20;
        
        return {
          time: date,
          temperature: hourly.temperature_2m[index],
          precipitation: hourly.precipitation[index],
          weathercode: hourly.weathercode[index],
          isDay,
        };
      })
      .filter((item) => item.time >= now && item.time <= endTime)
      .slice(0, 24);
  }, [hourly, currentTime]);

  const maxTemp = Math.max(...next24Hours.map((h) => h.temperature));
  const minTemp = Math.min(...next24Hours.map((h) => h.temperature));
  const tempRange = maxTemp - minTemp || 1;

  const maxPrecip = Math.max(...next24Hours.map((h) => h.precipitation));

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone,
    }).format(date);
  };

  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
        24-Hour Forecast
      </h3>
      <div className="overflow-x-auto pb-2 sm:pb-4 -mx-2 sm:-mx-2 px-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        <div className="flex gap-3 sm:gap-4 min-w-max">
          {next24Hours.map((hour, index) => {
            const condition = getWeatherCondition(hour.weathercode, hour.isDay);
            const Icon = condition.icon;
            const tempHeight = ((hour.temperature - minTemp) / tempRange) * 100;
            const precipHeight = maxPrecip > 0 ? (hour.precipitation / maxPrecip) * 60 : 0;

            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 sm:gap-3 min-w-[70px] sm:min-w-[80px]"
              >
                <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                  {formatTime(hour.time)}
                </div>
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 dark:text-gray-200" />
                <div className="relative w-full flex flex-col items-center gap-1.5 sm:gap-2">
                  <div className="relative w-10 sm:w-12 h-24 sm:h-32 flex items-end justify-center">
                    <div className="absolute inset-0 flex items-end justify-center">
                      <div
                        className="w-1 sm:w-1.5 bg-gradient-to-t from-blue-400 via-blue-500 to-blue-600 rounded-t transition-all duration-300 shadow-sm"
                        style={{ height: `${Math.max(tempHeight, 5)}%` }}
                      />
                    </div>
                    {hour.precipitation > 0 && (
                      <div
                        className="absolute bottom-0 w-6 sm:w-8 flex items-end justify-center"
                        style={{ height: `${precipHeight}px` }}
                      >
                        <div className="w-5 sm:w-6 bg-blue-500/70 dark:bg-blue-400/60 rounded-t flex items-center justify-center shadow-sm">
                          <Droplets className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-700 dark:text-blue-200" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {formatTemperature(hour.temperature)}
                  </div>
                  {hour.precipitation > 0 && (
                    <div className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {formatPrecipitation(hour.precipitation)}mm
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

