"use client";

import { useState, useEffect, useRef } from "react";
import { Moon, Sun, AlertCircle } from "lucide-react";
import CitySearch from "@/components/CitySearch";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";
import MonthlyForecast from "@/components/MonthlyForecast";
import Sidebar from "@/components/Sidebar";
import LocalTime from "@/components/LocalTime";
import {
  CurrentWeatherSkeleton,
  ForecastSkeleton,
  HourlyForecastSkeleton,
} from "@/components/SkeletonLoader";
import { fetchWeather } from "@/lib/api";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { GeocodingResult, WeatherResponse } from "@/types/api";

export default function Home() {
  const [selectedLocation, setSelectedLocation] =
    useState<GeocodingResult | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("today");
  
  const todayRef = useRef<HTMLDivElement>(null);
  const hourlyRef = useRef<HTMLDivElement>(null);
  const weeklyRef = useRef<HTMLDivElement>(null);
  const monthlyRef = useRef<HTMLDivElement>(null);

  const geolocation = useGeolocation();

  // Set dark mode as default on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  }, []);

  // Auto-detect location on first load
  useEffect(() => {
    if (
      geolocation.latitude &&
      geolocation.longitude &&
      !selectedLocation &&
      !loading &&
      !geolocation.loading
    ) {
      const autoLocation: GeocodingResult = {
        id: 0,
        name: "Current Location",
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
        elevation: 0,
        feature_code: "PPL",
        country_code: "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        country: "",
        country_id: 0,
      };
      handleLocationSelect(autoLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocation.latitude, geolocation.longitude, geolocation.loading]);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Scroll tracking to update active section
  useEffect(() => {
    if (!weather) return;

    const sections = [
      { id: "today", ref: todayRef },
      { id: "hourly", ref: hourlyRef },
      { id: "weekly", ref: weeklyRef },
      { id: "monthly", ref: monthlyRef },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const offsetTop = section.ref.current.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [weather]);

  // Handle sidebar navigation clicks
  const handleSectionClick = (sectionId: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      today: todayRef,
      hourly: hourlyRef,
      weekly: weeklyRef,
      monthly: monthlyRef,
    };

    const targetRef = refs[sectionId];
    if (targetRef?.current) {
      const offsetTop = targetRef.current.offsetTop - 20; // Small offset from top
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  const handleLocationSelect = async (location: GeocodingResult) => {
    setSelectedLocation(location);
    setLoading(true);
    setError(null);

    try {
      const weatherData = await fetchWeather(
        location.latitude,
        location.longitude
      );
      setWeather(weatherData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch weather data. Please try again."
      );
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const currentHumidity =
    weather?.hourly.relative_humidity_2m[0] ?? undefined;

  return (
    <main className="min-h-screen p-4 md:p-8 pb-20 lg:pb-12 lg:pl-24">
      <Sidebar activeSection={activeSection} onSectionClick={handleSectionClick} />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Weather
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 sm:p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200 touch-manipulation"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-200" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>

        {/* Local Time */}
        <LocalTime />

        {/* Search */}
        <div className="mb-6 md:mb-8">
          <CitySearch onSelect={handleLocationSelect} isLoading={loading} />
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <p className="text-sm sm:text-base text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Weather Content */}
        {loading && !weather ? (
          <div className="space-y-4 md:space-y-6">
            <div ref={todayRef}>
              <CurrentWeatherSkeleton />
            </div>
            <div ref={hourlyRef}>
              <HourlyForecastSkeleton />
            </div>
            <div ref={weeklyRef}>
              <ForecastSkeleton />
            </div>
          </div>
        ) : weather && selectedLocation ? (
          <div className="space-y-4 md:space-y-6">
            <div id="today" ref={todayRef} className="scroll-mt-4">
              <CurrentWeather
                weather={weather.current_weather}
                location={selectedLocation}
                humidity={currentHumidity}
                timezone={weather.timezone}
              />
            </div>
            <div id="hourly" ref={hourlyRef} className="scroll-mt-4">
              <HourlyForecast
                hourly={weather.hourly}
                timezone={weather.timezone}
                currentTime={weather.current_weather.time}
              />
            </div>
            <div id="weekly" ref={weeklyRef} className="scroll-mt-4">
              <DailyForecast daily={weather.daily} timezone={weather.timezone} />
            </div>
            <div id="monthly" ref={monthlyRef} className="scroll-mt-4">
              <MonthlyForecast daily={weather.daily} timezone={weather.timezone} />
            </div>
          </div>
        ) : (
          !loading && (
            <div className="text-center py-12 md:py-16 px-4">
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                {geolocation.loading
                  ? "Detecting your location..."
                  : geolocation.error
                  ? "Search for a city to get started"
                  : "Search for a city or allow location access to get started"}
              </p>
            </div>
          )
        )}
      </div>
    </main>
  );
}

