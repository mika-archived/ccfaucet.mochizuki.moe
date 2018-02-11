<template lang="pug">
  b-container
    section
      h2 仮想通貨蛇口リスト
      p
        | 仮想通貨の蛇口リストです。
        | 絞り込み機能を使うことで、出金方法などを絞り込むことが可能です。
        br
        b
          span.text-danger 必ず、各フォーセットのルールを守った上で使用して下さい。
      p
        | 全ての蛇口を表示したい場合は、ナビゲーション「全て」から表示できます。
        br
        | 個別に表示したい場合は、下の各仮想通貨のアイコンをクリックすることで絞り込んだ状態で表示できます。

    section
      h3 仮想通貨一覧
      .currencies
        template(v-for="currency in currencies")
          router-link.logo-outer(:to="`./currencies/${currency.id}`")
            img.logo-inner(:src="`/${currency.id}.png`" :title="currency.name")

</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component";
import { Getter } from "vuex-class";

import { Currency } from "../models/currency";

@Component({
  head() {
    return {
      title: "落ち葉拾い"
    };
  }
})
export default class extends Vue {
  @Getter("currencies") public currencies: Currency[];
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
