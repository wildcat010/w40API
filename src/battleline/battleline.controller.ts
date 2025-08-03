import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateBattlelineDto } from './dto/battleline.dto';
import { BattlelineService } from './battleline.service';

@Controller('battleline')
export class BattlelineController {
  constructor(private battlelineService: BattlelineService) {}

  @Post(':id')
  @UsePipes(new ValidationPipe())
  createList(
    @Param('id') id: string,
    @Body() createBattlelineDto: CreateBattlelineDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('id not valid', 404);
    }

    return this.battlelineService.createBattleline(id, createBattlelineDto);
  }

  @Get()
  getBattlelines() {
    return this.battlelineService.getBattlelines();
  }

  @Get(':id')
  getBattlelineById(@Param('id') id: string) {
    return this.battlelineService.getBattlelineById(id);
  }

  @Delete(':id')
  deleteBattleline(@Param('id') id: string) {
    return this.battlelineService.deleteBattleline(id);
  }
}
