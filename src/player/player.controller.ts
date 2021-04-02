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
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerService } from './player.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { MongoIdPipe } from '../common/pipes/mongo-id.pipe';

@Controller('api/v1/players')
export class PlayerController {
  constructor(
    @Inject(PlayerService) private readonly playerService: PlayerService,
  ) {}

  @Post()
  savePlayer(@Body(ValidationPipe) createPlayerDto: CreatePlayerDto) {
    return this.playerService.savePlayer(createPlayerDto);
  }

  @Get()
  getPlayers() {
    return this.playerService.getPlayers();
  }

  @Get('/:_id')
  getPlayerById(@Param('_id', MongoIdPipe) _id: string) {
    return this.playerService.findPlayerById(_id);
  }

  @Put('/:_id')
  updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('_id', MongoIdPipe) _id: string,
  ) {
    updatePlayerDto._id = _id;
    return this.playerService.updatePlayer(updatePlayerDto);
  }

  @Delete('/:_id')
  deletePlayerById(@Param('_id', MongoIdPipe) _id: string) {
    return this.playerService.deletePlayerById(_id);
  }
}
