import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/presentation/users.module';
import { NationalitiesModule } from './modules/nationalities/presentation/nationalities.module';
import { RanksModule } from './modules/ranks/presentation/ranks.module';
import { PrismaModule } from './modules/shared/prisma/prisma.module';

@Module({
  imports: [UsersModule, NationalitiesModule, RanksModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
