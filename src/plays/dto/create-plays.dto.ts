import { ArrayMinSize, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class ResultDto {
  @IsNotEmpty()
  @IsString()
  set: string;
}

export class CreatePlaysDto {
  @IsMongoId()
  readonly def: string;

  @IsNotEmpty()
  result: ResultDto[];

  @IsMongoId({ each: true })
  @ArrayMinSize(2)
  players: string[];
}
