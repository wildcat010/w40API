/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Battleline, BattlelineSchema } from 'src/schemas/battleline.schema';

import { List, ListSchema } from 'src/schemas/list.schema';
import { BattlelineController } from './battleline.controller';
import { BattlelineService } from './battleline.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Battleline.name,
        schema: BattlelineSchema,
      },
      {
        name: List.name,
        schema: ListSchema,
      },
    ]),
  ],
  providers: [BattlelineService],
  controllers: [BattlelineController],
})
export class BattlelineModule {}
