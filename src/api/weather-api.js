// ===========================================
// Weather Dashboard - Main Weather API
// 統合APIクラス - 各機能モジュールを統合
// ===========================================

/**
 * Open-Meteo API 統合クラス
 * 既存のインターフェースを維持しながら、機能を分割されたモジュールに委譲
 */
class OpenMeteoAPI {
    constructor() {
        // 依存モジュールの初期化チェック
        this.checkDependencies();
        
        // 各APIモジュールのインスタンス化
        this.geocodingAPI = new window.GeocodingAPI();
        this.weatherDataAPI = new window.WeatherDataAPI();
        
        // 下位互換性のために一部のプロパティを設定
        this.baseUrl = window.WeatherAPIConfig.BASE_URL;
        this.geocodingUrl = window.WeatherAPIConfig.GEOCODING_URL;
        this.cache = new Map(); // 下位互換性のため（実際はCacheManagerを使用）
        this.cacheExpiry = window.WeatherAPIConfig.CACHE_EXPIRY;
        this.requestTimeout = window.WeatherAPIConfig.REQUEST_TIMEOUT;
    }

    /**
     * 依存モジュールの存在をチェック
     */
    checkDependencies() {
        const dependencies = [
            'WeatherAPIConfig',
            'CacheManager', 
            'JapaneseCities',
            'GeocodingAPI',
            'WeatherDataAPI',
            'GeolocationAPI'
        ];

        const missing = dependencies.filter(dep => !window[dep]);
        if (missing.length > 0) {
            console.error('Missing dependencies:', missing);
            throw new Error(`必要なモジュールが見つかりません: ${missing.join(', ')}`);
        }
    }

    /**
     * 都市名から座標を取得（ジオコーディング）
     * @param {string} cityName - 都市名
     * @returns {Promise<Array>} - 都市情報の配列
     */
    async searchLocation(cityName) {
        return await this.geocodingAPI.searchLocation(cityName);
    }

    /**
     * 場所名をフォーマット
     * @param {object} location - 場所オブジェクト
     * @returns {string} - フォーマット済み場所名
     */
    formatLocationName(location) {
        return this.geocodingAPI.formatLocationName(location);
    }

    /**
     * 天気データを取得
     * @param {number} latitude - 緯度
     * @param {number} longitude - 経度
     * @returns {Promise<object>} - 天気データ
     */
    async getWeatherData(latitude, longitude) {
        return await this.weatherDataAPI.getWeatherData(latitude, longitude);
    }

    /**
     * 座標の妥当性をチェック
     * @param {number} value - 座標値
     * @param {number} min - 最小値
     * @param {number} max - 最大値
     * @returns {boolean} - 有効かどうか
     */
    isValidCoordinate(value, min, max) {
        return this.weatherDataAPI.isValidCoordinate(value, min, max);
    }

    /**
     * 天気データの妥当性をチェック
     * @param {object} data - 天気データ
     */
    validateWeatherData(data) {
        return this.weatherDataAPI.validateWeatherData(data);
    }

    /**
     * 現在位置の座標を取得
     * @param {object} options - オプション
     * @returns {Promise<object>} - 座標オブジェクト
     */
    async getCurrentLocation(options = {}) {
        return await window.GeolocationAPI.getCurrentLocation(options);
    }

    /**
     * キャッシュのクリーンアップ
     * 下位互換性のため、すべてのモジュールのキャッシュをクリーンアップ
     */
    cleanupCache() {
        this.geocodingAPI.cleanup();
        this.weatherDataAPI.cleanup();
        console.log('Cache cleanup completed for all modules');
    }

    /**
     * 日本の主要都市データを取得
     * 下位互換性のためのメソッド
     * @returns {Array} - 日本の主要都市リスト
     */
    getJapaneseCities() {
        return window.JapaneseCities.getCities();
    }

    /**
     * キャッシュ統計情報を取得
     * @returns {object} - 統合されたキャッシュ統計
     */
    getCacheStats() {
        const geocodingStats = this.geocodingAPI.cacheManager.getStats();
        const weatherStats = this.weatherDataAPI.cacheManager.getStats();
        
        return {
            geocoding: geocodingStats,
            weather: weatherStats,
            total: {
                entries: geocodingStats.total + weatherStats.total,
                valid: geocodingStats.valid + weatherStats.valid,
                expired: geocodingStats.expired + weatherStats.expired
            }
        };
    }

    /**
     * 全キャッシュをクリア
     */
    clearAllCache() {
        this.geocodingAPI.cacheManager.clear();
        this.weatherDataAPI.cacheManager.clear();
        console.log('All cache cleared');
    }

    /**
     * 特定の座標の天気データがキャッシュされているかチェック
     * @param {number} latitude - 緯度
     * @param {number} longitude - 経度
     * @returns {boolean} - キャッシュされているかどうか
     */
    isWeatherDataCached(latitude, longitude) {
        return this.weatherDataAPI.isWeatherDataCached(latitude, longitude);
    }

    /**
     * モジュールの健全性チェック
     * @returns {object} - 各モジュールの状態
     */
    healthCheck() {
        return {
            config: !!window.WeatherAPIConfig,
            cacheManager: !!window.CacheManager,
            japaneseCities: !!window.JapaneseCities,
            geocodingAPI: !!this.geocodingAPI,
            weatherDataAPI: !!this.weatherDataAPI,
            geolocationAPI: !!window.GeolocationAPI,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * デバッグ情報を取得
     * @returns {object} - デバッグ情報
     */
    getDebugInfo() {
        return {
            health: this.healthCheck(),
            cache: this.getCacheStats(),
            config: {
                baseUrl: this.baseUrl,
                geocodingUrl: this.geocodingUrl,
                cacheExpiry: this.cacheExpiry,
                requestTimeout: this.requestTimeout
            }
        };
    }
}

// グローバルスコープに公開（既存インターフェースを維持）
window.OpenMeteoAPI = OpenMeteoAPI;

// デバッグ用にモジュール読み込み完了をログ出力
console.log('✅ OpenMeteoAPI integrated class loaded successfully');
console.log('📦 Available modules:', {
    config: !!window.WeatherAPIConfig,
    cache: !!window.CacheManager,
    cities: !!window.JapaneseCities,
    geocoding: !!window.GeocodingAPI,
    weather: !!window.WeatherDataAPI,
    geolocation: !!window.GeolocationAPI
});
