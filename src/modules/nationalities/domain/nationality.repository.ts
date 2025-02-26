import { Nationality } from './nationality.entity';

export abstract class NationalityRepository {
  abstract create(nationality: Nationality): Promise<void>;
  abstract findAll(): Promise<Nationality[]>;
  abstract findOneById(id: number): Promise<Nationality | null>;
  abstract update(nationality: Nationality): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
