import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterCityDto {
  @IsOptional()
  @IsNumberString({ message: 'Province must be a positive number' })
  @ApiProperty({ example: '12345', description: 'Province_id of the city' })
  readonly province_id?: string;

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({
    example: 'shiraz',
    description: 'name of the City',
  })
  readonly name?: string;

  @IsOptional()
  @IsString({ message: 'Fa_name must be a string' })
  @ApiProperty({
    example: 'شیراز',
    description: 'fa_name of the City',
  })
  readonly fa_name?: string;
}
