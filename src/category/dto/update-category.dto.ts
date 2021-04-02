import { IsOptional } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
  _id: string;

  @IsOptional()
  players?: string[];
}
