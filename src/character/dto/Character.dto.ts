/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  points: number;

  @IsOptional()
  @IsString()
  createdAt?: string;

  @IsOptional()
  @IsMongoId()
  list?: string | Types.ObjectId; // ID of the related List
}
