import { Module } from '@nestjs/common';
import { NationalitiesService } from '../application/nationalities.service';
import { NationalityRepositoryImp } from '../infraestructure/repositories/nationality.repository.imp';
import { NationalitiesController } from './nationalities.controller';
import { NationalityRepository } from '../domain/nationality.repository';

@Module({
  controllers: [NationalitiesController],
  providers: [
    NationalitiesService,
    {
      provide: NationalityRepository,
      useClass: NationalityRepositoryImp,
    },
  ],
  exports: [NationalityRepository],
})
export class NationalitiesModule {}
