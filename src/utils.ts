import axios from "axios";
import _ from "lodash";

import { ICaptcha } from "./models/captcha";
import { Currency } from "./models/currency";
import { IFaucet, Faucet } from "./models/faucet";
import { IPayout } from "./models/payout";
import { ITicker } from './models/ticker';
import { ITrust, DirectTrust } from "./models/trust";

import * as _captchas from "./data/captcha.json"
import * as _currencies from "./data/currencies.json";
import * as _payouts from "./data/payouts.json";

export const currencyStore: Currency[] = [];
export const faucetStore: Faucet[] = [];
export const trustStore: ITrust[] = [];

export function initiaize(): void {
  loadCurrencies();
  loadFaucets();
  loadTrusts();
  updateFaucets();
}

export function captchas(): ICaptcha[] {
  return <ICaptcha[]>(<any>_captchas);
}

export function payouts(): IPayout[] {
  return <IPayout[]>(<any>_payouts);
}

export async function loadTickers(): Promise<void> {
  const response = await axios.get('https://api.coinmarketcap.com/v1/ticker/?convert=JPY&limit=0');
  if (response.status === 200) {
    _.forEach(response.data, (w: ITicker) => {
      const currency = currencyStore.find((v) => v.id === w.id);
      if (currency) {
        currency.ticker = w;
      }
    });
  }
}

function loadCurrencies(): void {
  _.sortBy((<any>_currencies).map((w) => new Currency(w.name, w.symbol, w.explorer)), (w: Currency) => w.name.toLocaleLowerCase()).forEach((w) => {
    currencyStore.push(w);
  });
}

function loadFaucets(): void {
  currencyStore.forEach((currency) => {
    const faucets = _.sortBy(require(`./data/faucets/${currency.id}.json`), (w) => w.name.toLocaleLowerCase());
    faucets.forEach((faucet) => {
      const fixed: Faucet = Faucet.fromJson(faucet);
      fixed.captcha = captchas().filter((w) => faucet.captcha.includes(w.name));
      fixed.currency = currency;
      fixed.payout = payouts().filter((w) => w.name === faucet.payout)[0];
      fixed.pureUrl = (<string>faucet.url).replace(/(\?)?(ref|r|i)(=|\/).*/g, "");
      // fixed.tx = searchTx(fixed);

      faucetStore.push(fixed);
    });
  });
}

function updateFaucets(): void {
  faucetStore.forEach((faucet) => {
    faucet.tx = searchTx(faucet);
  })
}

function loadTrusts(): void {
  currencyStore.forEach((currency) => {
    const trusts = require(`./data/trusts/${currency.id}.json`);
    trusts.forEach((trust) => {
      const name = trust.payout;
      const fixed: ITrust = trust;
      fixed.currency = currency;
      fixed.payout = resolveTrustedPayout(name);
      fixed.payoutOriginal = name;

      trustStore.push(fixed);
    });
  });
}

function resolveTrustedPayout(name: string): IPayout {
  const payout = payouts().filter((w) => w.name === name)[0];
  if (payout) {
    return payout;
  }
  return faucetStore.filter((w) => w.name === name.replace("Pooling/", ""))[0].payout;
}

function searchTx(faucet: IFaucet): ITrust {
  if (faucet.payout.txSearchMode === "none") {
    return new DirectTrust();
  }
  switch (faucet.payout.txSearchMode) {
    case "default":
      return trustStore.filter((w) => faucet.currency.id === w.currency.id && faucet.payout.name === w.payout.name)[0];

    case "prefix":
      return trustStore.filter((w) => {
        return faucet.currency.id === w.currency.id && `${faucet.payout.name}/${faucet.name}` === w.payoutOriginal;
      })[0];
  }
}