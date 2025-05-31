// ===========================================
// Weather Dashboard - Application Integration
// ===========================================

import { onMounted, onUnmounted } from 'vue'

/**
 * 天気アプリケーション全体を統合するComposable
 * @returns {Object} アプリケーション全体の状態と機能
 */
const useWeatherApp = () => {
    // 各composableを順次初期化
    const {
        state,
        searchQuery,
        currentLocationName,
        lastUpdated,
        weatherRecommendations,
        toggleDarkMode,
        initializeDarkMode,
        addFavoriteLocation,
        removeFavoriteLocation,
        updateFavoriteWeather
    } = useWeatherState();

    const utils = useWeatherUtils();

    const charts = useCharts(state, utils);

    const weatherData = useWeatherData(state, utils, charts);

    const weatherState = {
        addFavoriteLocation,
        removeFavoriteLocation,
        updateFavoriteWeather
    };

    const weatherService = useWeatherService(state, searchQuery, weatherData, weatherState);

    /**
     * アプリケーションを初期化
     */
    const initializeApp = () => {
        console.log('Component mounted, loading weather data...');
        
        // ダークモード初期化
        initializeDarkMode();
        
        // サービス初期化
        if (!weatherService.initializeService()) {
            console.error('Failed to initialize weather service');
            return false;
        }

        // お気に入り地点をローカルストレージから読み込み
        weatherService.loadFavoritesFromStorage();

        // 天気データの読み込み
        weatherService.loadCurrentLocationWeather();
        
        // お気に入り地点の天気も読み込み
        setTimeout(() => {
            weatherService.refreshAllFavorites();
        }, 1000);
        
        return true;
    };

    /**
     * リサイズハンドラーを設定
     */
    const setupEventListeners = () => {
        window.addEventListener('resize', charts.handleResize);
    };

    /**
     * イベントリスナーをクリーンアップ
     */
    const cleanupEventListeners = () => {
        window.removeEventListener('resize', charts.handleResize);
    };

    /**
     * 検索を実行
     */
    const handleSearch = () => {
        weatherService.searchCity();
    };

    /**
     * 天気を再読み込み
     */
    const handleRefresh = () => {
        weatherService.refreshWeather();
    };

    /**
     * 現在地の天気を読み込み
     */
    const handleLoadCurrentLocation = () => {
        weatherService.loadCurrentLocationWeather();
    };

    /**
     * ダークモードを切り替え
     */
    const handleToggleDarkMode = () => {
        toggleDarkMode();
    };

    /**
     * エラーをクリア
     */
    const handleClearError = () => {
        weatherService.clearError();
    };

    /**
     * 現在地をお気に入りに追加
     */
    const addCurrentLocationToFavorites = () => {
        if (state.currentLocation) {
            weatherService.addToFavorites(
                state.currentLocation.name,
                state.currentLocation.latitude,
                state.currentLocation.longitude
            );
        }
    };

    /**
     * APIの状態をチェック
     * @returns {Object} API状態情報
     */
    const getAPIStatus = () => {
        return {
            available: weatherService.checkAPIAvailability(),
            weatherUtils: !!window.WeatherUtils,
            openMeteoAPI: !!window.OpenMeteoAPI,
            chart: !!window.Chart
        };
    };

    /**
     * アプリケーションの状態を取得
     * @returns {Object} アプリケーション状態
     */
    const getAppStatus = () => {
        return {
            initialized: !!state.currentWeather,
            loading: state.loading,
            hasError: !!state.error,
            hasData: !!(state.currentWeather && state.hourlyForecast.length > 0),
            location: state.currentLocation?.name || null,
            lastUpdated: lastUpdated.value
        };
    };

    /**
     * デバッグ情報を取得
     * @returns {Object} デバッグ情報
     */
    const getDebugInfo = () => {
        return {
            api: getAPIStatus(),
            app: getAppStatus(),
            charts: {
                pressureChart: !!state.pressureChart,
                precipitationChart: !!state.precipitationChart
            },
            data: {
                currentWeather: !!state.currentWeather,
                hourlyForecastCount: state.hourlyForecast.length,
                weeklyForecastCount: state.weeklyForecast.length,
                alertsCount: state.alerts.length
            }
        };
    };

    /**
     * 統計情報を取得
     * @returns {Object} 統計情報
     */
    const getStatistics = () => {
        const tempRange = weatherData.getTemperatureRange();
        const totalPrecipitation = weatherData.getTotalPrecipitation();
        
        return {
            temperature: {
                current: state.currentWeather?.temperature_2m || 0,
                min: tempRange.min,
                max: tempRange.max,
                range: tempRange.max - tempRange.min
            },
            precipitation: {
                total: totalPrecipitation,
                average: state.hourlyForecast.length > 0 ? totalPrecipitation / state.hourlyForecast.length : 0
            },
            forecasts: {
                hourly: state.hourlyForecast.length,
                weekly: state.weeklyForecast.length
            },
            alerts: state.alerts.length
        };
    };

    // ライフサイクル管理
    onMounted(() => {
        setupEventListeners();
        initializeApp();
    });

    onUnmounted(() => {
        cleanupEventListeners();
        charts.cleanupCharts();
    });

    // テンプレートで使用する全ての機能を返す
    return {
        // 状態
        state,
        searchQuery,
        
        // computed プロパティ
        currentLocationName,
        lastUpdated,
        weatherRecommendations,
        
        // イベントハンドラー
        searchCity: handleSearch,
        loadCurrentLocationWeather: handleLoadCurrentLocation,
        toggleDarkMode: handleToggleDarkMode,
        refreshWeather: handleRefresh,
        clearError: handleClearError,
        addCurrentLocationToFavorites,
        
        // ユーティリティ関数（テンプレート用）
        getWeatherInfo: utils.getWeatherInfo,
        getWeatherIcon: utils.getWeatherIcon,
        getWeatherDescription: utils.getWeatherDescription,
        getTimeString: utils.getTimeString,
        safeRound: utils.safeRound,
        getWindDirection: utils.getWindDirection,
        
        // サービス機能
        weatherService,
        
        // 管理機能
        getAPIStatus,
        getAppStatus,
        getDebugInfo,
        getStatistics,
        
        // 内部機能（デバッグ用）
        internalComponents: {
            weatherService,
            weatherData,
            charts,
            utils
        }
    };
};

// グローバルに公開（既存の仕組みとの互換性のため）
window.useWeatherApp = useWeatherApp;
