/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EpicHero, EpicHeroSchema } from './../schemas/epicHero.schema';
import { EpicHeroService } from './epicHero.service';

import { EpicHeroController } from './epicHero.controller';
import { List, ListSchema } from 'src/schemas/list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EpicHero.name,
        schema: EpicHeroSchema,
      },
      {
        name: List.name,
        schema: ListSchema,
      },
    ]),
  ],
  providers: [EpicHeroService],
  controllers: [EpicHeroController],
})
export class EpicHeroModule {}
