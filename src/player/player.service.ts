import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.schema';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(
    @Inject(PlayerRepository)
    private readonly playerRepo: PlayerRepository,
  ) {}

  async savePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;
    const userAlreadyExists = await this.playerRepo.findPlayerByEmail(email);

    if (userAlreadyExists) {
      throw new ConflictException(`Player with email ${email} already exists`);
    }
    return this.playerRepo.savePlayer(createPlayerDto);
  }

  async updatePlayer(updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const { _id } = updatePlayerDto;
    const playerExist = await this.playerRepo.playerExist(_id);

    if (!playerExist) {
      throw new NotFoundException(`Player with _id ${_id} does not exists`);
    }
    return this.playerRepo.updatePlayer(updatePlayerDto);
  }

  async findPlayerById(_id: string): Promise<Player> {
    const playerExists = await this.playerRepo.playerExist(_id);

    if (!playerExists) {
      throw new NotFoundException(`Player with _id ${_id} does not exists`);
    }
    return this.playerRepo.findPlayerById(_id);
  }

  async getPlayers(): Promise<Player[]> {
    return this.playerRepo.getPlayers();
  }

  async deletePlayerById(_id: string): Promise<void> {
    const playerExists = await this.playerRepo.playerExist(_id);

    if (!playerExists) {
      throw new NotFoundException(`Player with _id ${_id} does not exists`);
    }
    return this.playerRepo.deletePlayerById(_id);
  }
}
