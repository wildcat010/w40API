/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListsModule } from './lists/lists.module';
import { EpicHeroModule } from './epicHero/epicHero.module';
import { BattlelineModule } from './battleline/battleline.module';
import { CharacterModule } from './character/character.module';
import { DatasheetModule } from './datasheet/datasheet.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:test@cluster0.n3qebom.mongodb.net/w40k?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ListsModule,
    EpicHeroModule,
    BattlelineModule,
    CharacterModule,
    DatasheetModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
