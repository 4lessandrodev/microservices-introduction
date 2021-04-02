import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ResultDto {
  @IsNotEmpty()
  @IsString()
  set: string;
}

export class CreatePlaysDto {
  @IsMongoId()
  readonly def: string;

  @IsOptional()
  result: ResultDto[];

  @IsOptional()
  @IsMongoId({ each: true })
  players: string[];
}
