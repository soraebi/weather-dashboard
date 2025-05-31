// ===========================================
// Weather Utils Index - 統合・後方互換性ファイル
// 分割されたユーティリティモジュールを統合し、既存のAPIを維持
// ===========================================

// WeatherUtilsクラスとして再構築（後方互換性のため）
class WeatherUtils {
    static getWeatherInfo = getWeatherInfo;
    static getWindDirection = getWindDirection;
    static getCurrentTimeString = getCurrentTimeString;
    static safeRound = safeRound;
    static getTemperatureColor = getTemperatureColor;
    static getNextHourTime = getNextHourTime;
    static filterHourlyDataFromTime = filterHourlyDataFromTime;
    static checkAlerts = checkAlerts;
    static getWeatherRecommendations = getWeatherRecommendations;
}

// グローバルスコープに公開（既存のAPIとの互換性を保つため）
window.WeatherUtils = WeatherUtils;
window.WEATHER_CODES = WEATHER_CODES;
