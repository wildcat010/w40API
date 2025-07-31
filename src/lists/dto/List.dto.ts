import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
}
