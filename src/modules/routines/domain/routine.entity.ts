export class Routine {
  constructor(
    private readonly id: number,
    private name: string,
    private isCurrent: boolean,
    private nextTraining: number,
    private userId: string,
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

  getIsCurrent(): boolean {
    return this.isCurrent;
  }

  setIsCurrent(isCurrent: boolean): void {
    this.isCurrent = isCurrent;
  }

  getNextTraining(): number {
    return this.nextTraining;
  }

  setNextTraining(nextTraining: number): void {
    this.nextTraining = nextTraining;
  }

  getUserId(): string {
    return this.userId;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }
}
