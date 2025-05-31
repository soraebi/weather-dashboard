// ===========================================
// Weather Dashboard - API Configuration
// API設定定数とオプション
// ===========================================

/**
 * Open-Meteo API 設定クラス
 */
class WeatherAPIConfig {
    // API エンドポイント
    static BASE_URL = 'https://api.open-meteo.com/v1';
    static GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1';
    
    // キャッシュ設定
    static CACHE_EXPIRY = 30 * 60 * 1000; // 30分
    
    // リクエスト設定
    static REQUEST_TIMEOUT = 10000; // 10秒
    
    // 天気データ取得パラメータ
    static CURRENT_PARAMS = [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'precipitation',
        'weather_code',
        'pressure_msl',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m'
    ];
    
    static HOURLY_PARAMS = [
        'temperature_2m',
        'weather_code',
        'precipitation_probability',
        'precipitation',
        'pressure_msl'
    ];
    
    static DAILY_PARAMS = [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum',
        'uv_index_max',
        'wind_speed_10m_max',
        'sunrise',
        'sunset'
    ];
    
    // 位置情報取得のデフォルトオプション
    static GEOLOCATION_OPTIONS = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000 // 5分
    };
}

// グローバルスコープに公開
window.WeatherAPIConfig = WeatherAPIConfig;
