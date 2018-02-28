import md5 from "md5";
import Vue from "vue";
import { Faucet } from "../models/faucet";

interface ICondition {
  currencies: string[];
  payouts: string[];
  txs: string[];
}

export class CurrencyPage extends Vue {
  public txs = [{ name: "あり", value: "yes" }, { name: "なし", value: "no" }];
  public faucets: Faucet[] = [];

  public selectedCurrencies: string[] = [];
  public selectedPayouts: string[] = [];
  public selectedTxs: string[] = [];

  protected isEnableStoreData: boolean = false;

  public get isPureUrl(): boolean {
    return localStorage.getItem("disableAffiliate") !== null;
  }

  private get pageKey(): string {
    return md5(location.pathname);
  }

  public purelize(url: string): string {
    return url.replace(/(\?)?(ref|r|i)(=|\/).*/g, "");
  }

  public filterCallback(faucet: Faucet): boolean {
    return true;
  }

  public filteredItems(): Faucet[] {
    this.store();
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

  protected store(): void {
    if (!this.isEnableStoreData) {
      return;
    }

    const data = {
      currencies: this.selectedCurrencies,
      payouts: this.selectedPayouts,
      txs: this.selectedTxs
    } as ICondition;
    localStorage.setItem(this.pageKey, JSON.stringify(data));
  }

  protected restore(): void {
    if (!localStorage.getItem(this.pageKey)) {
      return;
    }

    const data = JSON.parse(localStorage.getItem(this.pageKey) as string) as ICondition;
    this.isEnableStoreData = false;
    this.selectedCurrencies = data.currencies;
    this.selectedPayouts = data.payouts;
    this.selectedTxs = data.txs;
    this.isEnableStoreData = true;
  }
}