/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { CreateCharacterDto } from './dto/Character.dto';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Post(':id')
  @UsePipes(new ValidationPipe())
  createList(
    @Param('id') id: string,
    @Body() createCharacterDto: CreateCharacterDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('id not valid', 404);
    }

    return this.characterService.createCharacter(id, createCharacterDto);
  }

  @Get()
  getBattlelines() {
    return this.characterService.getCharacters();
  }

  @Get(':id')
  getBattlelineById(@Param('id') id: string) {
    return this.characterService.getCharacterById(id);
  }

  @Delete(':id')
  deleteBattleline(@Param('id') id: string) {
    return this.characterService.deleteCharacter(id);
  }
}
