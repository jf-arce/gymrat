import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepositoryImp } from '../infraestructure/repositories/user.repository.imp';
import { UsersService } from '../application/users.service';
import { UserRepository } from '../domain/user.repository';
import { NationalitiesModule } from 'src/modules/nationalities/presentation/nationalities.module';
import { RanksModule } from 'src/modules/ranks/presentation/ranks.module';

@Module({
  imports: [NationalitiesModule, RanksModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UserRepository,
      useClass: UserRepositoryImp,
    },
  ],
  exports: [UserRepository],
})
export class UsersModule {}
