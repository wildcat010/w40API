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
import { EpicHeroService } from './epicHero.service';
import { CreateEpicHeroDto } from './dto/epicHero.dto';
import mongoose from 'mongoose';

@Controller('epichero')
export class EpicHeroController {
  constructor(private epicHeroService: EpicHeroService) {}

  @Post(':id')
  @UsePipes(new ValidationPipe())
  createList(
    @Param('id') id: string,
    @Body() createEpicHero: CreateEpicHeroDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('id not valid', 404);
    }

    return this.epicHeroService.createEpicHero(id, createEpicHero);
  }

  @Get()
  getEpicHeroes() {
    return this.epicHeroService.getEpicHeros();
  }

  @Get(':id')
  getEpicHeroById(@Param('id') id: string) {
    return this.epicHeroService.getEpicHeroById(id);
  }

  @Delete(':id')
  deleteEpicHero(@Param('id') id: string) {
    return this.epicHeroService.deleteEpicHero(id);
  }
}
