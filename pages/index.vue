<template>
  <div>
    <section class="container">
      <h1 class="title">
        暗号通貨フォーセットリスト
      </h1>
      <p>
        暗号通貨のフォーセット(蛇口)リストです。<br> 当サイトで得た情報によって何らかの損害を得たとしても、責任を負うことは出来ません。
        <br> どのフォーセットを使用するかは、あなた自身によって決めて下さい。
      </p>
    </section>
    <section class="container">
      <div>
        <table class="table table-striped table-bordered">
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
            <tr v-for="(w, index) in faucets" :key="index">
              <td>{{relation('currencies', w.currency).name}}</td>
              <td>
                <a :href="w.url" target="_blank">
                  {{w.name}}
                </a>
              </td>
              <td>
                {{time(w.frequency)}}
              </td>
              <td>
                <template v-if="w.payment === 0 || w.payment === 1">
                  {{relation('payment_methods', w.payment).name}}
                </template>
                <template v-else>
                  <a :href="relation('payment_methods', w.payment).url" target="_blank">
                    {{relation('payment_methods', w.payment).name}}
                  </a>
                </template>
              </td>
              <td>
                <template v-if="w.payment === 0 || w.payment === 1">
                  なし
                </template>
                <template v-else>
                  {{relation('payment_methods', w.payment).min}}
                </template>
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
export default {
  data: () => {
    return require('../assets/list.json')
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    relation(target, id) {
      return this.$data[target].find((w) => w.id === id)
    },
    // eslint-disable-next-line space-before-function-paren
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
    }
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css'
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
