import { Module } from '@nestjs/common';
import { WorkoutsExercisesService } from './workouts-exercises.service';
import { WorkoutsExercisesController } from './workouts-exercises.controller';

@Module({
  controllers: [WorkoutsExercisesController],
  providers: [WorkoutsExercisesService],
})
export class WorkoutsExercisesModule {}
