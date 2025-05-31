// ===========================================
// Weather Dashboard - Application Entry Point
// ===========================================

// メインアプリケーションオブジェクト
const WeatherApp = {
    setup: createWeatherApp,
    template: weatherAppTemplate
};

// アプリケーションを作成してマウント
createApp(WeatherApp).mount('#app');
