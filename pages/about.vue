<template lang="pug">
  b-container
    section
      h2 このサイトについて
      p
        | このサイトは、仮想通貨を一定の条件を満たすことで、無料でもらうことが出来る「蛇口」へのリンクをまとめているサイトです。
        | 現時点で、 {{currencies.length}}種類の仮想通貨、{{faucets.length}}個の蛇口 ({{trusted}}個は出金確認済) が登録されています。

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

    section
      h3 トランザクション情報について
      p
        | 出金が確認できたサイトについては、トランザクション情報へのリンクを記載しております。
        | なお、使用しているアドレスについては、下記のアドレスとなります。
        br
        small
          | ※ 直接送金される物 (支払い方法が "Direct" のもの) は除外しています。
          br
          | ※ Bitcoin については、取引毎にアドレスを変更しているため、アドレスへの送金回数が1回のみとなっています。
      b-table(bordered :items="addresses.items" :fields="addresses.fields")
        template(slot="address" slot-scope="data")
          code {{data.item.address}}
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
  public addresses = {
    fields: {
      type: {
        label: "種類"
      },
      address: {
        label: "アドレス"
      }
    },
    items: [
      {
        type: "Bitcoin",
        address: "1QCXtVPtH3Z7RQ2x5bGWPpnRWkwyLnUPaN"
      },
      {
        type: "Bitcoin Cash",
        address: "bitcoincash:pqeff9unjrzy36tvrfhwtx8y2psqnzetfyk433elcx"
      },
      {
        type: "Bitcoin Cash",
        address: "bitcoincash:pr2kxfvm0cgdq9wkkvrfvzjdhr6h34q58sa0cw36hr"
      },
      {
        type: "BitCore",
        address: "1JS96M1SUScs6EoyJ4yWuzCLQkY6g53pbZ"
      },
      {
        type: "Blackcoin",
        address: "B69gaoqskF4LQ1ABqwJbFuqtuBKoNaDyts"
      },
      {
        type: "Dash",
        address: "Xi1uDYVrKn4xztPTTaLB9waRgxZGDMhSGP"
      },
      {
        type: "Dash",
        address: "XinqrYP4KD3vxFhuEniqkwa6GPRayhriqU"
      },
      {
        type: "Dogecoin",
        address: "DN2Hbq7uUjtD6WFGCTq1iuKhrJtWpVy8jb"
      },
      {
        type: "Dogecoin",
        address: "DU2g1zeQbmhXdFzx3vzSFGbkuwzduVas85"
      },
      {
        type: "Dogecoin",
        address: "DExSu5JZAh87w4Z37hiKeXA14ZHt7NCZRf"
      },
      {
        type: "Litecoin",
        address: "LbGueF6cJwWf4bcVEZ1FBEYFckhsEHdFi7"
      },
      {
        type: "Minexcoin",
        address: "XMVFjow7LDbDjUHPKANBurD4C8rjmjbHj5"
      },
      {
        type: "Monacoin",
        address: "MPTnBxjaNu6pY2jd5YFd4f9nBhzALKptrz"
      },
      {
        type: "Reddcoin",
        address: "RojBAmFMhbuw2DgiGgDDy4DT8PWqhhUviW"
      },
      {
        type: "Siacoin",
        address: "ac8f21b6f0b61b4ba2fd6094e8791a8fdfe9b15fca309bbb6b4e1d17c2d821c0a78c4eab7772"
      }
    ]
  };

  @Getter("currencies") public currencies: Currency[];

  @Getter("faucets") public faucets: Faucet[];

  public trusted: number = 0;

  public mounted(): void {
    this.trusted = this.faucets.map(w => Faucet.fromJson(w)).filter(w => w.isDirectPayment || w.hasTransaction).length;
  }
}
</script>
