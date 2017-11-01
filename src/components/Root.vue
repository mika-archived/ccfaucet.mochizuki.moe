<template>
  <b-container>
    <section>
      <h2>仮想通貨・暗号通貨フォーセットリスト</h2>
      <p>
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-via="MikazukiFuyuno" data-show-count="false">Tweet</a>
      </p>
      <p>
        仮想通貨・暗号通貨のフォーセット(蛇口)の一覧です。
        <br> 絞り込み機能を使うことで、 Monacoin (MONA) 限定にしたり、 Direct Payout のみ表示することも出来ます。
        <br> 各項目について説明が必要な場合は、 About ページにて説明を見ることが出来ます。
        <br>
        <span class="text-danger">必ず、各フォーセットのルールを守った上で使用して下さい。</span>
      </p>
    </section>
    <section>
      <b-card title="絞り込み">
        <b-form>
          <b-form-row>
            <b-col sm="12">
              <form-checkbox-group-impl field-text="name" field-value="symbol" :options="currencies" label="通貨" v-model="selectedCurrencies" />
            </b-col>
            <b-col sm="12">
              <form-checkbox-group-impl field-text="name" field-value="id" :options="payouts" label="支払い方法" v-model="selectedPayouts" />
            </b-col>
            <b-col sm="12">
              <form-checkbox-group-impl field-text="label" field-value="id" :options="fields" label="表示項目" v-model="selectedFields" />
            </b-col>
          </b-form-row>
        </b-form>
      </b-card>
    </section>
    <section>
      <b-table bordered striped responsive hover show-empty empty-text="アイテムが見つかりませんでした" class="l-table" :items="filteredItems()" :fields="filteredFields()">
        <template slot="currency" slot-scope="data">
          {{resolve('currencies', 'symbol', data.item.currency).name}}
        </template>
        <template slot="website" slot-scope="data">
          <a :href="data.item.url" target="_blank">{{data.item.name}}</a>
        </template>
        <template slot="frequency" slot-scope="data">
          {{readable(data.item.frequency)}}
        </template>
        <template slot="payout" slot-scope="data">
          <template v-if="resolvePayout(data).url === ''">
            {{resolvePayout(data).name}}
          </template>
          <template v-else>
            <a :href="resolvePayout(data).url" target="_blank">
              {{resolvePayout(data).name}}
            </a>
          </template>
        </template>
        <template slot="minimumAmount" slot-scope="data">
          {{minimumAmount(data.item)}}
        </template>
        <template slot="fee" slot-scope="data">
          {{fee(data.item)}}
        </template>
        <template slot="price" slot-scope="data">
          <a :href="`https://coinmarketcap.com/currencies/${lowerCurrencyName(data.item)}/`" target="_blank">{{pricing(data.item)}}</a>
        </template>
        <template slot="captcha" slot-scope="data">
          <b-badge class="l-badge" v-for="w in data.item.captcha" :key="w" :variant="variant(w)">{{w}}</b-badge>
        </template>
        <template slot="verified" slot-scope="data">
          {{verified(data.item) ? "✓" : ""}}
        </template>
      </b-table>
    </section>
  </b-container>
</template>

<script>
/* eslint-disable space-before-function-paren */
import axios from 'axios'
import _ from 'lodash'

import CheckboxGroupImlp from './CheckboxGroupImpl.vue'

export default {
  name: 'Root',
  components: {
    'form-checkbox-group-impl': CheckboxGroupImlp
  },
  data () {
    const b = this.$route.query.refer && this.$route.query.refer === 'false'
    const currencies = _.sortBy(require('../data/currencies.json'), (w) => w.name.toLowerCase())
    const faucets = []
    _.forEach(currencies, (w) => {
      const _faucets = _.sortBy(require(`../data/faucets/${this.lowerCurrencyName(w.name)}.json`), (w) => w.name.toLowerCase())
      _.forEach(_faucets, (v) => {
        if (b) {
          v.url = v.url.replace(/(\?)?(ref|r|i)(=|\/).*/g, '')
        }
        faucets.push(Object.assign(v, {currency: w.symbol}))
      })
    })
    return {
      colors: require('../data/captcha.json'),
      currencies,
      faucets,
      fields: [
        {label: '最小出金額', id: 'minimumAmount'},
        {label: '手数料', id: 'fee'},
        {label: '日本円', id: 'price'},
        {label: '認証形式', id: 'captcha'}
      ],
      payouts: require('../data/payouts.json'),
      selectedCurrencies: [],
      selectedFields: [],
      selectedPayouts: [],
      tickers: null
    }
  },
  methods: {
    fee: function(data) {
      const currency = this.resolve('currencies', 'symbol', data.currency)
      if (data.payout === 'Direct') {
        return 'N/A'
      } else if (data.payout === 'Pooling') {
        if (data.fee) {
          return `${data.fee} ${currency.symbol}`
        }
        return 'N/A'
      }
      const payout = this.resolve('payouts', 'id', data.payout)
      return `${payout.fee[this.lowerCurrencyName(currency.name)]} ${currency.symbol}`
    },
    filteredFields: function() {
      let fields = {
        verified: {label: '✓'},
        currency: {label: '通貨'},
        website: {label: 'ウェブサイト'},
        frequency: {label: 'タイマー'},
        payout: {label: '支払い方法'}
      }
      _.filter(this.$data.fields, (w) => {
        return this.selectedFields.includes(w.id)
      }).map((w) => {
        const obj = {}
        obj[w.id] = {label: w.label}
        fields = Object.assign(fields, obj)
      })
      return fields
    },
    filteredItems: function() {
      return _.filter(this.$data.faucets, (w) => {
        return this.selectedCurrencies.includes(w.currency) && this.selectedPayouts.includes(w.payout)
      })
    },
    lowerCurrencyName: function(data) {
      let name = ''
      if (data.currency) {
        name = this.resolve('currencies', 'symbol', data.currency).name
      } else {
        name = data
      }
      return name.toLocaleLowerCase().replace(' ', '-')
    },
    minimumAmount: function(data) {
      const currency = this.resolve('currencies', 'symbol', data.currency)
      if (data.payout === 'Direct' || data.payout === 'Pooling') {
        if (data.min) {
          return `${data.min} ${currency.symbol}`
        }
        return 'N/A'
      }
      const payout = this.resolve('payouts', 'id', data.payout)
      return `${payout.min[this.lowerCurrencyName(currency.name)]} ${currency.symbol}`
    },
    pricing: function(data) {
      if (this.$data.tickers === null) {
        return '読み込み中...'
      }
      const ticker = this.resolve('tickers', 'symbol', data.currency)
      if (ticker) {
        const price = ticker.price_jpy >= 1000 ? Math.round(ticker.price_jpy) : ticker.price_jpy
        return new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY', currencyDisplay: 'name', maximumFractionDigits: 3}).format(price)
      } else {
        return 'N/A'
      }
    },
    readable: function(frequency) {
      if (frequency >= 60) {
        const hours = frequency / 60
        if (hours > 1) {
          return `${hours} hours`
        } else {
          return `${hours} hour`
        }
      } else if (frequency > 0) {
        return `${frequency} min`
      } else {
        return 'Generate'
      }
    },
    resolve: function(target, property, value) {
      return this.$data[target].find((w) => w[property] === value)
    },
    resolvePayout: function(data) {
      return this.resolve('payouts', 'id', data.item.payout)
    },
    variant: function(data) {
      return this.$data.colors.find((w) => w.name === data).color
    },
    verified: function(data) {
      if (data.payout === 'Direct') {
        return true
      }
      if (data.payout === 'Pooling') {
        return data.verified
      }
      const currency = this.resolve('currencies', 'symbol', data.currency)
      const payout = this.resolve('payouts', 'id', data.payout)
      return payout.verified[this.lowerCurrencyName(currency.name)]
    }
  },
  mounted: function() {
    if (this.$data.tickers === null) {
      axios.get('https://api.coinmarketcap.com/v1/ticker/?convert=JPY')
      .then((w) => {
        this.$data.tickers = w.data
      })
      .catch((w) => {
        console.error(w)
      })
    } else {
      console.log('Already loaded, skip.')
    }
  }
}
</script>

<style scoped>
section {
  padding: 10px 0 20px 0;
}

.l-table {
  min-width: 100%;
}

.badge {
  margin: 0 0.5px;
}
</style>
