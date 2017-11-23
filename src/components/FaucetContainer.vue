<template lang="pug">
  b-container
    section
      h2
        img.title(:src="`/static/assets/${currency.id}.png`")
        | {{currency.name}} の蛇口一覧
    section
      b-card(title="絞り込み")
        b-form
          b-form-row
            b-col(sm="12")
              form-checkbox-group-impl(field-text="name" field-value="name" :options="payouts" label="支払い方法" v-model="selectedPayouts")
    section
      b-table.table(bordered striped responsive hover show-empty empty-text="アイテムが見つかりませんでした" :items="filteredItems()" :fields="tableFields")
        template(slot="trust" slot-scope="data")
          span {{data.item.trusted ? "✓" : ""}}
        template(slot="website" slot-scope="data")
          a(:href="data.item.url" target="_blank") {{data.item.name}}
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
import _ from "lodash";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

import FormCheckboxGroupImpl from "./CheckboxGroupImpl.vue";

import { Currency } from "../models/currency";
import { Faucet } from "../models/faucet";
import { IPayout } from "../models/payout";
import { currencies, faucets, payouts } from "../utils";

@Component({
  components: {
    "form-checkbox-group-impl": FormCheckboxGroupImpl
  }
})
export default class FaucetContainer extends Vue {
  public currency: Currency = currencies()[0];
  public faucets: Faucet[] = [];
  public payouts: IPayout[] = payouts();
  public tableFields = {
    trust: { label: "信頼性" },
    website: { label: "ウェブサイト" },
    frequency: { label: "タイマー" },
    payout: { label: "支払い方法" },
    minimum: { label: "最小出金額" },
    fee: { label: "最小手数料" },
    jpy: { label: "日本円" },
    captcha: { label: "認証形式" }
  };

  // models
  public selectedFields: string[] = [];
  public selectedPayouts: string[] = [];

  public filteredItems(): Faucet[] {
    return this.faucets.filter(w => {
      return this.selectedPayouts.includes(w.payout.name);
    });
  }

  public mounted(): void {
    console.log("Hello?");
    this.currency = currencies().filter(w => w.id === this.$route.params.id)[0];
    this.faucets = faucets().filter(w => w.currency.id === this.currency.id);
  }

  @Watch("$route")
  public onRouteChanged(to, from): void {}
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

.table {
  min-width: 100%;
  max-width: 100%;
}

.badge {
  margin: 0 0.5px;
}
</style>
