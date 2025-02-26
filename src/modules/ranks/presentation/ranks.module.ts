import { Module } from '@nestjs/common';
import { RanksController } from './ranks.controller';
import { RanksService } from '../application/ranks.service';
import { RankRepositoryImp } from '../infraestructure/repositories/rank.repository.imp';
import { RankRepository } from '../domain/rank.repository';

@Module({
  controllers: [RanksController],
  providers: [
    RanksService,
    {
      provide: RankRepository,
      useClass: RankRepositoryImp,
    },
  ],
  exports: [RankRepository],
})
export class RanksModule {}
