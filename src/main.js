// ===========================================
// Weather Dashboard - Main Logic (Refactored)
// ===========================================

const { createApp } = Vue;

// メインアプリケーションロジック（リファクタリング済み）
const createWeatherApp = () => {
    // 統合composableを使用
    return useWeatherApp();
};
