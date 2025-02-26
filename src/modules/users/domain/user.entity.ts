import { Nationality } from 'src/modules/nationalities/domain/nationality.entity';
import { UserRole } from './value-objects/user-rol';
import { UserSex } from './value-objects/user-sex';
import { Rank } from 'src/modules/ranks/domain/rank.entity';

export class User {
  constructor(
    private readonly id: string,
    private email: string,
    private password: string,
    private name: string,
    private surname: string,
    private role: UserRole,
    private age: number,
    private weightKg: number,
    private heightCm: number,
    private sex: UserSex,
    private xp: number,
    private image: string | null,
    private createdAt: Date,
    private nationality: Nationality,
    private rank: Rank,
  ) {}

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getSurname(): string {
    return this.surname;
  }

  setSurname(surname: string): void {
    this.surname = surname;
  }

  getRole(): UserRole {
    return this.role;
  }

  setRole(role: UserRole): void {
    this.role = role;
  }

  getAge(): number {
    return this.age;
  }

  setAge(age: number): void {
    this.age = age;
  }

  getWeightKg(): number {
    return this.weightKg;
  }

  setWeightKg(weightKg: number): void {
    this.weightKg = weightKg;
  }

  getHeightCm(): number {
    return this.heightCm;
  }

  setHeightCm(heightCm: number): void {
    this.heightCm = heightCm;
  }

  getSex(): UserSex {
    return this.sex;
  }

  setSex(sex: UserSex): void {
    this.sex = sex;
  }

  getXp(): number {
    return this.xp;
  }

  setXp(xp: number): void {
    this.xp = xp;
  }

  getImage(): string | null {
    return this.image;
  }

  setImage(image: string | null): void {
    this.image = image;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  getNationality(): Nationality {
    return this.nationality;
  }

  setNationality(nationality: Nationality): void {
    this.nationality = nationality;
  }

  getRank(): Rank {
    return this.rank;
  }

  setRank(rank: Rank): void {
    this.rank = rank;
  }
}
