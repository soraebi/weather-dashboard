// ===========================================
// Weather Dashboard - Main Layout Template
// ===========================================

const weatherAppTemplate = `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-all duration-300">
        <!-- ヘッダー -->
        ${headerTemplate()}

        <!-- ローディング -->
        ${loadingTemplate()}

        <!-- エラー -->
        ${errorTemplate()}

        <!-- メインコンテンツ -->
        ${mainContentTemplate()}
    </div>
`;

// グローバルに公開
window.weatherAppTemplate = weatherAppTemplate;
