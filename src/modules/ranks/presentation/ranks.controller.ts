import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RanksService } from '../application/ranks.service';
import { CreateRankDto } from '../application/dto/create-rank.dto';
import { UpdateRankDto } from '../application/dto/update-rank.dto';

@Controller('api/ranks')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @Post()
  create(@Body() createRankDto: CreateRankDto) {
    return this.ranksService.create(createRankDto);
  }

  @Get()
  findAll() {
    return this.ranksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ranksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRankDto: UpdateRankDto) {
    return this.ranksService.update(+id, updateRankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ranksService.remove(+id);
  }
}
