import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { ErrorHandler } from 'src/utils/error.handler';

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Post()
  async create(@Body() createRoutineDto: CreateRoutineDto) {
    try {
      await this.routinesService.create(createRoutineDto);
      return { message: 'Routine created successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.routinesService.findAll();
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get('user/:userId')
  async findAllByUser(@Param('userId') userId: string) {
    try {
      return await this.routinesService.findAllByUser(userId);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.routinesService.findOne(+id);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoutineDto: UpdateRoutineDto,
  ) {
    try {
      await this.routinesService.update(+id, updateRoutineDto);
      return { message: 'Routine updated successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.routinesService.remove(+id);
      return { message: 'Routine deleted successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }
}
