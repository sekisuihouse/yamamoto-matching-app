# 山本周さんを囲む会 マッチングアプリ

本人・参加者の同意を得たイベント用の、合コン風チーム分けアプリです。参加者の話したい内容、山本周さんの好きなところ、好き度、雰囲気、希望テンションをもとに、基本3人組のチームを作ります。

## 全体設計

- フロントエンド: React + TypeScript + Vite + Tailwind CSS
- データ保存: ブラウザの `localStorage`
- マッチング: `src/lib/matching.ts` に分離
- メール送信: 現時点では `src/lib/emailPreview.ts` でプレビューのみ生成
- BGM: `/public/bgm/party-placeholder.mp3` を参照し、ユーザー操作でのみ再生

## ファイル構成

```txt
src/
  components/
    BgmPanel.tsx
    ConsentNotice.tsx
    EmailPreviewPanel.tsx
    MatchingResults.tsx
    ParticipantForm.tsx
    ParticipantList.tsx
  data/
    options.ts
  lib/
    emailPreview.ts
    matching.ts
  types/
    index.ts
  App.tsx
  main.tsx
  styles.css
public/
  bgm/
    party-placeholder.mp3
README.md
.env.example
.gitignore
```

## セットアップ

```bash
npm install
cp .env.example .env
npm run dev
```

## 開発

```bash
npm run dev
npm run build
```

`npm run dev` でローカル開発サーバーを起動します。`npm run build` で TypeScript チェックと本番ビルドを実行します。

## データ構造

参加者データは `Participant` 型で管理します。

- `name`: 名前
- `contact`: メールアドレス、または連絡先
- `topics`: 山本周さんと話したい内容
- `favoritePoints`: 山本周さんの好きなところ
- `likeLevel`: 1から5の好き度
- `vibe`: 自分の雰囲気
- `tension`: 希望する合コンテンション
- `note`: 備考
- `consent`: 同意確認
- `createdAt`: 登録日時

現在は `localStorage` に保存しています。後から Firebase、Supabase、SQLite などに移行する場合は、`Participant` 型を維持したまま保存・取得部分を差し替えてください。

## マッチングロジック

`src/lib/matching.ts` の `createTeams` がチーム生成の入口です。

類似度は以下を重み付けして計算します。

- 話したい内容の一致度
- 山本周さんの好きなところの一致度
- 好き度の近さ
- 雰囲気とテンションの一致

アルゴリズムはシンプルな greedy 方式です。未割り当て参加者から1人を起点にし、平均ペア類似度が最も高くなる参加者を追加して基本3人組にします。余りが1人になった場合は直前チームに加えて4人チームにします。

## メール送信機能

今は実送信しません。`src/lib/emailPreview.ts` で山本周さんに送る想定の本文をプレビュー生成します。

後からサーバー側のメール送信処理を追加し、`.env` の `YAMAMOTO_EMAIL` を使って送信してください。ブラウザに実メールアドレスを露出させないため、実送信は API ルートやサーバー関数側で実装する想定です。

## BGM

`public/bgm/party-placeholder.mp3` は仮ファイルです。実運用では、著作権フリーまたは利用許諾を確認した明るいポップ系BGMに差し替えてください。

- 初期状態では自動再生しません
- 再生・停止ボタンがあります
- 音量調整できます

## GitHub公開時の注意

- `.env` は `.gitignore` に含めています
- 個人情報をサンプルデータとしてコミットしないでください
- 実在人物を扱うため、本人・参加者の同意を得たイベント用途に限定してください

## GitHub公開手順

```bash
git init
git add .
git commit -m "Initial matching app"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```
