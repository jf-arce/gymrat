import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkoutsExercisesService } from './workouts-exercises.service';
import { CreateWorkoutsExerciseDto } from './dto/create-workouts-exercise.dto';
import { UpdateWorkoutsExerciseDto } from './dto/update-workouts-exercise.dto';
import { ErrorHandler } from 'src/utils/error.handler';

@Controller('workouts-exercises')
export class WorkoutsExercisesController {
  constructor(
    private readonly workoutsExercisesService: WorkoutsExercisesService,
  ) {}

  @Post()
  async create(@Body() createWorkoutsExerciseDto: CreateWorkoutsExerciseDto) {
    try {
      await this.workoutsExercisesService.create(createWorkoutsExerciseDto);
      return { message: 'Workout exercise created successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get()
  findAll() {
    return this.workoutsExercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsExercisesService.findOne(+id);
  }

  @Get('workout/:id')
  async findExercisesByWorkoutId(@Param('id') id: string) {
    try {
      return await this.workoutsExercisesService.findExercisesByWorkout(+id);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkoutsExerciseDto: UpdateWorkoutsExerciseDto,
  ) {
    return this.workoutsExercisesService.update(+id, updateWorkoutsExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsExercisesService.remove(+id);
  }
}
