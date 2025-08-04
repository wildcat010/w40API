/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Types } from 'mongoose';

@Schema()
export class Datasheet {
  @Prop({ required: true })
  nbr: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  points: number;

  /*
    Datasheet
    */
  @Prop({ required: false })
  mobility: string[];
  @Prop({ required: false })
  toughness: string[];
  @Prop({ required: false })
  save: string[];
  @Prop({ required: false })
  InvSave: string[];
  @Prop({ required: false })
  wound: string[];
  @Prop({ required: false })
  lead: string[];
  @Prop({ required: false })
  command: string[];
  @Prop({ required: false })
  nameDatasheet: string[];

  /*
    Wargear
    */
  @Prop({ required: false })
  wargearName: string[];
  @Prop({ required: false })
  wargearRange: string[];
  @Prop({ required: false })
  wargearType: string[];
  @Prop({ required: false })
  wargearAttack: string[];
  @Prop({ required: false })
  wargearSkill: string[];
  @Prop({ required: false })
  wargearStrength: string[];
  @Prop({ required: false })
  wargearAP: string[];
  @Prop({ required: false })
  wargearDammage: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EpicHero',
    required: false,
  })
  epicHero?: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Battleline',
    required: false,
  })
  battleline?: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
    required: false,
  })
  character?: Types.ObjectId;
}

export type DatasheetDocument = Datasheet & Document;

export const DatasheetSchema = SchemaFactory.createForClass(Datasheet);
