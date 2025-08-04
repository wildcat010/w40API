/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Character, CharacterSchema } from 'src/schemas/character.schema';
import { DatasheetService } from './datasheet.service';
import { EpicHero, EpicHeroSchema } from 'src/schemas/epicHero.schema';
import { Battleline, BattlelineSchema } from 'src/schemas/battleline.schema';
import { DatasheetController } from './datasheet.controller';
import { List, ListSchema } from 'src/schemas/list.schema';
import { Datasheet, DatasheetSchema } from 'src/schemas/datasheet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Character.name,
        schema: CharacterSchema,
      },

      {
        name: EpicHero.name,
        schema: EpicHeroSchema,
      },
      {
        name: Battleline.name,
        schema: BattlelineSchema,
      },
      {
        name: List.name,
        schema: ListSchema,
      },
      {
        name: Datasheet.name,
        schema: DatasheetSchema,
      },
    ]),
  ],
  providers: [DatasheetService],
  controllers: [DatasheetController],
})
export class DatasheetModule {}
