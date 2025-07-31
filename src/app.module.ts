/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:test@cluster0.n3qebom.mongodb.net/w40k?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ListsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
