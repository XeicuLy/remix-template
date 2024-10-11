const config = {
  types: [
    {
      name: 'feat:      ✨ 新機能の追加',
      value: ':sparkles: feat',
    },
    {
      name: 'pref:      ⚡️ パフォーマンス改善',
      value: ':zap: pref',
    },
    {
      name: 'improve:   🎨 コードの構造/ロジックの改善',
      value: ':art: improve',
    },
    {
      name: 'a11y:      ♿️ アクセシビリティの向上',
      value: ':wheelchair: a11y',
    },
    {
      name: 'update:    🦺 バリデーションの追加/更新',
      value: ':safety_vest: update',
    },
    {
      name: 'assets:    🍱 アセットの追加/更新',
      value: ':bento: assets',
    },
    {
      name: 'fix:       🩹 軽微な修正',
      value: ':adhesive_bandage: fix',
    },
    {
      name: 'fix:       🐛 バグ修正',
      value: ':bug: fix',
    },
    {
      name: 'hotfix:    🚑 緊急バグ修正',
      value: ':ambulance: hotfix',
    },
    {
      name: 'typo:      ✏️ typo修正',
      value: ':pencil2: typo',
    },
    {
      name: 'refactor:  ♻️ リファクタリング',
      value: ':recycle: refactor',
    },
    {
      name: 'delete:    🔥 ファイルやコードの削除',
      value: ':fire: delete',
    },
    {
      name: 'style:     💄 UIやスタイルファイルの追加/更新',
      value: ':lipstick: style',
    },
    {
      name: 'type:      🏷️ 型の追加/更新',
      value: ':label: type',
    },
    {
      name: 'docs:      📝 ドキュメンテーションの追加/更新',
      value: ':memo: docs',
    },
    {
      name: 'docs:      💡 コメントの追加/更新',
      value: ':bulb: docs',
    },
    {
      name: 'move:      🚚 ファイルやディレクトリの移動',
      value: ':truck: move',
    },
    {
      name: 'test:      ✅ テストの追加/更新/合格',
      value: ':white_check_mark: test',
    },
    {
      name: 'chore:     🔧 設定ファイルの追加/更新',
      value: ':wrench: chore',
    },
    {
      name: 'chore:     🔨 開発スクリプトの追加/更新',
      value: ':hammer: chore',
    },
    {
      name: 'ci:        👷 CIビルドシステムの追加/更新',
      value: ':construction_worker: ci',
    },
    {
      name: 'package:   📌 依存関係を特定のバージョンに固定',
      value: ':pushpin: package',
    },
    {
      name: 'package:   📦 パッケージの追加/更新',
      value: ':package: package',
    },
    {
      name: 'WIP:       🚧 作業途中',
      value: ':construction: WIP',
    },
  ],
  messages: {
    type: 'コミットの種類（型）を選択してください:\n',
    subject: 'コミットメッセージを入力してください:\n',
    body: '変更内容の詳細があれば書いてください:（enterでスキップ）\n',
    confirmCommit: '上記のコミットを続行してもよろしいですか?(Y/n)\n',
  },
  skipQuestions: ['scope', 'breaking', 'footer'],
  subjectLimit: 100,
};

module.exports = config;
