import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ErrorHandler } from 'src/utils/error.handler';
import { GetExerciseDto } from './dto/get-exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    try {
      await this.exercisesService.create(createExerciseDto);
      return { message: 'Exercise created successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get()
  async findAll(): Promise<GetExerciseDto[]> {
    try {
      return await this.exercisesService.findAll();
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get(':userId')
  async findAllByUser(
    @Param('userId') userId: string,
  ): Promise<GetExerciseDto[]> {
    try {
      return await this.exercisesService.findAllByUser(userId);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetExerciseDto> {
    try {
      return await this.exercisesService.findOne(+id);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    try {
      await this.exercisesService.update(+id, updateExerciseDto);
      return { message: 'Exercise updated successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.exercisesService.remove(+id);
      return { message: 'Exercise deleted successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }
}
