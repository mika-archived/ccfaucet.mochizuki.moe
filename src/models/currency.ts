export class Currency {
  public readonly lowername: string;
  public readonly id: string;

  public constructor(public name: string, public symbol: string, public explorer: string) {
    this.id = name.toLocaleLowerCase().replace(' ', '-');
    this.lowername = name.toLocaleLowerCase();
  }
}
