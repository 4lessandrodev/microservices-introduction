import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from '../player/player.module';
import { Plays, PlaysSchema } from './entities/plays.schema';
import { PlaysController } from './plays.controller';
import { PlaysRepository } from './plays.repository';
import { PlaysService } from './plays.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plays.name, schema: PlaysSchema }]),
    PlayerModule,
  ],
  controllers: [PlaysController],
  providers: [PlaysRepository, PlaysService],
})
export class PlaysModule {}
