export class Currency {
  public readonly lowername: string;
  public readonly id: string;
  public readonly logo: ILogo;

  public constructor(public name: string, public symbol: string, public explorer: string, logo: any) {
    this.id = name.toLocaleLowerCase().replace(' ', '-');
    this.lowername = name.toLocaleLowerCase();
    this.logo = {
      license: logo ? logo.license : "",
      href: logo ? (logo.link ? logo.link.href : "") : "",
      text: logo ? (logo.text ? logo.link.text : "") : ""
    } as ILogo;
  }
}

interface ILogo {
  license: string;
  href: string;
  text: string;
}