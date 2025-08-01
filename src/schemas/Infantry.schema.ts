/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EpicHero } from './epicHero.schema';

@Schema()
export class Infantry {
  @Prop({ required: false })
  unit: string;

  @Prop({ required: false })
  number: number;

  @Prop({ required: false })
  points: string;

  @Prop({ required: false })
  createdAt: string;

  @Prop({ required: false })
  epicHero?: EpicHero;
}

export const InfantrySchema = SchemaFactory.createForClass(Infantry);
