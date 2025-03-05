import { UserRole } from "./user-role";
import { UserSex } from "./user-sex";

export type User = {
  name: string;
  id: string;
  username: string;
  email: string;
  password: string;
  surname: string;
  role: UserRole;
  age: number;
  bio: string | null;
  weightKg: number;
  heightCm: number;
  sex: UserSex;
  xp: number;
  level: number;
  coins: number;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  nationalityId: number;
  rankId: number;
};
