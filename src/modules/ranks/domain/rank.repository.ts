import { Rank } from './rank.entity';

export abstract class RankRepository {
  abstract create(rank: Rank): Promise<void>;
  abstract findAll(): Promise<Rank[]>;
  abstract findOneById(id: number): Promise<Rank | null>;
  abstract update(rank: Rank): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract findByNumber(number: number): Promise<Rank | null>;
}
