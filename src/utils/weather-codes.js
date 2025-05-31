// ===========================================
// Weather Codes - 天気コードマッピングと関連機能
// ===========================================

// 天気コードマッピング (WMO Weather interpretation codes)
const WEATHER_CODES = {
    0: { icon: '☀️', description: '快晴' },
    1: { icon: '🌤️', description: '概ね晴れ' },
    2: { icon: '⛅', description: '部分的に曇り' },
    3: { icon: '☁️', description: '曇り' },
    45: { icon: '🌫️', description: '霧' },
    48: { icon: '🌫️', description: '着氷霧' },
    51: { icon: '🌦️', description: '弱い霧雨' },
    53: { icon: '🌦️', description: '霧雨' },
    55: { icon: '🌦️', description: '濃い霧雨' },
    56: { icon: '🌨️', description: '弱い着氷霧雨' },
    57: { icon: '🌨️', description: '着氷霧雨' },
    61: { icon: '🌧️', description: '弱い雨' },
    63: { icon: '🌧️', description: '雨' },
    65: { icon: '🌧️', description: '強い雨' },
    66: { icon: '🌨️', description: '弱い着氷雨' },
    67: { icon: '🌨️', description: '着氷雨' },
    71: { icon: '❄️', description: '弱い雪' },
    73: { icon: '❄️', description: '雪' },
    75: { icon: '❄️', description: '強い雪' },
    77: { icon: '🌨️', description: 'みぞれ' },
    80: { icon: '🌦️', description: '弱いにわか雨' },
    81: { icon: '🌦️', description: 'にわか雨' },
    82: { icon: '🌦️', description: '強いにわか雨' },
    85: { icon: '🌨️', description: '弱いにわか雪' },
    86: { icon: '🌨️', description: 'にわか雪' },
    95: { icon: '⛈️', description: '雷雨' },
    96: { icon: '⛈️', description: '弱い雹を伴う雷雨' },
    99: { icon: '⛈️', description: '雹を伴う雷雨' }
};

/**
 * 天気コードから天気情報を取得
 * @param {number} code - 天気コード
 * @returns {object} - アイコンと説明
 */
const getWeatherInfo = (code) => {
    return WEATHER_CODES[code] || { icon: '❓', description: '不明' };
};
