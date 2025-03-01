import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NationalitiesService } from './nationalities.service';
import { CreateNationalityDto } from './dto/create-nationality.dto';
import { UpdateNationalityDto } from './dto/update-nationality.dto';
import { ErrorHandler } from 'src/utils/error.handler';

@Controller('nationalities')
export class NationalitiesController {
  constructor(private readonly nationalitiesService: NationalitiesService) {}

  @Post()
  async create(@Body() createNationalityDto: CreateNationalityDto) {
    try {
      await this.nationalitiesService.create(createNationalityDto);
      return { message: 'Nationality created successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.nationalitiesService.findAll();
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    try {
      return await this.nationalitiesService.findOne(name);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() updateNationalityDto: UpdateNationalityDto,
  ) {
    try {
      await this.nationalitiesService.update(name, updateNationalityDto);
      return { message: 'Nationality updated successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    try {
      await this.nationalitiesService.remove(name);
      return { message: 'Nationality deleted successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }
}
