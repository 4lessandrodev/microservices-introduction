import { Injectable } from '@nestjs/common';
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
    const challenge = await this.challengeModel.create({
      ...createChallengeDto,
      status: 'PENDING',
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
    return await this.challengeModel.findOne(
      { _id },
      {},
      { populate: 'requester' },
    );
  }

  async getChallenges(): Promise<Challenge[]> {
    return await this.challengeModel.find();
  }
}
