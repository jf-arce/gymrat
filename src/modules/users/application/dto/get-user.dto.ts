import { Nationality } from 'src/modules/nationalities/domain/nationality.entity';
import { User } from '../../domain/user.entity';
import { Rank } from 'src/modules/ranks/domain/rank.entity';

export class GetUserDto {
  constructor(
    public readonly id: string,
    public email: string,
    public name: string,
    public surname: string,
    public role: string,
    public age: number,
    public weightKg: number,
    public heightCm: number,
    public sex: string,
    public xp: number,
    public image: string | null,
    public nationality: Nationality,
    public rank: Rank,
  ) {}

  static create = (user: User) => {
    return new GetUserDto(
      user.getId(),
      user.getEmail(),
      user.getName(),
      user.getSurname(),
      user.getRole().getValue(),
      user.getAge(),
      user.getWeightKg(),
      user.getHeightCm(),
      user.getSex().getValue(),
      user.getXp(),
      user.getImage(),
      user.getNationality(),
      user.getRank(),
    );
  };
}
