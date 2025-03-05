import { Module } from '@nestjs/common';
import { NationalitiesController } from './nationalities.controller';
import { NationalitiesService } from './nationalities.service';

@Module({
  controllers: [NationalitiesController],
  providers: [NationalitiesService],
})
export class NationalitiesModule {}
