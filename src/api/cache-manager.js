// ===========================================
// Weather Dashboard - Cache Manager
// データキャッシュ管理機能
// ===========================================

/**
 * キャッシュ管理クラス
 */
class CacheManager {
    constructor() {
        this.cache = new Map();
        // 設定クラスが利用可能な場合は設定値を使用
        this.cacheExpiry = window.WeatherAPIConfig 
            ? window.WeatherAPIConfig.CACHE_EXPIRY 
            : 30 * 60 * 1000; // 30分
    }

    /**
     * キャッシュからデータを取得
     * @param {string} key - キャッシュキー
     * @returns {any|null} - キャッシュされたデータまたはnull
     */
    get(key) {
        if (!this.cache.has(key)) {
            return null;
        }

        const cached = this.cache.get(key);
        
        // 期限チェック
        if (Date.now() - cached.timestamp > this.cacheExpiry) {
            this.cache.delete(key);
            return null;
        }

        return cached.data;
    }

    /**
     * データをキャッシュに保存
     * @param {string} key - キャッシュキー
     * @param {any} data - 保存するデータ
     */
    set(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }

    /**
     * キャッシュから特定のキーを削除
     * @param {string} key - 削除するキャッシュキー
     */
    delete(key) {
        this.cache.delete(key);
    }

    /**
     * 期限切れのキャッシュエントリをクリーンアップ
     */
    cleanup() {
        const now = Date.now();
        const keysToDelete = [];

        for (const [key, value] of this.cache.entries()) {
            if (now - value.timestamp > this.cacheExpiry) {
                keysToDelete.push(key);
            }
        }

        keysToDelete.forEach(key => this.cache.delete(key));

        if (keysToDelete.length > 0) {
            console.log(`Cleaned up ${keysToDelete.length} expired cache entries`);
        }
    }

    /**
     * すべてのキャッシュをクリア
     */
    clear() {
        const size = this.cache.size;
        this.cache.clear();
        console.log(`Cleared ${size} cache entries`);
    }

    /**
     * キャッシュの統計情報を取得
     * @returns {object} - キャッシュ統計
     */
    getStats() {
        const now = Date.now();
        let validEntries = 0;
        let expiredEntries = 0;

        for (const [, value] of this.cache.entries()) {
            if (now - value.timestamp > this.cacheExpiry) {
                expiredEntries++;
            } else {
                validEntries++;
            }
        }

        return {
            total: this.cache.size,
            valid: validEntries,
            expired: expiredEntries,
            cacheExpiry: this.cacheExpiry
        };
    }

    /**
     * キャッシュキーが存在するかチェック
     * @param {string} key - チェックするキー
     * @returns {boolean} - キーが存在し、有効かどうか
     */
    has(key) {
        return this.get(key) !== null;
    }
}

// グローバルスコープに公開
window.CacheManager = CacheManager;
