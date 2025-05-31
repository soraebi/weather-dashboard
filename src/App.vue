<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-all duration-300">
    <!-- ローディング -->
    <div v-if="state.loading" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-2xl">
        <div class="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-600 dark:text-gray-300 font-medium">天気データを読み込み中...</p>
      </div>
    </div>

    <!-- エラー -->
    <div v-if="state.error" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-2xl max-w-md mx-4">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">エラーが発生しました</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">{{ state.error }}</p>
        <button @click="clearError" class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
          再試行
        </button>
      </div>
    </div>

    <!-- ヘッダー -->
    <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
          <!-- ロゴ -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
              🌤️
            </div>
            <h1 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              お天気ダッシュボード
            </h1>
          </div>

          <!-- 検索とコントロール -->
          <div class="flex items-center space-x-2 lg:space-x-4">
            <!-- 検索バー -->
            <div class="relative hidden sm:block">
              <input
                v-model="searchQuery"
                @keypress.enter="searchCity"
                type="text"
                placeholder="都市名を検索..."
                class="w-64 px-4 py-2 pl-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
              />
              <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="text-gray-400">🔍</span>
              </div>
            </div>

            <!-- ボタングループ -->
            <div class="flex items-center space-x-2">
              <button
                @click="addCurrentLocationToFavorites"
                v-if="state.currentLocation"
                class="p-2 lg:p-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                title="お気に入りに追加"
              >
                ⭐
              </button>
              <button
                @click="loadCurrentLocationWeather"
                class="p-2 lg:p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                title="現在地"
              >
                📍
              </button>
              <button
                @click="refreshWeather"
                class="p-2 lg:p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                title="更新"
              >
                🔄
              </button>
              <button
                @click="() => toggleDarkMode()"
                class="p-2 lg:p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                title="ダークモード切替"
              >
                {{ state.isDarkMode ? '☀️' : '🌙' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- メインコンテンツ -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- お気に入り地点 -->
      <div v-if="state.favoriteLocations.length > 0" class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <svg class="w-6 h-6 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          お気に入り地点
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div 
            v-for="favorite in state.favoriteLocations" 
            :key="favorite.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700"
          >
            <!-- ヘッダー部分 -->
            <div class="flex justify-between items-start mb-4">
              <div 
                @click="weatherService.loadFavoriteLocationWeather(favorite.latitude, favorite.longitude, favorite.name)"
                class="cursor-pointer flex-1"
                title="この地点の天気をメインに表示"
              >
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {{ favorite.name }}
                </h3>
                <p v-if="favorite.lastUpdated" class="text-sm text-gray-500 dark:text-gray-400">
                  {{ getTimeString(favorite.lastUpdated) }}更新
                </p>
              </div>
              <button 
                @click="weatherService.removeFromFavorites(favorite.id)"
                class="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                title="お気に入りから削除"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>

            <!-- 天気情報 -->
            <div v-if="favorite.weatherData && favorite.weatherData.current">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <span class="text-2xl mr-2">
                    {{ getWeatherIcon(favorite.weatherData.current.weather_code || 0) }}
                  </span>
                  <div>
                    <span class="text-2xl font-bold text-gray-800 dark:text-white">
                      {{ Math.round(favorite.weatherData.current.temperature_2m || 0) }}°C
                    </span>
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                      {{ getWeatherDescription(favorite.weatherData.current.weather_code || 0) }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- 詳細情報 -->
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="flex items-center text-gray-600 dark:text-gray-300">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                  湿度 {{ Math.round(favorite.weatherData.current.relative_humidity_2m || 0) }}%
                </div>
                <div class="flex items-center text-gray-600 dark:text-gray-300">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                  </svg>
                  風速 {{ Math.round((favorite.weatherData.current.wind_speed_10m || 0) / 3.6 * 10) / 10 }}m/s
                </div>
              </div>
            </div>

            <!-- データ未取得の場合 -->
            <div v-else class="text-center py-4">
              <div class="text-gray-500 dark:text-gray-400">
                <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                天気データを読み込み中...
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 現在の天気 -->
      <div v-if="!state.loading && !state.error && state.currentWeather">
        <!-- 現在の天気カード -->
        <div class="mb-8">
          <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 lg:p-8 text-white shadow-2xl animate-fade-in">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <!-- 位置情報と更新時刻 -->
              <div class="flex items-center justify-between mb-4 lg:mb-0">
                <div class="flex items-center space-x-2">
                  <span>📍</span>
                  <span class="text-lg font-medium">{{ currentLocationName }}</span>
                </div>
                <span class="text-sm opacity-70">最終更新: {{ lastUpdated }}</span>
              </div>
            </div>

            <!-- 現在の気温と天気 -->
            <div class="flex items-center justify-center space-x-8 my-8">
              <div class="text-center">
                <div class="text-6xl lg:text-7xl font-bold mb-2">
                  {{ safeRound(state.currentWeather.temperature_2m || 0) }}°
                </div>
                <div class="text-xl lg:text-2xl opacity-90">
                  {{ getWeatherInfo(state.currentWeather.weather_code || 0).description }}
                </div>
              </div>
              <div class="text-5xl lg:text-6xl">
                {{ getWeatherInfo(state.currentWeather.weather_code || 0).icon }}
              </div>
            </div>

            <!-- 詳細情報 -->
            <div class="grid grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
              <div class="text-center">
                <div class="text-lg lg:text-xl font-semibold">
                  {{ safeRound(state.currentWeather.relative_humidity_2m || 0) }}%
                </div>
                <div class="text-sm opacity-70">湿度</div>
              </div>
              <div class="text-center">
                <div class="text-lg lg:text-xl font-semibold">
                  {{ safeRound(state.currentWeather.pressure_msl || 0) }} hPa
                </div>
                <div class="text-sm opacity-70">気圧</div>
              </div>
              <div class="text-center">
                <div class="text-lg lg:text-xl font-semibold">
                  {{ safeRound((state.currentWeather.wind_speed_10m || 0) / 3.6, 1) }} m/s
                </div>
                <div class="text-sm opacity-70">風速</div>
              </div>
              <div class="text-center">
                <div class="text-lg lg:text-xl font-semibold">
                  {{ getWindDirection(state.currentWeather.wind_direction_10m || 0) }}
                </div>
                <div class="text-sm opacity-70">風向</div>
              </div>
              <div class="text-center">
                <div class="text-lg lg:text-xl font-semibold">
                  {{ safeRound(state.currentWeather.precipitation || 0, 1) }} mm
                </div>
                <div class="text-sm opacity-70">降水量</div>
              </div>
              <div class="text-center">
                <div class="text-lg lg:text-xl font-semibold">6/10</div>
                <div class="text-sm opacity-70">UV指数</div>
              </div>
            </div>

            <!-- 天気推奨事項 -->
            <div v-if="weatherRecommendations.length > 0" class="mt-6 pt-6 border-t border-white/20">
              <div v-for="recommendation in weatherRecommendations" :key="recommendation" 
                   class="text-lg font-semibold mb-3 opacity-90">
                {{ recommendation }}
              </div>
            </div>
          </div>
        </div>

        <!-- カードグリッド -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- 時間別予報 -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-xl">🕐</span>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">時間別予報</h3>
            </div>
            <div class="space-y-3 max-h-80 overflow-y-auto px-2">
              <div v-for="hour in state.hourlyForecast" :key="hour.time" 
                   class="flex items-center justify-between py-2 px-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <span class="text-sm text-gray-600 dark:text-gray-400 w-12">{{ hour.time }}</span>
                <span class="text-lg">{{ hour.weatherInfo.icon }}</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ hour.temp }}°</span>
                <span class="text-xs text-blue-500">{{ hour.precipitation }}mm</span>
              </div>
            </div>
          </div>

          <!-- 気象警報 -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-xl">⚠️</span>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">気象警報</h3>
            </div>
            <div v-if="state.alerts.length > 0" class="space-y-3">
              <div v-for="alert in state.alerts" :key="alert.type" 
                   class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <div class="flex items-center space-x-2">
                  <span class="text-lg">{{ alert.icon }}</span>
                  <span class="font-semibold text-red-800 dark:text-red-200">{{ alert.title }}</span>
                </div>
                <p class="text-sm text-red-600 dark:text-red-300 mt-1">{{ alert.message }}</p>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <div class="text-4xl mb-2">✅</div>
              <p class="text-gray-500 dark:text-gray-400">現在、警報はありません</p>
            </div>
          </div>

          <!-- 気圧予報 -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-xl">📊</span>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">気圧予報</h3>
            </div>
            <div class="relative h-64">
              <canvas id="pressureChart" class="w-full h-full"></canvas>
            </div>
          </div>

          <!-- 降水量予報 -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-xl">🌧️</span>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">降水量予報</h3>
            </div>
            <div class="relative h-64">
              <canvas id="precipitationChart" class="w-full h-full"></canvas>
            </div>
          </div>
        </div>

        <!-- 週間予報 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center space-x-2 mb-6">
            <span class="text-xl">📅</span>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">週間予報</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            <div v-for="day in state.weeklyForecast" :key="day.date" 
                 class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
              <div class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{{ day.date }}</div>
              <div class="text-3xl mb-2">{{ day.weatherInfo.icon }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ day.weatherInfo.description }}</div>
              <div class="flex justify-between text-sm">
                <span class="font-semibold text-gray-900 dark:text-white">{{ day.maxTemp }}°</span>
                <span class="text-gray-500 dark:text-gray-400">{{ day.minTemp }}°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  setup() {
    return useWeatherApp();
  }
}
</script>