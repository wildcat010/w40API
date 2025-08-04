/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateDatasheetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  points: number;

  @IsNotEmpty()
  @IsNumber()
  nbr: number;

  /*
      Datasheet
      */
  @IsOptional()
  mobility: string[];
  @IsOptional()
  toughness: string[];
  @IsOptional()
  save: string[];
  @IsOptional()
  InvSave: string[];
  @IsOptional()
  wound: string[];
  @IsOptional()
  lead: string[];
  @IsOptional()
  command: string[];
  @IsOptional()
  nameDatasheet: string[];

  /*
      Wargear
      */
  @IsOptional()
  wargearName: string[];
  @IsOptional()
  wargearRange: string[];
  @IsOptional()
  wargearType: string[];
  @IsOptional()
  wargearAttack: string[];
  @IsOptional()
  wargearSkill: string[];
  @IsOptional()
  wargearStrength: string[];
  @IsOptional()
  wargearAP: string[];
  @IsOptional()
  wargearDammage: string[];

  /*
    Relationship
  */
  @IsOptional()
  @IsString()
  createdAt?: string;

  @IsOptional()
  @IsMongoId()
  list?: string | Types.ObjectId; // ID of the related List

  @IsOptional()
  @IsMongoId()
  epicHero?: string | Types.ObjectId; // ID of the related List;

  @IsOptional()
  @IsMongoId()
  battleline?: string | Types.ObjectId; // ID of the related List

  @IsOptional()
  @IsMongoId()
  character?: string | Types.ObjectId; // ID of the related List
}
