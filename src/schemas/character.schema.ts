/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { List } from './list.schema';
import mongoose, { Types } from 'mongoose';

@Schema()
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  points: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'List', required: false })
  list?: Types.ObjectId | List; // Optional if not every EpicHero belongs to a List
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
