# 環境構築手順書

## リポジトリをクローンする
`git clone <リポジトリURL> <任意のフォルダ名>`

`cd <任意のフォルダ名>`

## 初回ビルド & 起動
`docker compose up -d --build`


## ブラウザで以下の URL にアクセスします。

http://localhost:8888
> ページに「test」と表示されれば、環境構築は成功です。


## 2 回目以降の起動・停止


### 起動
sh start.sh

### 停止
sh stop.sh