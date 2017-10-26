<template>
  <b-container>
    <section>
      <h2>仮想通貨・暗号通貨フォーセットリスト</h2>
      <p>
        仮想通貨・暗号通貨のフォーセット(蛇口)の一覧です。
        <br> 絞り込み機能を使うことで、 Monacoin (MONA) 限定にしたり、 Direct Payout のみ表示することも出来ます。
        <br>
        <span class="text-danger">必ず、各フォーセットのルールを守った上で使用して下さい。</span>
      </p>
    </section>
    <section>
      <b-card title="絞り込み">
        <b-form>
          <b-form-row>
            <b-col col md="12">
              <form-checkbox-group-impl field-text="name" field-value="symbol" :options="currencies" label="通貨" v-model="selectedCurrencies" />
            </b-col>
            <b-col col md="12">
              <form-checkbox-group-impl field-text="name" field-value="id" :options="payouts" label="支払い方法" v-model="selectedPayouts" />
            </b-col>
          </b-form-row>
        </b-form>
      </b-card>
    </section>
    <section>
      <b-table bordered striped hover show-empty empty-text="アイテムが見つかりませんでした" :items="filtered()" :fields="fields">
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
        <template slot="price" slot-scope="data">
          {{pricing(data.item)}}
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
      const _faucets = _.sortBy(require(`../data/faucets/${w.name.toLowerCase().replace(' ', '-')}.json`), (w) => w.name.toLowerCase())
      _.forEach(_faucets, (v) => {
        if (b) {
          v.url = v.url.replace(/(\?)?r(ef)?(=|\/).*/g, '')
        }
        faucets.push(Object.assign(v, {currency: w.symbol}))
      })
    })
    return {
      currencies,
      faucets,
      fields: {
        currency: {label: '通貨'},
        website: {label: 'ウェブサイト'},
        frequency: {label: '支払い間隔'},
        payout: {label: '支払い方法'},
        minimumAmount: {label: '最小出金額'},
        price: {label: '日本円'}
      },
      payouts: require('../data/payouts.json'),
      selectedCurrencies: [],
      selectedPayouts: [],
      tickers: null
    }
  },
  methods: {
    filtered: function() {
      return _.filter(this.$data.faucets, (w) => {
        return this.selectedCurrencies.includes(w.currency) && this.selectedPayouts.includes(w.payout)
      })
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
      return `${payout.min[currency.name.toLowerCase().replace(' ', '-')]} ${currency.symbol}`
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
</style>
