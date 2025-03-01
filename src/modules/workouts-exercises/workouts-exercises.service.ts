import { Injectable } from '@nestjs/common';
import { CreateWorkoutsExerciseDto } from './dto/create-workouts-exercise.dto';
import { UpdateWorkoutsExerciseDto } from './dto/update-workouts-exercise.dto';

@Injectable()
export class WorkoutsExercisesService {
  create(createWorkoutsExerciseDto: CreateWorkoutsExerciseDto) {
    return 'This action adds a new workoutsExercise';
  }

  findAll() {
    return `This action returns all workoutsExercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workoutsExercise`;
  }

  update(id: number, updateWorkoutsExerciseDto: UpdateWorkoutsExerciseDto) {
    return `This action updates a #${id} workoutsExercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} workoutsExercise`;
  }
}
