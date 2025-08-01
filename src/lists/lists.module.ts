/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './../schemas/list.schema';
import { ListService } from './list.service';
import { ListController } from './lists.controller';
import { Infantry, InfantrySchema } from './../schemas/Infantry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: List.name,
        schema: ListSchema,
      },
      {
        name: Infantry.name,
        schema: InfantrySchema,
      },
    ]),
  ],
  providers: [ListService],
  controllers: [ListController],
})
export class ListsModule {}
