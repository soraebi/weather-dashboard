// ===========================================
// Weather Dashboard - Loading Template
// ===========================================

const loadingTemplate = () => `
    <div v-if="state.loading" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
            <div class="flex items-center space-x-3">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span class="text-gray-900 dark:text-white">天気データを取得中...</span>
            </div>
        </div>
    </div>
`;
