// ===========================================
// Weather Dashboard - Geocoding API
// 都市名検索とジオコーディング機能
// ===========================================

/**
 * ジオコーディング API クラス
 */
class GeocodingAPI {
    constructor() {
        // 設定とキャッシュマネージャーの初期化
        this.baseUrl = window.WeatherAPIConfig 
            ? window.WeatherAPIConfig.GEOCODING_URL 
            : 'https://geocoding-api.open-meteo.com/v1';
        
        this.requestTimeout = window.WeatherAPIConfig 
            ? window.WeatherAPIConfig.REQUEST_TIMEOUT 
            : 10000;

        this.cacheManager = new window.CacheManager();
    }

    /**
     * 都市名から座標を取得（ジオコーディング）
     * @param {string} cityName - 都市名
     * @returns {Promise<Array>} - 都市情報の配列
     */
    async searchLocation(cityName) {
        console.log(`🚀 SearchLocation called with: "${cityName}"`);
        
        if (!cityName || cityName.trim().length === 0) {
            throw new Error('都市名を入力してください');
        }

        const cleanCityName = cityName.trim();
        console.log(`🧹 Cleaned city name: "${cleanCityName}"`);

        // キャッシュチェック
        const cacheKey = `geocoding:${cleanCityName.toLowerCase()}`;
        const cachedResult = this.cacheManager.get(cacheKey);
        if (cachedResult) {
            console.log(`📋 Cache hit for "${cleanCityName}"`);
            return cachedResult;
        }

        let result;
        
        try {
            // まず日本の都市データベースで検索
            result = await this.searchInJapaneseCities(cleanCityName);
            
            if (result.length === 0) {
                // 日本の都市で見つからない場合は外部APIを使用
                result = await this.searchViaExternalAPI(cleanCityName);
            }

            // 結果をキャッシュに保存
            this.cacheManager.set(cacheKey, result);
            
            return result;

        } catch (error) {
            console.error('Location search error:', error);
            throw error;
        }
    }

    /**
     * 日本の都市データベースで検索
     * @param {string} cityName - 都市名
     * @returns {Promise<Array>} - 見つかった都市の配列
     */
    async searchInJapaneseCities(cityName) {
        if (!window.JapaneseCities) {
            console.warn('JapaneseCities not available');
            return [];
        }

        console.log(`🔍 Searching in Japanese cities database for "${cityName}"`);

        // 完全一致検索を最初に試行
        const exactMatch = window.JapaneseCities.findExactMatch(cityName);
        if (exactMatch) {
            console.log(`🎯 Exact match found: ${exactMatch.name}`);
            return [this.formatJapaneseCityResult(exactMatch)];
        }

        // 部分一致検索
        const partialMatches = window.JapaneseCities.findPartialMatches(cityName);
        if (partialMatches.length > 0) {
            console.log(`✅ Found ${partialMatches.length} partial match(es) in Japanese cities database`);
            return partialMatches.map(city => this.formatJapaneseCityResult(city));
        }

        console.log(`❌ No matches found in Japanese cities for "${cityName}"`);
        return [];
    }

    /**
     * 外部APIで検索
     * @param {string} cityName - 都市名
     * @returns {Promise<Array>} - 見つかった都市の配列
     */
    async searchViaExternalAPI(cityName) {
        console.log(`🌐 Falling back to external API for "${cityName}"`);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);

            const response = await fetch(
                `${this.baseUrl}/search?name=${encodeURIComponent(cityName)}&count=5&language=ja&format=json`,
                { signal: controller.signal }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Geocoding API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (data.results && data.results.length > 0) {
                console.log(`✅ External API found ${data.results.length} results`);
                return data.results.map(result => this.formatExternalAPIResult(result));
            }

            throw new Error(`都市「${cityName}」が見つかりませんでした`);

        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('リクエストがタイムアウトしました');
            }
            throw error;
        }
    }

    /**
     * 日本の都市データを統一フォーマットに変換
     * @param {object} city - 都市データ
     * @returns {object} - フォーマット済み都市データ
     */
    formatJapaneseCityResult(city) {
        return {
            name: city.name,
            country: city.country,
            admin1: '',
            latitude: city.latitude,
            longitude: city.longitude,
            displayName: `${city.name}, ${city.country}`,
            population: null,
            timezone: 'Asia/Tokyo'
        };
    }

    /**
     * 外部APIの結果を統一フォーマットに変換
     * @param {object} result - 外部APIの結果
     * @returns {object} - フォーマット済み都市データ
     */
    formatExternalAPIResult(result) {
        return {
            name: result.name,
            country: result.country || '不明',
            admin1: result.admin1 || '',
            latitude: result.latitude,
            longitude: result.longitude,
            displayName: this.formatLocationName(result),
            population: result.population || null,
            timezone: result.timezone || null
        };
    }

    /**
     * 場所名をフォーマット
     * @param {object} location - 場所オブジェクト
     * @returns {string} - フォーマット済み場所名
     */
    formatLocationName(location) {
        let name = location.name;
        
        if (location.admin1 && location.admin1 !== location.name) {
            name += `, ${location.admin1}`;
        }
        
        if (location.country) {
            name += `, ${location.country}`;
        }
        
        return name;
    }

    /**
     * キャッシュをクリーンアップ
     */
    cleanup() {
        this.cacheManager.cleanup();
    }
}

// グローバルスコープに公開
window.GeocodingAPI = GeocodingAPI;
