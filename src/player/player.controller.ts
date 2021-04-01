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
import { CustomParamPipe } from './pipes/custom-param.pipe';
import { UpdatePlayerDto } from './dto/update-player.dto';

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
  getPlayerById(@Param('_id', CustomParamPipe) _id: string) {
    return this.playerService.findPlayerById(_id);
  }

  @Put('/:_id')
  updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('_id', CustomParamPipe) _id: string,
  ) {
    updatePlayerDto._id = _id;
    return this.playerService.updatePlayer(updatePlayerDto);
  }

  @Delete('/:_id')
  deletePlayerById(@Param('_id', CustomParamPipe) _id: string) {
    return this.playerService.deletePlayerById(_id);
  }
}
