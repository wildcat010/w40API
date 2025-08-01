/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateEpicHeroDto } from 'src/epicHero/dto/epicHero.dto';

export class CreateListInfantryDto {
  @IsOptional()
  @IsString()
  unit: string;

  @IsOptional()
  @IsString()
  number: number;

  @IsOptional()
  @IsString()
  points: string;

  @IsOptional()
  @IsString()
  createdAt: string;

  @IsOptional()
  epicHero: string;
}

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  pointsLimit: number;

  @IsOptional()
  @IsString()
  army?: string;

  @IsOptional()
  @IsString()
  createdAt?: string;

  @IsOptional()
  infantry?: CreateListInfantryDto;

  @IsOptional()
  epicHero?: CreateEpicHeroDto;
}
