import { $Enums, User as PrismaUser } from '@prisma/client';

export class UserEntity implements PrismaUser {
  name: string;
  id: string;
  username: string;
  email: string;
  password: string;
  surname: string;
  role: $Enums.UserRoleEnum;
  age: number;
  bio: string | null;
  weightKg: number;
  heightCm: number;
  sex: $Enums.UserSexEnum;
  xp: number;
  level: number;
  coins: number;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  nationalityId: number;
  rankId: number;

  constructor(user: PrismaUser) {
    Object.assign(this, user);
  }

  getFullName(): string {
    return `${this.name} ${this.surname}`;
  }
}
