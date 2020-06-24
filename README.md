# フロントエンド課題(React 商品登録アプリ)

## 技術要素

| feature                                                                       | description                            |
| ----------------------------------------------------------------------------- | -------------------------------------- |
| [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/lang/ja/)         | パッケージ管理ツール。                 |
| [React](https://ja.reactjs.org/)                                              | Facebook 製の仮想 DOM ライブラリ。     |
| [create-react-app](https://create-react-app.dev/)                             | Facebook 製の React の雛形作成ツール。 |
| [Prettier](https://prettier.io/)                                              | コードフォーマッタ。                   |
| [EditorConfig](https://editorconfig.org/)                                     | 汎用コードフォーマッタ。               |
| [VisualStudioCode](https://code.visualstudio.com/)                            | Microsoft 製のエディタ。               |
| [react-router](https://reacttraining.com/react-router/web/guides/quick-start) | pushState 対応ルーターライブラリ。     |

# 環境構築

## node.js のインストール

```
・[Node.jsインストール](https://nodejs.org/ja/)からNode.jsをインストールする
・バージョンの確認(v12.16.2)
 $ node -v

```

## React アプリの起動

```
$ git clone git@bitbucket.org:teamlabengineering/asada-frontend.git
cd ~/ {cloneしたディレクトリ} /asada-frontend

$ npm start
```

## json.serverの起動

```
・json-serverをインストール
$ npm install -g json-server

・json-serveを起動
$ json-server db.json

・db.json に入っているデータを取得できるかを確認
$ curl -i http://localhost:3000/products

```
