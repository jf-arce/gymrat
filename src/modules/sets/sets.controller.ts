import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { ErrorHandler } from 'src/utils/error.handler';

@Controller('sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Post()
  async create(@Body() createSetDto: CreateSetDto) {
    try {
      await this.setsService.create(createSetDto);
      return { message: 'Set created successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get()
  findAll() {
    return this.setsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetDto: UpdateSetDto) {
    return this.setsService.update(+id, updateSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setsService.remove(+id);
  }
}
