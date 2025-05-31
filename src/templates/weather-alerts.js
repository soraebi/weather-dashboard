// ===========================================
// Weather Dashboard - Weather Alerts Template
// ===========================================

const weatherAlertsTemplate = () => `
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center space-x-2 mb-4">
            <span class="text-xl">⚠️</span>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">気象警報</h3>
        </div>
        <div v-if="state.alerts.length === 0" class="flex items-center space-x-3">
            <span class="text-green-500 text-xl">✅</span>
            <div>
                <div class="font-semibold text-gray-900 dark:text-white">警報なし</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">現在、気象警報は発表されていません</div>
            </div>
        </div>
        <div v-else class="space-y-3">
            <div v-for="alert in state.alerts" :key="alert.title" class="flex items-center space-x-3">
                <span class="text-yellow-500 text-lg">{{ alert.icon }}</span>
                <div>
                    <div class="font-semibold text-gray-900 dark:text-white">{{ alert.title }}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">{{ alert.message }}</div>
                </div>
            </div>
        </div>
    </div>
`;

// テンプレート関数をwindowオブジェクトに公開
window.weatherAlertsTemplate = weatherAlertsTemplate;
