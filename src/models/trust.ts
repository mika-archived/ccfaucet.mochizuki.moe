import { IPayout } from './payout';
import { Currency } from './currency';

export interface ITrust {
  currency: Currency;
  payout: IPayout;
  txid: string;
}