import { $Enums, Prisma } from '@prisma/client';

export class GetUserDto {
  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  age: number;
  weightKg: number;
  heightCm: number;
  sex: $Enums.UserSexEnum;
  xp: number;
  level: number;
  coins: number;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  nationalities: { name: string; flag: string | null };
  ranks: {
    name: string;
    image: string | null;
  };

  constructor(
    user: Omit<
      Prisma.UserGetPayload<{ include: { nationalities: true; ranks: true } }>,
      'password'
    >,
  ) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.name = user.name;
    this.surname = user.surname;
    this.age = user.age;
    this.weightKg = user.weightKg;
    this.heightCm = user.heightCm;
    this.sex = user.sex;
    this.xp = user.xp;
    this.level = user.level;
    this.coins = user.coins;
    this.image = user.image;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.nationalities = {
      name: user.nationalities.name,
      flag: user.nationalities.flag,
    };
    this.ranks = {
      name: user.ranks.name,
      image: user.ranks.image,
    };
  }

  static create(
    user: Omit<
      Prisma.UserGetPayload<{ include: { nationalities: true; ranks: true } }>,
      'password'
    >,
  ) {
    return new GetUserDto(user);
  }
}
