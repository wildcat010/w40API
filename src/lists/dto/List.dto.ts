/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBattlelineDto } from 'src/battleline/dto/battleline.dto';
import { CreateCharacterDto } from 'src/character/dto/Character.dto';
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
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  pointsLimit: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  army?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '2025-08-26T12:34:56.789Z', readOnly: true })
  createdAt?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  infantry?: CreateListInfantryDto;

  @IsOptional()
  @ApiProperty({ required: false })
  epicHero?: CreateEpicHeroDto;

  @IsOptional()
  @ApiProperty({ required: false })
  battlelines?: CreateBattlelineDto[];

  @IsOptional()
  @ApiProperty({ required: false })
  characters?: CreateCharacterDto[];
}
