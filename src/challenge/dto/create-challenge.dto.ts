import {
  ArrayMinSize,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class PlayerDto {
  @IsMongoId()
  _id: string;
}

export class CreateChallengeDto {
  @IsISO8601()
  readonly challengeHappensAt: string;

  @IsMongoId()
  readonly requester: string;

  @IsString()
  readonly category: string;

  @IsNotEmpty()
  @ArrayMinSize(2)
  players: PlayerDto[];
}
