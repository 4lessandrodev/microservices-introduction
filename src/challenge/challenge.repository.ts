import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeChallengeStatusDto } from './dto/change-challenge-status.dto';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge, ChallengeDocument } from './entities/challenge.schema';
import { ChallengeRepositoryInterface } from './interfaces/challenge-repository.interface';

@Injectable()
export class ChallengeRepository implements ChallengeRepositoryInterface {
  constructor(
    @InjectModel(Challenge.name)
    private readonly challengeModel: Model<ChallengeDocument>,
  ) {}

  async saveChallenge(createChallengeDto: CreateChallengeDto): Promise<void> {
    const players = createChallengeDto.players.map((player) => player._id);
    const challenge = await this.challengeModel.create({
      ...createChallengeDto,
      status: 'PENDING',
      players,
    });
    await challenge.save();
  }

  async changeChallengeStatus(
    changeChallengeStatusDto: ChangeChallengeStatusDto,
    options?: Partial<Challenge>,
  ): Promise<void> {
    const { challengeId, status } = changeChallengeStatusDto;
    await this.challengeModel.findByIdAndUpdate(challengeId, {
      $set: { status, options },
    });
  }

  async challengeExist(_id: string): Promise<boolean> {
    return await this.challengeModel.exists({ _id });
  }

  async deleteChallengeById(_id: string): Promise<void> {
    await this.challengeModel.deleteOne({ _id });
  }

  async findChallangeById(_id: string): Promise<Challenge> {
    const result = await this.challengeModel
      .findOne({ _id })
      .populate('players')
      .populate('requester')
      .exec();

    if (!result) {
      throw new NotFoundException(`Challenge ${_id} does not exist`);
    }
    return result;
  }

  async getChallenges(): Promise<Challenge[]> {
    const result = await this.challengeModel
      .find()
      .populate('requester')
      .populate('players')
      .exec();

    console.log(result);
    return result;
  }
}
