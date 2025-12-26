"use client";

import { Calendar, Clock, CalendarDays, CalendarRange } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionClick }: SidebarProps) {
  const sections = [
    { id: "today", label: "Today", icon: Calendar },
    { id: "hourly", label: "Hourly", icon: Clock },
    { id: "weekly", label: "7-Day", icon: CalendarDays },
    { id: "monthly", label: "1-Month", icon: CalendarRange },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-2 shadow-lg">
          <ul className="flex flex-col gap-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <li key={section.id}>
                  <button
                    onClick={() => onSectionClick(section.id)}
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
                      isActive
                        ? "bg-blue-500 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    aria-label={section.label}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                        isActive ? "scale-110" : "group-hover:scale-105"
                      }`}
                    />
                    <span className="font-medium text-sm whitespace-nowrap">
                      {section.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <ul className="flex items-center justify-around px-2 py-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <li key={section.id} className="flex-1">
                <button
                  onClick={() => onSectionClick(section.id)}
                  className={`w-full px-2 py-2 rounded-lg transition-all duration-200 flex flex-col items-center gap-1 group touch-manipulation ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  aria-label={section.label}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? "scale-110" : "group-active:scale-105"
                    }`}
                  />
                  <span className={`text-xs font-medium ${
                    isActive ? "text-white" : "text-gray-600 dark:text-gray-400"
                  }`}>
                    {section.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

