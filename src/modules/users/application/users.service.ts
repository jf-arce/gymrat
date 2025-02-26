import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../domain/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from 'src/modules/shared/dependency-injection/injectable';
import { UserRepository } from '../domain/user.repository';
import { NationalityRepository } from 'src/modules/nationalities/domain/nationality.repository';
import { GetUserDto } from './dto/get-user.dto';
import { Nationality } from 'src/modules/nationalities/domain/nationality.entity';
import { RankRepository } from 'src/modules/ranks/domain/rank.repository';
import { UserRole } from '../domain/value-objects/user-rol';
import { randomUUID } from 'crypto';
import { UserSex } from '../domain/value-objects/user-sex';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly nationalityRepository: NationalityRepository,
    private readonly rankRepository: RankRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOneByEmail(
      createUserDto.email,
    );
    if (userExists) throw new Error('User already exists');

    const lowestRank = await this.rankRepository.findByNumber(1);
    if (!lowestRank) throw new Error('Lowest rank not found');

    const userEntity = new User(
      randomUUID(),
      createUserDto.email,
      createUserDto.password,
      createUserDto.name,
      createUserDto.surname,
      UserRole.admin(),
      createUserDto.age,
      createUserDto.weightKg,
      createUserDto.heightCm,
      createUserDto.sex === UserSex.male().getValue()
        ? UserSex.male()
        : UserSex.female(),
      0, // xp
      createUserDto.image,
      new Date(),
      new Nationality(createUserDto.nationalityId, '', ''),
      lowestRank,
    );

    await this.userRepository.create(userEntity);
  }

  async findAll(): Promise<GetUserDto[]> {
    const users = await this.userRepository.findAll();
    if (users.length === 0) throw new Error('No se encontraron usuarios');
    const usersDto = users.map((user) => {
      return GetUserDto.create(user);
    });

    return usersDto;
  }

  async findOneById(id: string): Promise<GetUserDto> {
    const user = await this.userRepository.findOneById(id);
    if (!user) throw new Error('User not found');
    return GetUserDto.create(user);
  }

  async findOneByEmail(email: string): Promise<GetUserDto> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) throw new Error('User not found');
    return GetUserDto.create(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneById(id);
    if (!user) throw new Error('User not found');

    if (updateUserDto.nationalityId) {
      const nationality = await this.nationalityRepository.findOneById(
        updateUserDto.nationalityId,
      );
      if (!nationality) throw new Error('Nationality not found');
      user.setNationality(nationality || user.getNationality());
    }

    user.setEmail(updateUserDto.email || user.getEmail());
    user.setName(updateUserDto.name || user.getName());
    user.setSurname(updateUserDto.surname || user.getSurname());
    user.setAge(updateUserDto.age || user.getAge());
    user.setWeightKg(updateUserDto.weightKg || user.getWeightKg());
    user.setHeightCm(updateUserDto.heightCm || user.getHeightCm());
    user.setSex((updateUserDto.sex as unknown as UserSex) || user.getSex());
    user.setImage(updateUserDto.image || user.getImage());

    await this.userRepository.update(user);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
