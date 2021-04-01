import { Inject, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.schema';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(
    @Inject(PlayerRepository)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async savePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    return this.playerRepository.savePlayer(createPlayerDto);
  }

  async updatePlayer(updatePlayerDto: UpdatePlayerDto): Promise<void> {
    return this.playerRepository.updatePlayer(updatePlayerDto);
  }

  async findPlayerById(_id: string): Promise<Player> {
    return this.playerRepository.findPlayerById(_id);
  }

  async getPlayers(): Promise<Player[]> {
    return this.playerRepository.getPlayers();
  }

  async deletePlayerById(_id: string): Promise<void> {
    return this.playerRepository.deletePlayerById(_id);
  }
}
