<template lang="pug">
  b-container
    section
      h2 このサイトについて
      p
        | このサイトは、仮想通貨を無料でもらうことが出来る「蛇口」へのリンクをまとめているサイトです。
        br
        | 現在、 {{currencies.length}}種類の仮想通貨、{{faucets.length}}個の蛇口が登録されています。
        br
        | サイト名の「落ち葉拾い」は、「草コインを拾う」という意味を込めています。

    section
      h3 蛇口とは？
      p
        | 無料で Bitcoin や Monacoin などの仮想通貨をもらうことができるサイトの事です。
        | 一定の条件を満たすなどで、少額の仮想通貨をもらうことができます。
        | 多くのサイトは広告収入によって成り立っていますが、運営者の善意 (仮想通貨の普及など) によって配布されている場合もあります。
    
    section
      h3 各項目について
      p
        | 蛇口リストの各項目についての説明です。
      b-table(bordered :items="description.items" :fields="description.fields")

</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component";
import { Getter } from "vuex-class";

import { Currency } from "../models/currency";
import { Faucet } from "../models/faucet";

@Component({
  head() {
    return {
      title: "このサイトについて - 落ち葉拾い"
    };
  }
})
export default class extends Vue {
  public description = {
    fields: {
      name: {
        label: "項目名"
      },
      description: {
        label: "内容"
      }
    },
    items: [
      {
        name: "Tx",
        description: "✓ がある場合、当サイトで実際に出金を確認できた蛇口です。出金の詳細は、リンク先で確認できます。"
      },
      {
        name: "種類",
        description: "もらうことが出来る仮想通貨の種類です。 （「全て」のページのみ表示）"
      },
      {
        name: "ウェブサイト",
        description: "ウェブサイト名およびリンクです。アフィリエイトリンクとなっています。"
      },
      {
        name: "タイマー",
        description: "仮想通貨をもらえる頻度です。「生成」の場合は、時間経過によってもらえる量が増加します。"
      },
      {
        name: "支払い方法",
        description: "ウォレットへ払い出す方法です。「直接」以外は、一旦サイト側にて一定額貯まるまで補完されます。"
      },
      {
        name: "最小出金額",
        description: "払い出す際の最小出金額です。この額に満たない場合は出金できません。"
      },
      {
        name: "最小手数料",
        description: "払い出す際の最小手数料です。払い出す金額が小さい場合は、手数料が高くなる場合があります。"
      },
      {
        name: "日本円",
        description: "アクセスした時点での仮想通貨の日本円換算価格です。"
      },
      {
        name: "認証形式",
        description: "ロボットでない事を証明する CAPTCHA の種類です。"
      }
    ]
  };

  @Getter("currencies") public currencies: Currency[];

  @Getter("faucets") public faucets: Faucet[];
}
</script>
