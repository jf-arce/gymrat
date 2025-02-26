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
      weight_kg,
      height_cm,
      sex,
      xp,
      image,
      created_at,
      nationalities,
      ranks,
    } = data;

    return new User(
      id,
      email,
      password,
      name,
      surname,
      role as unknown as UserRole,
      age,
      weight_kg,
      height_cm,
      sex as unknown as UserSex,
      xp,
      image,
      created_at,
      new Nationality(nationalities.id, nationalities.name, nationalities.flag),
      new Rank(
        ranks.id,
        ranks.number,
        ranks.name,
        ranks.required_xp,
        ranks.image,
      ),
    );
  }
}
