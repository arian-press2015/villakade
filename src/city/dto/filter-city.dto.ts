import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterCityDto {
  @IsOptional()
  @IsNumberString({ message: 'offset must be a positive number' })
  @ApiProperty({
    required: false,
    example: '0',
    description: 'offset of the residence',
  })
  readonly offset?: string;

  @IsOptional()
  @IsNumberString({ message: 'limit must be a positive number' })
  @ApiProperty({
    required: false,
    example: '0',
    description: 'limit of the residence',
  })
  readonly limit?: string;

  @IsOptional()
  @IsString({ message: 'sort must be a string' })
  @ApiProperty({
    required: false,
    example: 'field1:asc,field2:desc',
    description: 'sort of the residence',
  })
  readonly sort?: string;

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
