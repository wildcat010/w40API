/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateListDto {
  @IsNumber()
  @IsOptional()
  pointsLimit: number;

  @IsOptional()
  @IsString()
  army?: string;
}
