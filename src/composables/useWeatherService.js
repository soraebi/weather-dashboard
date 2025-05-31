// ===========================================
// Weather Dashboard - Weather Service Integration
// ===========================================

/**
 * 天気API統合を提供するComposable
 * @param {Object} state - アプリケーションの状態
 * @param {Object} searchQuery - 検索クエリref
 * @param {Object} weatherData - 天気データ処理関数
 * @returns {Object} API統合関数
 */
const useWeatherService = (state, searchQuery, weatherData, weatherState) => {
    if (!state || !searchQuery || !weatherData) {
        throw new Error('useWeatherService requires state, searchQuery, and weatherData parameters');
    }

    let api = null;

    /**
     * APIインスタンスを初期化
     */
    const initializeAPI = () => {
        try {
            if (!window.OpenMeteoAPI) {
                throw new Error('OpenMeteoAPI is not available');
            }
            api = new OpenMeteoAPI();
            return true;
        } catch (error) {
            console.error('Failed to initialize API:', error);
            state.error = 'APIの初期化に失敗しました';
            return false;
        }
    };

    /**
     * エラー状態をクリア
     */
    const clearError = () => {
        state.error = null;
    };

    /**
     * ローディング状態を設定
     * @param {boolean} loading - ローディング状態
     */
    const setLoading = (loading) => {
        state.loading = loading;
    };

    /**
     * エラーを設定
     * @param {string} error - エラーメッセージ
     */
    const setError = (error) => {
        state.error = error;
    };

    /**
     * 現在地の座標を取得
     * @returns {Promise<Object>} 座標とロケーション名
     */
    const getCurrentLocation = async () => {
        if (!api) {
            throw new Error('APIが初期化されていません');
        }

        let coords;
        let locationName = '現在地';

        try {
            coords = await api.getCurrentLocation();
            console.log('Location obtained:', coords);
        } catch (geoError) {
            console.warn('Geolocation failed, using Tokyo as fallback');
            coords = { latitude: 35.6762, longitude: 139.6503 };
            locationName = '東京, 日本';
        }

        return { coords, locationName };
    };

    /**
     * 天気データを取得
     * @param {number} latitude - 緯度
     * @param {number} longitude - 経度
     * @returns {Promise<Object>} 天気データ
     */
    const fetchWeatherData = async (latitude, longitude) => {
        if (!api) {
            throw new Error('APIが初期化されていません');
        }

        const data = await api.getWeatherData(latitude, longitude);
        console.log('Weather data obtained:', data);
        return data;
    };

    /**
     * 現在地の天気を読み込み
     */
    const loadCurrentLocationWeather = async () => {
        setLoading(true);
        clearError();

        try {
            const { coords, locationName } = await getCurrentLocation();
            const data = await fetchWeatherData(coords.latitude, coords.longitude);
            
            if (!weatherData.validateWeatherData(data)) {
                throw new Error('取得したデータが不正です');
            }

            weatherData.updateWeatherData(data, locationName);

        } catch (error) {
            console.error('Failed to load weather:', error);
            setError(`天気データの取得に失敗しました: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    /**
     * 場所を検索
     * @param {string} query - 検索クエリ
     * @returns {Promise<Array>} 検索結果
     */
    const searchLocation = async (query) => {
        if (!api) {
            throw new Error('APIが初期化されていません');
        }

        const locations = await api.searchLocation(query);
        
        if (locations.length === 0) {
            throw new Error(`都市「${query}」が見つかりませんでした`);
        }

        return locations;
    };

    /**
     * 都市を検索して天気データを取得
     */
    const searchCity = async () => {
        if (!searchQuery.value.trim()) {
            setError('検索キーワードを入力してください');
            return;
        }

        setLoading(true);
        clearError();

        try {
            const locations = await searchLocation(searchQuery.value);
            const location = locations[0];
            
            const data = await fetchWeatherData(location.latitude, location.longitude);
            
            if (!weatherData.validateWeatherData(data)) {
                throw new Error('取得したデータが不正です');
            }

            weatherData.updateWeatherData(data, location.displayName);
            
            // 検索クエリをクリア
            searchQuery.value = '';

        } catch (error) {
            console.error('City search failed:', error);
            setError(`検索に失敗しました: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    /**
     * 天気データを再読み込み（お気に入り地点も含む）
     */
    const refreshWeather = async () => {
        if (state.currentLocation && state.currentLocation.latitude && state.currentLocation.longitude) {
            // 現在の場所がある場合はその場所の天気を再読み込み
            await refreshWeatherForLocation(state.currentLocation.latitude, state.currentLocation.longitude, state.currentLocation.name);
        } else {
            // そうでない場合は現在地の天気を読み込み
            await loadCurrentLocationWeather();
        }
        
        // お気に入り地点も更新
        await refreshAllFavorites();
    };

    /**
     * 指定した場所の天気を再読み込み
     * @param {number} latitude - 緯度
     * @param {number} longitude - 経度
     * @param {string} locationName - 場所名
     */
    const refreshWeatherForLocation = async (latitude, longitude, locationName) => {
        setLoading(true);
        clearError();

        try {
            const data = await fetchWeatherData(latitude, longitude);
            
            if (!weatherData.validateWeatherData(data)) {
                throw new Error('取得したデータが不正です');
            }

            weatherData.updateWeatherData(data, locationName);

        } catch (error) {
            console.error('Failed to refresh weather:', error);
            setError(`天気データの更新に失敗しました: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    /**
     * APIの可用性をチェック
     * @returns {boolean} API利用可能性
     */
    const checkAPIAvailability = () => {
        const checks = {
            WeatherUtils: !!window.WeatherUtils,
            OpenMeteoAPI: !!window.OpenMeteoAPI,
            Chart: !!window.Chart
        };

        let allAvailable = true;
        Object.entries(checks).forEach(([name, available]) => {
            if (!available) {
                console.warn(`${name} not available`);
                allAvailable = false;
            }
        });

        return allAvailable;
    };

    /**
     * サービスを初期化
     * @returns {boolean} 初期化成功フラグ
     */
    const initializeService = () => {
        console.log('Initializing weather service...');
        
        // API可用性チェック
        if (!checkAPIAvailability()) {
            setError('必要なライブラリが読み込まれていません');
            return false;
        }

        // API初期化
        return initializeAPI();
    };

    const addToFavorites = async (locationName, latitude, longitude) => {
        try {
            if (weatherState) {
                const location = {
                    name: locationName,
                    latitude: latitude,
                    longitude: longitude
                };
                weatherState.addFavoriteLocation(location);
                saveFavoritesToStorage();
                
                const newFavorite = state.favoriteLocations[state.favoriteLocations.length - 1];
                if (newFavorite) {
                    await loadFavoriteWeather(newFavorite.id);
                }
            }
        } catch (error) {
            console.error('Failed to add to favorites:', error);
            setError(`お気に入りの追加に失敗しました: ${error.message}`);
        }
    };

    const removeFromFavorites = (favoriteId) => {
        try {
            if (weatherState) {
                weatherState.removeFavoriteLocation(favoriteId);
                saveFavoritesToStorage();
            }
        } catch (error) {
            console.error('Failed to remove from favorites:', error);
            setError(`お気に入りの削除に失敗しました: ${error.message}`);
        }
    };

    const loadFavoriteWeather = async (favoriteId) => {
        const favorite = state.favoriteLocations.find(fav => fav.id === favoriteId);
        if (!favorite) return;

        try {
            const weatherData = await fetchWeatherData(favorite.latitude, favorite.longitude);
            if (weatherState) {
                weatherState.updateFavoriteWeather(favoriteId, weatherData);
            }
        } catch (error) {
            console.error('Failed to load favorite weather:', error);
        }
    };

    const refreshAllFavorites = async () => {
        const loadPromises = state.favoriteLocations.map(favorite => 
            loadFavoriteWeather(favorite.id)
        );
        
        try {
            await Promise.all(loadPromises);
        } catch (error) {
            console.error('Failed to refresh favorites:', error);
        }
    };

    const saveFavoritesToStorage = () => {
        try {
            localStorage.setItem('weatherDashboard_favorites', JSON.stringify(state.favoriteLocations));
        } catch (error) {
            console.error('Failed to save favorites to storage:', error);
        }
    };

    const loadFavoritesFromStorage = () => {
        try {
            const saved = localStorage.getItem('weatherDashboard_favorites');
            if (saved) {
                const favorites = JSON.parse(saved);
                state.favoriteLocations.splice(0, state.favoriteLocations.length, ...favorites);
            }
        } catch (error) {
            console.error('Failed to load favorites from storage:', error);
        }
    };

    const loadFavoriteLocationWeather = async (latitude, longitude, locationName) => {
        setLoading(true);
        clearError();

        try {
            const data = await fetchWeatherData(latitude, longitude);
            
            if (!weatherData.validateWeatherData(data)) {
                throw new Error('取得したデータが不正です');
            }

            weatherData.updateWeatherData(data, locationName);

        } catch (error) {
            console.error('Failed to load favorite location weather:', error);
            setError(`天気データの取得に失敗しました: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        initializeService,
        loadCurrentLocationWeather,
        searchCity,
        refreshWeather,
        refreshWeatherForLocation,
        getCurrentLocation,
        fetchWeatherData,
        searchLocation,
        checkAPIAvailability,
        clearError,
        setLoading,
        setError,
        addToFavorites,
        removeFromFavorites,
        loadFavoriteWeather,
        refreshAllFavorites,
        saveFavoritesToStorage,
        loadFavoritesFromStorage,
        loadFavoriteLocationWeather
    };
};

window.useWeatherService = useWeatherService;
