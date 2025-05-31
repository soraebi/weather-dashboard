# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- **Development**: `npm run dev` - Start development server with Vite
- **Build**: `npm run build` - Build for production
- **Preview**: `npm run preview` - Preview production build locally

## Architecture Overview

This is a Vue 3 weather dashboard application built without a build system - it uses vanilla JavaScript with Vue loaded via CDN. The architecture follows a composable-based pattern:

### Core Structure
- **Entry Point**: `index.html` loads all scripts in dependency order, Vue app mounts to `#app`
- **App Initialization**: `src/app.js` → `src/main.js` → `useWeatherApp()` composable
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
Templates are defined as template literal strings in separate files under `src/templates/`. The main layout (`main-layout.js`) composes all other templates. Templates use Vue's template syntax and reference composable state/methods.

### API Layer
- `WeatherAPIConfig` class defines all API endpoints and parameters
- Custom cache manager with 30-minute TTL
- Geocoding for city search with Japanese cities support
- Geolocation API integration for current location weather

### Script Loading Order
Critical: Scripts must load in dependency order as defined in `index.html`. Utils → API → Composables → Templates → App initialization.