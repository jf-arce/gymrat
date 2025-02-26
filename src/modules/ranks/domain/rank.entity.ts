export class Rank {
  constructor(
    private readonly id: number,
    private number: number,
    private name: string,
    private requiredXp: number,
    private image: string | null,
  ) {}

  getId(): number {
    return this.id;
  }

  getNumber(): number {
    return this.number;
  }

  setNumber(number: number): void {
    this.number = number;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getRequiredXp(): number {
    return this.requiredXp;
  }

  setRequiredXp(requiredXp: number): void {
    this.requiredXp = requiredXp;
  }

  getImage(): string | null {
    return this.image;
  }

  setImage(image: string | null): void {
    this.image = image;
  }
}
