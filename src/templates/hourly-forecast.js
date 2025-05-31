// ===========================================
// Weather Dashboard - Hourly Forecast Template
// ===========================================

const hourlyForecastTemplate = () => `
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center space-x-2 mb-4">
            <span class="text-xl">🕐</span>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">時間別予報</h3>
        </div>
        <div class="space-y-3 max-h-80 overflow-y-auto">
            <div v-for="hour in state.hourlyForecast" :key="hour.time" 
                 class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <span class="text-sm text-gray-600 dark:text-gray-400 w-12">{{ hour.time }}</span>
                <span class="text-lg">{{ hour.weatherInfo.icon }}</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ hour.temp }}°</span>
                <span class="text-xs text-blue-500">{{ hour.precipitation }}mm</span>
            </div>
        </div>
    </div>
`;
