import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateCityDto {
  @IsOptional()
  @IsPositive({ message: 'province must be a positive number' })
  @ApiProperty({ example: 12345, description: 'Province_id of the city' })
  readonly province_id?: number;

  @IsOptional()
  @IsString({ message: 'name must be a string' })
  @ApiProperty({
    example: 'shiraz',
    description: 'name of the City',
  })
  readonly name?: string;

  @IsOptional()
  @IsString({ message: 'fa_name must be a string' })
  @ApiProperty({
    example: 'شیراز',
    description: 'fa_name of the City',
  })
  readonly fa_name?: string;
}
