import { Module } from '@nestjs/common';
import { RoutinesController } from './routines.controller';
import { RoutinesService } from '../application/routines.service';
import { UsersModule } from 'src/modules/users/presentation/users.module';
import { RoutineRepository } from '../domain/routine.repository';
import { RoutineRepositoryImp } from '../infraestructure/repositories/routine.repository.imp';

@Module({
  imports: [UsersModule],
  controllers: [RoutinesController],
  providers: [
    RoutinesService,
    {
      provide: RoutineRepository,
      useClass: RoutineRepositoryImp,
    },
  ],
  exports: [RoutineRepository],
})
export class RoutinesModule {}
