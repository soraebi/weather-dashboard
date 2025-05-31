// ===========================================
// Weather Dashboard - Current Weather Template
// ===========================================

const currentWeatherTemplate = () => `
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
                        {{ safeRound(state.currentWeather.wind_speed_10m || 0) }} km/h
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
`;
