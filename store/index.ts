import _ from "lodash";

import { ICaptcha } from "../models/captcha";
import { Currency } from "../models/currency";
import { Faucet } from "../models/faucet";
import { IPayout } from "../models/payout";

import { ITransaction } from "models/transaction";

interface IState {
  // captchas: ICaptcha[];
  currencies: Currency[];
  faucets: Faucet[];
  payouts: IPayout[];
}

const state = (): IState => ({
  // captchas: [],
  currencies: [],
  faucets: [],
  payouts: []
});

const mutations = {
  /*
  SET_CAPTCHAS(state: IState, payload: ICaptcha[]) {
    state.captchas = payload;
  },
  */
  SET_CURRENCIES(state: IState, payload: Currency[]) {
    state.currencies = payload;
  },
  SET_FAUCETS(state: IState, payload: Faucet[]) {
    state.faucets = payload;
  },
  SET_PAYOUTS(state: IState, payload: IPayout[]) {
    state.payouts = payload;
  }
};

const actions = {
  nuxtServerInit({ commit }, { route }) {
    const captchas = <ICaptcha[]>(require("../assets/data/captcha.json"));
    // commit("SET_CAPTCHAS", captchas);

    const payouts = <IPayout[]>(require("../assets/data/payouts.json"));
    commit("SET_PAYOUTS", payouts);

    const currencies: Currency[] = [];
    _.sortBy((require("../assets/data/currencies.json")).map((w) => new Currency(w.name, w.symbol, w.id, w.explorer)), (w: Currency) => w.name.toLocaleLowerCase()).forEach((w) => {
      currencies.push(w);
    });
    commit("SET_CURRENCIES", currencies);


    const faucets: Faucet[] = [];
    currencies.forEach((currency) => {
      const faucetsOfCurrency = _.sortBy(require(`../assets/data/faucets/${currency.id}.json`), (w) => w.name.toLocaleLowerCase());
      const txsOfCurrency: any[] = require(`../assets/data/transactions/${currency.id}.json`);
      faucetsOfCurrency.forEach((json) => {
        const faucet = Faucet.fromJson(json);
        faucet.captcha = captchas.filter((w) => json.captcha.includes(w.name));
        faucet.currency = currency;
        faucet.payout = payouts.filter((w) => w.name === json.payout)[0];

        switch (faucet.payout.txSearchMode) {
          case "default":
            faucet.tx = txsOfCurrency.filter((w) => faucet.payout.name === w.payout)[0];
            break;

          case "prefix":
            faucet.tx = txsOfCurrency.filter((w) => `${faucet.payout.name}/${faucet.name}` === w.payout)[0];
            break;
        }
        faucets.push(faucet);
      });
    });
    commit("SET_FAUCETS", faucets);
  }
};

const getters = {
  currencies: (state: IState): Currency[] => {
    return state.currencies;
  },
  findCurrency: (state: IState): (id: string) => Currency => {
    return (id: string) => state.currencies.filter((w) => w.id === id)[0];
  },
  faucets: (state: IState): Faucet[] => {
    return state.faucets;
  },
  selectFaucets: (state: IState): (id: string) => Faucet[] => {
    return (id: string) => state.faucets.filter((w) => w.currency.id === id);
  },
  payouts: (state: IState): IPayout[] => {
    return state.payouts;
  }
};

export {
  actions,
  getters,
  mutations,
  state
};
