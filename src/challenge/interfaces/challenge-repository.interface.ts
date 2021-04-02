import { ChangeChallengeStatusDto } from '../dto/change-challenge-status.dto';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { Challenge } from '../entities/challenge.schema';

export class ChallengeRepositoryInterface {
  saveChallenge: (createChallengeDto: CreateChallengeDto) => Promise<void>;
  changeChallengeStatus: (
    changeChallengeStatusDto: ChangeChallengeStatusDto,
    options?: Partial<Challenge>,
  ) => Promise<void>;
  challengeExist: (_id: string) => Promise<boolean>;
  deleteChallengeById: (_id: string) => Promise<void>;
  findChallangeById: (_id: string) => Promise<Challenge>;
  getChallenges: () => Promise<Array<Challenge>>;
}
