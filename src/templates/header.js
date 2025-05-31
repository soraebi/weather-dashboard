// ===========================================
// Weather Dashboard - Header Template
// ===========================================

const headerTemplate = () => `
    <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 lg:h-20">
                <!-- ロゴ -->
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
                        🌤️
                    </div>
                    <h1 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                        お天気ダッシュボード
                    </h1>
                </div>

                <!-- 検索とコントロール -->
                <div class="flex items-center space-x-2 lg:space-x-4">
                    <!-- 検索バー -->
                    <div class="relative hidden sm:block">
                        <input
                            v-model="searchQuery"
                            @keypress.enter="searchCity"
                            type="text"
                            placeholder="都市名を検索..."
                            class="w-64 px-4 py-2 pl-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                        />
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <span class="text-gray-400">🔍</span>
                        </div>
                    </div>

                    <!-- ボタングループ -->
                    <div class="flex items-center space-x-2">
                        <button
                            @click="loadCurrentLocationWeather"
                            class="p-2 lg:p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                            title="現在地"
                        >
                            📍
                        </button>
                        <button
                            @click="refreshWeather"
                            class="p-2 lg:p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                            title="更新"
                        >
                            🔄
                        </button>
                        <button
                            @click="toggleDarkMode"
                            class="p-2 lg:p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                            title="ダークモード切替"
                        >
                            {{ state.isDarkMode ? '☀️' : '🌙' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
`;
