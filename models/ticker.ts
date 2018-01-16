export interface ITicker {
  id: string;
  name: string;
  symbol: string;
  rank: string;
  price_usd: string;
  price_btc: string;
  price_jpy: string;
  "24h_volume_usd": string;
  "24h_volume_jpy": string;
  market_cap_usd: string;
  market_cap_jpy: string;
  available_supply: string;
  total_supply: string;
  max_supply: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  last_udates: string;
}

export class DefaultTicker implements ITicker {
  public id: string;
  public name: string;
  public symbol: string;
  public rank: string;
  public price_usd: string;
  public price_btc: string;
  public price_jpy: string = "N/A";
  public "24h_volume_usd": string;
  public "24h_volume_jpy": string;
  public market_cap_usd: string;
  public market_cap_jpy: string;
  public available_supply: string;
  public total_supply: string;
  public max_supply: string;
  public percent_change_1h: string;
  public percent_change_24h: string;
  public percent_change_7d: string;
  public last_udates: string;
} 