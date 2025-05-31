// ===========================================
// Weather Dashboard - Card Grid Template
// ===========================================

const cardGridTemplate = () => `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- 時間別予報 -->
        ${hourlyForecastTemplate()}

        <!-- 気象警報 -->
        ${weatherAlertsTemplate()}

        <!-- 気圧予報 -->
        ${pressureChartTemplate()}

        <!-- 降水量予報 -->
        ${precipitationChartTemplate()}
    </div>
`;
