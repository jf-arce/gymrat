import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateRoutineDto } from '../application/dto/create-routine.dto';
import { UpdateRoutineDto } from '../application/dto/update-routine.dto';
import { RoutinesService } from '../application/routines.service';
import { HandleError } from 'src/modules/shared/errors/handle.error';

@Controller('api/routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Post()
  async create(@Body() createRoutineDto: CreateRoutineDto) {
    try {
      await this.routinesService.create(createRoutineDto);
    } catch (error) {
      HandleError.throw(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.routinesService.findAll();
    } catch (error) {
      HandleError.throw(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.routinesService.findOne(+id);
    } catch (error) {
      HandleError.throw(error);
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
      HandleError.throw(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.routinesService.remove(+id);
    } catch (error) {
      HandleError.throw(error);
    }
  }
}
