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

@Controller('workouts-exercises')
export class WorkoutsExercisesController {
  constructor(
    private readonly workoutsExercisesService: WorkoutsExercisesService,
  ) {}

  @Post()
  create(@Body() createWorkoutsExerciseDto: CreateWorkoutsExerciseDto) {
    return this.workoutsExercisesService.create(createWorkoutsExerciseDto);
  }

  @Get()
  findAll() {
    return this.workoutsExercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsExercisesService.findOne(+id);
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
