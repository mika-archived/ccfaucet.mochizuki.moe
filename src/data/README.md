# データ構造について

## `captcha.json`

人間証明に用いる CAPTCHA の種類。

```javascript
// Sample
{
  "name": "reCAPTCHA",
  "color": "primary"
}
```

| Field | Required | Desc |
| ----- | -------- | ---- |
| `name` | Yes | CAPTCHA サービス名 |
| `color` | Yes | バッジ表示カラー (参照: [Badge - BootstrapVue](https://bootstrap-vue.js.org/docs/components/badge#contextual-variations))



## `currencies.json`

サポートしている暗号通貨の種類とその情報。

```javascript
// Sample
{
  "name": "Bitcoin",
  "symbol": "BTC",
  "explorer": "https://chainflyer.bitflyer.jp/Transaction/",
  "logo": {
    "license": "Public Domain",
    "source": "https://en.bitcoin.it/wiki/Promotional_graphics"
  }
}
```

| Field | Required | Desc |
| ----- | -------- | ---- |
| `name` | Yes | 暗号通貨名 |
| `symbol` | Yes | 暗号通貨通貨記号 |
| `exlorer` | No | ブロックエクスプローラーのトランザクション URL |
| `logo` | Yes | -> |
| `logo.license` | Yes | ロゴファイルライセンス |
| `logo.link` | Yes | -> |
| `logo.link.href` | Yes | 権利者ページ URL |
| `logo.link.text` | Yes | 権利者名 |


## `payouts.json`

支払い方法/サービスと手数料などの情報。


```javascript
// Sample 1
{
  "name": "Direct",
  "minimum": 0,
  "fee": 0,
  "requireRes": false,
  "txSearchMode": "none",
  "url": ""
}

// Sample 2
{
  "name": "CoinPot",
  "minimum": {
    "bitcoin": 0.0001,
    "dogecoin": 50,
    "litecoin": 0.002,
    "bitcoin-cash": 0.0001,
    "dash": 0.0002
  },
  "fee": {
    "bitcoin": 0.00001,
    "dogecoin": 0,
    "litecoin": 0,
    "bitcoin-cash": 0,
    "dash": 0
  },
  "requireRes": true,
  "txSearchMode": "default",
  "url": "https://coinpot.co"
}
```

| Field | Required | Desc |
| ----- | -------- | ---- |
| `name` | Yes | 支払い方法もしくはサービス名 |
| `minimum` | Yes | 最小出金額 (Object の場合、 `requireRes` を `true` に) |
| `fee` | Yes | 最小手数料 (Object の場合、 `requireRes` を `true` に) |
| `requireRes` | Yes | `minimum` / `fee` の参照が必要か |
| `txSearchMode` | Yes | Tx の検索方法 (`default` / `none` / `prefix`) |
| `url` | Yes | サービス URL |


## `faucets/*.json`

蛇口サイトの情報。


```javascript
// Sample 1
{
  "name": "SA BitZeny Faucet",
  "frequency": 1440,
  "payout": "Direct",
  "url": "http://shiganairingozeny.chocottokozukai.click/bitzeny/faucet_top.php",
  "captcha": [
    "reCAPTCHA"
  ]
}

// Sample 2
{
  "name": "AllInFaucet",
  "frequency": 60,
  "payout": "Pooling",
  "url": "http://namuyan.dip.jp/all_in_faucet.php",
  "minimum": 0,
  "fee": 0.1,
  "captcha": [
    "reCAPTCHA"
  ]
}
```

| Field | Required | Desc |
| ----- | -------- | ---- |
| `name` | Yes | サイト名 |
| `frequency` | Yes | 出金可能頻度 (分) |
| `payout` | Yes | 出金方法 (`payouts.json` の `name`) |
| `url` | Yes | サイト URL |
| `minimum` | No | 最小出金額 (`payout` が `Direct` の場合必須) |
| `fee` | No | 最小手数料 (`payout` が `Direct` の場合必須) |
| `captcha` | Yes | CAPTCHA (`captcha.json` の `name`) |


## `trusts/*.json`

出金時のトランザクション

```javascript
// Sample
{
  "payout": "CoinPot",
  "txid": "478a1a061c8f6eb550dbaeea8bb105deb1b44ceaa3c6bb7a50ac48c01fbdbb67"
}
```

| Field | Required | Desc |
| ----- | -------- | ---- |
| `payout` | Yes | 出金方法 (`payouts.json` の `name`) |
| `txid` | Yes | トランザクション ID |
