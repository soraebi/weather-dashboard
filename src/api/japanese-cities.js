// ===========================================
// Weather Dashboard - Japanese Cities Data
// 日本の主要都市データと管理機能
// ===========================================

/**
 * 日本の都市データ管理クラス
 */
class JapaneseCities {
    /**
     * 日本の主要都市データを取得
     * @returns {Array} - 日本の主要都市リスト
     */
    static getCities() {
        return [
            // 関東地方
            { name: '東京', reading: ['とうきょう', 'tokyo', 'トウキョウ'], latitude: 35.6762, longitude: 139.6503, country: '日本' },
            { name: '横浜', reading: ['よこはま', 'yokohama', 'ヨコハマ'], latitude: 35.4437, longitude: 139.6380, country: '日本' },
            { name: '千葉', reading: ['ちば', 'chiba', 'チバ'], latitude: 35.6074, longitude: 140.1065, country: '日本' },
            { name: 'さいたま', reading: ['さいたま', 'saitama', 'サイタマ'], latitude: 35.8617, longitude: 139.6455, country: '日本' },
            { name: '宇都宮', reading: ['うつのみや', 'utsunomiya', 'ウツノミヤ'], latitude: 36.5658, longitude: 139.8836, country: '日本' },
            { name: '前橋', reading: ['まえばし', 'maebashi', 'マエバシ'], latitude: 36.3911, longitude: 139.0608, country: '日本' },
            { name: '水戸', reading: ['みと', 'mito', 'ミト'], latitude: 36.3418, longitude: 140.4468, country: '日本' },
            
            // 関西地方
            { name: '大阪', reading: ['おおさか', 'osaka', 'オオサカ'], latitude: 34.6937, longitude: 135.5023, country: '日本' },
            { name: '京都', reading: ['きょうと', 'kyoto', 'キョウト'], latitude: 35.0116, longitude: 135.7681, country: '日本' },
            { name: '神戸', reading: ['こうべ', 'kobe', 'コウベ'], latitude: 34.6901, longitude: 135.1956, country: '日本' },
            { name: '奈良', reading: ['なら', 'nara', 'ナラ'], latitude: 34.6851, longitude: 135.8051, country: '日本' },
            { name: '津', reading: ['つ', 'tsu', 'ツ'], latitude: 34.7303, longitude: 136.5086, country: '日本' },
            { name: '大津', reading: ['おおつ', 'otsu', 'オオツ'], latitude: 35.0045, longitude: 135.8686, country: '日本' },
            { name: '和歌山', reading: ['わかやま', 'wakayama', 'ワカヤマ'], latitude: 34.2261, longitude: 135.1675, country: '日本' },
            
            // 中部地方
            { name: '名古屋', reading: ['なごや', 'nagoya', 'ナゴヤ'], latitude: 35.1815, longitude: 136.9066, country: '日本' },
            { name: '金沢', reading: ['かなざわ', 'kanazawa', 'カナザワ'], latitude: 36.5944, longitude: 136.6256, country: '日本' },
            { name: '富山', reading: ['とやま', 'toyama', 'トヤマ'], latitude: 36.6953, longitude: 137.2113, country: '日本' },
            { name: '福井', reading: ['ふくい', 'fukui', 'フクイ'], latitude: 36.0652, longitude: 136.2216, country: '日本' },
            { name: '岐阜', reading: ['ぎふ', 'gifu', 'ギフ'], latitude: 35.3912, longitude: 136.7223, country: '日本' },
            { name: '静岡', reading: ['しずおか', 'shizuoka', 'シズオカ'], latitude: 34.9756, longitude: 138.3831, country: '日本' },
            { name: '甲府', reading: ['こうふ', 'kofu', 'コウフ'], latitude: 35.6642, longitude: 138.5683, country: '日本' },
            { name: '長野', reading: ['ながの', 'nagano', 'ナガノ'], latitude: 36.6513, longitude: 138.1810, country: '日本' },
            { name: '新潟', reading: ['にいがた', 'niigata', 'ニイガタ'], latitude: 37.9022, longitude: 139.0234, country: '日本' },
            
            // 東北地方
            { name: '仙台', reading: ['せんだい', 'sendai', 'センダイ'], latitude: 38.2682, longitude: 140.8694, country: '日本' },
            { name: '青森', reading: ['あおもり', 'aomori', 'アオモリ'], latitude: 40.8244, longitude: 140.7400, country: '日本' },
            { name: '盛岡', reading: ['もりおか', 'morioka', 'モリオカ'], latitude: 39.7036, longitude: 141.1527, country: '日本' },
            { name: '秋田', reading: ['あきた', 'akita', 'アキタ'], latitude: 39.7186, longitude: 140.1024, country: '日本' },
            { name: '山形', reading: ['やまがた', 'yamagata', 'ヤマガタ'], latitude: 38.2404, longitude: 140.3633, country: '日本' },
            { name: '福島', reading: ['ふくしま', 'fukushima', 'フクシマ'], latitude: 37.7503, longitude: 140.4676, country: '日本' },
            
            // 北海道
            { name: '札幌', reading: ['さっぽろ', 'sapporo', 'サッポロ'], latitude: 43.0642, longitude: 141.3469, country: '日本' },
            { name: '函館', reading: ['はこだて', 'hakodate', 'ハコダテ'], latitude: 41.7687, longitude: 140.7288, country: '日本' },
            { name: '旭川', reading: ['あさひかわ', 'asahikawa', 'アサヒカワ'], latitude: 43.7707, longitude: 142.3649, country: '日本' },
            { name: '釧路', reading: ['くしろ', 'kushiro', 'クシロ'], latitude: 42.9849, longitude: 144.3820, country: '日本' },
            
            // 九州・沖縄地方
            { name: '福岡', reading: ['ふくおか', 'fukuoka', 'フクオカ'], latitude: 33.5904, longitude: 130.4017, country: '日本' },
            { name: '北九州', reading: ['きたきゅうしゅう', 'kitakyushu', 'キタキュウシュウ'], latitude: 33.8834, longitude: 130.8751, country: '日本' },
            { name: '熊本', reading: ['くまもと', 'kumamoto', 'クマモト'], latitude: 32.8031, longitude: 130.7079, country: '日本' },
            { name: '長崎', reading: ['ながさき', 'nagasaki', 'ナガサキ'], latitude: 32.7503, longitude: 129.8773, country: '日本' },
            { name: '佐賀', reading: ['さが', 'saga', 'サガ'], latitude: 33.2494, longitude: 130.2989, country: '日本' },
            { name: '大分', reading: ['おおいた', 'oita', 'オオイタ'], latitude: 33.2382, longitude: 131.6126, country: '日本' },
            { name: '宮崎', reading: ['みやざき', 'miyazaki', 'ミヤザキ'], latitude: 31.9077, longitude: 131.4202, country: '日本' },
            { name: '鹿児島', reading: ['かごしま', 'kagoshima', 'カゴシマ'], latitude: 31.5966, longitude: 130.5571, country: '日本' },
            { name: '那覇', reading: ['なは', 'naha', 'ナハ'], latitude: 26.2124, longitude: 127.6792, country: '日本' },
            
            // 中国・四国地方
            { name: '広島', reading: ['ひろしま', 'hiroshima', 'ヒロシマ'], latitude: 34.3853, longitude: 132.4553, country: '日本' },
            { name: '岡山', reading: ['おかやま', 'okayama', 'オカヤマ'], latitude: 34.6617, longitude: 133.9349, country: '日本' },
            { name: '松江', reading: ['まつえ', 'matsue', 'マツエ'], latitude: 35.4723, longitude: 133.0505, country: '日本' },
            { name: '鳥取', reading: ['とっとり', 'tottori', 'トットリ'], latitude: 35.5038, longitude: 134.2380, country: '日本' },
            { name: '山口', reading: ['やまぐち', 'yamaguchi', 'ヤマグチ'], latitude: 34.1859, longitude: 131.4706, country: '日本' },
            { name: '高松', reading: ['たかまつ', 'takamatsu', 'タカマツ'], latitude: 34.3401, longitude: 134.0434, country: '日本' },
            { name: '松山', reading: ['まつやま', 'matsuyama', 'マツヤマ'], latitude: 33.8416, longitude: 132.7658, country: '日本' },
            { name: '高知', reading: ['こうち', 'kochi', 'コウチ'], latitude: 33.5597, longitude: 133.5311, country: '日本' },
            { name: '徳島', reading: ['とくしま', 'tokushima', 'トクシマ'], latitude: 34.0658, longitude: 134.5594, country: '日本' }
        ];
    }

    /**
     * 都市名で検索（完全一致）
     * @param {string} cityName - 検索する都市名
     * @returns {object|null} - 見つかった都市データ
     */
    static findExactMatch(cityName) {
        const cities = this.getCities();
        return cities.find(city => {
            if (city.name === cityName) {
                return true;
            }
            // 読み方配列で完全一致をチェック
            if (city.reading && Array.isArray(city.reading)) {
                return city.reading.some(reading => 
                    reading.toLowerCase() === cityName.toLowerCase()
                );
            }
            return false;
        }) || null;
    }

    /**
     * 都市名で検索（部分一致）
     * @param {string} cityName - 検索する都市名
     * @returns {Array} - 見つかった都市データの配列
     */
    static findPartialMatches(cityName) {
        const cities = this.getCities();
        const searchLower = cityName.toLowerCase();
        
        return cities.filter(city => {
            // 都市名での一致をチェック
            const cityNameLower = city.name.toLowerCase();
            const nameMatches = cityNameLower.includes(searchLower) || searchLower.includes(cityNameLower);
            
            // 読み方での一致をチェック
            let readingMatches = false;
            if (city.reading && Array.isArray(city.reading)) {
                readingMatches = city.reading.some(reading => {
                    const readingLower = reading.toLowerCase();
                    return readingLower.includes(searchLower) || searchLower.includes(readingLower);
                });
            }
            
            return nameMatches || readingMatches;
        });
    }
}

// グローバルスコープに公開
window.JapaneseCities = JapaneseCities;
