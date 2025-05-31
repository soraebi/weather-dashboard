// ===========================================
// Weather Dashboard - Favorite Locations Template
// ===========================================

const favoriteLocationsTemplate = () => `
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
`;