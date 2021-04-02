import { Inject, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ChallengeRepository } from './challenge.repository';
import { ChangeChallengeStatusDto } from './dto/change-challenge-status.dto';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './entities/challenge.schema';

@Injectable()
export class ChallengeService {
  constructor(
    @Inject(ChallengeRepository)
    private readonly challengeRepo: ChallengeRepository,
  ) {}

  createChallenge(createChallengeDto: CreateChallengeDto): Promise<void> {
    return this.challengeRepo.saveChallenge(createChallengeDto);
  }

  async deleteChallenge(_id: string): Promise<void> {
    const challengeExist = await this.challengeRepo.challengeExist(_id);
    if (!challengeExist) {
      throw new NotFoundException(`Challenge ${_id} does not exist`);
    }
    return this.challengeRepo.deleteChallengeById(_id);
  }

  getChallenges(): Promise<Challenge[]> {
    return this.challengeRepo.getChallenges();
  }

  getChallengeById(_id: string): Promise<Challenge> {
    return this.challengeRepo.findChallangeById(_id);
  }

  async changeChallengeStatus(
    changeChallengeStatusDto: ChangeChallengeStatusDto,
  ): Promise<void> {
    const { challengeId } = changeChallengeStatusDto;

    const challengeExist = await this.challengeRepo.challengeExist(challengeId);
    if (!challengeExist) {
      throw new NotFoundException(`Challenge ${challengeId} does not exist`);
    }
    return this.challengeRepo.changeChallengeStatus(changeChallengeStatusDto, {
      answeredAt: new Date(),
    });
  }
}
