// ===========================================
// Weather Dashboard - Weather Data API
// 天気データ取得と検証機能
// ===========================================

/**
 * 天気データ API クラス
 */
class WeatherDataAPI {
    constructor() {
        // 設定とキャッシュマネージャーの初期化
        this.baseUrl = window.WeatherAPIConfig 
            ? window.WeatherAPIConfig.BASE_URL 
            : 'https://api.open-meteo.com/v1';
        
        this.requestTimeout = window.WeatherAPIConfig 
            ? window.WeatherAPIConfig.REQUEST_TIMEOUT 
            : 10000;

        this.cacheManager = new window.CacheManager();
    }

    /**
     * 天気データを取得
     * @param {number} latitude - 緯度
     * @param {number} longitude - 経度
     * @returns {Promise<object>} - 天気データ
     */
    async getWeatherData(latitude, longitude) {
        // 入力値の検証
        if (!this.isValidCoordinate(latitude, -90, 90)) {
            throw new Error('緯度が無効です（-90から90の範囲で入力してください）');
        }
        if (!this.isValidCoordinate(longitude, -180, 180)) {
            throw new Error('経度が無効です（-180から180の範囲で入力してください）');
        }

        const cacheKey = `weather:${latitude.toFixed(4)},${longitude.toFixed(4)}`;
        
        // キャッシュチェック
        const cachedData = this.cacheManager.get(cacheKey);
        if (cachedData) {
            console.log(`📋 Cache hit for weather data: ${cacheKey}`);
            return cachedData;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);

            const params = this.buildWeatherParams(latitude, longitude);
            const response = await fetch(
                `${this.baseUrl}/forecast?${params}`,
                { signal: controller.signal }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Weather API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // データの妥当性チェック
            this.validateWeatherData(data);

            // キャッシュに保存
            this.cacheManager.set(cacheKey, data);

            // 古いキャッシュをクリア（メモリ管理）
            this.cacheManager.cleanup();

            return data;

        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('天気データの取得がタイムアウトしました');
            }
            console.error('Weather data fetch error:', error);
            throw error;
        }
    }

    /**
     * 天気データ取得用のパラメータを構築
     * @param {number} latitude - 緯度
     * @param {number} longitude - 経度
     * @returns {URLSearchParams} - 構築されたパラメータ
     */
    buildWeatherParams(latitude, longitude) {
        const config = window.WeatherAPIConfig;
        
        return new URLSearchParams({
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            current: config ? config.CURRENT_PARAMS.join(',') : [
                'temperature_2m',
                'relative_humidity_2m',
                'apparent_temperature',
                'precipitation',
                'weather_code',
                'pressure_msl',
                'wind_speed_10m',
                'wind_direction_10m',
                'wind_gusts_10m'
            ].join(','),
            hourly: config ? config.HOURLY_PARAMS.join(',') : [
                'temperature_2m',
                'weather_code',
                'precipitation_probability',
                'precipitation',
                'pressure_msl'
            ].join(','),
            daily: config ? config.DAILY_PARAMS.join(',') : [
                'weather_code',
                'temperature_2m_max',
                'temperature_2m_min',
                'precipitation_sum',
                'uv_index_max',
                'wind_speed_10m_max',
                'sunrise',
                'sunset'
            ].join(','),
            timezone: 'Asia/Tokyo',
            forecast_days: 7
        });
    }

    /**
     * 座標の妥当性をチェック
     * @param {number} value - 座標値
     * @param {number} min - 最小値
     * @param {number} max - 最大値
     * @returns {boolean} - 有効かどうか
     */
    isValidCoordinate(value, min, max) {
        return typeof value === 'number' && 
               !isNaN(value) && 
               isFinite(value) && 
               value >= min && 
               value <= max;
    }

    /**
     * 天気データの妥当性をチェック
     * @param {object} data - 天気データ
     */
    validateWeatherData(data) {
        if (!data) {
            throw new Error('天気データが空です');
        }

        if (!data.current) {
            throw new Error('現在の天気データが含まれていません');
        }

        if (!data.hourly || !data.hourly.time) {
            throw new Error('時間別予報データが含まれていません');
        }

        if (!data.daily || !data.daily.time) {
            throw new Error('日別予報データが含まれていません');
        }

        // 必須フィールドの存在チェック
        const requiredCurrentFields = ['temperature_2m', 'weather_code'];
        for (const field of requiredCurrentFields) {
            if (data.current[field] === undefined || data.current[field] === null) {
                console.warn(`Missing current weather field: ${field}`);
            }
        }
    }

    /**
     * 特定の座標の天気データがキャッシュされているかチェック
     * @param {number} latitude - 緯度
     * @param {number} longitude - 経度
     * @returns {boolean} - キャッシュされているかどうか
     */
    isWeatherDataCached(latitude, longitude) {
        const cacheKey = `weather:${latitude.toFixed(4)},${longitude.toFixed(4)}`;
        return this.cacheManager.has(cacheKey);
    }

    /**
     * キャッシュをクリーンアップ
     */
    cleanup() {
        this.cacheManager.cleanup();
    }

    /**
     * 天気データキャッシュをクリア
     */
    clearWeatherCache() {
        // weather:で始まるキーのみをクリア
        // 注意: この実装は簡単のため全キャッシュをクリアしています
        // 実際の実装では特定のプレフィックスのみをクリアすることが望ましいです
        this.cacheManager.clear();
    }
}

// グローバルスコープに公開
window.WeatherDataAPI = WeatherDataAPI;
