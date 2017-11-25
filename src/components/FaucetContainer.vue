<template lang="pug">
  b-container
    section
      h2
        template(v-if="currency !== null")
          img.title(:src="`./static/${currency.id}.png`")
          | {{currency.name}} の蛇口一覧
        template(v-else)
          | 登録されている全ての蛇口一覧
    section
      b-card(title="絞り込み")
        b-form
          b-form-row
            template(v-if="isAll")
              b-col(sm="12")
                form-checkbox-group-impl(field-text="name" field-value="symbol" :options="currencies" label="通貨" v-model="selectedCurrencies")
            b-col(sm="12")
              form-checkbox-group-impl(field-text="name" field-value="name" :options="payouts" label="支払い方法" v-model="selectedPayouts")
    section
      b-table.fill-table(bordered striped responsive="" hover show-empty empty-text="アイテムが見つかりませんでした" :items="filteredItems()" :fields="tableFields")
        template(slot="trust" slot-scope="data")
          template(v-if="data.item.isTrust")
            template(v-if="data.item.tx.isInvalid")
              | ✓
            template(v-else)
              a(:href="`${data.item.currency.explorer}${data.item.tx.txid}`" target="_blank") ✓
        template(slot="currency" slot-scope="data")
          span {{data.item.currency.name}}
        template(slot="website" slot-scope="data")
          a(:href="isPureUrl ? data.item.pureUrl : data.item.url" target="_blank") {{data.item.name}}
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
        template(slot="jpy" slot-scope="data")
          template(v-if="isLoadedTicker")
            template(v-if="data.item.currency.hasTicker")
              a(:href="`https://coinmarketcap.com/currencies/${data.item.currency.id}/`" target="_blank") {{data.item.currency.formatPrice}}
            template(v-else)
              | N/A
          template(v-else)
            | 読み込み中...
        template(slot="captcha" slot-scope="data")
          b-badge.badge(v-for="w in data.item.captcha" :key="w.name" :variant="w.color") {{w.name}}
</template>

<script lang="ts">
import _ from "lodash";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

import FormCheckboxGroupImpl from "./CheckboxGroupImpl.vue";

import { Currency } from "../models/currency";
import { Faucet } from "../models/faucet";
import { IPayout } from "../models/payout";
import { ITicker } from "../models/ticker";
import { currencyStore, faucetStore, loadTickers, payouts } from "../utils";

@Component({
  components: {
    "form-checkbox-group-impl": FormCheckboxGroupImpl
  }
})
export default class FaucetContainer extends Vue {
  public currency: Currency | null = currencyStore[0];
  public faucets: Faucet[] = [];
  public currencies: Currency[] = currencyStore;
  public payouts: IPayout[] = payouts();
  public tableFields: any = {};
  public isLoadedTicker: boolean = currencyStore[0].hasTicker;

  // models
  public selectedCurrencies: string[] = [];
  public selectedFields: string[] = [];
  public selectedPayouts: string[] = [];

  private fieldType1 = {
    trust: { label: "信頼性" },
    website: { label: "ウェブサイト" },
    frequency: { label: "タイマー" },
    payout: { label: "支払い方法" },
    minimum: { label: "最小出金額" },
    fee: { label: "最小手数料" },
    jpy: { label: "日本円" },
    captcha: { label: "認証形式" }
  };

  private fieldType2 = {
    trust: { label: "信頼性" },
    currency: { label: "暗号通貨" },
    website: { label: "ウェブサイト" },
    frequency: { label: "タイマー" },
    payout: { label: "支払い方法" },
    minimum: { label: "最小出金額" },
    fee: { label: "最小手数料" },
    jpy: { label: "日本円" },
    captcha: { label: "認証形式" }
  };

  public get isAll(): boolean {
    return this.$route.params.id === "all";
  }

  public get isPureUrl(): boolean {
    return localStorage.getItem("disableAffilicate") !== null;
  }

  public filteredItems(): Faucet[] {
    return this.faucets.filter(w => {
      return (
        this.selectedPayouts.includes(w.payout.name) &&
        (this.isAll ? this.selectedCurrencies.includes(w.currency.symbol) : true)
      );
    });
  }

  public mounted(): void {
    this.setData();
    if (!this.isLoadedTicker) {
      (async () => {
        await loadTickers();
        this.isLoadedTicker = true;
      })();
    }
  }

  @Watch("$route")
  public onRouteChanged(to, from): void {
    this.setData();
  }

  private setData(): void {
    if (this.isAll) {
      this.tableFields = this.fieldType2;
      this.currency = null;
      this.faucets = faucetStore;
    } else {
      this.tableFields = this.fieldType1;
      this.currency = currencyStore.filter(w => w.id === this.$route.params.id)[0];
      this.faucets = faucetStore.filter(w => w.currency.id === (<Currency>this.currency).id);
    }
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
}

.badge {
  margin: 0 0.5px;
}
</style>
