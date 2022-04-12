# kinki-viewer

## インストール
- インストール `yarn install`
- `https://drive.google.com/drive/folders/1-pfdCXjePzKOG6J69TwkjIjWHEy282Ng?usp=sharing` に入っている4つの音声ファイルをダウンロードし、`renderer/public/sounds`の中に入れてください

## 開発手順
- 開発サーバー起動 `yarn dev`
- ビルド `yarn build`

## 環境

- node 16.13.1 (>= 14)
- yarn

## ライブラリ

- nextron
- Next.js v12
- three.js v136

### style
- emotion

### tween
- anime.js v3
- @tween.js/tweenjs

### store
- zustand

### lint
- eslint
- prettier

## フォルダ構成
- /main
  - nextronの設定（画面サイズなど）
- /renderer
  - 描画内容（next.js, three.jsによる描画プログラム）
- /renderer/public
  - フォントや画像ファイルなどの素材ファイル

## 利用時の注意点
- threeを用いたコンポーネントを利用するときは、dynamic import機能で`ssr:false` にする
```
// @/components/Boxはデフォルトエクスポート(export default Box)されている必要あり。
// そうでないと、dynamic importできない

const Box = dynamic(() => import('@/components/Box'), {
  ssr: false,
})

```
