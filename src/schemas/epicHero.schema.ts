/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { List } from './list.schema';
import { Datasheet } from './datasheet.schema';

@Schema()
export class EpicHero {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false })
  points: string;

  @Prop({ required: false })
  createdAt: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'List', required: false })
  list?: Types.ObjectId | List; // Optional if not every EpicHero belongs to a List

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Datasheet',
    required: false,
  })
  datasheet?: Datasheet;
}
export type EpicHeroDocument = EpicHero & Document;
export const EpicHeroSchema = SchemaFactory.createForClass(EpicHero);
