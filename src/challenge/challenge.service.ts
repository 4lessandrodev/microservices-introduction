import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../category/category.repository';
import { PlayerRepository } from '../player/player.repository';
import { ChallengeRepository } from './challenge.repository';
import { ChangeChallengeStatusDto } from './dto/change-challenge-status.dto';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './entities/challenge.schema';

@Injectable()
export class ChallengeService {
  constructor(
    @Inject(ChallengeRepository)
    private readonly challengeRepo: ChallengeRepository,

    @Inject(PlayerRepository)
    private readonly playerRepo: PlayerRepository,

    @Inject(CategoryRepository)
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async createChallenge(createChallengeDto: CreateChallengeDto): Promise<void> {
    const { requester } = createChallengeDto;
    const playersIds = createChallengeDto.players.map((player) => player._id);
    const playersExists = await this.playerRepo.getPlayersByIds(playersIds);

    if (playersExists.length < 2) {
      throw new NotFoundException(`Player [${playersIds}] does not exist`);
    }

    const somePlayerIsRequester = playersIds.includes(requester);
    if (!somePlayerIsRequester) {
      throw new ConflictException(
        `Requester ${requester} is none of players ${playersIds}`,
      );
    }

    const playerCategory = await this.categoryRepo.findCategoryFromPlayer(
      requester,
    );
    createChallengeDto.category = playerCategory.category;
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

  async getChallengeById(_id: string): Promise<Challenge> {
    const challengeExist = await this.challengeRepo.challengeExist(_id);
    if (!challengeExist) {
      throw new NotFoundException(`Challenge ${_id} does not exist`);
    }
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
