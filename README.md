# Cryptocurrency Faucet List
[![GitHub last commit](https://img.shields.io/github/last-commit/mika-f/crypto-faucets.svg?style=flat-square)]()
[![license](https://img.shields.io/github/license/mika-f/crypto-faucets.svg?style=flat-square)](./LICENSE)

暗号通貨の蛇口リストです。  
詳しくは、 https://mochizuki.moe/crypto-faucets/#/about を参照して下さい。


## ビルド & セットアップ

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report
```


## 蛇口の追加・更新・削除について

暗号通貨の種類や単位、蛇口などのデータは、全て JSON ファイルで定義されています。  
それぞれ、以下のファイルにて定義されています。

* 暗号通貨: [`currencies.json`](./src/data/currencies.json)
* 支払い方法: [`payouts.json`](./src/data/payouts.json)
* 認証方法: [`captcha.json`](./src/data/captcha.json)
* 蛇口: [`faucets/*.json`](./src/data/faucets/)
  * Bitcoin: [`faucets/bitcoin.json`](./src/data/faucets/bitcoin.json)
  * Bitcoin Cash: [`faucets/bitcoin-cash.json`](./src/data/faucets/bitcoin-cash.json)
  * 全て `"暗号通貨名".toLocaleLowerCase().replace(' ', '-')` のファイルが参照されています。
