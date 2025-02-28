import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HandleError } from 'src/modules/shared/errors/handle.error';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Post()
  async create(@Body() createRoutineDto: CreateRoutineDto) {
    try {
      await this.routinesService.create(createRoutineDto);
    } catch (error) {
      HandleError.throwError(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.routinesService.findAll();
    } catch (error) {
      HandleError.throwError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.routinesService.findOne(+id);
    } catch (error) {
      HandleError.throwError(error);
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
      HandleError.throwError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.routinesService.remove(+id);
    } catch (error) {
      HandleError.throwError(error);
    }
  }
}
