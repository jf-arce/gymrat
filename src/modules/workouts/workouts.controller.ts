import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { ErrorHandler } from 'src/utils/error.handler';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  async create(@Body() createWorkoutDto: CreateWorkoutDto) {
    try {
      await this.workoutsService.create(createWorkoutDto);
      return { message: 'Workout created successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.workoutsService.findAll();
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.workoutsService.findOne(+id);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    try {
      return await this.workoutsService.update(+id, updateWorkoutDto);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.workoutsService.remove(+id);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }
}
