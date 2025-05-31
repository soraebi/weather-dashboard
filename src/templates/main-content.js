// ===========================================
// Weather Dashboard - Main Content Template
// ===========================================

const mainContentTemplate = () => `
    <main v-if="!state.loading && !state.error && state.currentWeather" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- 現在の天気 -->
        ${currentWeatherTemplate()}

        <!-- カードグリッド -->
        ${cardGridTemplate()}

        <!-- 週間予報 -->
        ${weeklyForecastTemplate()}
    </main>
`;
