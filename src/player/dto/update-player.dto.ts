import { IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdatePlayerDto {
  _id: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  readonly phone: string;

  @IsOptional()
  readonly name: string;
}
