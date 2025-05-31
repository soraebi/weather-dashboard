// ===========================================
// Weather Dashboard - Main Content Template
// ===========================================

const mainContentTemplate = () => `
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- お気に入り地点 -->
        ${favoriteLocationsTemplate()}

        <!-- 現在の天気 -->
        <div v-if="!state.loading && !state.error && state.currentWeather">
            ${currentWeatherTemplate()}

            <!-- カードグリッド -->
            ${cardGridTemplate()}

            <!-- 週間予報 -->
            ${weeklyForecastTemplate()}
        </div>
    </main>
`;
