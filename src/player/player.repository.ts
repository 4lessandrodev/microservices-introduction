import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player, PlayerDocument } from './entities/player.schema';
import { RepositoryInterface } from './interfaces/repository.interface';

@Injectable()
export class PlayerRepository implements RepositoryInterface {
  constructor(
    @InjectModel(Player.name)
    private readonly playerRepository: Model<PlayerDocument>,
  ) {}

  async savePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;
    const userAlreadyExists = await this.playerRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new ConflictException(`Player with email ${email} already exists`);
    }

    await (await this.playerRepository.create(createPlayerDto)).save();
  }

  async updatePlayer(updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const { name, phone, _id } = updatePlayerDto;
    const userExists = await this.playerRepository.findById(_id);

    if (!userExists) {
      throw new NotFoundException(`Player with _id ${_id} does not exists`);
    }
    await userExists.updateOne({ name, phone }).exec();
  }

  async findPlayerById(_id: string): Promise<Player> {
    const foundPlayer = await this.playerRepository.findById(_id);

    if (!foundPlayer) {
      throw new NotFoundException(`Player with _id ${_id} does not exists`);
    }
    return foundPlayer;
  }

  async getPlayers(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async deletePlayerById(_id: string): Promise<void> {
    const userExists = await this.playerRepository.findById(_id);

    if (!userExists) {
      throw new NotFoundException(`Player with _id ${_id} does not exists`);
    }
    await this.playerRepository.deleteOne({ _id });
  }
}
