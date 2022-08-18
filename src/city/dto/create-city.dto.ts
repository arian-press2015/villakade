import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty({ message: 'City must have a Province' })
  @IsPositive({ message: 'Province must be a positive number' })
  @ApiProperty({ example: 12345, description: 'Province_id of the city' })
  readonly province_id: number;

  @IsString({ message: 'Name must be a string' })
  @ApiProperty({
    example: 'shiraz',
    description: 'name of the City',
  })
  readonly name: string;

  @IsString({ message: 'Fa_name must be a string' })
  @ApiProperty({
    example: 'شیراز',
    description: 'fa_name of the City',
  })
  readonly fa_name: string;
}
