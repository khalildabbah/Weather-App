"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { searchCities, formatLocationName } from "@/lib/api";
import type { GeocodingResult } from "@/types/api";

interface CitySearchProps {
  onSelect: (result: GeocodingResult) => void;
  isLoading?: boolean;
}

export default function CitySearch({ onSelect, isLoading }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 400);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      setIsOpen(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    searchCities(debouncedQuery)
      .then((data) => {
        setResults(data);
        setIsOpen(data.length > 0);
        setSelectedIndex(-1);
      })
      .catch((err) => {
        setError("Failed to search cities. Please try again.");
        setResults([]);
        setIsOpen(false);
        console.error(err);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (result: GeocodingResult) => {
    onSelect(result);
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Search for a city..."
          disabled={isLoading}
          className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 text-sm sm:text-base bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
        />
        {(isSearching || isLoading) && (
          <Loader2 className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500 animate-spin" />
        )}
      </div>

      {isOpen && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden"
        >
          {error ? (
            <div className="p-3 sm:p-4 text-xs sm:text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : results.length === 0 ? (
            <div className="p-3 sm:p-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
              No cities found
            </div>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {results.map((result, index) => (
                <li
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className={`px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer transition-colors duration-150 touch-manipulation ${
                    index === selectedIndex
                      ? "bg-blue-50 dark:bg-blue-900/30"
                      : "active:bg-gray-50 dark:active:bg-gray-700/50"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">
                        {result.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {formatLocationName(result)}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

