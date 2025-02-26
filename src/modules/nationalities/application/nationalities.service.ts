import { Injectable } from '@nestjs/common';
import { UpdateNationalityDto } from './dto/update-nationality.dto';
import { CreateNationalityDto } from './dto/create-nationality.dto';

@Injectable()
export class NationalitiesService {
  create(createNationalityDto: CreateNationalityDto) {
    return 'This action adds a new nationality';
  }

  findAll() {
    return `This action returns all nationalities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nationality`;
  }

  update(id: number, updateNationalityDto: UpdateNationalityDto) {
    return `This action updates a #${id} nationality`;
  }

  remove(id: number) {
    return `This action removes a #${id} nationality`;
  }
}
