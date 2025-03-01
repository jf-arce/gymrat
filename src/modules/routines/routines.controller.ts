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
    } catch (error) {
      ErrorHandler.throwError(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.routinesService.findAll();
    } catch (error) {
      ErrorHandler.throwError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.routinesService.findOne(+id);
    } catch (error) {
      ErrorHandler.throwError(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoutineDto: UpdateRoutineDto,
  ) {
    try {
      return await this.routinesService.update(+id, updateRoutineDto);
    } catch (error) {
      ErrorHandler.throwError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.routinesService.remove(+id);
    } catch (error) {
      ErrorHandler.throwError(error);
    }
  }
}
