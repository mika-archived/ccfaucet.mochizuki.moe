interface IndexerObject<T> {
  [name: string]: T;
}

export interface IPayout {
  minimum: number | IndexerObject<number>;
  fee: number | IndexerObject<number>;
  trusted: boolean | IndexerObject<boolean>;
  name: string;
  url: string;
  requireRes: boolean;
}