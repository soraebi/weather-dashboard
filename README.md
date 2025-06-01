# 🌤️ お天気ダッシュボード

日本語対応の美しい天気予報ダッシュボードアプリケーション。現在の天気、時間別予報、週間予報、気圧・降水量チャートを一画面で確認できます。

## ✨ 主な機能

- **現在の天気情報** - 気温、湿度、気圧、風速（m/s表示）など詳細な気象データ
- **時間別予報** - 24時間先までの天気・気温・降水量の予報
- **週間予報** - 7日間の天気予報と最高・最低気温
- **お気に入り地点** - よく確認する地点を保存・管理（localStorage で永続化）
- **インタラクティブチャート** - 気圧と降水量の時系列グラフ（Chart.js）
- **位置情報対応** - GPS による現在地の天気自動取得
- **都市検索** - 日本の主要都市およびグローバル都市の天気検索
- **天気アドバイス** - 気象条件に応じた服装や行動の推奨
- **ダークモード** - ライト/ダークテーマの切り替え
- **レスポンシブデザイン** - モバイル・タブレット・デスクトップ対応

## 🛠️ 技術スタック

- **フロントエンド**: Vue 3.5+ (SFC + Composition API)
- **スタイリング**: Tailwind CSS 4 (PostCSS統合)
- **チャート**: Chart.js 4 (ES modules)
- **API**: Open-Meteo Weather API
- **開発ツール**: Vite 6 + Vue Plugin
- **フォント**: Google Fonts (Inter)

## 🚀 セットアップ

### 必要な環境
- Node.js (18以上推奨)
- モダンブラウザ（ES6+対応）

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd weather-dashboard

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### 利用可能なコマンド

```bash
# 開発サーバー起動（ホットリロード付き）
npm run dev

# プロダクションビルド
npm run build

# プロダクションプレビュー
npm run preview
```

## 📁 プロジェクト構造

```
weather-dashboard/
├── public/                 # 静的ファイル
│   └── favicon.svg        # ダッシュボード用アイコン
├── src/
│   ├── App.vue            # メインアプリケーション（コンポーネント統合）
│   ├── main.js            # Viteエントリーポイント
│   ├── style.css          # Tailwind CSS imports
│   ├── components/        # Vueコンポーネント
│   │   ├── LoadingOverlay.vue # ローディング表示
│   │   ├── ErrorOverlay.vue # エラー表示
│   │   ├── AppHeader.vue  # ヘッダー部分
│   │   ├── SearchBar.vue  # 検索バー
│   │   ├── FavoriteLocations.vue # お気に入り地点
│   │   ├── CurrentWeatherCard.vue # 現在天気カード
│   │   ├── HourlyForecastCard.vue # 時間別予報
│   │   ├── WeatherAlertsCard.vue # 気象警報
│   │   ├── PressureChart.vue # 気圧チャート
│   │   ├── PrecipitationChart.vue # 降水量チャート
│   │   └── WeeklyForecast.vue # 週間予報
│   ├── api/               # API関連
│   │   ├── config.js      # API設定とエンドポイント
│   │   ├── weather-api.js # 統合APIクラス
│   │   ├── cache-manager.js # キャッシュ管理
│   │   ├── geocoding-api.js # 位置情報API
│   │   ├── geolocation-api.js # GPS位置取得
│   │   ├── japanese-cities.js # 日本都市データ
│   │   └── weather-data-api.js # 天気データAPI
│   ├── composables/       # Vue 3 Composables
│   │   ├── useWeatherApp.js # メインアプリ統合
│   │   ├── useWeatherState.js # 状態管理（お気に入り地点含む）
│   │   ├── useWeatherService.js # API連携とお気に入り機能
│   │   ├── useWeatherData.js # データ処理
│   │   ├── useWeatherUtils.js # ユーティリティ関数
│   │   ├── useCharts.js   # Chart.js統合
│   │   └── index.js       # Composables統合
│   └── utils/             # ユーティリティ関数
│       ├── weather-codes.js # 天気コード変換
│       ├── formatting-utils.js # データフォーマット
│       ├── time-utils.js  # 時間処理
│       ├── weather-alerts.js # アラート判定
│       ├── weather-recommendations.js # 推奨事項
│       └── index.js       # ユーティリティ統合
├── index.html             # メインHTMLファイル
├── package.json           # 依存関係とスクリプト
├── vite.config.js         # Vite + Vue設定
├── tailwind.config.js     # Tailwind CSS設定
├── postcss.config.js      # PostCSS設定（@tailwindcss/postcss）
├── CLAUDE.md              # Claude Code設定
└── README.md              # プロジェクト説明
```

## 🏗️ アーキテクチャ

このアプリケーションは**モダンなコンポーザブルベースアーキテクチャ**を採用しています：

### 🏗️ **設計原則**
- **コンポーネント分割**: 11個の独立したVueコンポーネントによる責務分離
- **Vue 3 SFC**: Single File Componentによる統合的なUIコンポーネント
- **Composition API**: 機能ごとに分離されたComposables
- **リアクティブ状態管理**: Vue 3のReactivity APIを活用
- **ES Modules**: 完全なnpm版による依存関係管理
- **階層キャッシュ**: 30分TTLのインメモリキャッシュ
- **API抽象化**: Open-Meteo APIの統合インターフェース
- **Viteビルド最適化**: Tree-shakingとHMR対応

### 🧩 **コンポーネント構成**
- **LoadingOverlay**: ローディング状態の表示
- **ErrorOverlay**: エラー状態の表示とリトライ機能
- **AppHeader**: ナビゲーションとコントロールボタン
- **SearchBar**: 都市検索機能
- **FavoriteLocations**: お気に入り地点の管理と表示
- **CurrentWeatherCard**: 現在の天気情報の詳細表示
- **HourlyForecastCard**: 24時間の時間別天気予報
- **WeatherAlertsCard**: 気象警報の表示
- **PressureChart**: 気圧の時系列チャート
- **PrecipitationChart**: 降水量の時系列チャート
- **WeeklyForecast**: 7日間の週間天気予報

## 📡 データソース

- **天気データ**: [Open-Meteo API](https://open-meteo.com/) (無料、API キー不要)
- **位置情報**: ブラウザの Geolocation API
- **日本都市データ**: 内蔵の主要都市データベース

## 🎨 デザイン特徴

- **モダンUI**: グラデーション、ソフトシャドウ、スムーズアニメーション
- **レスポンシブ**: モバイルファーストのグリッドレイアウト
- **アクセシビリティ**: 適切なコントラスト比とキーボードナビゲーション
- **パフォーマンス**: Viteによるビルド最適化とCSSアニメーション
- **バンドル最適化**: Tree-shakingによる必要な機能のみの読み込み
- **ホットリロード**: 開発時の高速な変更反映（HMR）

## 🎯 使用方法

### 基本操作
1. **現在地の天気表示**: 📍ボタンで GPS による現在地の天気を取得
2. **都市検索**: 検索バーに都市名を入力して Enter キー
3. **お気に入り追加**: ⭐ボタンで現在表示中の地点をお気に入りに追加
4. **お気に入り表示**: お気に入りカードの地点名をクリックでメイン表示に切り替え
5. **データ更新**: 🔄ボタンでメイン天気とお気に入り地点を一括更新
6. **ダークモード**: 🌙/☀️ボタンでテーマ切り替え

### お気に入り地点機能
- 地点名クリックでメインコンテンツに表示
- ❌ボタンで削除
- localStorage で自動保存・復元
- アプリ起動時に天気データを自動取得

## 🔧 カスタマイズ

### 天気コードの追加
`src/utils/weather-codes.js` で新しい天気コードを定義できます。

### 新しい都市の追加
`src/api/japanese-cities.js` で日本の都市を追加できます。

### UI テーマの変更
`tailwind.config.js` でカラーパレットやアニメーションをカスタマイズできます。

### Vite設定のカスタマイズ
`vite.config.js` でビルド設定、プラグイン、開発サーバー設定を変更できます。

### 新しいコンポーネントの追加
`src/components/` ディレクトリに新しいVueコンポーネントを追加し、`App.vue` でインポートすることで機能を拡張できます。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは[MITライセンス](./LICENSE)の下で公開されています。

## 🙏 謝辞

- [Open-Meteo](https://open-meteo.com/) - 無料の天気予報API
- [Vue.js](https://vuejs.org/) - リアクティブフレームワーク
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSS
- [Chart.js](https://www.chartjs.org/) - インタラクティブチャート