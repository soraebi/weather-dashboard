// ===========================================
// Weather Dashboard - Precipitation Chart Template
// ===========================================

const precipitationChartTemplate = () => `
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center space-x-2 mb-4">
            <span class="text-xl">🌧️</span>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">降水量予報</h3>
        </div>
        <div class="relative w-full h-48">
            <canvas id="precipitationChart" class="w-full h-full"></canvas>
        </div>
    </div>
`;

// テンプレート関数をwindowオブジェクトに公開
window.precipitationChartTemplate = precipitationChartTemplate;
