import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './entities/player.schema';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './player.repository';
import { PlayerService } from './player.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  controllers: [PlayerController],
  providers: [PlayerRepository, PlayerService],
  exports: [PlayerRepository],
})
export class PlayerModule {}
