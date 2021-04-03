import { IsNotEmpty } from 'class-validator';

export class AddPlayerToCategoryDto {
  @IsNotEmpty()
  playerId!: string;

  @IsNotEmpty()
  category!: string;
}
