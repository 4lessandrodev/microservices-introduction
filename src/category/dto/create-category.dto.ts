import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateEventDto } from './create-event.dto';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(7)
  readonly category!: string;

  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @IsArray()
  @ArrayMinSize(1)
  events!: Array<CreateEventDto>;
}
