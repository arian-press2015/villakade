import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterCityDto {
  @IsOptional()
  @IsNumberString({ message: 'province must be a positive number' })
  @ApiProperty({
    required: false,
    example: '12345',
    description: 'Province_id of the city',
  })
  readonly province_id?: string;

  @IsOptional()
  @IsString({ message: 'name must be a string' })
  @ApiProperty({
    required: false,
    example: 'shiraz',
    description: 'name of the City',
  })
  readonly name?: string;

  @IsOptional()
  @IsString({ message: 'fa_name must be a string' })
  @ApiProperty({
    required: false,
    example: 'شیراز',
    description: 'fa_name of the City',
  })
  readonly fa_name?: string;
}
