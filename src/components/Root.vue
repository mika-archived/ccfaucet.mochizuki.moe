<template lang="pug">
  b-container
    section
      h2 暗号通貨蛇口リスト
      p
        | 暗号通貨の蛇口リストです。
        | 絞り込み機能を使うことで、出金方法などを絞り込むことが可能です。
        br
        b
          span.text-danger 必ず、各フォーセットのルールを守った上で使用して下さい。
      p
        | 全ての蛇口を表示したい場合はメニューから「All」を、それ以外の場合は各暗号通貨アイコンをクリックすることで、絞り込んだ状態で表示することが出来ます。

    section
      h3 暗号通貨一覧
      .currencies
        template(v-for="currency in currencies")
          router-link.logo-outer(:to="`/currency/${currency.id}`")
            img.logo-inner(:src="`./static/${currency.id}.png`" :title="currency.name")


</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Currency } from "../models/currency";
import { currencyStore } from "../utils";

@Component
export default class Root extends Vue {
  public currencies: Currency[] = currencyStore;
}
</script>

<style lang="scss" scoped>
.currencies {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.logo {
  &-outer {
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-inner {
    height: 64px;
    width: 64px;
  }
}
</style>
