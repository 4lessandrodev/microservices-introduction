import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PlayerRepository } from '../player/player.repository';
import { CreatePlaysDto } from './dto/create-plays.dto';
import { Plays } from './entities/plays.schema';
import { PlaysRepository } from './plays.repository';

@Injectable()
export class PlaysService {
  constructor(
    @Inject(PlaysRepository) private readonly playsRepo: PlaysRepository,
    @Inject(PlayerRepository) private readonly playerRepo: PlayerRepository,
  ) {}

  async createPlays(createPlaysDto: CreatePlaysDto): Promise<void> {
    const playerExist = this.playerRepo.playerExist(createPlaysDto.def);
    if (!playerExist) {
      throw new NotFoundException(`Player ${createPlaysDto.def} not exist`);
    }
    return this.playsRepo.savePlays(createPlaysDto);
  }

  async getManyPlays(): Promise<Array<Plays>> {
    return this.playsRepo.getManyPlays();
  }

  async deletePlaysById(_id: string): Promise<void> {
    const playsExist = await this.playsRepo.playsExist(_id);
    if (!playsExist) {
      throw new NotFoundException(`Plays ${_id} does not exist`);
    }

    await this.playsRepo.deletePlaysById(_id);
  }
}
