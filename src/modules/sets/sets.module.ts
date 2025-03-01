import { Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';

@Module({
  controllers: [SetsController],
  providers: [SetsService],
})
export class SetsModule {}
