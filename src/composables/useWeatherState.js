// ===========================================
// Weather Dashboard - State Management
// ===========================================

const { ref, reactive, computed } = Vue;

/**
 * 天気アプリケーションの状態管理を提供するComposable
 * @returns {Object} 状態とcomputed プロパティ
 */
const useWeatherState = () => {
    // リアクティブな状態
    const state = reactive({
        currentWeather: null,
        hourlyForecast: [],
        weeklyForecast: [],
        favorites: [],
        alerts: [],
        currentLocation: null,
        loading: false,
        error: null,
        isDarkMode: false,
        pressureChart: null,
        precipitationChart: null
    });

    // 検索クエリ
    const searchQuery = ref('');

    // computed プロパティ
    const currentLocationName = computed(() => {
        return state.currentLocation?.name || 'データ読み込み中...';
    });

    const lastUpdated = computed(() => {
        if (!state.currentWeather) return '--:--';
        try {
            return window.WeatherUtils ? 
                WeatherUtils.getCurrentTimeString() : 
                new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
        } catch (error) {
            console.warn('getCurrentTimeString error:', error);
            return '--:--';
        }
    });

    const weatherRecommendations = computed(() => {
        if (!state.currentWeather) return [];
        try {
            if (!window.WeatherUtils) return [];
            return WeatherUtils.getWeatherRecommendations(
                state.currentWeather.weather_code || 0,
                state.currentWeather.temperature_2m || 0,
                6 // デフォルトのUV指数
            );
        } catch (error) {
            console.warn('getWeatherRecommendations error:', error);
            return [];
        }
    });

    // 状態のクリア
    const clearError = () => {
        state.error = null;
    };

    const setLoading = (loading) => {
        state.loading = loading;
    };

    const setError = (error) => {
        state.error = error;
    };

    const toggleDarkMode = () => {
        state.isDarkMode = !state.isDarkMode;
        document.documentElement.classList.toggle('dark', state.isDarkMode);
    };

    return {
        // 状態
        state,
        searchQuery,
        
        // computed プロパティ
        currentLocationName,
        lastUpdated,
        weatherRecommendations,
        
        // 状態操作メソッド
        clearError,
        setLoading,
        setError,
        toggleDarkMode
    };
};
