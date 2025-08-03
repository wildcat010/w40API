/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EpicHero } from './epicHero.schema';
import { Battleline } from './battleline.schema';
import { Character } from './character.schema';
import mongoose from 'mongoose';

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
  @Prop({ required: true })
  mobility: string[];
  @Prop({ required: true })
  toughness: string[];
  @Prop({ required: true })
  save: string[];
  @Prop({ required: false })
  InvSave: string[];
  @Prop({ required: true })
  wound: string[];
  @Prop({ required: true })
  lead: string[];
  @Prop({ required: true })
  command: string[];
  @Prop({ required: true })
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
  epicHero?: EpicHero;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Battleline',
    required: false,
  })
  battleline?: Battleline;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
    required: false,
  })
  character?: Character;
}

export const DatasheetSchema = SchemaFactory.createForClass(Datasheet);
