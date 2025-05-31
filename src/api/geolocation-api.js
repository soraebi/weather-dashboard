// ===========================================
// Weather Dashboard - Geolocation API
// ブラウザ位置情報API管理
// ===========================================

/**
 * 位置情報取得 API クラス
 */
class GeolocationAPI {
    /**
     * 現在位置の座標を取得
     * @param {object} options - 取得オプション
     * @returns {Promise<object>} - 座標オブジェクト
     */
    static async getCurrentLocation(options = {}) {
        // 設定クラスが利用可能な場合はデフォルトオプションを使用
        const defaultOptions = window.WeatherAPIConfig 
            ? window.WeatherAPIConfig.GEOLOCATION_OPTIONS 
            : {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 5 * 60 * 1000 // 5分
            };

        const finalOptions = { ...defaultOptions, ...options };

        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('お使いのブラウザは位置情報をサポートしていません'));
                return;
            }

            console.log('Getting current location...');

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('Location obtained:', position.coords);
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                },
                (error) => {
                    let errorMessage;
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = '位置情報の取得が拒否されました';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = '位置情報が利用できません';
                            break;
                        case error.TIMEOUT:
                            errorMessage = '位置情報の取得がタイムアウトしました';
                            break;
                        default:
                            errorMessage = '位置情報の取得に失敗しました';
                            break;
                    }
                    console.error('Geolocation error:', errorMessage);
                    reject(new Error(errorMessage));
                },
                finalOptions
            );
        });
    }

    /**
     * 位置情報が利用可能かどうかをチェック
     * @returns {boolean} - 位置情報が利用可能かどうか
     */
    static isAvailable() {
        return 'geolocation' in navigator;
    }

    /**
     * 位置情報の権限状態を確認
     * @returns {Promise<string>} - 権限状態 ('granted', 'denied', 'prompt')
     */
    static async checkPermission() {
        if (!navigator.permissions) {
            return 'unknown';
        }

        try {
            const result = await navigator.permissions.query({ name: 'geolocation' });
            return result.state;
        } catch (error) {
            console.warn('Permission query failed:', error);
            return 'unknown';
        }
    }
}

// グローバルスコープに公開
window.GeolocationAPI = GeolocationAPI;
