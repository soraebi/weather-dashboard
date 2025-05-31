// ===========================================
// Formatting Utils - フォーマット・変換関連ユーティリティ
// ===========================================

/**
 * 風向きを度数から方位に変換
 * @param {number} degrees - 風向き（度）
 * @returns {string} - 方位
 */
const getWindDirection = (degrees) => {
    if (degrees === null || degrees === undefined) return '--';
    
    const directions = [
        '北', '北北東', '北東', '東北東', 
        '東', '東南東', '南東', '南南東', 
        '南', '南南西', '南西', '西南西', 
        '西', '西北西', '北西', '北北西'
    ];
    
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
};

/**
 * 現在時刻をフォーマット
 * @returns {string} - フォーマット済み時刻
 */
const getCurrentTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString('ja-JP', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
};

/**
 * 数値を安全に丸める
 * @param {number} value - 数値
 * @param {number} decimals - 小数点以下桁数
 * @returns {number} - 丸められた数値または 0
 */
const safeRound = (value, decimals = 0) => {
    if (value === null || value === undefined || isNaN(value)) {
        return 0;
    }
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * 温度による色の取得
 * @param {number} temperature - 気温
 * @returns {string} - CSS色コード
 */
const getTemperatureColor = (temperature) => {
    if (temperature >= 35) return '#ef4444'; // 猛暑 - 赤
    if (temperature >= 30) return '#f59e0b'; // 暑い - オレンジ
    if (temperature >= 25) return '#eab308'; // 暖かい - 黄
    if (temperature >= 20) return '#22c55e'; // 快適 - 緑
    if (temperature >= 15) return '#3b82f6'; // 涼しい - 青
    if (temperature >= 10) return '#8b5cf6'; // 寒い - 紫
    return '#6366f1'; // 極寒 - インディゴ
};
