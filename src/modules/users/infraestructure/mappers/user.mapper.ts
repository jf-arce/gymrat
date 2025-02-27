import { Nationality } from 'src/modules/nationalities/domain/nationality.entity';
import { User } from '../../domain/user.entity';
import { UserRole } from '../../domain/value-objects/user-rol';
import { UserSex } from '../../domain/value-objects/user-sex';
import { Prisma } from '@prisma/client';
import { Rank } from 'src/modules/ranks/domain/rank.entity';

interface UserDbType
  extends Prisma.UserGetPayload<{
    include: {
      nationalities: true;
      ranks: true;
    };
  }> {}

export class UserMapper {
  static toDomain(data: UserDbType): User {
    const {
      id,
      email,
      password,
      name,
      surname,
      role,
      age,
      weightKg,
      heightCm,
      sex,
      xp,
      image,
      createdAt,
      nationalities,
      ranks,
    } = data;

    return new User(
      id,
      email,
      password,
      name,
      surname,
      new UserRole(role as 'user' | 'admin'),
      age,
      weightKg,
      heightCm,
      new UserSex(sex as 'male' | 'female'),
      xp,
      image,
      createdAt,
      new Nationality(nationalities.id, nationalities.name, nationalities.flag),
      new Rank(
        ranks.id,
        ranks.number,
        ranks.name,
        ranks.requiredXp,
        ranks.image,
      ),
    );
  }
}
