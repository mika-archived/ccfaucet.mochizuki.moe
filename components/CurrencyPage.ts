import Vue from "vue";
import { Faucet } from "models/faucet";

export class CurrencyPage extends Vue {
  public txs = [{ name: "あり", value: "yes" }, { name: "なし", value: "no" }];
  public faucets: Faucet[] = [];

  public selectedCurrencies: string[] = [];
  public selectedFields: string[] = [];
  public selectedPayouts: string[] = [];
  public selectedTxs: string[] = [];

  public get isPureUrl(): boolean {
    return localStorage.getItem("disableAffiliate") !== null;
  }

  public purelize(url: string): string {
    return url.replace(/(\?)?(ref|r|i)(=|\/).*/g, "");
  }

  public filterCallback(faucet: Faucet): boolean {
    return true;
  }

  public filteredItems(): Faucet[] {
    return this.faucets.filter(w => {
      if (this.selectedPayouts.includes(w.payout.name) && this.filterCallback(w)) {
        if (this.selectedTxs.length === 2) {
          return true;
        } else {
          if (this.selectedTxs[0] === "yes") {
            return w.tx !== undefined || w.payout.name === "Direct";
          } else {
            return w.tx === undefined;
          }
        }
      }
      return false;
    });
  }

}