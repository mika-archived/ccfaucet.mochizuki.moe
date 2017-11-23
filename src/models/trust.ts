import { IPayout } from './payout';
import { Currency } from './currency';

export interface ITrust {
  currency: Currency;
  payout: IPayout;
  payoutOriginal: string;
  txid: string;
  isInvalid: boolean;
}

export class DirectTrust implements ITrust {
  public currency: Currency;
  public payout: IPayout;
  public payoutOriginal: string;
  public txid: string;
  public isInvalid: boolean = true;
}
