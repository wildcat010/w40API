/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from 'src/schemas/list.schema';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Character, CharacterSchema } from 'src/schemas/character.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Character.name,
        schema: CharacterSchema,
      },
      {
        name: List.name,
        schema: ListSchema,
      },
    ]),
  ],
  providers: [CharacterService],
  controllers: [CharacterController],
})
export class CharacterModule {}
