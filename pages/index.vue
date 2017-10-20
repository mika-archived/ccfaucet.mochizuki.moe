<template>
  <div>
    <section class="container">
      <h1 class="title">
        暗号通貨フォーセットリスト
      </h1>
      <p>
        仮想通貨・暗号通貨のフォーセット(蛇口)リストです。
      </p>
    </section>
    <section class="container">
      <div class="card">
        <div class="card-body">
          <p>
            絞り込み
          </p>
          <form action="">
            <div class="form-row">
              <div class="col-auto">
                <label for="currency">通貨</label>
                <select class="form-control" id="currency" v-model="selected">
                  <option value="*">全て</option>
                  <option v-for="currency in currencies" :key="currency.symbol" :value="currency.symbol">
                    {{currency.name}} ({{currency.symbol}})
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section class="container">
      <div>
        <table class="table table-striped table-bordered table-responsive">
          <thead>
            <tr>
              <td>暗号通貨</td>
              <td>ウェブサイト</td>
              <td>支払い間隔</td>
              <td>支払い方法</td>
              <td>最小出金額 (BTC)</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="faucet in filtered()" :key="faucet.url">
              <td>{{relation('currencies', 'symbol', faucet.currency).name}}</td>
              <td>
                <a :href="faucet.url" target="_blank">{{faucet.name}}</a>
              </td>
              <td>{{time(faucet.frequency)}}</td>
              <td>
                <template v-if="faucet.payment === 'Direct' || faucet.payment === 'Pooling'">
                  {{relation('payment', 'id', faucet.payment).name}}
                </template>
                <template v-else>
                  <a :href="relation('payment', 'id', faucet.payment).url" target="_blank">
                    {{relation('payment', 'id', faucet.payment).name}}
                  </a>
                </template>
              </td>
              <td>
                {{min(faucet, relation('payment', 'id', faucet.payment).min)}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <footer>
      <small>
        <a href="https://mochizuki.moe/donation">Donate</a>
        <br> Copyright © 2017 mochizuki.moe.
      </small>
    </footer>
  </div>
</template>

<script>
/* eslint-disable space-before-function-paren */
import _ from 'lodash'

export default {
  data: () => {
    const currencies = _.sortBy(require('../assets/currencies.json'), (w) => w.name.toUpperCase())
    const faucets = []
    currencies.map((w) => {
      const _faucets = _.sortBy(require(`../assets/faucets/${w.name.toLowerCase()}.json`), (w) => w.name.toUpperCase())
      _.forEach(_faucets, (v) => {
        faucets.push(Object.assign(v, {currency: w.symbol}))
      })
    })

    return {
      currencies,
      faucets,
      payment: require('../assets/payment.json'),
      // form
      selected: '*'
    }
  },
  methods: {
    filtered() {
      if (this.$data.selected === '*') {
        return this.$data.faucets
      }
      return _.filter(this.$data.faucets, (w) => {
        return w.currency === this.$data.selected
      })
    },
    relation(target, property, value) {
      return this.$data[target].find(w => w[property] === value)
    },
    time(minutes) {
      if (minutes === 0) {
        return 'Generate'
      } else if (minutes > 0 && minutes < 60) {
        return `${minutes} min`
      } else {
        let hour = minutes / 60
        if (hour > 1) {
          return `${hour} hours`
        } else {
          return `${hour} hour`
        }
      }
    },
    min(faucet, amount) {
      if (amount === -1) {
        return faucet.min
      }
      return amount
    }
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css'
      }
    ]
  }
}
</script>

<style>
section {
  padding: 10px 0 20px 0;
}

footer {
  text-align: center;
}
</style>
