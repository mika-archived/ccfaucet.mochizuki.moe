<template>
  <b-container>
    <section>
      <h2>仮想通貨・暗号通貨フォーセットリスト</h2>
      <p>
        仮想通貨・暗号通貨のフォーセット(蛇口)の一覧です。
        <br> 絞り込み機能を使うことで、 Monacoin (MONA) 限定にしたり、 Direct Payment のみ表示することも出来ます。
      </p>
    </section>
    <section>
      <b-card title="絞り込み">
        <b-form>
          <b-form-row>
            <b-col col md="auto">
              <b-form-group label="通貨" label-for="currency">
                <b-form-select v-model="selectedCurrency" id="currency">
                  <option value="*">全て</option>
                  <option v-for="currency in currencies" :key="currency.symbol" :value="currency.symbol">
                    {{currency.name}} ({{currency.symbol}})
                  </option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col col md="auto">
              <b-form-group label="支払い方法" label-for="payment">
                <b-form-select v-model="selectedPayment" id="payment">
                  <option value="*">全て</option>
                  <option v-for="payment in payments" :key="payment.id" :value="payment.id">
                    {{payment.name}}
                  </option>
                </b-form-select>
              </b-form-group>
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
        <template slot="payment" slot-scope="data">
          <template v-if="resolve('payments', 'id', data.item.payment).url === ''">
            {{resolve('payments', 'id', data.item.payment).name}}
          </template>
          <template v-else>
            <a :href="resolve('payments', 'id', data.item.payment).url" target="_blank">
              {{resolve('payments', 'id', data.item.payment).name}}
            </a>
          </template>
        </template>
        <template slot="minimumAmount" slot-scope="data">
          {{minimumAmount(data.item)}}
        </template>
      </b-table>
    </section>
    <l-footer />
  </b-container>
</template>

<script>
/* eslint-disable space-before-function-paren */
import _ from 'lodash'

import Footer from './Footer.vue'

export default {
  name: 'Root',
  components: {
    'l-footer': Footer
  },
  data () {
    const currencies = _.sortBy(require('../data/currencies.json'), (w) => w.name.toLowerCase())
    const faucets = []
    _.forEach(currencies, (w) => {
      const _faucets = require(`../data/faucets/${w.name.toLowerCase()}.json`)
      _.forEach(_faucets, (v) => {
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
        payment: {label: '支払い方法'},
        minimumAmount: {label: '最小出金額'}
      },
      payments: require('../data/payments.json'),
      selectedCurrency: '*',
      selectedPayment: '*'
    }
  },
  methods: {
    amount: function(data) {
      return ''
    },
    filtered: function() {
      if (this.$data.selectedCurrency === '*' && this.$data.selectedPayment === '*') {
        return this.$data.faucets
      }
      return _.filter(this.$data.faucets, (w) => {
        let bool = true
        bool &= this.$data.selectedCurrency === '*' ? true : w.currency === this.$data.selectedCurrency
        bool &= this.$data.selectedPayment === '*' ? true : w.payment === this.$data.selectedPayment
        return bool
      })
    },
    minimumAmount: function(data) {
      if (data.payment === 'Direct' || data.payment === 'Pooling') {
        return data.min || 0
      }
      const payment = this.resolve('payments', 'id', data.payment)
      return payment.min
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
    }
  }
}
</script>

<style scoped>
section {
  padding: 10px 0 20px 0;
}
</style>
