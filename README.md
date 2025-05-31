# 🌤️ お天気ダッシュボード

日本語対応の美しい天気予報ダッシュボードアプリケーション。現在の天気、時間別予報、週間予報、気圧・降水量チャートを一画面で確認できます。

## ✨ 主な機能

- **現在の天気情報** - 気温、湿度、気圧、風速など詳細な気象データ
- **時間別予報** - 24時間先までの天気・気温・降水量の予報
- **週間予報** - 7日間の天気予報と最高・最低気温
- **インタラクティブチャート** - 気圧と降水量の時系列グラフ（Chart.js）
- **位置情報対応** - GPS による現在地の天気自動取得
- **都市検索** - 日本の主要都市およびグローバル都市の天気検索
- **天気アドバイス** - 気象条件に応じた服装や行動の推奨
- **ダークモード** - ライト/ダークテーマの切り替え
- **レスポンシブデザイン** - モバイル・タブレット・デスクトップ対応

## 🛠️ 技術スタック

- **フロントエンド**: Vue 3 (CDN版)
- **スタイリング**: Tailwind CSS 4
- **チャート**: Chart.js 4
- **API**: Open-Meteo Weather API
- **開発ツール**: Vite
- **フォント**: Google Fonts (Inter)

## 🚀 セットアップ

### 必要な環境
- Node.js (14以上)
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
src/
├── api/                    # API関連
│   ├── config.js          # API設定とエンドポイント
│   ├── weather-api.js     # 統合APIクラス
│   ├── cache-manager.js   # キャッシュ管理
│   └── ...
├── composables/           # Vue 3 Composables
│   ├── useWeatherApp.js   # メインアプリ統合
│   ├── useWeatherState.js # 状態管理
│   └── ...
├── templates/             # UIテンプレート
│   ├── main-layout.js     # メインレイアウト
│   ├── current-weather.js # 現在の天気表示
│   └── ...
└── utils/                 # ユーティリティ関数
    ├── weather-codes.js   # 天気コード変換
    ├── formatting-utils.js# データフォーマット
    └── ...
```

## 🏗️ アーキテクチャ

このアプリケーションは**コンポーザブルベースのアーキテクチャ**を採用しています：

- **モジュラー設計**: 機能ごとに分離されたComposables
- **リアクティブ状態管理**: Vue 3のReactivity APIを活用
- **テンプレート文字列システム**: Build不要の軽量テンプレート
- **階層キャッシュ**: 30分TTLのインメモリキャッシュ
- **API抽象化**: Open-Meteo APIの統合インターフェース

## 🌐 対応ブラウザ

- Chrome (最新版)
- Firefox (最新版)  
- Safari (最新版)
- Edge (最新版)

## 📡 データソース

- **天気データ**: [Open-Meteo API](https://open-meteo.com/) (無料、API キー不要)
- **位置情報**: ブラウザの Geolocation API
- **日本都市データ**: 内蔵の主要都市データベース

## 🎨 デザイン特徴

- **モダンUI**: グラデーション、ソフトシャドウ、スムーズアニメーション
- **レスポンシブ**: モバイルファーストのグリッドレイアウト
- **アクセシビリティ**: 適切なコントラスト比とキーボードナビゲーション
- **パフォーマンス**: 最適化された画像とCSSアニメーション

## 🔧 カスタマイズ

### 天気コードの追加
`src/utils/weather-codes.js` で新しい天気コードを定義できます。

### 新しい都市の追加
`src/api/japanese-cities.js` で日本の都市を追加できます。

### UI テーマの変更
`tailwind.config.js` でカラーパレットやアニメーションをカスタマイズできます。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- [Open-Meteo](https://open-meteo.com/) - 無料の天気予報API
- [Vue.js](https://vuejs.org/) - リアクティブフレームワーク
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSS
- [Chart.js](https://www.chartjs.org/) - インタラクティブチャート