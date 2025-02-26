import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NationalitiesService } from '../application/nationalities.service';
import { CreateNationalityDto } from '../application/dto/create-nationality.dto';
import { UpdateNationalityDto } from '../application/dto/update-nationality.dto';

@Controller('nationalities')
export class NationalitiesController {
  constructor(private readonly nationalitiesService: NationalitiesService) {}

  @Post()
  create(@Body() createNationalityDto: CreateNationalityDto) {
    return this.nationalitiesService.create(createNationalityDto);
  }

  @Get()
  findAll() {
    return this.nationalitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nationalitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNationalityDto: UpdateNationalityDto,
  ) {
    return this.nationalitiesService.update(+id, updateNationalityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nationalitiesService.remove(+id);
  }
}
