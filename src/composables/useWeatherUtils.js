// ===========================================
// Weather Dashboard - Utility Functions
// ===========================================

/**
 * 天気アプリケーションのユーティリティ関数を提供するComposable
 * @returns {Object} ユーティリティ関数群
 */
const useWeatherUtils = () => {
    // WeatherUtils のセーフラッパー関数群
    
    /**
     * 天気コードから天気情報を安全に取得
     * @param {number} code - 天気コード
     * @returns {Object} 天気情報 { icon, description }
     */
    const safeGetWeatherInfo = (code) => {
        try {
            return window.WeatherUtils ? 
                WeatherUtils.getWeatherInfo(code) : 
                { icon: '❓', description: '不明' };
        } catch (error) {
            console.warn('WeatherUtils.getWeatherInfo error:', error);
            return { icon: '❓', description: '不明' };
        }
    };

    /**
     * 数値を安全に丸める
     * @param {number} value - 丸める値
     * @param {number} decimals - 小数点以下の桁数
     * @returns {number} 丸められた値
     */
    const safeSafeRound = (value, decimals = 0) => {
        try {
            if (window.WeatherUtils) {
                return WeatherUtils.safeRound(value, decimals);
            }
            if (value === null || value === undefined || isNaN(value)) return 0;
            return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
        } catch (error) {
            console.warn('WeatherUtils.safeRound error:', error);
            return value || 0;
        }
    };

    /**
     * 風向きを安全に取得
     * @param {number} degrees - 風向き（度）
     * @returns {string} 風向きの文字列表現
     */
    const safeGetWindDirection = (degrees) => {
        try {
            return window.WeatherUtils ? 
                WeatherUtils.getWindDirection(degrees) : 
                '--';
        } catch (error) {
            console.warn('WeatherUtils.getWindDirection error:', error);
            return '--';
        }
    };

    /**
     * 現在時刻の文字列を安全に取得
     * @returns {string} 現在時刻の文字列
     */
    const safeGetCurrentTimeString = () => {
        try {
            return window.WeatherUtils ? 
                WeatherUtils.getCurrentTimeString() : 
                new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
        } catch (error) {
            console.warn('WeatherUtils.getCurrentTimeString error:', error);
            return '--:--';
        }
    };

    /**
     * 天気に基づく推奨事項を安全に取得
     * @param {number} weatherCode - 天気コード
     * @param {number} temperature - 気温
     * @param {number} uvIndex - UV指数
     * @returns {Array} 推奨事項の配列
     */
    const safeGetWeatherRecommendations = (weatherCode, temperature, uvIndex) => {
        try {
            return window.WeatherUtils ? 
                WeatherUtils.getWeatherRecommendations(weatherCode, temperature, uvIndex) : 
                [];
        } catch (error) {
            console.warn('WeatherUtils.getWeatherRecommendations error:', error);
            return [];
        }
    };

    /**
     * 次の時間を安全に取得
     * @returns {Date} 次の時間のDateオブジェクト
     */
    const safeGetNextHourTime = () => {
        try {
            return window.WeatherUtils ? 
                WeatherUtils.getNextHourTime() : 
                new Date();
        } catch (error) {
            console.warn('WeatherUtils.getNextHourTime error:', error);
            return new Date();
        }
    };

    /**
     * 時間別データを安全にフィルタリング
     * @param {Object} hourlyData - 時間別データ
     * @param {Date} fromTime - 開始時間
     * @param {number} hours - 時間数
     * @returns {Object} フィルタリング済みデータ
     */
    const safeFilterHourlyDataFromTime = (hourlyData, fromTime, hours) => {
        try {
            return window.WeatherUtils ? 
                WeatherUtils.filterHourlyDataFromTime(hourlyData, fromTime, hours) : 
                hourlyData;
        } catch (error) {
            console.warn('WeatherUtils.filterHourlyDataFromTime error:', error);
            return hourlyData;
        }
    };

    /**
     * アラートを安全にチェック
     * @param {Object} currentWeather - 現在の天気データ
     * @param {Object} dailyWeather - 日別天気データ
     * @returns {Array} アラートの配列
     */
    const safeCheckAlerts = (currentWeather, dailyWeather) => {
        try {
            return window.WeatherUtils ? 
                WeatherUtils.checkAlerts(currentWeather, dailyWeather) : 
                [];
        } catch (error) {
            console.warn('WeatherUtils.checkAlerts error:', error);
            return [];
        }
    };

    return {
        safeGetWeatherInfo,
        safeSafeRound,
        safeGetWindDirection,
        safeGetCurrentTimeString,
        safeGetWeatherRecommendations,
        safeGetNextHourTime,
        safeFilterHourlyDataFromTime,
        safeCheckAlerts,
        
        // テンプレートで使用される名前でのエイリアス
        getWeatherInfo: safeGetWeatherInfo,
        safeRound: safeSafeRound,
        getWindDirection: safeGetWindDirection
    };
};
