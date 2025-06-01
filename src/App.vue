<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-all duration-300">
    <!-- ローディング -->
    <LoadingOverlay v-if="state.loading" />

    <!-- エラー -->
    <ErrorOverlay v-if="state.error" :error="state.error" @clear="clearError" />

    <!-- ヘッダー -->
    <AppHeader 
      :current-location="state.currentLocation"
      :is-dark-mode="state.isDarkMode"
      @scroll-to-top="scrollToTop"
      @add-favorite="addCurrentLocationToFavorites"
      @load-current-location="loadCurrentLocationWeather"
      @refresh="refreshWeather"
      @toggle-dark-mode="toggleDarkMode"
    />

    <!-- 検索バー -->
    <SearchBar v-model:search-query="searchQuery" @search="searchCity" />

    <!-- メインコンテンツ -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- お気に入り地点 -->
      <FavoriteLocations 
        :favorite-locations="state.favoriteLocations"
        :get-time-string="getTimeString"
        :get-weather-icon="getWeatherIcon"
        :get-weather-description="getWeatherDescription"
        @load-favorite="(favorite) => weatherService.loadFavoriteLocationWeather(favorite.latitude, favorite.longitude, favorite.name)"
        @remove-favorite="(id) => weatherService.removeFromFavorites(id)"
      />

      <!-- 現在の天気 -->
      <div v-if="!state.loading && !state.error && state.currentWeather">
        <!-- 現在の天気カード -->
        <CurrentWeatherCard 
          :current-weather="state.currentWeather"
          :current-location-name="currentLocationName"
          :last-updated="lastUpdated"
          :weather-recommendations="weatherRecommendations"
          :get-weather-info="getWeatherInfo"
          :safe-round="safeRound"
          :get-wind-direction="getWindDirection"
        />

        <!-- カードグリッド -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- 時間別予報 -->
          <HourlyForecastCard :hourly-forecast="state.hourlyForecast" />

          <!-- 気象警報 -->
          <WeatherAlertsCard :alerts="state.alerts" />

          <!-- 気圧予報 -->
          <PressureChart />

          <!-- 降水量予報 -->
          <PrecipitationChart />
        </div>

        <!-- 週間予報 -->
        <WeeklyForecast :weekly-forecast="state.weeklyForecast" />
      </div>
    </main>
  </div>
</template>

<script>
import LoadingOverlay from './components/LoadingOverlay.vue'
import ErrorOverlay from './components/ErrorOverlay.vue'
import AppHeader from './components/AppHeader.vue'
import SearchBar from './components/SearchBar.vue'
import FavoriteLocations from './components/FavoriteLocations.vue'
import CurrentWeatherCard from './components/CurrentWeatherCard.vue'
import HourlyForecastCard from './components/HourlyForecastCard.vue'
import WeatherAlertsCard from './components/WeatherAlertsCard.vue'
import PressureChart from './components/PressureChart.vue'
import PrecipitationChart from './components/PrecipitationChart.vue'
import WeeklyForecast from './components/WeeklyForecast.vue'

export default {
  name: 'App',
  components: {
    LoadingOverlay,
    ErrorOverlay,
    AppHeader,
    SearchBar,
    FavoriteLocations,
    CurrentWeatherCard,
    HourlyForecastCard,
    WeatherAlertsCard,
    PressureChart,
    PrecipitationChart,
    WeeklyForecast
  },
  setup() {
    const weatherApp = useWeatherApp();
    
    // トップにスクロールする関数
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    
    return {
      ...weatherApp,
      scrollToTop
    };
  }
}
</script>