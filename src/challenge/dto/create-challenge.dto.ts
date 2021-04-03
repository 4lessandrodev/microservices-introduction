import {
  ArrayMinSize,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

export class PlayerDto {
  @IsMongoId()
  _id!: string;
}

export class CreateChallengeDto {
  category!: string;

  @IsISO8601()
  readonly challengeHappensAt!: string;

  @IsMongoId()
  readonly requester!: string;

  @IsNotEmpty()
  @ArrayMinSize(2)
  players!: PlayerDto[];
}
