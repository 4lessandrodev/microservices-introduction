import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player, PlayerDocument } from './entities/player.schema';
import { PlayerRepositoryInterface } from './interfaces/player-repository.interface';

@Injectable()
export class PlayerRepository implements PlayerRepositoryInterface {
  constructor(
    @InjectModel(Player.name)
    private readonly playerRepo: Model<PlayerDocument>,
  ) {}

  async savePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    await (await this.playerRepo.create(createPlayerDto)).save();
  }

  async updatePlayer(updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const { _id } = updatePlayerDto;
    await this.playerRepo
      .findByIdAndUpdate(_id, { $set: updatePlayerDto })
      .exec();
  }

  async findPlayerById(_id: string): Promise<Player> {
    return await this.playerRepo.findById(_id).exec();
  }

  async getPlayers(): Promise<Player[]> {
    return this.playerRepo.find().exec();
  }

  async deletePlayerById(_id: string): Promise<void> {
    await this.playerRepo.deleteOne({ _id }).exec();
  }

  async playerExist(_id: string): Promise<boolean> {
    return await this.playerRepo.exists({ _id });
  }

  async findPlayerByEmail(email: string): Promise<Player> {
    return this.playerRepo.findOne({ email }).exec();
  }

  async getPlayersByIds(_ids: string[]): Promise<Array<Player>> {
    return await this.playerRepo.find().where('_id').in(_ids);
  }
}
