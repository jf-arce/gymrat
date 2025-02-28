import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/shared/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { RoutinesModule } from './modules/routines/routines.module';
import { NationalitiesModule } from './modules/nationalities/nationalities.module';
import { RanksModule } from './modules/ranks/ranks.module';

@Module({
  imports: [
    UsersModule,
    NationalitiesModule,
    RanksModule,
    PrismaModule,
    RoutinesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
