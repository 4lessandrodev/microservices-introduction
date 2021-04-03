import { CreatePlaysDto } from '../dto/create-plays.dto';
import { Plays } from '../entities/plays.schema';

export interface PlaysRepositoryInterface {
  savePlays: (createPlaysDto: CreatePlaysDto) => Promise<void>;
  getManyPlays: () => Promise<Plays[]>;
  deletePlaysById: (_id: string) => Promise<void>;
  playsExist: (_id: string) => Promise<boolean>;
}
