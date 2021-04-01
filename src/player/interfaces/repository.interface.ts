import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { Player } from '../entities/player.schema';

export interface RepositoryInterface {
  savePlayer: (createPlayerDto: CreatePlayerDto) => Promise<void>;
  updatePlayer: (updatePlayerDto: UpdatePlayerDto) => Promise<void>;
  findPlayerById: (_id: string) => Promise<Player>;
  getPlayers: () => Promise<Player[]>;
  deletePlayerById: (_id: string) => Promise<void>;
}
