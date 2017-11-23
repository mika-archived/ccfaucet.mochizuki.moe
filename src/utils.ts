import _ from "lodash";

import { ICaptcha } from "./models/captcha";
import { Currency } from "./models/currency";
import { IFaucet, Faucet } from "./models/faucet";
import { IPayout } from "./models/payout";
import { ITrust } from "./models/trust";

import * as _captchas from "./data/captcha.json"
import * as _currencies from "./data/currencies.json";
import * as _payouts from "./data/payouts.json";

let _faucets: Faucet[] = [];
let _trusts: ITrust[] = [];

export function captchas(): ICaptcha[] {
  return <ICaptcha[]>(<any>_captchas);
}

export function currencies(): Currency[] {
  return _.sortBy((<any>_currencies).map((w) => new Currency(w.name, w.symbol, w.explorer, w.logo)), (w: Currency) => w.name.toLocaleLowerCase());
}

export function faucets(): Faucet[] {
  if (_faucets.length > 0) {
    console.log('cache');
    return _faucets;
  } else {
    currencies().forEach((currency) => {
      const faucets = _.sortBy(require(`./data/faucets/${currency.id}.json`), (w) => w.name.toLocaleLowerCase());
      faucets.forEach((faucet) => {
        const fixed: Faucet = Faucet.fromJson(faucet);
        fixed.captcha = captchas().filter((w) => faucet.captcha.includes(w.name));
        fixed.currency = currency;
        fixed.payout = payouts().filter((w) => w.name === faucet.payout)[0];
        fixed.pureUrl = (<string>faucet.url).replace(/(\?)?(ref|r|i)(=|\/).*/g, "");
        fixed.trusted = isTrusted(fixed);

        _faucets.push(fixed);
      });

    });
    return _faucets;
  }
}

export function payouts(): IPayout[] {
  return <IPayout[]>(<any>_payouts);
}

export function trusts(): ITrust[] {
  if (_trusts.length > 0) {
    return _trusts;
  } else {
    currencies().forEach((currency) => {
      const trusts = require(`./data/trusts/${currency.id}.json`);
      trusts.forEach((trust) => {
        const fixed: ITrust = trust;
        fixed.currency = currency;
        fixed.payout = resolveTrustedPayout(trust.payout);
        _trusts.push(fixed);
      });
    });
    return _trusts;
  }
}

function resolveTrustedPayout(name: string): IPayout {
  const payout = payouts().filter((w) => w.name === name)[0];
  if (payout) {
    return payout;
  }
  return faucets().filter((w) => w.name === name.replace("Pooling/", ""))[0].payout;
}

function isTrusted(faucet: IFaucet): boolean {
  return false;
}