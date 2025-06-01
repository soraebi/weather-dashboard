// ===========================================
// Time Utils - 時間処理関連ユーティリティ
// ===========================================

/**
 * 現在時刻の分を切り上げて次の時刻を取得
 * @returns {Date} - 次の時刻（分・秒・ミリ秒は0）
 */
const getNextHourTime = () => {
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setMinutes(0, 0, 0); // 分・秒・ミリ秒をリセット
    
    // 現在の分が0以外の場合は次の時間に進める
    if (now.getMinutes() > 0) {
        nextHour.setHours(nextHour.getHours() + 1);
    }
    
    return nextHour;
};

/**
 * 指定時刻から指定時間数分のデータを抽出
 * @param {object} hourlyData - 時間別データオブジェクト
 * @param {Date} startTime - 開始時刻
 * @param {number} hours - 抽出する時間数
 * @returns {object} - フィルタリングされたデータ
 */
const filterHourlyDataFromTime = (hourlyData, startTime, hours) => {
    if (!hourlyData || !hourlyData.time || !Array.isArray(hourlyData.time)) {
        return { time: [], temperature_2m: [], weather_code: [], precipitation: [], pressure_msl: [] };
    }

    // 開始時刻に対応するインデックスを見つける
    let startIndex = -1;
    for (let i = 0; i < hourlyData.time.length; i++) {
        const dataTime = new Date(hourlyData.time[i]);
        if (dataTime.getTime() >= startTime.getTime()) {
            startIndex = i;
            break;
        }
    }

    // 開始インデックスが見つからない場合は0から開始
    if (startIndex === -1) {
        startIndex = 0;
    }

    // 指定時間数分のデータを抽出
    const endIndex = Math.min(startIndex + hours, hourlyData.time.length);
    
    const result = {
        time: hourlyData.time.slice(startIndex, endIndex)
    };

    // 各データ配列を安全に抽出
    if (hourlyData.temperature_2m) {
        result.temperature_2m = hourlyData.temperature_2m.slice(startIndex, endIndex);
    }
    if (hourlyData.weather_code) {
        result.weather_code = hourlyData.weather_code.slice(startIndex, endIndex);
    }
    if (hourlyData.precipitation) {
        result.precipitation = hourlyData.precipitation.slice(startIndex, endIndex);
    }
    if (hourlyData.pressure_msl) {
        result.pressure_msl = hourlyData.pressure_msl.slice(startIndex, endIndex);
    }

    return result;
};

/**
 * 日付をMM/DD(aaa)形式でフォーマット
 * @param {Date|string} date - 日付オブジェクトまたは日付文字列
 * @returns {string} - MM/DD(aaa)形式の日付文字列
 */
const formatDateWithDayOfWeek = (date) => {
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();
    const dayOfWeek = dayNames[targetDate.getDay()];
    
    return `${month}/${day}(${dayOfWeek})`;
};

// 関数をwindowオブジェクトに公開
window.getNextHourTime = getNextHourTime;
window.filterHourlyDataFromTime = filterHourlyDataFromTime;
window.formatDateWithDayOfWeek = formatDateWithDayOfWeek;
