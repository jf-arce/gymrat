import { User } from './user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findAll(): Promise<User[]>;
  abstract findOneByEmail(email: string): Promise<User | null>;
  abstract findOneById(id: string): Promise<User | null>;
  abstract update(user: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
