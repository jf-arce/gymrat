import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/shared/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { RoutinesModule } from './modules/routines/routines.module';
import { NationalitiesModule } from './modules/nationalities/nationalities.module';
import { RanksModule } from './modules/ranks/ranks.module';
import { WorkoutsModule } from './modules/workouts/workouts.module';
import { ConfigModule } from '@nestjs/config';
import { envs, envsValidationSchema } from './options/envs.config';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { WorkoutsExercisesModule } from './modules/workouts-exercises/workouts-exercises.module';
import { SetsModule } from './modules/sets/sets.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envs],
      isGlobal: true,
      validationSchema: envsValidationSchema,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    NationalitiesModule,
    RanksModule,
    RoutinesModule,
    WorkoutsModule,
    ExercisesModule,
    WorkoutsExercisesModule,
    SetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
