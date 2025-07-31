/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class List {
  @Prop({ unique: true })
  name: string;

  @Prop({ required: true })
  pointsLimit: number;

  @Prop({ required: false })
  army: string;
}

export const ListSchema = SchemaFactory.createForClass(List);
