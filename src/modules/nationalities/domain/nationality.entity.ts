export class Nationality {
  constructor(
    private readonly id: number,
    private name: string,
    private flag: string | null,
  ) {}

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getFlag(): string | null {
    return this.flag;
  }

  setFlag(flag: string | null): void {
    this.flag = flag;
  }
}
