import { ITicker } from './ticker';

export class Currency {
  public readonly lowername: string;
  public readonly id: string;

  public ticker: ITicker;

  public constructor(public name: string, public symbol: string, public fallbackId: string, public explorer: string) {
    this.id = name.toLocaleLowerCase().replace(' ', '-');
    this.lowername = name.toLocaleLowerCase();
  }

  public get hasTicker(): boolean {
    return this.ticker !== null && this.ticker !== undefined;
  }

  public get formatPrice(): string {
    if (this.hasTicker) {
      const price = parseFloat(this.ticker.price_jpy);
      const roundedPrice = price >= 1000 ? Math.round(price) : price;
      return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", currencyDisplay: "name", maximumFractionDigits: 3 }).format(roundedPrice);
    }
    return "0";
  }
}
