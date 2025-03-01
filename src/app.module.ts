import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/shared/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { RoutinesModule } from './modules/routines/routines.module';
import { NationalitiesModule } from './modules/nationalities/nationalities.module';
import { RanksModule } from './modules/ranks/ranks.module';
import { WorkoutsModule } from './modules/workouts/workouts.module';
import { ConfigModule } from '@nestjs/config';
import { envs, envsValidationSchema } from './options/envs.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envs],
      isGlobal: true,
      validationSchema: envsValidationSchema,
    }),
    PrismaModule,
    UsersModule,
    NationalitiesModule,
    RanksModule,
    RoutinesModule,
    WorkoutsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
