// ===========================================
// Weather Recommendations - 天気に基づく推奨事項関連ユーティリティ
// ===========================================

/**
 * 天気に基づく推奨事項を取得
 * @param {number} weatherCode - 天気コード
 * @param {number} temperature - 気温
 * @param {number} uvIndex - UV指数
 * @returns {array} - 推奨事項の配列
 */
const getWeatherRecommendations = (weatherCode, temperature, uvIndex) => {
    const recommendations = [];

    // 雨の場合
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
        recommendations.push('☂️ 傘を持参しましょう');
    }

    // 雪の場合
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
        recommendations.push('❄️ 滑りにくい靴を着用しましょう');
    }

    // 高温の場合
    if (temperature >= 30) {
        recommendations.push('🥵 こまめな水分補給を心がけましょう');
    }

    // 低温の場合
    if (temperature <= 5) {
        recommendations.push('🧥 暖かい服装でお出かけください');
    }

    // UV指数が高い場合
    if (uvIndex >= 6) {
        recommendations.push('🧴 日焼け止めと帽子をお忘れなく');
    }

    // 雷雨の場合
    if ([95, 96, 99].includes(weatherCode)) {
        recommendations.push('⚡ 外出時は安全な場所で待機しましょう');
    }

    return recommendations;
};
