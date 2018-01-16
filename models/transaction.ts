import { IPayout } from './payout';
import { Currency } from './currency';

export interface ITransaction {
  payout: IPayout;
  payoutOriginal: string;
  txid: string;
  isInvalid: boolean;
}

export class DirectTransaction implements ITransaction {
  public payout: IPayout;
  public payoutOriginal: string;
  public txid: string;
  public isInvalid: boolean = true;
}
