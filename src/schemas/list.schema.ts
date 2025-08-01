/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { EpicHero } from './epicHero.schema';

@Schema()
export class List {
  @Prop({ unique: true })
  name: string;

  @Prop({ required: true })
  pointsLimit: number;

  @Prop({ required: false })
  army: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EpicHero',
    required: false,
  })
  epicHero?: EpicHero;
}

export const ListSchema = SchemaFactory.createForClass(List);
