// ===========================================
// Weather Dashboard - Main Entry Point
// ===========================================

import { createApp } from 'vue'
import Chart from 'chart.js/auto'
import './style.css'

// Make Chart.js globally available
window.Chart = Chart

// Utils (依存関係順に読み込み)
import './utils/weather-codes.js'
import './utils/formatting-utils.js'
import './utils/time-utils.js'
import './utils/weather-alerts.js'
import './utils/weather-recommendations.js'
import './utils/index.js'

// API
import './api/config.js'
import './api/cache-manager.js'
import './api/japanese-cities.js'
import './api/geocoding-api.js'
import './api/weather-data-api.js'
import './api/geolocation-api.js'
import './api/weather-api.js'

// Composables
import './composables/useWeatherState.js'
import './composables/useWeatherUtils.js'
import './composables/useCharts.js'
import './composables/useWeatherData.js'
import './composables/useWeatherService.js'
import './composables/useWeatherApp.js'

// Templates
import './templates/loading.js'
import './templates/error.js'
import './templates/header.js'
import './templates/current-weather.js'
import './templates/hourly-forecast.js'
import './templates/weather-alerts.js'
import './templates/pressure-chart.js'
import './templates/precipitation-chart.js'
import './templates/weekly-forecast.js'
import './templates/favorite-locations.js'
import './templates/card-grid.js'
import './templates/main-content.js'
import './templates/main-layout.js'

// App initialization is handled in this file

// メインアプリケーションロジック
const createWeatherApp = () => {
    return useWeatherApp();
};

// Vue アプリケーションの作成とマウント
import App from './App.vue'

createApp(App).mount('#app')
