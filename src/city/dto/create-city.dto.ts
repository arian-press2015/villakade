import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty({ message: 'province is required' })
  @IsPositive({ message: 'province must be a positive number' })
  @ApiProperty({ example: 12345, description: 'Province_id of the city' })
  readonly province_id: number;

  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  @ApiProperty({
    example: 'shiraz',
    description: 'name of the City',
  })
  readonly name: string;

  @IsNotEmpty({ message: 'fa_name is required' })
  @IsString({ message: 'fa_name must be a string' })
  @ApiProperty({
    example: 'شیراز',
    description: 'fa_name of the City',
  })
  readonly fa_name: string;
}
