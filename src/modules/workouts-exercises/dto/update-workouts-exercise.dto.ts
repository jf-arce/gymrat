import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutsExerciseDto } from './create-workouts-exercise.dto';

export class UpdateWorkoutsExerciseDto extends PartialType(CreateWorkoutsExerciseDto) {}
