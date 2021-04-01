import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  readonly phone: string;

  @IsNotEmpty()
  readonly name: string;
}
