import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlaysDto } from './dto/create-plays.dto';
import { Plays, PlaysDocument } from './entities/plays.schema';
import { PlaysRepositoryInterface } from './interfaces/plays-repository.interface';

export class PlaysRepository implements PlaysRepositoryInterface {
  constructor(
    @InjectModel(Plays.name) private readonly playsModel: Model<PlaysDocument>,
  ) {}

  async getManyPlays(): Promise<Plays[]> {
    return await this.playsModel.find();
  }

  async savePlays(createPlaysDto: CreatePlaysDto): Promise<void> {
    await (await this.playsModel.create(createPlaysDto)).save();
  }

  async deletePlaysById(_id: string): Promise<void> {
    await this.playsModel.findOneAndDelete({ _id });
  }

  async playsExist(_id: string): Promise<boolean> {
    return await this.playsModel.exists({ _id });
  }
}
