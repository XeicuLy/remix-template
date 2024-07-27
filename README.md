## ディレクトリ構成

```
app/
├── components/            # 共通コンポーネント (Presentation Layer)
│   ├── layout/            # レイアウトコンポーネント (header, footer)
│   │   ├── Header.tsx     # ヘッダーコンポーネント
│   │   └── Footer.tsx     # フッターコンポーネント
│   └── ui/                # 純粋なUIコンポーネント (button, modal)
│       ├── Button.tsx     # ボタンコンポーネント
│       └── Modal.tsx      # モーダルコンポーネント
│
├── features/              # 各ページごとの機能 (Feature Element)
│   ├── home/              # ホームページ固有の機能 (Feature Element)
│   │   ├── api/           # ホームページ関連API呼び出し (Data Access Layer)
│   │   │   └── fetchHomeData.server.ts # ホームページ固有のAPI呼び出し
│   │   ├── components/    # ホームページ固有のコンポーネント (Presentation Layer)
│   │   │   ├── HomeHeader.tsx          # ホームページのヘッダーコンポーネント
│   │   │   └── HomeContent.tsx         # ホームページのコンテンツコンポーネント
│   │   └── hooks/         # ホームページのカスタムフック (Business Logic Layer)
│   │       └── useHomeData.ts          # ホームページ用のデータ取得フック
│   │
│   └── profile/           # プロフィールページ固有の機能 (Feature Element)
│       ├── api/           # プロフィール関連API呼び出し (Data Access Layer)
│       │   └── fetchProfileData.server.ts # プロフィールページ固有のAPI呼び出し
│       ├── components/    # プロフィールページ固有のコンポーネント (Presentation Layer)
│       │   ├── ProfileHeader.tsx       # プロフィールページのヘッダーコンポーネント
│       │   └── ProfileContent.tsx      # プロフィールページのコンテンツコンポーネント
│       └── hooks/         # プロフィールのカスタムフック (Business Logic Layer)
│           └── useProfileData.ts       # プロフィール用のデータ取得フック
│
├── hooks/                 # グローバルなカスタムフック (Business Logic Layer)
│   ├── useAuth.ts         # 認証に関するカスタムフック
│   └── useFetch.ts        # データフェッチに関するカスタムフック
│
├── lib/                   # ライブラリに依存した関数 (Business Logic Layer)
│   ├── apiClient.ts       # APIクライアントの設定
│   └── dateUtils.ts       # 日付処理のユーティリティ関数
│
├── routes/                # Remixのルートファイル
│   ├── index.tsx          # ルートページファイル
│   ├── home.tsx           # ホームページのルートファイル
│   ├── profile.tsx        # プロフィールページのルートファイル
│   └── api/               # グローバルなAPIエンドポイント
│        └── sample.server.ts # サンプルAPIエンドポイント
│
├── store/                 # 状態管理 (Business Logic Layer)
│   └── userStore.ts       # ユーザー情報の状態管理
│
├── styles/                # 共通スタイル (Presentation Layer)
│   ├── globals.css        # グローバルスタイル
│   ├── tailwind.css       # Tailwind CSSのスタイル
│   ├── variables.css      # CSS変数
│   └── mixins.css         # ミックスイン
│
├── test/                  # テストファイルディレクトリ
│   ├── e2e/               # エンドツーエンドテスト
│   │   ├── home.e2e.test.ts       # ホームページのE2Eテスト
│   │   └── profile.e2e.test.ts    # プロフィールページのE2Eテスト
│   │
│   ├── integration/       # 統合テスト
│   │   ├── home.integration.test.ts       # ホームページの統合テスト
│   │   └── profile.integration.test.ts    # プロフィールページの統合テスト
│   │
│   └── unit/              # ユニットテスト
│       ├── api.test.ts    # グローバルなAPI通信ロジックのユニットテスト
│       ├── components/    # 共通コンポーネントのユニットテスト
│       │   ├── Header.test.ts    # ヘッダーコンポーネントのユニットテスト
│       │   ├── Footer.test.ts    # フッターコンポーネントのユニットテスト
│       │   ├── Button.test.ts    # ボタンコンポーネントのユニットテスト
│       │   └── Modal.test.ts     # モーダルコンポーネントのユニットテスト
│       ├── features/      # 各ページごとの機能のユニットテスト
│       │   ├── home/      # ホームページのユニットテスト
│       │   │   ├── api/   # ホームページ関連API呼び出しのユニットテスト
│       │   │   │   └── homeApi.test.ts
│       │   │   ├── components/    # ホームページ固有のコンポーネントのユニットテスト
│       │   │   │   └── homeComponent.test.ts
│       │   │   └── hooks/         # ホームページのカスタムフックのユニットテスト
│       │   │       └── homeHook.test.ts
│       │   └── profile/  # プロフィールページのユニットテスト
│       │       ├── api/  # プロフィール関連API呼び出しのユニットテスト
│       │       │   └── profileApi.test.ts
│       │       ├── components/    # プロフィールページ固有のコンポーネントのユニットテスト
│       │       │   └── profileComponent.test.ts
│       │       └── hooks/         # プロフィールのカスタムフックのユニットテスト
│       │           └── profileHook.test.ts
│       ├── hooks/         # グローバルなカスタムフックのユニットテスト
│       │   ├── useAuth.test.ts   # 認証に関するカスタムフックのユニットテスト
│       │   └── useFetch.test.ts  # データフェッチに関するカスタムフックのユニットテスト
│       ├── lib.test.ts    # ライブラリに依存した関数のユニットテスト
│       ├── store.test.ts  # 状態管理のユニットテスト
│       └── utils.test.ts  # ユーティリティ関数のユニットテスト
│
├── types/                 # グローバルな型定義ファイル
│   └── index.d.ts         # 型定義のエントリーポイント
│
└── utils/                 # ユーティリティ関数 (Business Logic Layer)
    ├── format.ts          # 文字列フォーマットに関するユーティリティ
    └── math.ts            # 数値計算に関するユーティリティ
```

## Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/guides/vite) for details on supported features.

## Development

Run the Vite dev server:

```shellscript
pnpm dev
```

## Deployment

First, build your app for production:

```sh
pnpm build
```

Then run the app in production mode:

```sh
pnpm start
```

Now you'll need to pick a host to deploy it to.

## Test

Run the vitest test runner:

```shellscript
pnpm test
```

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
