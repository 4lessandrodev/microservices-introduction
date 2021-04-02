import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { MongoIdPipe } from '../common/pipes/mongo-id.pipe';
import { CreatePlaysDto } from './dto/create-plays.dto';
import { Plays } from './entities/plays.schema';
import { PlaysService } from './plays.service';

@Controller('/api/v1/plays')
export class PlaysController {
  constructor(
    @Inject(PlaysService) private readonly playsServie: PlaysService,
  ) {}

  @Post()
  savePlays(
    @Body(ValidationPipe) createPlaysDto: CreatePlaysDto,
  ): Promise<void> {
    return this.playsServie.createPlays(createPlaysDto);
  }

  @Get()
  getPlays(): Promise<Plays[]> {
    return this.playsServie.getManyPlays();
  }

  @Delete('/:_id')
  deletePlaysById(@Param(MongoIdPipe) _id: string): Promise<void> {
    return this.playsServie.deletePlaysById(_id);
  }
}
