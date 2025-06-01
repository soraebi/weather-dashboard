// ===========================================
// Weather Dashboard - Weather Data Processing
// ===========================================

/**
 * 天気データの処理を提供するComposable
 * @param {Object} state - アプリケーションの状態
 * @param {Object} utils - ユーティリティ関数
 * @param {Object} charts - チャート関数
 * @returns {Object} データ処理関数
 */
const useWeatherData = (state, utils, charts) => {
    if (!state || !utils || !charts) {
        throw new Error('useWeatherData requires state, utils, and charts parameters');
    }

    /**
     * 時間別予報を処理
     * @param {Object} hourlyData - 時間別データ
     * @returns {Array} 処理済み時間別予報データ
     */
    const processHourlyForecast = (hourlyData) => {
        const forecast = [];
        
        if (!hourlyData || !hourlyData.time) {
            return forecast;
        }

        try {
            // 現在時刻の次の時刻を取得
            const nextHourTime = utils.safeGetNextHourTime();
            
            // 24時間分のデータを抽出
            const filteredData = utils.safeFilterHourlyDataFromTime(hourlyData, nextHourTime, 24);
            
            const maxHours = Math.min(24, filteredData.time ? filteredData.time.length : 0);
            for (let i = 0; i < maxHours; i++) {
                if (filteredData.time && filteredData.time[i]) {
                    const hourData = {
                        time: new Date(filteredData.time[i]).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
                        temp: utils.safeSafeRound(filteredData.temperature_2m ? filteredData.temperature_2m[i] : 0),
                        weatherCode: filteredData.weather_code ? filteredData.weather_code[i] : 0,
                        precipitation: utils.safeSafeRound(filteredData.precipitation ? filteredData.precipitation[i] : 0, 1)
                    };
                    hourData.weatherInfo = utils.safeGetWeatherInfo(hourData.weatherCode);
                    forecast.push(hourData);
                }
            }
        } catch (error) {
            console.warn('Hourly forecast processing error:', error);
            // フォールバック：従来の方法
            const maxHours = 24;
            for (let i = 0; i < Math.min(maxHours, hourlyData.time.length); i++) {
                if (hourlyData.time[i]) {
                    const hourData = {
                        time: new Date(hourlyData.time[i]).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
                        temp: utils.safeSafeRound(hourlyData.temperature_2m ? hourlyData.temperature_2m[i] : 0),
                        weatherCode: hourlyData.weather_code ? hourlyData.weather_code[i] : 0,
                        precipitation: utils.safeSafeRound(hourlyData.precipitation ? hourlyData.precipitation[i] : 0, 1)
                    };
                    hourData.weatherInfo = utils.safeGetWeatherInfo(hourData.weatherCode);
                    forecast.push(hourData);
                }
            }
        }

        return forecast;
    };

    /**
     * 週間予報を処理
     * @param {Object} dailyData - 日別データ
     * @returns {Array} 処理済み週間予報データ
     */
    const processWeeklyForecast = (dailyData) => {
        const forecast = [];
        
        if (!dailyData || !dailyData.time) {
            return forecast;
        }

        for (let i = 0; i < Math.min(7, dailyData.time.length); i++) {
            const date = new Date(dailyData.time[i]);
            const dayName = i === 0 ? '今日' : i === 1 ? '明日' : date.toLocaleDateString('ja-JP', { weekday: 'short' });
            const weatherCode = dailyData.weather_code ? dailyData.weather_code[i] : 0;
            
            // 日付をMM/DD(aaa)形式でフォーマット
            const formattedDate = window.formatDateWithDayOfWeek ? window.formatDateWithDayOfWeek(date) : '';
            
            forecast.push({
                date: formattedDate,
                dayName,
                weatherInfo: utils.safeGetWeatherInfo(weatherCode),
                maxTemp: utils.safeSafeRound(dailyData.temperature_2m_max ? dailyData.temperature_2m_max[i] : 0),
                minTemp: utils.safeSafeRound(dailyData.temperature_2m_min ? dailyData.temperature_2m_min[i] : 0)
            });
        }

        return forecast;
    };

    /**
     * 警報をチェック
     * @param {Object} currentWeather - 現在の天気データ
     * @param {Object} dailyWeather - 日別天気データ
     * @returns {Array} 警報データ
     */
    const processAlerts = (currentWeather, dailyWeather) => {
        try {
            return utils.safeCheckAlerts(currentWeather, dailyWeather);
        } catch (error) {
            console.warn('Alert processing error:', error);
            return [];
        }
    };

    /**
     * 天気データ全体を更新
     * @param {Object} weatherData - 天気データ
     * @param {string} locationName - 場所名
     */
    const updateWeatherData = (weatherData, locationName) => {
        try {
            console.log('Updating weather data:', weatherData);

            // 現在の天気データを設定
            state.currentWeather = weatherData.current;
            state.currentLocation = { 
                name: locationName,
                latitude: weatherData.latitude || 0,
                longitude: weatherData.longitude || 0
            };

            // 時間別予報の処理
            state.hourlyForecast = processHourlyForecast(weatherData.hourly);

            // 週間予報の処理
            state.weeklyForecast = processWeeklyForecast(weatherData.daily);

            // 警報の処理
            state.alerts = processAlerts(weatherData.current, weatherData.daily);

            // チャート更新
            charts.updateCharts(weatherData);

        } catch (error) {
            console.error('Failed to update weather data:', error);
            state.error = 'データの処理に失敗しました';
        }
    };

    /**
     * データを検証
     * @param {Object} weatherData - 天気データ
     * @returns {boolean} 検証結果
     */
    const validateWeatherData = (weatherData) => {
        if (!weatherData) {
            console.warn('Weather data is null or undefined');
            return false;
        }

        if (!weatherData.current) {
            console.warn('Current weather data is missing');
            return false;
        }

        if (!weatherData.hourly || !weatherData.hourly.time) {
            console.warn('Hourly weather data is missing');
            return false;
        }

        if (!weatherData.daily || !weatherData.daily.time) {
            console.warn('Daily weather data is missing');
            return false;
        }

        return true;
    };

    /**
     * 天気データをリセット
     */
    const resetWeatherData = () => {
        state.currentWeather = null;
        state.hourlyForecast = [];
        state.weeklyForecast = [];
        state.alerts = [];
        state.currentLocation = null;
    };

    /**
     * 気温の範囲を取得
     * @param {Array} hourlyForecast - 時間別予報
     * @returns {Object} 最高・最低気温
     */
    const getTemperatureRange = (hourlyForecast = state.hourlyForecast) => {
        if (!hourlyForecast || hourlyForecast.length === 0) {
            return { min: 0, max: 0 };
        }

        const temps = hourlyForecast.map(hour => hour.temp).filter(temp => temp !== null && temp !== undefined);
        
        return {
            min: Math.min(...temps),
            max: Math.max(...temps)
        };
    };

    /**
     * 降水量の合計を取得
     * @param {Array} hourlyForecast - 時間別予報
     * @returns {number} 降水量合計
     */
    const getTotalPrecipitation = (hourlyForecast = state.hourlyForecast) => {
        if (!hourlyForecast || hourlyForecast.length === 0) {
            return 0;
        }

        return hourlyForecast.reduce((total, hour) => {
            return total + (hour.precipitation || 0);
        }, 0);
    };

    return {
        updateWeatherData,
        processHourlyForecast,
        processWeeklyForecast,
        processAlerts,
        validateWeatherData,
        resetWeatherData,
        getTemperatureRange,
        getTotalPrecipitation
    };
};

window.useWeatherData = useWeatherData;
