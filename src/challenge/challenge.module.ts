import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { Challenge, ChallengeSchema } from './entities/challenge.schema';
import { ChallengeRepository } from './challenge.repository';
import { PlayerModule } from '../player/player.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    PlayerModule,
    CategoryModule,
    MongooseModule.forFeature([
      { name: Challenge.name, schema: ChallengeSchema },
    ]),
  ],
  controllers: [ChallengeController],
  providers: [ChallengeRepository, ChallengeService],
})
export class ChallengeModule {}
