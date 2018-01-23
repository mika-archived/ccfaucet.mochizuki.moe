<template lang="pug">
  b-container
    section
      b-alert(show) 現在、ページリロードもしくは直アクセスすると、絞り込み機能が使えない場合があります。その場合は、一旦別ページに移動してから再度このページにアクセスすると、正常に表示されます。

    section
      h2
        img.title(:src="`./${currency.id}.png`")
        | {{currency.name}} の蛇口一覧

    section
      b-card(title="絞り込み")
        b-form
          b-form-row
            b-col(sm="12")
              form-checkbox-group-impl(field-text="name" field-value="name" :options="payouts" label="支払い方法" v-model="selectedPayouts")

    section
      b-table.fill-table(bordered striped responsive="" hover show-empty empty-text="アイテムが見つかりませんでした" :items="filteredItems()" :fields="tableFields")
        template(slot="trust" slot-scope="data")
          template(v-if="data.item.isDirectPayment")
            | ✓
          template(v-if="data.item.hasTransaction")
            template(v-if="data.item.tx.isInvalid")
              | ✓
            template(v-else)
              a(:href="`${data.item.currency.explorer}${data.item.tx.txid}`" target="_blank") ✓
        template(slot="currency" slot-scope="data")
          span {{data.item.currency.name}}
        template(slot="website" slot-scope="data")
          a(:href="isPureUrl ? purelize(data.item.url) : data.item.url" target="_blank") {{data.item.name}}
        template(slot="frequency" slot-scope="data")
          span {{data.item.formatFrequency()}}
        template(slot="payout" slot-scope="data")
          template(v-if="data.item.payout.url !== ''")
            a(:href="data.item.payout.url" target="_blank") {{data.item.payout.name}}
          template(v-else)
            span {{data.item.payout.name}}
        template(slot="minimum" slot-scope="data")
          span {{data.item.formatMinimum()}}
        template(slot="fee" slot-scope="data")
          span {{data.item.formatFee()}}
        template(slot="captcha" slot-scope="data")
          b-badge.badge(v-for="w in data.item.captcha" :key="w.name" :variant="w.color") {{w.name}}

</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component";
import { Getter } from "vuex-class";

import FormCheckboxGroupImpl from "../../components/CheckboxGroupImpl.vue";
import { Bitcoin, Currency } from "../../models/currency";
import { Faucet } from "../../models/faucet";
import { IPayout } from "../../models/payout";

@Component({
  components: {
    "form-checkbox-group-impl": FormCheckboxGroupImpl
  },
  head() {
    return {
      title: this.title,
      meta: this.meta
    };
  },
  async asyncData({ store, params }) {
    const currency = store.getters.findCurrency(params.id);
    return await Promise.resolve({
      title: `${currency.name} の蛇口一覧 - 落ち葉拾い`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${currency.name} の蛇口一覧です。蛇口情報の他、払い出し方法などで絞り込むことも出来ます。`
        },
        { hid: "keywords", name: "keywords", content: [currency.name, "faucet", "蛇口"].join(", ") }
      ],
      currency
    });
  }
})
export default class extends Vue {
  public currency: Currency = new Bitcoin();
  public title: string = "";
  public tableFields = {
    trust: { label: "Tx" },
    website: { label: "ウェブサイト" },
    frequency: { label: "タイマー" },
    payout: { label: "支払い方法" },
    minimum: { label: "最小出金額" },
    fee: { label: "最小手数料" },
    captcha: { label: "認証形式" }
  };
  public meta: any[] = [];
  public selectedFields: string[] = [];
  public selectedPayouts: string[] = [];
  public faucets: Faucet[] = [];

  @Getter("faucets") public _faucets: string[];

  @Getter("payouts") public payouts: IPayout[];

  @Getter("findCurrency") public findCurrency: (id: string) => Currency;

  @Getter("selectFaucets") public selectFaucets: (id: string) => Faucet[];

  public get isPureUrl(): boolean {
    return localStorage.getItem("disableAffiliate") !== null;
  }

  public filteredItems(): Faucet[] {
    return this.faucets.filter(w => this.selectedPayouts.includes(w.payout.name));
  }

  public mounted(): void {
    // this.currency = this.findCurrency((this as any).$route.params.id);
    this.faucets = this.selectFaucets((this as any).$route.params.id).map(w => Faucet.fromJson(w));
  }

  public purelize(url: string): string {
    return url.replace(/(\?)?(ref|r|i)(=|\/).*/g, "");
  }
}
</script>

<style lang="scss" scoped>
h2 {
  vertical-align: middle;

  .title {
    height: 36px;
    width: 36px;
    margin-right: 10px;
  }

  img {
    vertical-align: text-bottom;
  }
}

.fill-table {
  min-width: 100%;
  max-width: 100%;
  white-space: nowrap;
}

.badge {
  margin: 0 0.5px;
}
</style>
