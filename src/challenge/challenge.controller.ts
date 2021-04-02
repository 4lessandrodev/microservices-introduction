import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { MongoIdPipe } from '../common/pipes/mongo-id.pipe';
import { ChallengeService } from './challenge.service';
import { ChangeChallengeStatusDto } from './dto/change-challenge-status.dto';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './entities/challenge.schema';

@Controller('/api/v1/challenges')
export class ChallengeController {
  constructor(
    @Inject(ChallengeService)
    private readonly challengeService: ChallengeService,
  ) {}

  @Post()
  createChallenge(
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<void> {
    return this.challengeService.createChallenge(createChallengeDto);
  }

  @Delete('/:_id')
  deleteChallenge(@Param(MongoIdPipe) _id: string): Promise<void> {
    return this.challengeService.deleteChallenge(_id);
  }

  @Get()
  getChallenges(): Promise<Challenge[]> {
    return this.challengeService.getChallenges();
  }

  @Get('/:_id')
  getChallengeById(@Param(MongoIdPipe) _id: string): Promise<Challenge> {
    return this.challengeService.getChallengeById(_id);
  }

  @Put('/:_id')
  changeChallengeStatus(
    @Param(MongoIdPipe) _id: string,
    @Body(ValidationPipe) changeChallengeStatusDto: ChangeChallengeStatusDto,
  ): Promise<void> {
    changeChallengeStatusDto.challengeId = _id;
    return this.challengeService.changeChallengeStatus(
      changeChallengeStatusDto,
    );
  }
}
