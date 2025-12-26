# Weather App 🌤️

A modern, premium weather application built with Next.js 14, React, TypeScript, and Tailwind CSS. This production-quality app provides real-time weather forecasts with a beautiful, minimal design and smooth user experience. No API keys required - uses Open-Meteo's free weather API.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)


## 🖼️ Demo

<p align="center">
  <img src="./Screenshot%202025-12-26%20171333.png" alt="Weather App Demo Screenshot" width="900" />
</p>


## ✨ Features

### Core Functionality
- 🌍 **City Search with Autocomplete** - Debounced search (400ms) with keyboard navigation (arrow keys, Enter, Escape)
- 📍 **Automatic Location Detection** - Uses browser geolocation API with graceful fallback
- 🌡️ **Current Weather Display** - Large temperature display with weather icons, wind speed, and humidity
- 📊 **24-Hour Hourly Forecast** - Horizontally scrollable forecast with temperature charts and precipitation indicators
- 📅 **7-Day Forecast** - Extended forecast with daily high/low temperatures and precipitation
- 📆 **1-Month Forecast View** - Grid layout showing extended forecast data
- 🕐 **Dual Time Display** - Shows both user's local time and selected location's time
- 🎨 **Dark Mode by Default** - Premium dark theme with toggle switch

### User Experience
- 📱 **Fully Responsive** - Mobile-first design that works seamlessly on all devices
- 🎯 **Sidebar Navigation** - Desktop sidebar and mobile bottom navigation with scroll tracking
- ⚡ **Smooth Scrolling** - Click navigation items to smoothly scroll to sections
- 🔄 **Real-time Updates** - Live clock updates every second
- 💫 **Skeleton Loaders** - Elegant loading states during data fetching
- 🛡️ **Error Handling** - Graceful error messages for network failures and invalid locations
- 🎭 **Smooth Transitions** - Beautiful animations and transitions throughout

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **pnpm** package manager ([Installation Guide](https://pnpm.io/installation))

To install pnpm globally:
```bash
npm install -g pnpm
```

### Cloning the Repository

1. **Clone the repository** using one of the following methods:

   **Using HTTPS:**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   ```

   **Using SSH:**
   ```bash
   git clone git@github.com:yourusername/weather-app.git
   ```

   **Using GitHub CLI:**
   ```bash
   gh repo clone yourusername/weather-app
   ```

2. **Navigate to the project directory:**
   ```bash
   cd weather-app
   ```

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

   This will install all required packages including:
   - Next.js 14 with App Router
   - React 18
   - TypeScript
   - Tailwind CSS
   - Lucide React (icons)

2. **Run the development server:**
   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

1. **Create a production build:**
   ```bash
   pnpm build
   ```

2. **Start the production server:**
   ```bash
   pnpm start
   ```

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router for optimal performance
- **React 18** - Latest React features with hooks and concurrent rendering
- **TypeScript 5.3** - Full type safety for better developer experience

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework for rapid UI development
- **Custom Gradients** - Beautiful gradient backgrounds for premium feel
- **Backdrop Blur** - Modern glassmorphism effects

### APIs & Data
- **Open-Meteo Geocoding API** - Free city search and location data
- **Open-Meteo Weather API** - Free weather forecasts (no API keys required)
- **Browser Geolocation API** - Automatic location detection

### Icons & UI
- **Lucide React** - Beautiful, consistent icon library
- **Custom Weather Icons** - Mapped from Open-Meteo weather codes

## 📁 Project Structure

```
weather-app/
├── app/                      # Next.js App Router directory
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Main page component
│   └── globals.css           # Global styles and Tailwind imports
│
├── components/               # React components
│   ├── CitySearch.tsx        # Search input with autocomplete
│   ├── CurrentWeather.tsx    # Current weather card
│   ├── HourlyForecast.tsx    # 24-hour forecast component
│   ├── DailyForecast.tsx     # 7-day forecast component
│   ├── MonthlyForecast.tsx   # 1-month forecast view
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── LocalTime.tsx         # User's local time display
│   └── SkeletonLoader.tsx    # Loading state components
│
├── hooks/                    # Custom React hooks
│   ├── useDebounce.ts        # Debounce hook for search
│   └── useGeolocation.ts      # Browser geolocation hook
│
├── lib/                      # Utility functions
│   ├── api.ts                # API calls (geocoding & weather)
│   └── weather-codes.ts      # Weather code to icon/label mapping
│
├── types/                    # TypeScript type definitions
│   └── api.ts                # API response types
│
├── public/                   # Static assets (if any)
│
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── postcss.config.mjs        # PostCSS configuration
└── package.json              # Dependencies and scripts
```

## 🎯 Key Features Explained

### City Search
- **Debounced Input**: 400ms delay to reduce API calls
- **Keyboard Navigation**: Arrow keys to navigate, Enter to select, Escape to close
- **Outside Click**: Closes dropdown when clicking outside
- **Empty States**: Graceful handling of no results

### Weather Data
- **Current Weather**: Temperature, conditions, wind speed, humidity
- **Hourly Forecast**: Next 24 hours with temperature visualization
- **Daily Forecast**: 7-day forecast with high/low temps and precipitation
- **Timezone Aware**: All times displayed in the selected location's timezone

### Navigation
- **Scroll Tracking**: Sidebar highlights current section as you scroll
- **Smooth Scrolling**: Click sidebar items to jump to sections
- **Responsive**: Desktop sidebar, mobile bottom navigation

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Create optimized production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint to check code quality

### Code Style

- **TypeScript**: Strict mode enabled for type safety
- **Components**: Functional components with hooks
- **Styling**: Tailwind CSS utility classes
- **Naming**: PascalCase for components, camelCase for functions

## 🌐 API Information

This app uses [Open-Meteo](https://open-meteo.com/) APIs, which are completely free and require no API keys:

- **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search`
- **Weather API**: `https://api.open-meteo.com/v1/forecast`

Both APIs are rate-limited but generous for personal and small-scale use.

## 🎨 Design Philosophy

- **Mobile-First**: Designed for mobile, enhanced for desktop
- **Minimal & Clean**: Focus on content, not clutter
- **Premium Feel**: Smooth animations, gradients, and glassmorphism
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized with Next.js App Router and code splitting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for providing free weather APIs
- [Lucide](https://lucide.dev/) for beautiful icons
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, React, and TypeScript**
