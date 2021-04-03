import { IsEnum, IsNotEmpty } from 'class-validator';
import { ChallengeStatus } from '../entities/challenge.schema';

export class ChangeChallengeStatusDto {
  @IsEnum(ChallengeStatus, {
    message: `status must be a valid enum value  ${Object.values(
      ChallengeStatus,
    ).filter((item) => typeof item !== 'number')}`,
  })
  @IsNotEmpty()
  readonly status!: keyof typeof ChallengeStatus;

  challengeId!: string;
}
