// ===========================================
// Weather Dashboard - Error Template
// ===========================================

const errorTemplate = () => `
    <div v-if="state.error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div class="flex items-center">
                <span class="text-red-500 text-xl mr-3">⚠️</span>
                <div>
                    <h3 class="text-red-800 dark:text-red-200 font-semibold">データ取得エラー</h3>
                    <p class="text-red-600 dark:text-red-300">{{ state.error }}</p>
                </div>
            </div>
        </div>
    </div>
`;
