import { IsISO8601, IsMongoId, IsString } from 'class-validator';

export class CreateChallengeDto {
  @IsISO8601()
  readonly challengeHappensAt: string;

  @IsMongoId()
  readonly requester: string;

  @IsString()
  readonly category: string;
}
