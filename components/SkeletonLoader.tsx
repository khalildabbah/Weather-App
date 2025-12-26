"use client";

export function CurrentWeatherSkeleton() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 md:p-8 shadow-lg animate-pulse">
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-20 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
        <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl" />
            <div className="space-y-2">
              <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ForecastSkeleton() {
  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg animate-pulse">
      <div className="h-7 w-40 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-gray-700/40"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>
            <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HourlyForecastSkeleton() {
  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg animate-pulse">
      <div className="h-7 w-40 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6" />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex flex-col items-center gap-3 min-w-[80px]">
            <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="w-12 h-32 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

