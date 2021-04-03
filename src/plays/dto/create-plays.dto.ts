import { ArrayMinSize, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class ResultDto {
  @IsNotEmpty()
  @IsString()
  set!: string;
}

export class PlayerOnPlay {
  @IsMongoId()
  _id!: string;
}

export class CreatePlaysDto {
  @IsMongoId()
  readonly def!: string;

  @IsNotEmpty()
  result!: ResultDto[];

  @ArrayMinSize(2)
  players!: PlayerOnPlay[];
}
