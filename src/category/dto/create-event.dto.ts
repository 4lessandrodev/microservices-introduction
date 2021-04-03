import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum Operation {
  '+',
  '-',
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsNotEmpty()
  @IsEnum(Operation)
  readonly operation!: keyof typeof Operation;

  @IsNumber()
  @IsNotEmpty()
  readonly value!: number;
}
