## ディレクトリ構成

```sh
./app
├── .server     # Remix Viteでは.serverディレクトリのみサポートしている
│  ├── actions # action用のコードを配置するディレクトリ
│  │  ├── index.ts
│  │  ├── ...色々なaction
│  │  └── indexAction
│  │     ├── index.ts
│  │     └── index.spec.ts
│  └── loaders # loader用のコードを配置するディレクトリ
│     ├── index.ts
│     ├── ...色々なloaderファイル
│     ├── indexLoader
│     │  ├── index.ts
│     │  └── index.spec.ts
│     └── rootLoader
│        ├── index.ts
│        └── index.spec.ts
│
├── components  # Reactコンポーネントを配置するディレクトリ
│  ├── ...色々なコンポーネント
│  └── index.ts
│
├── lib         # ライブラリに依存する関数を配置するディレクトリ
│  ├── ...色々なライブラリに関する関数
│  └── tailwind.ts
│
├── entry.client.tsx
├── entry.server.tsx
├── root.tsx
│
└── routes      # route用のコードを配置するディレクトリ
    ├── ...色々なrouteファイル
    └── _index.tsx

./test
├── lib         # テスト用のサーバーサイドコードを配置するディレクトリ
│  └── tailwind.spec.ts # action用のテストコードを配置するディレクトリ
└── components  # コンポーネントのテストコードを配置するディレクトリ
    └── ColorText.spec.ts
```

## loaderとactionをどう書くか

RemixのページはRouteファイルを作成します。Routeファイルには、サーバー側で実行されるコードとクライアント側で実行されるコードの両方が書けますが、とりわけサーバー側で実行されるloaderモジュールとactionモジュールは肥大化しがちです。

そうなってくると、中の処理を関数に切り出したりするわけですが、それならば、そもそも両モジュールを別ファイルに書きたいよねとなってきます。

そんなわけで、必然的にloaderモジュールとactionモジュールは別ファイルに書いて、Routeファイルからexportする構成になりました。

Remixでは、サーバー側のコードは.serverモジュールという仕組みを使ってクライアントコードへの混入を防ぐ仕組みがあります。

Remix Viteからは、サーバー.server ディレクトリのみサポートするということなので、サーバー側で実行するloaderとactionは .server ディレクトリ配下に作成した actions と loaders というディレクトリで管理します。

actions と loaders ディレクトリの下には各Routeファイル用のモジュールを配置することで、各モジュールのテストコードも自然と同じ場所に置けるようになります。

### loaderの書き方

例えば、Routeファイル \_index.tsx で使うloaderモジュール（.server/loaders/indexLoader/index.ts）を次のように書いて作成します。

```ts
// .server/loaders/indexLoader/index.ts
import type { LoaderFunctionArgs } from '@remix-run/node';

export async function indexLoader({ request }: LoaderFunctionArgs) {
  // 色々なコードを書く
  return {
    // 色々なものを返す
  };
}

// loaderの戻り値の型も一緒に返しておくとuseLoaderDataで便利に使える
export type indexLoader = typeof indexLoader;
```

あわせてテストコードを次のように書きます

```ts
// .server/loaders/indexLoader/index.spec.ts
import { indexIndexLoader } from '.';
import type { LoaderFunctionArgs } from '@remix-run/node';

test('return valid data', async () => {
  const loaderFunctionArgs: LoaderFunctionArgs = {
    request: new Request('https://example.com', {
      method: 'GET',
    }),
    params: {},
    context: {},
  };
  const loaderData = await indexIndexLoader(loaderFunctionArgs);
  const res = await loaderData.json();
  expect(res).toEqual({
    // loaderが返すデータ
  });
});
```

最後に .server/loaders/index.ts からexportしておきます。

```ts
// .server/loaders/index.ts
export * from './indexLoader';
```

このようにして作成したloaderモジュールは、Routeファイル \_index.tsx で次のようにして利用します。

```tsx
// routes/_index.tsx
import { useLoaderData } from "@remix-run/react";
import type { IndexIndexLoader } from "~/.server/loaders";
// Routeファイルからas loaderとしてexportすれば、loaderモジュールとして機能する
export { indexIndexLoader as loader } from "~/.server/loaders";

export default function Index() {
  // IndexIndexLoaderを指定することで、dataに型情報がつく
  const data = useLoaderData<IndexIndexLoader>();
  return (
    // クライアントコンポーネントでdataを利用する
  )
}
```

### actionの書き方

例えば、Routeファイル \_index.tsx で使うactionモジュール（.server/actions/indexAction/index.ts）を次のように書いて作成します。

```ts
// .server/actions/indexAction/index.ts
import type { ActionFunctionArgs } from '@remix-run/node';

export async function indexAction({ request }: ActionFunctionArgs) {
  // 色々なコードを書く
  return {
    // 色々なものを返す
  };
}

// actionの戻り値の型も一緒に返しておくとuseActionDataで便利に使える
export type IndexIndexAction = typeof indexAction;
```

あわせてテストコードを次のように書きます

```ts
// .server/actions/indexAction/index.spec.ts
import { indexIndexAction } from '.';
import type { ActionFunctionArgs } from '@remix-run/node';

test('return valid data', async () => {
  const actionFunctionArgs: ActionFunctionArgs = {
    request: new Request('https://example.com', {
      method: 'GET',
    }),
    params: {},
    context: {},
  };
  const actionData = await indexIndexAction(actionFunctionArgs);
  const res = await actionData.json();
  expect(res).toEqual({
    // actionが返すデータ
  });
});
```

最後に .server/actions/index.ts からexportしておきます。

```ts
// .server/actions/index.ts
export * from './indexAction';
```

このようにして作成したactionモジュールは、Routeファイル \_index.tsx で次のようにして利用します。

```tsx
// routes/_index.tsx
import { useActionData } from "@remix-run/react";
import type { IndexIndexAction } from "~/.server/actions";
// Routeファイルからas actionとしてexportすれば、actionモジュールとして機能する
export { indexIndexAction as action } from "~/.server/actions";

export default function Index() {
  // IndexIndexActionを指定することで、dataに型情報がつく
  const data = useActionData<IndexIndexAction>();
  return (
    // クライアントコンポーネントでdataを利用する
  )
}
```

## ライブラリに依存する関数をどう書くか

ライブラリに依存する関数は、libディレクトリに配置します。

例えば、tailwindcssの色を指定する関数を作成する場合、次のようにして作成します。

```ts
// lib/tailwind.ts
export function color(colorName: string) {
  switch (colorName) {
    case 'red':
      return 'text-red-500';
    case 'blue':
      return 'text-blue-500';
    default:
      return 'text-black';
  }
}
```

このようにして作成した関数は、コンポーネントで次のようにして利用します。

```tsx
// components/ColorText.tsx
import { color } from '~/lib/tailwind';

export default function ColorText({ colorName }: { colorName: string }) {
  return <span className={color(colorName)}>Hello, world!</span>;
}
```

## コンポーネントをどう書くか

コンポーネントは、componentsディレクトリに配置します。

例えば、ColorTextコンポーネントを作成する場合、次のようにして作成します。

```tsx
// components/ColorText.tsx
import { color } from '~/lib/tailwind';

export default function ColorText({ colorName }: { colorName: string }) {
  return <span className={color(colorName)}>Hello, world!</span>;
}
```

このようにして作成したコンポーネントは、Routeファイル \_index.tsx で次のようにして利用します。

```tsx
// routes/_index.tsx
import ColorText from '~/components/ColorText';

export default function Index() {
  return (
    <div>
      <ColorText colorName='red' />
    </div>
  );
}
```

## ルートファイルをどう書くか

ルートファイルは、routesディレクトリに配置します。

例えば、indexルートファイルを作成する場合、次のようにして作成します。

```tsx
// routes/_index.tsx
import { useLoaderData } from '@remix-run/react';
import type { IndexIndexLoader } from '~/.server/loaders';
import type { IndexIndexAction } from '~/.server/actions';
import ColorText from '~/components/ColorText';

export { indexIndexLoader as loader } from '~/.server/loaders';
export { indexIndexAction as action } from '~/.server/actions';

export default function Index() {
  const loaderData = useLoaderData<IndexIndexLoader>();
  const actionData = useActionData<IndexIndexAction>();
  return (
    <div>
      <ColorText colorName='red' />
    </div>
  );
}
```

## エントリーポイントをどう書くか

エントリーポイントは、entry.client.tsx と entry.server.tsx に分けて配置します。

例えば、entry.client.tsx と entry.server.tsx を次のようにして作成します。

```tsx
// entry.client.tsx
import React from 'react';
import { RemixBrowser } from '@remix-run/react/browser';

export default function App() {
  return (
    <RemixBrowser>
      <div>
        <h1>Hello, world!</h1>
      </div>
    </RemixBrowser>
  );
}
```

```tsx
// entry.server.tsx
import React from 'react';
import { RemixServer } from '@remix-run/react/server';

export default function App() {
  return (
    <RemixServer>
      <div>
        <h1>Hello, world!</h1>
      </div>
    </RemixServer>
  );
}
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
