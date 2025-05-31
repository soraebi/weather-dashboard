// ===========================================
// Weather Dashboard - Weekly Forecast Template
// ===========================================

const weeklyForecastTemplate = () => `
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">週間予報</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div v-for="day in state.weeklyForecast" :key="day.dayName"
                 class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ day.dayName }}</div>
                <div class="text-3xl mb-2">{{ day.weatherInfo.icon }}</div>
                <div class="space-y-1">
                    <div class="font-bold text-gray-900 dark:text-white">{{ day.maxTemp }}°</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ day.minTemp }}°</div>
                </div>
            </div>
        </div>
    </div>
`;

// テンプレート関数をwindowオブジェクトに公開
window.weeklyForecastTemplate = weeklyForecastTemplate;
