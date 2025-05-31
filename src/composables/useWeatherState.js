// ===========================================
// Weather Dashboard - State Management
// ===========================================

import { ref, reactive, computed } from 'vue'

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
        favoriteLocations: [],
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

    const addFavoriteLocation = (location) => {
        const exists = state.favoriteLocations.find(fav => 
            Math.abs(fav.latitude - location.latitude) < 0.01 && 
            Math.abs(fav.longitude - location.longitude) < 0.01
        );
        if (!exists) {
            state.favoriteLocations.push({
                id: Date.now(),
                name: location.name,
                latitude: location.latitude,
                longitude: location.longitude,
                weatherData: null,
                lastUpdated: null
            });
        }
    };

    const removeFavoriteLocation = (id) => {
        const index = state.favoriteLocations.findIndex(fav => fav.id === id);
        if (index > -1) {
            state.favoriteLocations.splice(index, 1);
        }
    };

    const updateFavoriteWeather = (id, weatherData) => {
        const favorite = state.favoriteLocations.find(fav => fav.id === id);
        if (favorite) {
            favorite.weatherData = weatherData;
            favorite.lastUpdated = new Date();
        }
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
        toggleDarkMode,
        addFavoriteLocation,
        removeFavoriteLocation,
        updateFavoriteWeather
    };
};

// グローバルに公開（既存の仕組みとの互換性のため）
window.useWeatherState = useWeatherState;
