"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function LocalTime() {
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
      }).format(now);

      const date = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(now);

      setCurrentDateTime({ time, date });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!currentDateTime.time) return null;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 md:mb-6">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 flex-shrink-0" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            {currentDateTime.time}
          </span>
          <span className="hidden sm:inline text-gray-500 dark:text-gray-400">•</span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {currentDateTime.date}
          </span>
        </div>
      </div>
    </div>
  );
}

