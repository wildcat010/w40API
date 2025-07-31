import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './../schemas/list.schema';
import { ListService } from './list.service';
import { ListController } from './lists.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: List.name,
        schema: ListSchema,
      },
    ]),
  ],
  providers: [ListService],
  controllers: [ListController],
})
export class ListsModule {}
