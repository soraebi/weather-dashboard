# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- **Development**: `npm run dev` - Start development server with Vite
- **Build**: `npm run build` - Build for production
- **Preview**: `npm run preview` - Preview production build locally

## Architecture Overview

This is a Vue 3 weather dashboard application using Vite as the build system. The architecture follows a composable-based pattern with Single File Components:

### Core Structure
- **Entry Point**: `index.html` loads Vite dev server, Vue app mounts to `#app`
- **App Initialization**: `src/main.js` → `App.vue` → `useWeatherApp()` composable
- **State Management**: Reactive state managed through Vue composables, no external store
- **API Integration**: Open-Meteo weather API with custom caching layer

### Key Composables (in dependency order)
1. `useWeatherState()` - Central reactive state management
2. `useWeatherUtils()` - Weather data formatting and utility functions  
3. `useCharts()` - Chart.js integration for pressure/precipitation charts
4. `useWeatherData()` - Weather data processing and statistics
5. `useWeatherService()` - API calls, geolocation, search functionality
6. `useWeatherApp()` - Main integration composable that orchestrates all others

### Template System
The main UI is defined in `App.vue` as a Vue Single File Component. All templates use Vue's template syntax and reference composable state/methods.

### API Layer
- `WeatherAPIConfig` class defines all API endpoints and parameters
- Custom cache manager with 30-minute TTL
- Geocoding for city search with Japanese cities support
- Geolocation API integration for current location weather

### Script Loading Order
Scripts are loaded via ES modules through Vite. Utils → API → Composables → App initialization.