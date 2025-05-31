// ===========================================
// Weather Alerts - 気象警報・アラート関連ユーティリティ
// ===========================================

/**
 * 気象警報の判定
 * @param {object} currentData - 現在の天気データ
 * @param {object} dailyData - 日別天気データ
 * @returns {array} - 警報の配列
 */
const checkAlerts = (currentData, dailyData) => {
    const alerts = [];
    
    try {
        // 高温注意報 (35度以上)
        if (dailyData.temperature_2m_max && 
            dailyData.temperature_2m_max[0] >= 35) {
            alerts.push({
                type: 'heat',
                icon: '🌡️',
                title: '高温注意報',
                message: `最高気温が${safeRound(dailyData.temperature_2m_max[0])}°に達する予報`
            });
        }

        // UV指数警報 (8以上)
        if (dailyData.uv_index_max && 
            dailyData.uv_index_max[0] >= 8) {
            alerts.push({
                type: 'uv',
                icon: '☀️',
                title: '紫外線警報',
                message: `UV指数が${safeRound(dailyData.uv_index_max[0])}と非常に高くなります`
            });
        }

        // 強風注意報 (14m/s以上 = 50km/h以上)
        if (currentData.wind_speed_10m >= 50) {
            const windSpeedMs = safeRound(currentData.wind_speed_10m / 3.6, 1);
            alerts.push({
                type: 'wind',
                icon: '💨',
                title: '強風注意報',
                message: `風速${windSpeedMs}m/sの強風`
            });
        }

        // 大雨注意報 (日降水量30mm以上)
        if (dailyData.precipitation_sum && 
            dailyData.precipitation_sum[0] >= 30) {
            alerts.push({
                type: 'rain',
                icon: '🌧️',
                title: '大雨注意報',
                message: `予想降水量${safeRound(dailyData.precipitation_sum[0])}mm`
            });
        }

        // 低温注意報 (最低気温が5度以下)
        if (dailyData.temperature_2m_min && 
            dailyData.temperature_2m_min[0] <= 5) {
            alerts.push({
                type: 'cold',
                icon: '🥶',
                title: '低温注意報',
                message: `最低気温が${safeRound(dailyData.temperature_2m_min[0])}°まで下がる予報`
            });
        }

    } catch (error) {
        console.warn('Alert check error:', error);
    }

    return alerts;
};
