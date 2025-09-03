/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { List } from './list.schema';
import { Datasheet } from './datasheet.schema';

@Schema()
export class Battleline {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  points: number;

  @Prop({ required: false })
  nbr: number;

  @Prop({ required: true })
  createdAt: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'List', required: false })
  list?: Types.ObjectId | List; // Optional if not every EpicHero belongs to a List

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Datasheet',
    required: false,
  })
  datasheets?: Datasheet[];
}
export type BattlelineDocument = Battleline & Document;
export const BattlelineSchema = SchemaFactory.createForClass(Battleline);
